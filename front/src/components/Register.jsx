import  { useState } from 'react';
//import { Link } from 'react-router-dom';
 // Assuming you're using Axios for API calls
 import { login } from "../Redux/authSlice"; 
import { useDispatch } from "react-redux";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleLogin = async (credentials) => {
    try {
      await dispatch(login(credentials));
    } catch (error) {
      console.error("Login error:", error);
    }
  };



  return (
    <div className="login-body">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleLogin}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input type="email" placeholder="Email or Phone" id="email" name="email" value={credentials.email} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" value={credentials.password} onChange={handleChange} />

        <button type="submit">Log In</button>

        <div className="login-footer">
          <span>Dont have an account? </span>
          {/* <Link to="/signup">Register Here</Link> */}
        </div>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i> Google</div>
          <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
        </div>
      </form>
    </div>
  );
}

export default Login;
