import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Layout from "./layout/Layout";
import QuizPage from "./pages/QuizzesPage";
import SingleQuiz from "./pages/SingleQuiz";
import AddQuiz from "./pages/AddQuiz";
import ManageQuizzes from "./pages/ManageQuizzes";
// import SideBar from "./components/SideBar";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quizzes" element={<QuizPage />} />
          <Route path="/quizzes/:id" element={<SingleQuiz />} />
          <Route path="/manage-quizzes" element={<ManageQuizzes />} />
          <Route path='/add-quiz' element={<AddQuiz />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
