import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Quiz() {
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const { id } = useParams();  // Get quiz ID from URL

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await axios.get(`/api/quiz/${id}`);
                setQuiz(res.data);
            } catch (error) {
                console.error('Error fetching quiz:', error);
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
        try {
            const res = await axios.post(`/api/quiz/${id}/submit`, { answers });
            setScore(res.data.score);
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    };

    if (!quiz) return <div>Loading...</div>;

    return (
        <div>
            <h1>{quiz.title}</h1>
            {quiz.questions.map((question) => (
                <div key={question._id}>
                    <p>{question.questionText}</p>
                    {question.options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                name={question._id}
                                value={index}
                                onChange={() => handleChange(question._id, index)}
                            />
                            {option}
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Submit</button>
            {score !== null && <div>Your score is: {score}</div>}
        </div>
    );
}

export default Quiz;
