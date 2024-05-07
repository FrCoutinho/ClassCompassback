const { Schema, model } = require("mongoose");

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    classes: [
      {
        type: String,
        ref: "Class",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = model("Student", studentSchema);

module.exports = Student;
