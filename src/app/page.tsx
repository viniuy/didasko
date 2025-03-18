'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import didaskoLogo from '@/assets/Didasko-logo.png';
import VantaBackground from '@/components/VantaBackground';

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleO365Login = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (err) {
      setError('Failed to sign in with Gmail');
    }
  };

  return (
    <div className='flex h-screen w-screen bg-gray-100'>
      {/* Left Side - Fixed 50% */}
      <div className='relative w-1/2 h-full flex items-center justify-center bg-transparent'>
        <VantaBackground />
        <div className='relative w-[600px] h-[400px] flex items-center justify-center'>
          <h2 className='text-3xl font-bold text-white-100'>
            <img
              src={didaskoLogo.src}
              alt='Didasko Logo'
              className='w-16 h-16 mb-4'
            />
            Welcome to Didasko!
          </h2>
        </div>
      </div>

      {/* Right Side - Fixed 50% */}
      <div className='w-1/2 h-full flex items-center justify-center'>
        <div className='relative w-[600px] h-[400px] overflow-hidden rounded-2xl shadow-lg bg-white'>
          {/* Animated Container */}
          <motion.div
            animate={{ x: isSignUp ? '-50%' : '0%' }}
            transition={{ type: 'spring', stiffness: 80 }}
            className='flex w-[200%] h-full'
          >
            {/* Sign In Panel */}
            <div className='w-1/2 flex flex-col justify-center items-center p-8'>
              <h2 className='text-2xl font-semibold mb-4 text-black'>
                Welcome to Didasko
              </h2>
              {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}
              <button
                className='flex items-center justify-center bg-[rgba(234,71,39,255)] text-white px-6 py-2 rounded-md w-full shadow-md hover:bg-opacity-90 transition'
                onClick={handleO365Login}
              >
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg'
                  alt='Microsoft Logo'
                  className='w-5 h-5 mr-2'
                />
                Sign in with Microsoft 365
              </button>
              <p className='mt-4 text-sm text-gray-800 font-semibold'>
                Sign in as super admin{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className='text-blue-500'
                >
                  Click me
                </button>
              </p>
            </div>

            {/* Super Admin Login Panel */}
            <div className='w-1/2 flex flex-col justify-center items-center p-8'>
              <h2 className='text-2xl font-semibold mb-4 text-black'>
                Super Admin Login
              </h2>
              <input
                type='email'
                placeholder='Email'
                className='w-full px-4 py-2 border rounded-md mb-2 text-black'
              />
              <input
                type='password'
                placeholder='Password'
                className='w-full px-4 py-2 border rounded-md mb-4 text-black'
              />
              <button className='bg-green-500 text-white px-6 py-2 rounded-md w-full'>
                Login
              </button>
              <p className='mt-4 text-sm text-gray-800 font-semibold'>
                Sign in using O365{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className='text-green-500'
                >
                  Login
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
