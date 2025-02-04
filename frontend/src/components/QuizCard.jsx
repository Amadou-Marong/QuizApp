
// import image from "../assets/quiztime.jpg"

const QuizCard = ({quiz}) => {
  return (
    <div className="bg-white border-gray-200 border dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div>
        <img src={quiz.thumbnail} alt="quiz-image" className="w-full h-48 object-cover rounded-lg mb-4" />
        </div>
        <p className="text-gray-700 dark:text-gray-400 bg-gray-300 rounded-lg p-2">{quiz.title}</p>
    </div>
  )
}

export default QuizCard