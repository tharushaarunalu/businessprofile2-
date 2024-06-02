const mongoose = require('mongoose');

const { Schema } = mongoose;

const ServiceHistorySchema = new Schema({
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

const CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] // Example format validation
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
    lowercase: true, // Convert email to lowercase before saving
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] // Email format validation
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true // Ensure uniqueness
  },
  vehicleType: {
    type: String,
    required: true
  },
  vehicleModel: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  serviceHistory: {
    type: [ServiceHistorySchema], // Array of service description history objects
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field on save
CustomerSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Middleware to update the updatedAt field on findOneAndUpdate
CustomerSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = Date.now();
  next();
});



// Indexes for frequently queried fields
CustomerSchema.index({ email: 1 });
CustomerSchema.index({ tel: 1 });
CustomerSchema.index({ vehicleNumber: 1 });

module.exports = mongoose.model('Customer', CustomerSchema);
