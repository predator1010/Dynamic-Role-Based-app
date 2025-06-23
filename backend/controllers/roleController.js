const { validationResult } = require('express-validator');
const Role = require('../models/Role');

// @desc    Get all roles
// @route   GET /api/roles
// @access  Private
const getRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isActive: true });
    res.json(roles);
  } catch (error) {
    console.error('Get roles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new role
// @route   POST /api/roles
// @access  Private/Admin
const createRole = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, permissions } = req.body;

    // Check if role already exists
    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return res.status(400).json({ message: 'Role already exists' });
    }

    const role = await Role.create({
      name,
      description,
      permissions
    });

    res.status(201).json(role);
  } catch (error) {
    console.error('Create role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update role
// @route   PUT /api/roles/:id
// @access  Private/Admin
const updateRole = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, permissions, isActive } = req.body;
    const roleId = req.params.id;

    const role = await Role.findByIdAndUpdate(
      roleId,
      { name, description, permissions, isActive },
      { new: true }
    );

    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.json(role);
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete role
// @route   DELETE /api/roles/:id
// @access  Private/Admin
const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    // Check if role is being used by any users
    const User = require('../models/User');
    const usersWithRole = await User.findOne({ role: role._id });
    
    if (usersWithRole) {
      return res.status(400).json({ 
        message: 'Cannot delete role that is assigned to users' 
      });
    }

    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Delete role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get role by ID
// @route   GET /api/roles/:id
// @access  Private/Admin
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    res.json(role);
  } catch (error) {
    console.error('Get role by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getRoles,
  createRole,
  updateRole,
  deleteRole,
  getRoleById
}; 