import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDialog } from '../components/popups/DialogContext';
import Loading from '../components/popups/Loading';
import { useLanguage } from '../context/LangaugeContext';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUser } = useAuth();
  const navigate = useNavigate();
  const { location } = useAuth();
  const { openDialog } = useDialog();
  const { isKannada } = useLanguage();

  const login = async (e) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3005/api/login', { email, password });
      setUser(response.data.user);
      setLoading(false);
      setIsAuthenticated(true);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (error) {
      setLoading(false);
      openDialog(
        isKannada ? 'ಅಮಾನ್ಯ ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್ವರ್ಡ್' : 'Invalid email or password',
        isKannada ? 'ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.' : 'Please check the details and try again.',
        true
      );
      console.error('Login failed', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="container-fluid p-3 p-md-5">
      <div className="container card shadow">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src="./images/aboutus/smwaus_1.jpg" alt="logo" className="w-100" />
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <h2>{isKannada ? 'ಲಾಗಿನ್ ಮಾಡಿ' : 'Login'}</h2>
              <div className="form-group mt-3">
                <label htmlFor="" className="form-label">{isKannada ? 'ಇಮೇಲ್ ವಿಳಾಸ' : 'Email Address'}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isKannada ? 'ಇಮೇಲ್' : 'Email'}
                  className='form-control'
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="" className="form-label">{isKannada ? 'ಪಾಸ್ವರ್ಡ್' : 'Password'}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isKannada ? 'ಪಾಸ್ವರ್ಡ್' : 'Password'}
                  required
                  className='form-control'
                />
              </div>
              <button type="submit" className='blue-btn mt-3 w-100 btn-lg'>{isKannada ? 'ಲಾಗಿನ್' : 'Login'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
