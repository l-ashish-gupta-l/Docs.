import React, { useEffect, useRef, useState } from 'react'
import Card from './Card'
import axios from 'axios'
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

    return (<>
        <div ref={ref} className='fixed z-10 top-0 p-10  left-0 w-full h-screen bg-transparent  flex gap-10 '>
        <div className='absolute px-20 right-0 text-lg' >
                <h1 className='text-black font-normal'>Hello, <span className='font-semibold '>{userData && userData.Username}</span> </h1>
            </div>
        <div className='w-full h-full absolute flex p-5 left-0 top-0  items-end'>    
            <Card reference={ref} />
            </div>
        </div>
    </>
    )
}

export default ForeGround