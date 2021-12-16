import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      Create A New Account
        <label htmlFor='username'>Username</label>
        <input id='username' name='username' type='text' value={formData.username} onChange={handleChange} />
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' value={formData.email} onChange={handleChange} />
        <label htmlFor='password'>Password</label>
        <input id='password' name='password' type='password' value={formData.password} onChange={handleChange} />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input id='confirmPassword' name='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} />
        <input type='submit' />
    </form>
    <Link to='/login'>Have an account?</Link>
    </div>
  );
}

export default RegisterForm;
