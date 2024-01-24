import React from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
function Card(props) {
    const navigate = useNavigate();
    const opentask = () => {
        console.log(props.itemid);
        navigate(`/updatepage/${props.itemid}`)
    }

    
    return (
        <motion.div drag whileDrag={{ scale: 1.1 }} dragConstraints={props.reference} onClick={opentask} className=' relative w-[250px] mx-auto h-[250px] p-5 bg-zinc-200 rounded-2xl overflow-hidden'>
            <FaRegFileAlt />
            <h1 className='text-lg mt-5 tracking-tighter font-semibold'>{props.title}</h1>
            <p className='text-sm mt-5 tracking-tighter font-normal'>{props.discription}</p>

            <div className='Footer absolute left-0 bottom-0  w-full   '>
                <div className='  flex justify-between px-5 items-center' >
                    <h5 className='font-semibold  text-sm '>.4 mb</h5>
                    <span className='bg-black text-white p-1  rounded-full'>
                        <MdDownload />
                    </span>
                </div>
                <div className=' Download mt-4  w-full   left-0 flex items-center justify-center p-2   text-white  bg-green-500' >
                    <h5 className='text-sm '>Download Now</h5>
                </div>
            </div>
        </motion.div>
    )
}

export default Card