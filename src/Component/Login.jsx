import React from 'react'
import { motion } from 'framer-motion'

function Login(reference) {
    return (
        <motion.div drag whileDrag={{ scale: 1.1 }} dragConstraints={{
            top: -200,
            right: 100,
            bottom: -20,
            left: -600,
        }} className="w-full  absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  z-50  bg-white rounded-2xl overflow-hidden border-[1.5px] border-black
                    shadow-lg p-8 m-4 md:max-w-sm md:mx-auto ">
            <span className="block w-full text-xl uppercase  mb-4 tracking-tighter font-semibold">Login</span>
            <form className="mb-4" action="/" method="post">
                <div className="mb-4 md:w-full">
                    <label for="email" className="block text-xs mb-1 tracking-tighter font-semibold">Username or Email</label>
                    <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Username or Email" />
                </div>
                <div className="mb-6 md:w-full">
                    <label for="password" className="block text-xs mb-1 tracking-tighter font-semibold">Password</label>
                    <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm  px-4 py-2 rounded tracking-tighter font-semibold">Login</button>
            </form>
            <a className="text-blue-700 text-center text-sm tracking-tighter font-semibold" href="/login">Forgot password?</a>
        </motion.div>


    )
}

export default Login
