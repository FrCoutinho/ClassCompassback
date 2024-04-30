const { Schema, model } = require('mongoose');

const professorSchema = new Schema ({
  professorname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true, 
    required: true,
  },
  disciplines: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Professor = model('Professor', professorSchema);

module.exports = Professor;