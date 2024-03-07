import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id : number
}

const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,  
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
    <div className="py-4 border-b border-gray-300 px-4">
      <div className="flex items-center gap-2">
        <div>
          <img
            className="h-[25px] rounded-full"
            src={`https://api.dicebear.com/5.x/initials/svg?seed=${authorName}`}
            alt="avatar"
          />
        </div>
        <div> {authorName} </div>
        <div className="h-1 w-1 bg-black rounded-full"></div>
        <div className="text-gray-500">{publishedDate}</div>
      </div>
      <div className="font-bold text-xl">{title}</div>
      <div className="text-gray-500">{content.slice(0, 100) + "..."}</div>
      <div>{`${Math.ceil(content.length / 100)} minutes read`}</div>
    </div>
    </Link>
  );
};

export default BlogCard;
