import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleQuiz = () => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [error, setError] = useState(null);

    // const BASE_URL = "http://localhost:5000/api";
    // const BASE_URL = "https://quizapp-7zaq.onrender.com/api";

    const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Automatically picks the right one

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/quizzes/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error("Error fetching quiz:", error);
                setError("Failed to load quiz. Please try again later.");
            }
        };
        fetchQuiz();
    }, [id]);

    const handleChange = (questionId, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    };

    const handleSubmit = async () => {
        if (Object.keys(answers).length !== quiz.questions.length) {
            setError("Please answer all questions before submitting.");
            return;
        }

        const formattedAnswers = quiz.questions.map(
            (question) => answers[question._id]
        );

        try {
            const response = await axios.post(`${BASE_URL}/quizzes/${id}/submit`, {
                answers: formattedAnswers,
            });
            setScore(response.data.score);
            setError(null); // Clear previous errors
        } catch (error) {
            console.error("Error submitting answers:", error);
            setError("Failed to submit answers. Please try again.");
        }
    };

    return (
        <div className="py-8">
            {error && (
                <div className="bg-red-500 text-white p-2 mb-4 rounded">{error}</div>
            )}
            <h1 className="text-2xl font-bold text-center">{quiz?.title}</h1>
            {quiz?.questions.map((question, questionIndex) => (
                <div key={question._id} className="my-5 mb-4">
                    <p className="text-lg font-semibold">
                        <span className="text-lg font-semibold">
                            {questionIndex + 1}.
                        </span>{" "}
                        {question.questionText}
                    </p>
                    {question.options.map((option, index) => (
                        <div key={index} className="mx-4">
                            <input
                                className="mr-2 cursor-pointer"
                                type="radio"
                                name={question._id}
                                value={index}
                                checked={answers[question._id] === index}
                                onChange={() => handleChange(question._id, index)}
                            />
                            {option}
                        </div>
                    ))}
                </div>
            ))}
            <button
                className="cursor-pointer bg-gray-700 text-white py-1 px-4 rounded"
                onClick={handleSubmit}
            >
                Submit
            </button>
            {score !== null && (
                <div className="mt-4 text-lg">
                    <strong>Your score is: {score}</strong>
                </div>
            )}
        </div>
    );
};

export default SingleQuiz;
