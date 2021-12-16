import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../../store/authentication/authentication.slice';
import { UserCredentialsType } from '../../../utils/types/formData.types';

function LoginForm() {
  const [formData, setFormData] = useState<UserCredentialsType>({
    username: '',
    password: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     username: 'fitzgeraldkd'
    //   })
    // }
    // fetch('/api/login', options)
    //   .then(resp => resp.json())
    //   .then(data => console.log(data))
    console.log(formData);
    dispatch(authenticateUser(formData));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        Log In
        <label htmlFor='username'>Username</label>
        <input id='username' name='username' type='text' value={formData.username} onChange={handleChange} />
        <label htmlFor='password'>Password</label>
        <input id='password' name='password' type='password' value={formData.password} onChange={handleChange} />
        <input type='submit' />
      </form>
      <Link to='/login?new_user=true'>Need an account?</Link>
    </div>
  );
}

export default LoginForm;
