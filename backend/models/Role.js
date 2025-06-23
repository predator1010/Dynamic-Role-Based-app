const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    enum: ['Admin', 'Editor', 'Viewer']
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'manage_users', 'manage_roles']
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create default roles if they don't exist
roleSchema.statics.initializeRoles = async function() {
  const defaultRoles = [
    {
      name: 'Admin',
      description: 'Full access to all features',
      permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles']
    },
    {
      name: 'Editor',
      description: 'Can edit and view content',
      permissions: ['read', 'write']
    },
    {
      name: 'Viewer',
      description: 'Can only view content',
      permissions: ['read']
    }
  ];

  for (const role of defaultRoles) {
    await this.findOneAndUpdate(
      { name: role.name },
      role,
      { upsert: true, new: true }
    );
  }
};

module.exports = mongoose.model('Role', roleSchema); 