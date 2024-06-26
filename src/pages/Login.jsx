import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useDialog } from '../components/popups/DialogContext';
import Loading from '../components/popups/Loading';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const {location} = useAuth()
  const {openDialog} = useDialog()

  const login = async (e) => {
    e.preventDefault()
    setLoading(true)
    // try {
    //   const response = await axios.post('https://sporti-backend-2-o22y.onrender.com/api/login', { email, password });
    //   setUser(response.data.user);
    //   setLoading(false)
    //   console.log(location);
    //   setIsAuthenticated(true);
    //   localStorage.setItem('token', response.data.token);
    
    //   navigate('/');
      
    // } catch (error) {
    //     setLoading(false)
    //     openDialog('Invalid email or password', 'Please Check the details and try again.', true);
    //   console.error('Login failed', error);
    // }
    openDialog('Success', 'successfully completed Login', false);
    navigate('/');
  };

  if(loading){
    return <Loading/>
  }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await login(email, password);
   
//   };

  return (
   <div className="container-fluid p-3 p-md-5">
    <div className="container card shadow">
        <div className="row align-items-center">
            <div className="col-md-6">
            <img src="./images/aboutus/smwaus_1.jpg" alt="logo" className="w-100" />
            </div>
            <div className="col-md-6">
            <form onSubmit={login}>
      <h2>Login</h2>
     <div className="form-group mt-3">
     <label htmlFor="" className="form-label">Email Address</label>
     <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className='form-control'
        required
      />
     </div>
     <div className="form-group mt-3">
        <label htmlFor="" className="form-label">Password</label>
     <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className='form-control'
      />
     </div>
      <button type="submit" className='blue-btn mt-3 w-100 btn-lg'>Login</button>
    </form>
            </div>
        </div>
    </div>
   </div>
  );
};

export default Login;
