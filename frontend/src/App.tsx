import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Auth from "./layout/Auth";
import Blogs from "./pages/Blogs";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster position="top-left" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
