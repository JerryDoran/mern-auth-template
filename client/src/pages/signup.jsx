import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  function handleInputChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setIsLoading(false);

      if (data.success === false) {
        setError(true);
        return;
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-10'>Sign Up</h1>
      <form onSubmit={handleFormSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleInputChange}
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          onChange={handleInputChange}
        />
        <button
          disabled={isLoading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase transition duration-250 hover:opacity-95 disabled:opacity-80'
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-500 underline'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error && 'Oops something went wrong!'}
      </p>
    </div>
  );
}
