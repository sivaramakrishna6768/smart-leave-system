const Leave = require('../models/leave');

// 🧑‍💼 Employee - Apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    const leave = await Leave.create({
      employee: req.user._id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ error: 'Leave application failed', details: err.message });
  }
};

// 🧑‍💼 Employee - View own leave requests
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employee: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leave history', details: err.message });
  }
};

// 👨‍💼 Manager - View all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employee', 'name email role').sort({ createdAt: -1 });
    res.status(200).json(leaves);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaves', details: err.message });
  }
};

// 👨‍💼 Manager - Update leave status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const leave = await Leave.findById(id);
    if (!leave) return res.status(404).json({ error: 'Leave not found' });

    leave.status = status;
    await leave.save();

    res.status(200).json({ message: `Leave ${status}` });
  } catch (err) {
    res.status(500).json({ error: 'Status update failed', details: err.message });
  }
};
