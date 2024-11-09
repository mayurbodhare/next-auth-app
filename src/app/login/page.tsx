'use client';

import React, { useEffect } from 'react';
import axios from 'axios'; 
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage(){
  const router = useRouter();
  const [user, setUser] = React.useState({
    email : "",
    password : ""
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

const onLogin = async () => {
  try {
    setLoading(true);
    const response = await axios.post("/api/users/login", user);
    console.log("Login Success", response.data);
    router.push('/profile');

  } catch (error: any) {
    console.log("Login Failed: " + error.message);
    toast.error(error.message);
  }
}

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id="email"
      type="email"
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder="email"
      />

      <label htmlFor="password">Password</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id="password"
      type="password"
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder="password"
      />

      <button className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled ? "text-gray-400" : "text-white" }`}
      disabled={buttonDisabled}
      onClick={onLogin}
      >{buttonDisabled ? "No Login" : "LogIn"}</button>

      <Link href="/signup">Visit SignUp Page</Link>


    </div>
  )
}