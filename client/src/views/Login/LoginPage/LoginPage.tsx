import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import RegisterForm from '../RegisterForm/RegisterForm';

function LoginPage() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'fitzgeraldkd'
      })
    }
    fetch('/api/login', options)
      .then(resp => resp.json())
      .then(data => console.log(data))

  }
  return (
    <div>
      {searchParams.get('new_user') === 'true' ? <RegisterForm /> : <LoginForm />}
    </div>
  );
}

export default LoginPage;
