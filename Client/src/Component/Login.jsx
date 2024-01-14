import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {   useNavigate } from 'react-router-dom';
import axios from "axios"

function Login() {

    //    take input from form 
    const [email, setemail] = useState("")
    const emailhandler = (e) => {
        setemail(e.target.value);
    }

    const [password, setpassword] = useState("")
    const passwordhandler = (e) => {
        setpassword(e.target.value);
    }

   
        const navigate = useNavigate();
        const handleLogin = (e) => {
            e.preventDefault();
             axios.post("http://localhost:5000/login", {
                Email: email,
                Password: password
            })
            navigate("/foreground");   
        }
        

        
    



    return (
        <motion.div drag 
            dragConstraints={{
            top: -200,
            right: 100,
            bottom: -20,
            left: -600,
            }}
            className="  flex justify-center items-center  bg-white rounded-2xl overflow-hidden 
                       shadow-lg border-[1.5px]">
            <div className='w-1/2   p-10 border-r-2' >
            <span className="block w-full text-xl uppercase  mb-4 tracking-tighter font-semibold">Login</span>
            <form onSubmit={handleLogin} className="mb-4" method="post">
                <div className="mb-4 md:w-full">
                    <label for="email" className="block text-xs mb-1 tracking-tighter font-semibold">Username or Email</label>
                    <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Username or Email" onChange={emailhandler} />
                </div>
                <div className="mb-6 md:w-full">
                    <label for="password" className="block text-xs mb-1 tracking-tighter font-semibold">Password</label>
                    <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" onChange={passwordhandler} placeholder="Password" />
                </div>
                <button
                    type="submit"
                        className="bg-black hover:bg-gray-300 text-white hover:text-black uppercase text-sm px-4 py-2 rounded tracking-tighter font-semibold"
                >
                    Login
                </button>
            </form>
            <a className="text-black hover:underline text-center text-sm tracking-tighter font-semibold" href="/login">Forgot password?</a>
            </div>
            <div className='w-1/2 p-16 flex justify-center items-center' >
                <h1 className='text-[9vw] text-black  font-semibold leading-tight  tracking-tighter'>Docs.</h1>
            </div>
        </motion.div>


    )
}

export default Login
