import { CreateBlogInput } from "@ash7007/medium-common";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../config";

const AddBlog = () => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState<CreateBlogInput>({
    title: "",
    content: "",
  });
  const publishVlog = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/blogs/blog`,
        {
          ...formData,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.msg);
      }
    } catch (e: any) {
      // toast.error(e.response.data.msg);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="py-5 px-4 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold py-4">Publish your blog</h1>
      </div>
      <div>
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Title
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          placeholder="Title"
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          required
        />
      </div>
      <div className=" py-2 rounded-t-lg dark:bg-gray-800">
        <label htmlFor="comment">Tell me your story...</label>
        <textarea
          onChange={(e) =>
            setFormData({
              ...formData,
              content: e.target.value,
            })
          }
          placeholder="Tell me your story"
          id="comment"
          rows={10}
          className="border border-slate-300 w-full p-2 text-sm text-gray-900 bg-white dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
        ></textarea>
      </div>
      <div>
        <button
          className="shadow bg-black w-full focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded-md"
          type="button"
          onClick={publishVlog}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default AddBlog;
