const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the Book model to whatever makes sense in this case
const disciplineSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    workload: {
      type: Number,
      required: true
    },
    professor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professor'
    }
  },
  {
    timestamps: true,
  }
)

const Discipline = model('Discipline', disciplineSchema)

module.exports = Discipline
