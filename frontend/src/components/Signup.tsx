import { SignupInput } from '@ash7007/medium-common'
import {useState}  from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import LabelledInput from './LabelledInput'

const Signup = () => {
  const [formData , setFormData] = useState<SignupInput>({
    name : "",
    password : "",
    email : ""
  })
  return (
    <div className="max-w-xl mx-auto  w-[60%]">
   <div className='text-center'>
   <h1 className='font-extrabold text-3xl mb-3'>Create an account</h1>
    <p className='text-gray-400 text-sm'>
      Already have an account ? <Link to="/" onChange={() =>console.log("ash")
      }><span className='underline'>Signin</span></Link>
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
    <Button title="Signup" onClick={() => console.log("ash")} />
    </div>
  </div>
  )
}

export default Signup