import { SigninInput } from "@ash7007/medium-common";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import Button from "./Button";
import LabelledInput from "./LabelledInput";

const Signin = () => {
  const [formData, setFormData] = useState<SigninInput>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signin`, formData);
      if (response.status === 200) {
        navigate("/blogs");
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
      }
    } catch (error : any) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="max-w-xl mx-auto  w-[60%]">
      <div className="text-center">
        <h1 className="font-extrabold text-3xl mb-3">
          Login into your account
        </h1>
        <p className="text-gray-400 text-sm">
          Don't have an account ?{" "}
          <Link to="/signup">
            <span className="underline">Signup</span>
          </Link>
        </p>
      </div>
      <div>
        <LabelledInput
          type="email"
          label="Email"
          placeholder="Enter your email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div className="mt-3">
        <LabelledInput
          type="password"
          label="Password"
          placeholder="Enter your password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
      </div>
      <div>
        <Button title="Signin" onClick={signIn} />
      </div>
    </div>
  );
};

export default Signin;
