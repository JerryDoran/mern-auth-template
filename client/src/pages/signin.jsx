import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function SignInPage() {
  const navigate = useNavigate();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });

  const [error, setError] = useState(false);

  async function onSubmit(data) {
    try {
      setError(false);
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const userData = await res.json();

      if (userData.success === false) {
        setError(true);
        reset();
        return;
      }
      reset();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-10'>Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='bg-slate-100 p-3 rounded-lg'
          {...register('email')}
        />
        {errors.email?.message && (
          <p className='text-sm text-red-400 -mt-2'>{errors.email.message}</p>
        )}
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='bg-slate-100 p-3 rounded-lg'
          {...register('password')}
        />
        {errors.password?.message && (
          <p className='text-sm text-red-400 -mt-2'>
            {errors.password.message}
          </p>
        )}
        <button
          disabled={isSubmitting}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase transition duration-250 hover:opacity-95 disabled:opacity-80'
        >
          {isSubmitting ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don&apos;t have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500 underline'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error && 'Oops something went wrong!'}
      </p>
    </div>
  );
}
