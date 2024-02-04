import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { IoIosAdd } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
axios.defaults.withCredentials = true;
function ForeGround() {
    const ref = useRef(null)
    const [userData, setUserData] = useState();
    const getUserData = async () => {
        try {
            const response = await axios.post("http://localhost:5000/userdata");
            setUserData(response.data);
        } catch (error) {
            toast('😒 Login First', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",

            })
            console.error("Error fetching user data:", error);
        }
    };
    const [workspace, setworkspace] = useState([])
    const getWorkspace = async () => {
        try {
            const workspace = await axios.get("http://localhost:5000/workspace");
            setworkspace(workspace.data);
        } catch (error) {
            toast('😒 Login First', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",

            })
        }
    }
    useEffect(() => {
        // console.log(workspace)
        getUserData();
        getWorkspace();
    }, []);

    const navigate = useNavigate();
    const toggleForm = () => {
        navigate('/addpage')
    };

    const logout = async () => {
        try {
            const response = await axios.get('http://localhost:5000/logout', {}, { withCredentials: true });
            // console.log(response);
            if (response) {
                navigate('/');
            } else {
                toast('😅 LOGOUT failed', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",

                })
            }
        } catch (error) {
            toast('😒 Error during logout', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",

            })

        }
    };
    return (<>
        <div className='absolute z-10 top-0 p-10  left-0 w-full h-screen bg-transparent  flex gap-10 '>
            <div className='absolute flex justify-between items-center w-full px-20 right-0 text-lg 
            ' >
                <h1 className='text-black font-normal'>Hello, <span className='font-semibold '>{userData && userData.Username}</span> </h1>
                <button onClick={logout} className='flex justify-center font-normal items-center gap-1'>
                    <span className='font-semibold '><u>Logout</u></span>
                    <FaArrowRight size={12} className='mt-1' /> </button>
            </div>
            <div ref={ref} className='w-full mt-[10vh] gap-5 bottom-0 absolute grid grid-cols-5  p-5 left-0 top-0 items-end'>
                {Array.isArray(workspace) &&
                    workspace.map((item, index) => (
                        <Card
                            title={item.title}
                            key={index}
                            discription={item.discription}
                            reference={ref}
                            itemid={item._id}
                            fileName={item.fileName}
                            fileType={item.fileType}
                            fileUrl={item.file}
                        />
                    ))}


            </div>
            <button onClick={toggleForm} className='fixed right-20  bottom-10 w-14 h-14 rounded-full border-2 border-white  flex justify-center items-center bg-black'>
                <IoIosAdd color='white' size={40} />
            </button>
        </div>
    </>
    )
}

export default ForeGround