import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../../../store/authentication/authentication.slice';
import { User, ValidResponse } from '../../../utils/types/record.types';
import Button from '../../../components/forms/Button/Button';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import RegisterFormStyles from './RegisterForm.styles';

function RegisterForm() {
  const [messages, setMessages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSubmit = {...formData, password_confirmation: formData.confirmPassword};
    const sideEffect = (success: boolean, payload: ValidResponse<User>) => {
      success ? navigate('/') : setMessages(payload.messages);
    };
    dispatch(registerUser({body: dataToSubmit, sideEffect: sideEffect}));
  };

  return (
    <RegisterFormStyles>
      <form onSubmit={handleSubmit}>
        <div className='page-subheader'>
          Create A New Account
        </div>
        <Fieldset>
          <label htmlFor='username'>Username:</label>
          <input id='username' name='username' type='text' value={formData.username} onChange={handleChange} />
          <label htmlFor='email'>Email:</label>
          <input id='email' name='email' type='email' value={formData.email} onChange={handleChange} />
          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' type='password' value={formData.password} onChange={handleChange} />
          <label htmlFor='confirmPassword'>Confirm:</label>
          <input id='confirmPassword' name='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} />
          <div className='button-container'>
            <Button type='submit'>Submit</Button>
            <Button onClick={(() => navigate('/'))}>Have an account?</Button>
          </div>
        </Fieldset>
      </form>
      {messages.map(message => <div key={message}>{message}</div>)}
    </RegisterFormStyles>
  );
}

export default RegisterForm;
