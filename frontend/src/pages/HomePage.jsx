import { useState } from "react";
import image from "../assets/image.webp"
import { BadgePlus, CircleHelp, Home, MenuIcon, XIcon } from "lucide-react"
import { Link } from "react-router-dom";


const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="bg-[#E6F7FB] min-h-screen">
      {/* Header */}
      <header className="p-6 bg-white border-b border-gray-200 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-[#14213D] tracking-wide">QUIZTIME</h1>
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#14213D] focus:outline-none cursor-pointer"
            >
              {isMenuOpen ? (
                <XIcon className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
          <nav
            className={`lg:flex space-x-6 text-[#14213D] font-medium ${
              isMenuOpen ? "block" : "hidden"
            } lg:block absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none p-6 lg:p-0`}
          >
            <Link
              to="/about"
              className="block lg:inline-block bg-white py-2 rounded-md px-2 hover:text-white hover:bg-gray-400 text-gray-700 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/quiz"
              className="block lg:inline-block bg-white py-2 rounded-md px-2 hover:text-white hover:bg-gray-400 text-gray-700 transition-colors duration-300"
            >
              Quiz
            </Link>
            <Link
              to="/contact"
              className="block lg:inline-block bg-white py-2 rounded-md px-2 hover:text-white hover:bg-gray-400 text-gray-700 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </nav>
          <Link to="/login" className="hidden lg:block border-2 border-gray-500 text-gray-500 px-5 py-2 rounded-md font-semibold hover:bg-sky-200 transition-colors duration-300">
            Login
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-10 space-y-16">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center lg:justify-between bg-white p-8 rounded-lg shadow-md">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-5xl font-bold text-[#14213D] leading-tight">
              Improve your mind
            </h2>
            <p className="text-lg text-gray-700 bg-green-200 p-4 rounded-bl-[2rem] rounded-tr-xl">
              Do you like quizzes and competitions? Find or create quizzes on any topic. Play, share, and study in one app.
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <img src={image} alt="Puzzle graphic" className="w-3/4" />
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-md shadow-lg text-center space-y-4">
            <div className="bg-[#FFDF91] p-4 rounded-full w-16 h-16 mx-auto">
              {/* <img src="/images/study-icon.svg" alt="Study icon" className="w-full" /> */}
              <Home className="w-full" />
            </div>
            <h4 className="text-xl font-bold text-[#14213D]">Study at home or on the go!</h4>
            <p className="text-gray-600">Access quizzes anytime, anywhere.</p>
            <button className="text-[#FCA311] font-semibold">Learn more →</button>
          </div>
          <div className="bg-white p-6 rounded-md shadow-lg text-center space-y-4">
            <div className="bg-[#BCE6FD] p-4 rounded-full w-16 h-16 mx-auto">
              {/* <img src="/images/quiz-icon.svg" alt="Quiz icon" className="w-full" /> */}
              <CircleHelp className="w-full" />
            </div>
            <h4 className="text-xl font-bold text-[#14213D]">Find and play quizzes on any topic!</h4>
            <p className="text-gray-600">Explore a variety of topics to test your knowledge.</p>
            <button className="text-[#FCA311] font-semibold">Learn more →</button>
          </div>
          <div className="bg-white p-6 rounded-md shadow-lg text-center space-y-4">
            <div className="bg-[#FFC9E3] p-4 rounded-full w-16 h-16 mx-auto">
              {/* <img src="/images/challenge-icon.svg" alt="Challenge icon" className="w-full" /> */}
              <BadgePlus className="w-full" />
            </div>
            <h4 className="text-xl font-bold text-[#14213D]">Challenge friends, family, or students!</h4>
            <p className="text-gray-600">Make learning fun with friendly competitions.</p>
            <button className="text-[#FCA311] font-semibold">Learn more →</button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage

