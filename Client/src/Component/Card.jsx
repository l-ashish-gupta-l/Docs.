import React from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { motion } from "framer-motion"
function Card({ reference }) {
    return (
        <motion.div drag whileDrag={{ scale: 1.1 }} dragConstraints={reference} className=' relative w-[20%] h-[40%]  p-5 bg-zinc-200 rounded-2xl overflow-hidden'>
            <FaRegFileAlt />
            <p className='text-sm mt-5 tracking-tighter font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nemo dolore minima.</p>
           
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