import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../../../store/authentication/authentication.slice';
import { UserCredentialsType } from '../../../utils/types/formData.types';
import { User, ValidResponse } from '../../../utils/types/record.types';
import { useNavigate } from "react-router-dom";
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import LoginFormStyles from './LoginForm.styles';
import Button from '../../../components/forms/Button/Button';

function LoginForm() {
  const [formData, setFormData] = useState<UserCredentialsType>({
    username: '',
    password: ''
  });
  const [messages, setMessages] = useState<string[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sideEffect = (success: boolean, payload: ValidResponse<User>) => {
      success ? navigate('/') : setMessages(payload.messages);
    };
    dispatch(authenticateUser({body: formData, sideEffect: sideEffect}));
  };

  return (
    <LoginFormStyles>
      <form onSubmit={handleSubmit}>
        <div className='page-subheader'>Log In</div>
        <Fieldset>
          <label htmlFor='username'>Username:</label>
          <input id='username' name='username' type='text' value={formData.username} onChange={handleChange} />
          <label htmlFor='password'>Password:</label>
          <input id='password' name='password' type='password' value={formData.password} onChange={handleChange} />
          <div className='button-container'>
            <Button type='submit'>Submit</Button>
            <Button onClick={(() => navigate('/?new_user=true'))}>Need an account?</Button>
          </div>
        </Fieldset>
      </form>
      {messages.map(message => <div key={message}>{message}</div>)}
    </LoginFormStyles>
  );
}

export default LoginForm;
