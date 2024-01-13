import React from 'react'

function Login() {
    return (
        <div className="w-full  absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2  z-10 bg-zinc-200 rounded-2xl overflow-hidden
                    shadow-lg p-8 m-4 md:max-w-sm md:mx-auto border-2 border-black">
            <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
            <form className="mb-4" action="/" method="post">
                <div className="mb-4 md:w-full">
                    <label for="email" className="block text-xs mb-1">Username or Email</label>
                    <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Username or Email" />
                </div>
                <div className="mb-6 md:w-full">
                    <label for="password" className="block text-xs mb-1">Password</label>
                    <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
                </div>
                <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Login</button>
            </form>
            <a className="text-blue-700 text-center text-sm" href="/login">Forgot password?</a>
        </div>


    )
}

export default Login
