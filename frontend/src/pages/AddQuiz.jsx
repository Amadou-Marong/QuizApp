import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([{ questionText: "", options: ["", "", "", ""], correctAnswer: 0 }]);
    const navigate = useNavigate();
    // const BASE_URL = "http://localhost:5000/api";
    // const BASE_URL = "https://quizapp-7zaq.onrender.com/api";
    const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; // Automatically picks the right one

    const handleAddQuestion = () => {
        setQuestions([...questions, { questionText: "", options: ["", "", "", ""], correctAnswer: 0 }]);
    };

    const handleRemoveQuestion = () => {
        if (questions.length > 1) {
            setQuestions(questions.slice(0, -1));
        }
    };

    const handleChangeQuestion = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/quizzes`, { title, questions });
            console.log("Quiz added:", response.data);
            navigate("/manage-quizzes");
        } catch (error) {
            console.error("Error adding quiz:", error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Add Quiz</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Quiz Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 outline-gray-200 rounded p-2 w-full"
                        required
                    />
                </div>
                {questions.map((question, index) => (
                    <div key={index} className="border border-gray-300 p-4 rounded space-y-2 shadow bg-white">
                        <label className="block font-medium">Question {index + 1}:</label>
                        <input
                            type="text"
                            value={question.questionText}
                            onChange={(e) => handleChangeQuestion(index, "questionText", e.target.value)}
                            className="border border-gray-300 outline-gray-200 rounded p-2 w-full"
                            required
                        />
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="flex items-center space-x-2">
                                <label className="block py font-light">Option {optionIndex + 1}:</label>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) =>
                                        handleChangeQuestion(index, "options", [
                                            ...question.options.slice(0, optionIndex),
                                            e.target.value,
                                            ...question.options.slice(optionIndex + 1),
                                        ])
                                    }
                                    className="border border-gray-300 outline-gray-200 rounded p-2 w-full"
                                    required
                                />
                            </div>
                        ))}
                        <label className="block font-medium">Correct Answer (0-3):</label>
                        <input
                            type="number"
                            value={question.correctAnswer}
                            onChange={(e) =>
                                handleChangeQuestion(index, "correctAnswer", parseInt(e.target.value, 10))
                            }
                            className="border border-gray-300 outline-gray-200 rounded p-2 w-full"
                            min="0"
                            max="3"
                            required
                        />
                    </div>
                ))}
                <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="bg-gray-700 text-white py-1 px-4 rounded cursor-pointer"
                >
                    Add Question
                </button>
                <button type="button" onClick={handleRemoveQuestion} className="bg-red-600 text-white py-1 px-4 rounded cursor-pointer">
                    Remove Question
                </button>
                <button type="submit" className="bg-blue-600 text-white py-1 px-4 rounded cursor-pointer">
                    Submit Quiz
                </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuiz;
