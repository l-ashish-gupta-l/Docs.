import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { IoIosAdd } from "react-icons/io";
import AddForm from './AddForm';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;
function ForeGround() {
    const ref = useRef(null)
    const [userData, setUserData] = useState();
    const getUserData = async () => {
        try {
            const response = await axios.post("http://localhost:5000/userdata");
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle the error (e.g., show an error message to the user)
        }
    };
    const [workspace, setworkspace] = useState([])
    const getWorkspace = async () => {
        try {
            const workspace = await axios.get("http://localhost:5000/workspace");
            setworkspace(workspace.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle the error (e.g., show an error message to the user)
        }
    }
    useEffect(() => {
        getUserData();
        getWorkspace();
    }, []);
 console.log(workspace)
    

    const navigate = useNavigate();
    const toggleForm = () => {
        navigate('/addpage')
    };

    return (<>
        <div  className='absolute z-10 top-0 p-10  left-0 w-full h-screen bg-transparent  flex gap-10 '>
            <div className='absolute px-20 right-0 text-lg' >
                <h1 className='text-black font-normal'>Hello, <span className='font-semibold '>{userData && userData.Username}</span> </h1>
            </div>
            <div ref={ref} className='w-full mt-[10vh] bottom-0 absolute grid grid-cols-4 gap-4 p-5 left-0 top-0 items-end'>
                {workspace.map((item, index) => {
                    return <Card title={item.title}
                        key={index}
                        discription={item.discription} reference={ref} />
                })}

            </div>
            <button onClick={toggleForm} className='fixed right-20  bottom-10 w-14 h-14 rounded-full border-2 border-white  flex justify-center items-center bg-black'>
                <IoIosAdd color='white' size={40} />
            </button>
        </div>
    </>
    )
}

export default ForeGround