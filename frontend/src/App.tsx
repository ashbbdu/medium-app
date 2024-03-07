import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Auth from "./layout/Auth";
import Blogs from "./pages/Blogs";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./PrivateRoutes";
import AddBlog from "./pages/AddBlog";

function App() {
  return (
    <div>
      <Toaster position="top-left" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/blog/:id" element={<PrivateRoutes>
          <Blog />
        </PrivateRoutes>} />
        <Route path="/blogs"  element={<PrivateRoutes>
          <Blogs />
        </PrivateRoutes>}  />
        <Route path="/create-blog" element={<PrivateRoutes>
            <AddBlog />
        </PrivateRoutes>} />
      </Routes>
    </div>
  );
}

export default App;
