import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Button from '../../../components/forms/Button/Button';
import Fieldset from '../../../components/forms/Fieldset/Fieldset';
import { authenticateUser } from '../../../store/authentication/authentication.slice';
import { UserCredentialsType } from '../../../utils/types/formData.types';
import { User, ValidResponse } from '../../../utils/types/record.types';
import LoginFormStyles from './LoginForm.styles';

function LoginForm() {
  const [formData, setFormData] = useState<UserCredentialsType>({
    username: '',
    password: ''
  });
  const [messages, setMessages] = useState<string[]>([]);
  const [disableForm, setDisableForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sideEffect = (success: boolean, payload: ValidResponse<User>) => {
      setDisableForm(false);
      success ? navigate('/') : setMessages(payload.messages);
    };
    setDisableForm(true);
    dispatch(authenticateUser({body: formData, sideEffect: sideEffect}));
  };

  return (
    <LoginFormStyles>
      <form onSubmit={handleSubmit}>
        <div className='page-subheader'>Log In</div>
        <Fieldset disabled={disableForm}>
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
