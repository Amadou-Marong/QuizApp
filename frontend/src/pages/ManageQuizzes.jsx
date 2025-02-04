
// import edit and delete icons from lucide react
import axios from "axios";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import { Link } from "react-router-dom";

const ManageQuizzes = () => {

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedQuizId, setSelectedQuizId] = useState(null);

    // const BASE_URL = 'http://localhost:5000/api';
    // const BASE_URL = 'https://quizapp-7zaq.onrender.com/api';

    const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; // Automatically picks the right one

    
    useEffect(() => {
        
        const fetchQuizzes = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${BASE_URL}/quizzes`);
                setQuizzes(res.data);
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

    const handleUpdateQuiz = (id) => {
        
    }

    const handleDeleteQuiz =  (id) => {
        setModalOpen(true)
        setSelectedQuizId(id);
    }

  return (
    <div className="bg-white rounded-md border border-gray-200 shadow-md p-4 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of questions</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {quizzes.map((quiz) => (
                        <tr key={quiz._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{quiz._id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{quiz.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{quiz.questions.length}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Link to={`${quiz._id}`}>
                                    <button className="text-blue-500 hover:text-blue-700 mr-2 cursor-pointer" onClick={() => {handleUpdateQuiz}}>
                                        <Edit size={20}/>
                                    </button>                               
                                </Link>
                                <button className="text-red-500 hover:text-red-700 cursor-pointer" onClick={() => {handleDeleteQuiz(quiz._id)}}><Trash size={20}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {modalOpen && <ConfirmModal quizzes={quizzes} setQuizzes={setQuizzes} setOpenModal={setModalOpen} selectedQuizId={selectedQuizId} />}
    </div>
  )
}

export default ManageQuizzes