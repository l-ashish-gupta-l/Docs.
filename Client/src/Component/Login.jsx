import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
function Login() {
    //overlay animation
    const [overlayscreen, setoverlayscreen] = useState("right-0");
    const overlay = () => {
        setoverlayscreen(prevState => {
            if (prevState === "right-0") {
                // console.log("value of flag ", 1);
                return "right-1/2";
            } else {
                // console.log("value of flag ", 0);
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

    let topLoader;
    //navigator
    const navigate = useNavigate();
    //register
    const handleregister = async (e) => {
        e.preventDefault();
        try {
            topLoader.continuousStart();
            const response = await axios.post("https://docs-server-roan.vercel.app/register", {
                Username: username,
                Email: email,
                Password: password,
            }, {
                withCredentials: true
            });
            topLoader.complete();
            navigate("/foreground");
        } catch (error) {
            topLoader.complete();
            if (error.response && error.response.status === 400) {
                toast(`😊 ${error.response.data.message}`,
                );
            } else {
                toast(`☹️ An unexpected error occurred during registration: ${error.message}`);
            }
        }
    };

    //login 
    const handlelogin = async (e) => {
        e.preventDefault();

        try {
            topLoader.continuousStart();
            const res = await axios.post("https://docs-server-roan.vercel.app/login", {
                Email: email,
                Password: password
            }, {
                withCredentials: true
            });
            // console.log(res.data);
            if (res.data) {
                topLoader.complete();
                navigate("/foreground");

            } else {
                topLoader.complete();
                toast('😒 Wrong password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    type: "error"
                })
            }

        } catch (error) {
            topLoader.complete();
            if (error.response && error.response.status === 404) {
                toast(" 😠 Unauthorized: Invalid email or password");
            } else {
                toast('😒 Wrong Password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",

                });
            }
        }
    };
    return (<>
        <LoadingBar
            color="#808080"
            ref={(ref) => (topLoader = ref)}
        />
        <div className="w-full  flex justify-center items-center">
            <div className="  md:w-[60%] relative md:flex  bg-white rounded-2xl shadow-2xl  ease-in-out transition-all  duration-1000 border-[1.5px]">
                {/* REGISTRATION FORM */}
                <div className="w-full md:w-1/2  py-16 px-8 md:px-16 border-r-2">
                    <span className="block w-full text-3xl  mb-2   tracking-tighter font-bold">Hi ! </span>
                    <span className="block w-full text-base  mb-8 tracking-tighter text-gray-700 font-medium">Create a new account </span>
                    <form onSubmit={handleregister} className="mb-4">
                        <div className="mb-4 md:w-full">
                            <label className="block text-xs mb-1 tracking-tighter font-semibold">Username</label>
                            <input className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={usernamehandler}

                                autoComplete="username" />

                        </div>
                        <div className="mb-4 md:w-full">
                            <label className="block text-xs mb-1 tracking-tighter font-semibold">Email</label>
                            <input
                                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={emailhandler}
                                autoComplete="email"
                            />
                        </div>
                        <div className="mb-6 md:w-full">
                            <label className="block text-xs mb-1 tracking-tighter font-semibold">Password</label>
                            <input
                                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={passwordhandler}
                                autoComplete="new-password"

                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-black hover:bg-gray-300 text-white hover:text-black uppercase text-sm px-4 py-2 rounded tracking-tighter font-semibold"
                        >
                            Register
                        </button>
                    </form>
                    <div className="flex flex-col">
                        {/* <a className="text-black hover:underline text-start text-sm tracking-tighter font-semibold" href="/login">
                            Forgot password?
                        </a> */}
                        <button
                            onClick={overlay}
                            className="bg-black mt-5 hover:bg-gray-300 text-white hover:text-black uppercase text-sm px-4 py-2 rounded tracking-tighter font-semibold"
                        >
                            Already have an Account ?
                        </button>
                    </div>
                </div>

                {/* LOGIN FORM */}
                <div className={`w-full md:w-1/2 h-full absolute  ease-in-out transition-all  duration-1000 bg-white md:right-0 p-8 md:p-16 border-r-2`}>
                    <span className="block w-full text-3xl  mb-2   tracking-tighter font-bold">Welcome !</span>
                    <span className="block w-full text-base  mb-8 tracking-tighter text-gray-700 font-medium">Login in to continue </span>
                    <form onSubmit={handlelogin} className="mb-4">
                        <div className="mb-4 md:w-full">
                            <label className="block text-xs mb-1 tracking-tighter font-semibold">Username or Email</label>
                            <input
                                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                type="email"
                                name="email"
                                placeholder="Username or Email"
                                onChange={emailhandler}
                                autoComplete="email"
                            />
                        </div>
                        <div className="mb-6 md:w-full">
                            <label className="block text-xs mb-1 tracking-tighter font-semibold">Password</label>
                            <input
                                className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={passwordhandler}
                                autoComplete="current-password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-black hover:bg-gray-300 text-white hover:text-black uppercase text-sm px-4 py-2 rounded tracking-tighter font-semibold"
                        >
                            Login
                        </button>
                    </form>
                    <div className="flex flex-col">
                        {/* <a className="text-black hover:underline text-start text-sm tracking-tighter font-semibold" href="/login">
                            Forgot password?
                        </a> */}
                        <button
                            onClick={overlay}
                            className="bg-black mt-5 hover:bg-gray-300 text-white hover:text-black uppercase text-sm p-2 rounded tracking-tighter font-semibold"
                        >
                            Don't have an account ?
                        </button>
                    </div>
                </div>

                {/* OVERLAY */}
                <div className={`md:w-1/2 hidden w-full md:flex md:h-full absolute z-50 top-0 ${overlayscreen}   ease-in-out transition-all  duration-1000  p-16  justify-center items-center bg-black`}  >
                    <h1 className='text-[9vw] text-white  font-semibold leading-tight  tracking-tighter'>Docs.</h1>
                </div>
            </div>
        </div>
    </>

    )
}

export default Login
