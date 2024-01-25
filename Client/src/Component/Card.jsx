import React, { useState } from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Card(props) {
    const navigate = useNavigate();
    const opentask = () => {
        navigate(`/updatepage/${props.itemid}`)
    }

    const [task, settask] = useState(props)
    const deletetask = async() => {
        const deleteddata = await axios.delete(`http://localhost:5000/delete/${props.itemid}`)
        settask(null)
    }
    if (task == null) {
        return null
    }
    

    return (
        <motion.div drag whileDrag={{ scale: 1.1 }} dragConstraints={props.reference}  className=' relative w-[250px] mx-auto h-[300px] gap-5 p-5 bg-zinc-200 rounded-2xl overflow-hidden'>
            <div onClick={opentask} className=' h-[75%]  overflow-hidden  '>
            <FaRegFileAlt />
            <h1 className='text-lg mt-3 tracking-tighter font-semibold'>{task.title}</h1>
                <p  className='text-sm  mt-3 tracking-tighter font-normal'>{task.discription}</p>
            </div>    
            <div className='Footer absolute left-0 -bottom-1   w-full   '>
                <div className='  flex justify-between px-5 items-center' >
                    <h5 className='font-semibold  text-sm '>.4 mb</h5>
                    <button onClick={deletetask} className='bg-black text-white p-1  rounded-full'>
                        <MdDelete />
                    </button>
                </div>
                <div className=' Download mt-4  w-full   left-0 flex items-center justify-center p-2   text-white  bg-green-500' >
                    <h5 className='text-sm '>Download Now</h5>
                </div>
            </div>
        </motion.div>
    )
}

export default Card