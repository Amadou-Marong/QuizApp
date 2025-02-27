import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";

const QuizzesPage = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);

    // const BASE_URL = 'http://localhost:5000/api';
    // const BASE_URL = 'https://quizapp-7zaq.onrender.com/api';
    const BASE_URL = import.meta.env.VITE_API_BASE_URL ||  "http://localhost:5000/api"; // Automatically picks the right one
    console.log(BASE_URL);
    useEffect(() => {
        const fetchQuizzes = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${BASE_URL}/quizzes`);
                setQuizzes(res.data);
                console.log(res.data);
                
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            } finally{
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
            <Link key={quiz._id} to={`/quizzes/${quiz._id}`} >
                <QuizCard quiz={quiz} />
            </Link>
        ))}
    </div>
  )
}

export default QuizzesPage