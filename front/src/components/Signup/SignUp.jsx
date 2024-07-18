
import './Signup.css'; // Assuming you save the styles in a separate CSS file
//import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
const SignUp = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure event target for name and value
    switch (name) { // Handle changes for different input fields
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8888/register', {
        name,
        email,
        password,
      });
console.log(response);
      alert('Registration successful:'); // Handle successful registration

      // Redirect to login page or handle other actions
      // ...

    } catch (error) {
      console.error('Registration error:', error.response.data); // Handle errors
      // ...
    }
  };
  return (
    <div className="login-body">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>SignUp Here</h3>

        <label htmlFor="username" >name</label>
        <input type="text" placeholder="enter your name " id="name" name="name" value={name} onChange={handleChange}/>
        <label htmlFor="username">Username</label>
        <input type="email" placeholder="Enter your email" id="email" name="email" value={email} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={handleChange} />

        <button onClick={handleSubmit}>Sign Up</button>
        <div className="login-footer">
        
        <span > have an account? </span>
        {/* <Link to="/login">Login Here</Link> */}
      </div>
        <div className="social">
          <div className="go"><i className="fab fa-google"></i> Google</div>
          <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
