import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import AboutPage from './pages/About';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import ProfilePage from './pages/profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/sign-in' element={<SignInPage />} />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
