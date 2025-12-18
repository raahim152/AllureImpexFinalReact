const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    required: [true, 'Please provide subject']
  },
  message: {
    type: String,
    required: [true, 'Please provide your message']
  },
  productInterest: {
    type: String,
    enum: ['corrugated', 'flexible', 'paper-core', 'biomass', 'plastics', 'custom', 'other']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  repliedAt: {
    type: Date
  },
  replyMessage: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);