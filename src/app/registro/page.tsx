'use client';

import { useState } from 'react';
import { League_Spartan } from 'next/font/google';
import Image from 'next/image';
import PrimaryButton from '@/components/PrimaryButton';
import { Eye, EyeOff, Google } from '@/lib/Svg';
import CheckWindowWidth from '@/hooks/useWindowWidth';
import { registerUserWithgoogle, registerUserWithPassAndEmail} from 'database/registerUser';
import { useRouter } from 'next/navigation';

const league = League_Spartan({ subsets: ['latin'] });

const Register = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const { screenSize } = CheckWindowWidth();
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    await registerUserWithPassAndEmail(email, password, username);
    router.push('/login');
  };

  const handleGoogleSignIn = async () => {
    try {
      await registerUserWithgoogle();
      setError(null);
      router.push('/login');
    } catch (error: any) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <main className="flex flex-col flex-grow relative md:justify-center">
      { 
        screenSize === 'sm' || screenSize === 'md'
          ? <div className='w-full h-full absolute top-0 left-0 opacity-20 -z-10'>
            <Image 
              src={'/img/mobileRegister.webp'} 
              alt='Register image' 
              fill={true} 
              className='object-cover'/>
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-transparent to-black/80'></div>
          </div>
          : <div className='absolute top-0 left-0 w-2/3 h-full opacity-50'>
            <Image src={'/img/desktopRegister.webp'}
              alt='Register image'
              fill={true}
              className='object-cover'/>
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 from-5% via-transparent to-100% to-[#0D0016]'></div>
          </div>
      }
      <form onSubmit={handleRegister} className='flex flex-col gap-8 px-12 py-8 md:px-32 lg:w-1/3 lg:absolute lg:right-0 lg:px-10 2xl:px-32'>
        <h1 className={`${league.className} font-extrabold text-center text-2xl lg:text-3xl`}>
          Registro
        </h1>
        <input
          type="text"
          autoComplete='off'
          placeholder="Escriba aquí su nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='bg-transparent border-b border-b-gray placeholder:text-gray placeholder:opacity-70'
          required
        />
        <input
          type="text"
          autoComplete='off'
          placeholder="Escriba aquí su correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-transparent border-b border-b-gray placeholder:text-gray placeholder:opacity-70'
          required
        />
        <div className='flex items-center relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder="Escriba aquí su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-transparent border-b border-b-gray placeholder:text-gray placeholder:opacity-70 w-full'
            required
          />
          <div
            className='absolute right-0 cursor-pointer w-4 h-4'
            onClick={togglePasswordVisibility}
          >
            {!showPassword ? <Eye /> : <EyeOff />}
          </div>
        </div>
        <div className='flex items-center relative'>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder="Repita la contraseña"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className='bg-transparent border-b border-b-gray placeholder:text-gray placeholder:opacity-70 w-full'
            required
          />
          <div
            className='absolute right-0 cursor-pointer w-4 h-4'
            onClick={toggleConfirmPasswordVisibility}
          >
            {!showConfirmPassword ? <Eye /> : <EyeOff />}
          </div>
        </div>
        <PrimaryButton text="Registro" img="" />
        { error && 
          <p className='text-error text-sm'>{error}</p>
        }
        <div className="flex items-center justify-center w-full gap-4">
          <div className="flex-grow border-t border-gray-400"></div>
          <span>o</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <button type="button" 
          onClick={handleGoogleSignIn}
          className='flex gap-2 items-center border-white border rounded-lg justify-center py-2 hover:text-black hover:bg-white'
        >
          <Google/>
          Google
        </button>
      </form>
    </main>
  );
};

export default Register;
