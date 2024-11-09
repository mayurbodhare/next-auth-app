'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { use, useEffect, useState } from 'react'

export default function VerifyEmailPage() {

    // const router = useRouter();

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
            setError(false);
        } catch (error : any) {
            setError(true);
            console.log(error.message);
        }
    }

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

        // const {query} = router;
        // const urlToken = query.token;
        // setToken(urlToken);

    }, []);

    useEffect(() => {
        setError(false);
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
        <h1 className='text-4xl'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-white'>
            {
                token ? `${token}` : "No token found"
            }
        </h2>
        {
            verified && (
                <div>
                    <h2 className='text-2xl'>Email Verified</h2>
                    <p>Go to <Link href="/login">Login</Link></p>
                </div>
            )
        }
        {
            error && (
                <div>
                    <h2 className='text-2xl'>Error</h2>
                </div>
            )
        }
    </div>
  )
}

