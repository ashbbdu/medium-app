import { Link } from "react-router-dom"

const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
        <div>
            Medium
        </div>
        <div className="flex items-center justify-center gap-2">
       <Link to="/create-blog">
       <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-1.5 me-2">New</button>
       </Link>
            <img className="h-[30px] rounded-full"
            src={`https://api.dicebear.com/5.x/initials/svg?seed=ashish`}
            alt="avatar" />
        </div>
    </div>
  )
}

export default Appbar