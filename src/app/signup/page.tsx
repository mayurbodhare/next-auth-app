'use client';

import React, { useEffect } from 'react';
import axios from 'axios'; 
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUpPage(){
  const router = useRouter();
  const [user, setUser] = React.useState({
    username : "",
    email : "",
    password : ""
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

const onSignup = async () => {
  try {
    setLoading(true);
    const response = await axios.post("/api/users/signup", user);
    console.log("Signup Success", response.data);
    router.push('/login');

  } catch (error: any) {
    console.log("Signup Failed: " + error.message);
    toast.error(error.message);
  }
}

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />

      <label htmlFor="username">Username</label>
      <input className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      id="username"
      type="text"
      value={user.username}
      onChange={(e) => setUser({...user, username: e.target.value})}
      placeholder="username"
      />

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
      onClick={onSignup}
      >{buttonDisabled ? "No Signup" : "Sign Up"}</button>

      <Link href="/login">Visit Login Page</Link>


    </div>
  )
}