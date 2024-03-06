import { Link } from "react-router-dom";
import Quote from "../components/Quote";

const Signin = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  h-screen">
      <div className="flex items-center justify-center">
        <div className="max-w-xl mx-auto  w-[60%]">
          <h1>Create an account</h1>
          <p>
            Already have an account <Link to="/signup">Signup</Link>
          </p>
          <div>
            <label>Email</label> <br />
            <input type="text" className="w-full px-2 py-2 rounded-md" />
          </div>
          <div className="mt-3">
            <label>Password</label>
            <br />
            <input type="password" className="w-full px-2 bg-white py-2 rounded-md" />
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <Quote />
      </div>
    </div>
  );
};

export default Signin;
