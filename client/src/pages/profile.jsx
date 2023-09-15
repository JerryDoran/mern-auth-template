import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { storage } from '../firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

export default function ProfilePage() {
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload();
    }
  }, [image]);

  async function handleFileUpload() {
    setUploadError(false);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, `images/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  }
  return (
    <div className='pt-10 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      <form className='flex flex-col gap-4 p-7'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          alt='profile picture'
          className='h-20 w-20 rounded-full self-center cursor-pointer object-cover'
          onClick={() => fileRef.current.click()}
        />
        <p className='text-sm self-center'>
          {uploadError ? (
            <span className='text-red-600'>Error uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-600'>{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-600'>Image upload successful</span>
          ) : (
            ''
          )}
        </p>
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
