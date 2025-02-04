import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import express from "express";
import cors from "cors";
import { Question } from "./models/question.js";
import { Quiz } from "./models/quiz.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());    
app.use(cors());

// Serve static files from the 'public' directory
// app.use("/public", express.static("public"));
app.use(express.static('./public'))

connectDB();
app.listen(PORT, () => {
    try {
        console.log(`Server is running on port http://localhost:${PORT}`);

    } catch (error) {
        // console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
});

// add sample questions

// const addQuizzes = async () => {
//     try {
//         const questions = await Question.find();
//          // Sample quizzes
//         const quizzes = [
//             {
//                 title: 'Math Quiz',
//                 questions: [questions[0]._id, questions[2]._id],  // Math and programming questions
//             },
//             {
//                 title: 'Geography Quiz',
//                 questions: [questions[1]._id],  // Geography question
//             }
//         ];

//         // Insert quizzes into the database
//         await Quiz.insertMany(quizzes);
//         console.log('Sample quizzes added to database');
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//     }
// }

// addQuizzes();

// const insertQuestions = async () => {
//     try {
//       const question1 = await Question.create({
//         questionText: "What is 2 + 2?",
//         options: ["2", "3", "4", "5"],
//         correctAnswer: 2, // Index of the correct answer (starts from 0)
//       });
  
//       const question2 = await Question.create({
//         questionText: "What is the capital of France?",
//         options: ["Berlin", "Madrid", "Paris", "Rome"],
//         correctAnswer: 2,
//       });
  
//       console.log("Questions inserted:", question1, question2);
//       return [question1._id, question2._id]; // Return the IDs for use in quizzes
//     } catch (error) {
//       console.error("Error inserting questions:", error);
//     }
//   };

// const insertQuiz = async (questionIds) => {
//     try {
//       const quiz = await Quiz.create({
//         title: "General Knowledge Quiz",
//         questions: questionIds, // Use the IDs of the questions
//       });
  
//       console.log("Quiz inserted:", quiz);
//     } catch (error) {
//       console.error("Error inserting quiz:", error);
//     }
//   };

//   const createQuizWithQuestions = async () => {
//     try {
//       const questionIds = await insertQuestions(); // Insert questions and get their IDs
//       await insertQuiz(questionIds); // Create a quiz using those question IDs
//       mongoose.connection.close(); // Close the connection
//     } catch (error) {
//       console.error("Error creating quiz with questions:", error);
//     }
//   };
  
//   createQuizWithQuestions();

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.get("/api/quizzes", async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate("questions");
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a single quiz with populated questions
app.get("/api/quizzes/:id", async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate("questions");
        if (quiz) {
            res.status(200).json(quiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to submit answers for a quiz and calculate score
app.post("/api/quizzes/:id/submit", async (req, res) => {
    
    try {
        const quiz = await Quiz.findById(req.params.id).populate("questions");
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        const { answers } = req.body;
        if (!answers || answers.length !== quiz.questions.length) {
            return res.status(400).json({ message: "Invalid answers" });
        }

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        res.status(200).json({ score });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// route to add quizzes
app.post("/api/quizzes", async (req, res) => {
    try {
        const { title, questions } = req.body;

        if (!title || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "Invalid quiz data" });
        }

        // Create questions and save them to the database
        const questionDocs = await Question.insertMany(questions);

        // Create the quiz and associate the question IDs
        const quiz = new Quiz({
            title,
            questions: questionDocs.map((question) => question._id),
        });
        await quiz.save();

        res.status(201).json({ message: "Quiz created successfully", quiz });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// update a quiz
app.put("/api/quizzes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, questions } = req.body;

        if (!title || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "Invalid quiz data" });
        }

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            id,
            { title, questions },
            { new: true }
        );

        if (!updatedQuiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        // Find the questions that need to be updated
        const questionsToUpdate = await Question.find({
            _id: { $in: updatedQuiz.questions },
        });

        // Update the questions
        for (const question of questions) {
            const existingQuestion = questionsToUpdate.find(
                (q) => q._id.toString() === question._id.toString()
            );
            if (existingQuestion) {
                existingQuestion.questionText = question.questionText
                existingQuestion.options = question.options;
                existingQuestion.correctAnswer = question.correctAnswer;
                await existingQuestion.save();
            } else {
                const newQuestion = new Question({
                    questionText: question.questionText,
                    options: question.options,
                    correctAnswer: question.correctAnswer,
                });
                await newQuestion.save();
                updatedQuiz.questions.push(newQuestion._id);
                await updatedQuiz.save();
            }
        }
        res.status(200).json({ message: "Quiz updated successfully", updatedQuiz });
    } catch(error) {
        res.status(500).send({message: error})
    }
        
})

app.delete('/api/quizzes/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id)
        res.status(204).send({ message:'Quiz Deleted successfully', quiz })
    } catch (error) {
        res.status(500).send({message: error})
    }
})

app.get("/api/question", (req, res) => {
    res.send("This is the question route");
});