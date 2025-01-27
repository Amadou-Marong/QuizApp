import { useEffect } from "react"

const LoginPage = () => {
    // focus on email field
    useEffect(() => {
        document.getElementById("email").focus();
    }, []);
  return (
    <div className="p-4">
      <div className="flex items-center justify-center min-h-screen w-full ">
        <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:bg-sky-100 focus:border-sky-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:bg-sky-100 focus:border-sky-500" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Login 
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default LoginPage