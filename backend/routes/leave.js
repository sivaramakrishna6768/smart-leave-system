const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const LeaveRequest = require('../models/leave');
const auth = require('../middleware/auth');

// POST /api/leave – Submit new leave request (Employee)
router.post('/', auth(['employee']), async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;
    const employeeId = req.user.id;

    const newLeave = new LeaveRequest({ employeeId, startDate, endDate, reason });
    await newLeave.save();

    res.status(201).json({ message: 'Leave request submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while submitting leave' });
  }
});

// GET /api/leave – Get all leave requests (Manager only)
router.get('/all', auth(['manager']), async (req, res) => {
  try {
    const leaves = await LeaveRequest.find().populate('employeeId', 'email');
    res.json(leaves);
  } catch (err) {
    console.error('Error fetching all leave requests:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET /api/leave/:employeeId – Fetch leave history (Employee)
router.get('/:employeeId', async (req, res) => {
  try {
    const employeeId = req.params.employeeId;

    // ✅ Ensure valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({ error: 'Invalid employee ID' });
    }

    const leaves = await LeaveRequest.find({ employeeId: new mongoose.Types.ObjectId(employeeId) }).sort({ startDate: -1 });
    res.status(200).json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while fetching leave history' });
  }
});

// PUT /api/leave/:id – Approve or reject leave (Manager only)
router.put('/:id', auth(['manager']), async (req, res) => {
  const { status } = req.body;

  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!leave) return res.status(404).json({ error: 'Leave not found' });

    res.json(leave);
  } catch (err) {
    console.error('Error updating leave status:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
