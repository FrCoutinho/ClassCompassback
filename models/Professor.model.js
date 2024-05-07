const { Schema, model } = require("mongoose");

const professorSchema = new Schema(
  {
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
    experience_years: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    photo: {
      type: String,
    },

    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Professor = model("Professor", professorSchema);

module.exports = Professor;
