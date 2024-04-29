const { Schema,model } = require('mongoose')



const teacherSchema = new Schema ({
    
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
      
      },
      email: {
      type: String,
      unique: true, 
      required: true,
    },
      hashedPassword: {
        type: String,
        required: true,
      },
      disciplines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discipline'
      }]
    },
    {
      timestamps: true
    
  });

  const Teacher = model('Teacher', teacherSchema)

module.exports = Teacher