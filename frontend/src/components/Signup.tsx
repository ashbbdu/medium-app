import { SignupInput } from '@ash7007/medium-common'
import axios from 'axios'
import {useState}  from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config'
import Button from './Button'
import LabelledInput from './LabelledInput'

const Signup = () => {
  const [formData , setFormData] = useState<SignupInput>({
    name : "",
    password : "",
    email : ""
  })
  const navigate = useNavigate()
  const signUp = async () => {
   try {
    const response = await axios.post(`${BACKEND_URL}/user/signup` , formData)
    console.log(response , "response");
    if(response.data.success) {
        navigate("/");
        localStorage.setItem("token" , response.data.token)
        toast.success(response.data.msg);
    } 
   } catch (error: any) {
    toast.error(error.response.data.msg);
  }
}
  return (
    <div className="max-w-xl mx-auto  w-[60%]">
   <div className='text-center'>
   <h1 className='font-extrabold text-3xl mb-3'>Create an account</h1>
    <p className='text-gray-400 text-sm'>
      Already have an account ? <Link to="/"><span className='underline'>Signin</span></Link>
    </p>
   </div>
    <div>
      <LabelledInput type="email" label="Email" placeholder="Enter your email" onChange={(e) => setFormData({...formData , email : e.target.value})} />
    </div>
   
    <div className="mt-3">
      <LabelledInput type="password" label="Password" placeholder="Enter your password" onChange={(e) => setFormData({...formData , password : e.target.value})} />
    </div>
    <div>
      <LabelledInput type="text" label="Name" placeholder="Enter your name" onChange={(e) => setFormData({...formData , name : e.target.value})} />
    </div>
    <div>
    <Button title="Signup" onClick={signUp} />
    </div>
  </div>
  )
}

export default Signup