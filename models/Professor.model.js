const { Schema, model } = require('mongoose');

const professorSchema = new Schema ({
   name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  
  subject: {
    type: String,
    required: true,
    trim: true,
  }
  classes_taught: {
    type: String,
    required: true,
  },
  experience_years: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true, 
    required: true,
  },
  
}, {
  timestamps: true
});

const Professor = model('Professor', professorSchema);

module.exports = Professor;