import mongoose from "mongoose";
// import { Question } from "./question.js"; // Use the correct path with .js extension

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question", // Reference the Question model
      },
    ],
    thumbnail: {
      type: String,
      required: false,
      default: "http://localhost:5000/images/quiztime.jpg" 
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

export const Quiz = mongoose.model("Quiz", quizSchema);
