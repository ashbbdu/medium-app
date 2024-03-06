
import { Route, Routes } from "react-router-dom"
import Blog from "./pages/Blog"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

function App() {

  return (
    <div>
    <Routes>
      <Route path="/"  element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
    </div>
  )
}

export default App
