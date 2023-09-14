import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className='bg-slate-200'>
      <div className='flex items-center max-w-6xl mx-auto p-4'>
        <Link to='/'>
          <h1 className='font-bold'>Auth App</h1>
        </Link>

        <ul className='ml-auto flex gap-4'>
          <Link to='/'>
            <li>Home</li>
          </Link>

          <Link to='/about'>
            <li>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt='profile picture'
                className='h-8 rounded-full object-cover'
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
