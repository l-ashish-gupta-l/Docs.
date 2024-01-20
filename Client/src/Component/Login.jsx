import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Login() {


    //overlay animation
    const [overlayscreen, setoverlayscreen] = useState("right-0");
    const overlay = () => {
        console.log("btn clicked");
        setoverlayscreen(prevState => {
            if (prevState === "right-0") {
                console.log("value of flag ", 1);
                return "right-1/2";
            } else {
                console.log("value of flag ", 0);
                return "right-0";
            }
        });

    };

    //    take input from form 
    const [username, setusername] = useState("")
    const usernamehandler = (e) => {
        setusername(e.target.value);
    }
    const [email, setemail] = useState("")
    const emailhandler = (e) => {
        setemail(e.target.value);
    }

    const [password, setpassword] = useState("")
    const passwordhandler = (e) => {
        setpassword(e.target.value);
    }

    //navigator
    const navigate = useNavigate();
    //register
    const handleregister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/register", {
                Username: username,
                Email: email,
                Password: password,
            }, {
                withCredentials: true
            });

            console.log(response);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Registration error:', error.response.data.message);
            } else {
                console.error('An unexpected error occurred during registration:', error);
            }
        }
    };



    //login 
    const handlelogin = async (e) => {
        e.preventDefault();

        const res = await axios.post("http://localhost:5000/login", {
            Email: email,
            Password: password
        }, {
            withCredentials: true
        })
        console.log(res.data);
        if (res.data) {
            navigate("/foreground");
        }
        else {
            console.log("wrong password")
        }

    }




    return (
        <div
            className=" w-[60%] relative flex  bg-white rounded-2xl overflow-hidden 
                       shadow-2xl border-[1.5px]">
            {/* REGESTERATION FORM */}
            <div className='w-1/2 h-full py-16 px-20 border-r-2' >
                <span className="block w-full text-3xl  mb-2   tracking-tighter font-bold">Hi ! </span>
                <span className="block w-full text-base  mb-8 tracking-tighter text-gray-700 font-medium">Create a new account </span>
                <form onSubmit={handleregister} className="mb-4" method="POST">
                    <div className="mb-4 md:w-full">
                        <label className="block text-xs mb-1 tracking-tighter font-semibold">Username</label>
                        <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="username" name="username" id="Username" placeholder="Username" onChange={usernamehandler} />
                    </div>
                    <div className="mb-4 md:w-full">
                        <label className="block text-xs mb-1 tracking-tighter font-semibold"> Email</label>
                        <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="Rg_email" placeholder=" Email" onChange={emailhandler} />
                    </div>
                    <div className="mb-6 md:w-full">
                        <label className="block text-xs mb-1 tracking-tighter font-semibold">Password</label>
                        <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="Rg_password" onChange={passwordhandler} placeholder="Password" />
                    </div>
                    <button
                        type="submit"
                        className="bg-black hover:bg-gray-300 text-white hover:text-black uppercase text-sm px-4 py-2 rounded tracking-tighter font-semibold"
                    >
                        Register
                    </button>
                </form>
                <div className='flex flex-col'>
                    <a className="text-black hover:underline text-start text-sm tracking-tighter font-semibold" href="/login">Forgot password?</a>
                    <button onClick={overlay} className="bg-black mt-5 hover:bg-gray-300 text-white hover:text-black uppercase text-sm px-4 py-2 rounded tracking-tighter font-semibold" >Already have an Account ? </button>
                </div>
            </div>
            {/* LOGIN FORM  */}
            <div className='w-1/2 h-full absolute  bg-white  first-letter: z-10 right-0  p-16 border-r-2 ' >
                <span className="block w-full text-3xl  mb-2   tracking-tighter font-bold">Welcome !</span>
                <span className="block w-full text-base  mb-8 tracking-tighter text-gray-700 font-medium">Login in to continue </span>
                <form onSubmit={handlelogin} className="mb-4" method="post">
                    <div className="mb-4 md:w-full">
                        <label className="block text-xs mb-1 tracking-tighter font-semibold">Username or Email</label>
                        <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Username or Email" onChange={emailhandler} />
                    </div>
                    <div className="mb-6 md:w-full">
                        <label className="block text-xs mb-1 tracking-tighter font-semibold">Password</label>
                        <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" onChange={passwordhandler} placeholder="Password" />
                    </div>
                    <button
                        type="submit"
                        className="bg-black hover:bg-gray-300 text-white hover:text-black uppercase text-sm px-4 py-2 rounded tracking-tighter font-semibold"
                    >
                        Login
                    </button>
                </form>
                <div className='flex flex-col'>
                    <a className="text-black hover:underline text-start text-sm tracking-tighter font-semibold" href="/login">Forgot password?</a>
                    <button onClick={overlay} className="bg-black mt-5  hover:bg-gray-300 text-white hover:text-black uppercase text-sm  p-2 rounded tracking-tighter font-semibold" >Don't have an account ?</button>
                </div>
            </div>

            {/*  OVERLAY */}
            <div className={`w-1/2 h-full absolute z-50 top-0 ${overlayscreen} ease-in-out transition-all  duration-1000  p-16 flex justify-center items-center bg-black`}  >
                <h1 className='text-[9vw] text-white  font-semibold leading-tight  tracking-tighter'>Docs.</h1>
            </div>
        </div>


    )
}

export default Login
