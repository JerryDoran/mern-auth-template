import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='pt-10 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form className='flex flex-col gap-4 p-7'>
        <img
          src={currentUser.profilePicture}
          alt='profile picture'
          className='h-20 w-20 rounded-full self-center cursor-pointer object-cover'
        />
        <input
          type='text'
          id='username'
          placeholder='Username'
          defaultValue={currentUser.username}
          className='bg-slate-100 p-3 rounded-lg'
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          defaultValue={currentUser.email}
          className='bg-slate-100 p-3 rounded-lg'
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 p-3 rounded-lg'
        />
        <button className='bg-slate-700 text-white p-3 transition rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between max-w-lg px-7'>
        <span className='text-red-700 cursor-pointer transition p-2 rounded-lg hover:bg-slate-100'>
          Delete Account
        </span>
        <span className='text-red-700 cursor-pointer transition p-2 rounded-lg hover:bg-slate-100'>
          Sign Out
        </span>
      </div>
    </div>
  );
}
