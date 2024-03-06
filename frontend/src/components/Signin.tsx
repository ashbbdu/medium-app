import { SigninInput } from "@ash7007/medium-common";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import LabelledInput from "./LabelledInput";

const Signin = () => {
  const [formData , setFormData] = useState<SigninInput>({
    email : "",
    password : ""
  })
  return (
    <div className="max-w-xl mx-auto  w-[60%]">
      <div className='text-center'>
   <h1 className='font-extrabold text-3xl mb-3'>Login into your account</h1>
    <p className='text-gray-400 text-sm'>
      Don't have an account ? <Link to="/signup" onChange={() =>console.log("ash")
      }><span className='underline'>Signup</span></Link>
    </p>
   </div>
    <div>
      <LabelledInput type="email" label="Email" placeholder="Enter your email" onChange={(e) => setFormData({...formData , email : e.target.value})} />
    </div>
    <div className="mt-3">
      <LabelledInput type="password" label="Password" placeholder="Enter your password" onChange={(e) => setFormData({...formData , password : e.target.value})} />
    </div>
    <div>
      <Button title="Signin" onClick={() => console.log("ash")
      }/>
    </div>
  </div>
  );
};

export default Signin;
