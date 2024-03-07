import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blogs {
    content: string
    id: number,
    title: string,
    author: {
        name: string
    }
}
export const useBlogs = () => {
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false)
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    const getBlogs = async () => {
        setLoading(true)
        const response = await axios.get(`${BACKEND_URL}/blogs/blog`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        setLoading(false)
        setBlogs(response.data.blogs)
    }

    useEffect(() => {
        getBlogs();
    }, [])

    return {
        loading,
        blogs
    }
}

export const useBlogsById = (id : number) => {
    
    const token = localStorage.getItem("token");
    const [loading , setLoading] = useState(false)
    const [blog , setBlog] = useState<Blogs>();

    const getBlog = async () => {
        setLoading(true)
        const response = await axios.get(`${BACKEND_URL}/blogs/blog/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        setLoading(false)
        setBlog(response.data.blog)
        console.log(response.data.blog , "data");
    }

    useEffect(() => {
        getBlog();
    }, [])

    return {
        loading,
        blog
    }
}