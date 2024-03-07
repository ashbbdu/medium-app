import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks/useBlogs";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  console.log(blogs);

  if (loading) {
    return <div>loading...</div>;
  }

  return (

      <div className="max-w-xl mx-auto">
        {blogs.map((res) => {
          return (
          
            <BlogCard
              key={res.id}
              id={res.id}
              authorName={res.author.name || "Anonymous"}
              title={res.title}
              content={res.content}
              publishedDate="22/01/1006"
            />

          );
        })}
      </div>
  );
};

export default Blogs;
