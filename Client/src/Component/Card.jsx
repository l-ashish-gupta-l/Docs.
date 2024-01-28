import React, { useState } from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaFileImage, FaFileAudio, FaFileVideo, FaFile } from 'react-icons/fa';
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

    const getFileTypeIcon = () => {
        if (props.fileType) {

            const fileType = props.fileType;

            if (fileType.startsWith('image')) {
                return <FaFileImage />;
            } else if (fileType.startsWith('audio')) {
                return <FaFileAudio />;
            } else if (fileType.startsWith('video')) {
                return <FaFileVideo />;
            } else {
                return <FaFile />;
            }
        }

        return null;
    };


    

    return (
        <motion.div drag whileDrag={{ scale: 1.1 }} dragConstraints={props.reference}  className=' relative w-[250px] mx-auto h-[250px] gap-5 p-5 bg-zinc-200 rounded-2xl overflow-hidden'>
            <div onClick={opentask} className=' h-[60%]  overflow-hidden  '>
                {getFileTypeIcon()}
            <h1 className='text-lg mt-3 tracking-tighter font-semibold'>{task.title}</h1>
                <p  className='text-sm  mt-3 tracking-tighter font-normal'>{task.discription}</p>
                </div>    
         
            <div className='Footer absolute left-0 bottom-0 bg-slate-600 p-2   w-full   '>
                <div className='  flex justify-between px-3 gap-5 items-center ' >
                    {props.fileName && (
                        <button className={`flex overflow-hidden  justify-center items-center bg-slate-500  text-[.55rem] text-white rounded-full py-2 px-3 gap-2`}>
                            {getFileTypeIcon()}
                            <span >{props.fileName}</span>
                        </button>
                    )}
                    <button onClick={deletetask} className='bg-black text-white p-2  rounded-full'>
                        <MdDelete />
                    </button>
                </div>
                {/* <button  className=' Download mt-4  w-full h-10   left-0 flex items-center justify-center p-2   text-white  bg-green-500' >
                    <h5 className='text-sm '>Download Now</h5>
                </button> */}
            </div>
        </motion.div>
    )
}

export default Card