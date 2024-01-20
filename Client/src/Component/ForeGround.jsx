import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { IoIosAdd } from "react-icons/io";
import AddForm from './AddForm';
axios.defaults.withCredentials = true;
function ForeGround() {
    const ref = useRef(null)
    const [userData, setUserData] = useState();
    const getUserData = async (e) => {
        try {
            const response = await axios.post("http://localhost:5000/userdata");
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Handle the error (e.g., show an error message to the user)
        }
    };
    useEffect(() => {
        getUserData();
    }, []);

    const [visible, setVisible] = useState(false);

    const toggleForm = () => {
        setVisible((prevVisible) => !prevVisible);
    };

    return (<>
        <div ref={ref} className='absolute z-10 top-0 p-10  left-0 w-full h-screen bg-transparent  flex gap-10 '>
            <div className='absolute px-20 right-0 text-lg' >
                <h1 className='text-black font-normal'>Hello, <span className='font-semibold '>{userData && userData.Username}</span> </h1>
            </div>
            <div className='w-full h-full absolute flex p-5 left-0 top-0  items-end'>
                <Card reference={ref} />
            </div>
            <button onClick={toggleForm} className='absolute right-20  bottom-10 w-14 h-14 rounded-full shadow-inner border-2 flex justify-center items-center bg-black'>
                <IoIosAdd color='white' size={40} />
            </button>
            {visible && <AddForm visibility={visible} />}
        </div>
    </>
    )
}

export default ForeGround