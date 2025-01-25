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
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", questionSchema);
