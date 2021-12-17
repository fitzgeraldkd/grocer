import React from 'react';
import { useSearchParams } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

function LoginPage() {
  const [searchParams] = useSearchParams();

  return (
    <div>
      {searchParams.get('new_user') === 'true' ? <RegisterForm /> : <LoginForm />}
    </div>
  );
}

export default LoginPage;
