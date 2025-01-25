import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: {
      type: String,
      required: true,
    },
    options: {
      type: [String], // Array of strings
      required: true,
    },
    correctAnswer: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", questionSchema);
