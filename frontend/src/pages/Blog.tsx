import { useParams } from "react-router-dom"
import Appbar from "../components/Appbar";
import { useBlogsById } from "../hooks/useBlogs";


const Blog = () => {
  const { id } = useParams();
  const {loading , blog } = useBlogsById(Number(id));
  
  if(loading) {
    return <div>
      loading...
    </div>
  }
  
  return (  

    <div className="grid grid-cols-1 md:grid-cols-12 gap-2 max-w-7xl px-4 m-auto py-8">
      <div className="col-span-9">
      <div className="font-bold text-5xl">
        {blog?.title}
      </div>
      <div  className="text-gray-500 my-1">
        Posted on August 24, 2023
      </div>
      <div className="text-gray-500 my-1">
        {blog?.content}
      </div>
      </div>
      <div className="col-span-3">
        <div className="font-bold text-xl">Author</div>
        <div className="flex items-center gap-2 mt-2">
        
          <img
            className="h-[30px] rounded-full"
            src={`https://api.dicebear.com/5.x/initials/svg?seed=ashish`}
            alt="avatar"
          />
          <div>
            <h1 className="font-bold text-xl">{blog?.author.name || "Anonymous"} </h1>
            <p className="text-gray-500">
            Survey indicates that the future developers must know full stack Developement
            </p>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Blog