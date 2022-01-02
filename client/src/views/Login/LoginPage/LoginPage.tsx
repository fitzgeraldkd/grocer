import React from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginPageStyles from './LoginPage.styles';

function LoginPage() {
  const [searchParams] = useSearchParams();

  return (
    <LoginPageStyles>
      {searchParams.get('new_user') === 'true' ? <RegisterForm /> : <LoginForm />}
    </LoginPageStyles>
  );
}

export default LoginPage;
