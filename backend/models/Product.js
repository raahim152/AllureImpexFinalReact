const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide product description']
  },
  category: {
    type: String,
    required: [true, 'Please provide product category'],
    enum: ['corrugated', 'flexible', 'paper-core', 'biomass', 'plastics', 'other']
  },
  subcategory: {
    type: String,
    trim: true
  },
  features: [{
    type: String
  }],
  images: [{
  url: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
}],
  specifications: {
    type: Map,
    of: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for search
productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);