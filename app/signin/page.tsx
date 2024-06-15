
"use client"
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignIn = () => {
  const router = useRouter();
  const [postInputs, setPostInputs] = useState<SignInInput>({
    email: '',
    password: '',
  });

  async function sendRequest() {
    try {
      const response = await axios.post('/api/signin', postInputs);
      const token = response.data.token;
      localStorage.setItem('token', token);
      router.push('/dashboard');
    } catch (e) {
      alert('Error while signing in!');
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col w-full  justify items-center">
      <div className="text-3xl font-bold flex justify-center">Sign In</div>
      <div className="text-gray-500 flex justify-center mt-1">
        Don't have an account? <a href="/signup" className="pl-1 underline">Sign Up</a>
      </div>
      <div className="flex justify-center">
        <LabelledInput label="Email" placeholder="Email..." onChange={(e) => {
          setPostInputs((c) => ({
            ...c,
            email: e.target.value,
          }));
        }} />
      </div>
      <div className="flex justify-center">
        <LabelledInput label="Password" type="password" placeholder="Password..." onChange={(e) => {
          setPostInputs((c) => ({
            ...c,
            password: e.target.value,
          }));
        }} />
      </div>
      <div className="flex justify-center pt-3">
        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-80">
          Sign In
        </button>
      </div>
    </div>
  );
};

interface SignInInput {
  email: string;
  password: string;
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabelledInput = ({ label, placeholder, onChange, type }: LabelledInputType) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-white pt-2">{label}</label>
      <input onChange={onChange} type={type || 'text'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5" placeholder={placeholder} required />
    </div>
  );
};

export default SignIn;
