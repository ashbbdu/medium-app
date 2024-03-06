
import { Route, Routes } from "react-router-dom"
import Blog from "./pages/Blog"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import Auth from "./layout/Auth"

function App() {

  return (
    <div>
    <Routes>
      <Route path="/"  element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
    </div>
  )
}

export default App
