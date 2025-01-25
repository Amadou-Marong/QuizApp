import axios from "axios";

const ConfirmModal = ({ setOpenModal, selectedQuizId }) => {
  const BASE_URL = "http://localhost:5000/api";

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/quizzes/${selectedQuizId}`);
      
      
      
      setOpenModal(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 w-1/3 rounded-lg min-w-[400px]">
        <h2 className="text-2xl font-semibold text-gray-800">
          Are you sure you want to delete this Quiz?
        </h2>
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded-lg mr-4 cursor-pointer"
              onClick={handleConfirmDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer"
              onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
