import { ArrowBigLeft, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const UpdateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "", options: ["", "", "", ""], correctAnswer: 0 }]);
  
  const BASE_URL = "http://localhost:5000/api";

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



  return (
    <div className="p-8">
            <Link to="/manage-quizzes" className="text-gray-500 absolute top-2 left-20 left-60">
              <ArrowLeft />
            </Link>
            <h1 className="text-2xl font-bold mb-6">Update Quiz</h1>
            <form onSubmit={() => {}} className="space-y-4">
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
                                    // onChange={(e) =>
                                    //     handleChangeQuestion(index, "options", [
                                    //         ...question.options.slice(0, optionIndex),
                                    //         e.target.value,
                                    //         ...question.options.slice(optionIndex + 1),
                                    //     ])
                                    // }
                                    className="border border-gray-300 outline-gray-200 rounded p-2 w-full"
                                    required
                                />
                            </div>
                        ))}
                        <label className="block font-medium">Correct Answer (0-3):</label>
                        <input
                            type="number"
                            // value={question.correctAnswer}
                            // onChange={(e) =>
                            //     handleChangeQuestion(index, "correctAnswer", parseInt(e.target.value, 10))
                            // }
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
                    onClick={() => {}}
                    className="bg-gray-700 text-white py-1 px-4 rounded cursor-pointer"
                >
                    Add Question
                </button>
                <button type="button" onClick={() => {}} className="bg-red-600 text-white py-1 px-4 rounded cursor-pointer">
                    Remove Question
                </button>
                <button type="submit" className="bg-blue-600 text-white py-1 px-4 rounded cursor-pointer">
                    Submit Quiz
                </button>
                </div>
            </form>
        </div>
  )
}

export default UpdateQuiz