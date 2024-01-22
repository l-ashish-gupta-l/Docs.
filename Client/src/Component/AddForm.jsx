import React, { useRef, useState } from 'react'
import { MdOutlineOpenInFull } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineAttachment } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function AddForm() {

    const [Title, setTitle] = useState("")
    const titlehandler = (e) => {
        setTitle(e.target.value);

    }
    const [Discription, setDiscription] = useState("")
    const discriptionhandler = (e) => {
        setDiscription(e.target.value);

    }
    const navigate = useNavigate();
    const FormAdded = async (e) => {
        e.preventDefault();
        console.log(Title, Discription);
        const form = await axios.post("http://localhost:5000/taskcreated", {
            Title: Title,
            Discription: Discription,
        })
        navigate('/foreground')
    }

    const [full, setfull] = useState("w-[40%] h-[88%]")
    const fullscreen = () => {
        if (full == "w-[40%] h-[88%]") {
            setfull("w-[100%] h-[100%]")
        } else {
            setfull("w-[40%] h-[88%]");
        }
    }
 

    const back = () => {
         navigate('/foreground')
     }


    return (
        <div className={`absolute overflow-hidden place-items-center ${full} top-1/2 shadow-2xl left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl  bg-white  `}>
            <div className='h-10 mt-2 p-5 flex justify-between items-center bg-zinc-200'>
                <h1 className='font-medium'>FORM</h1>
                <div className='flex justify-between items-center'>
                    <button onClick={fullscreen} className='mr-4'><MdOutlineOpenInFull size={20} />
                    </button>
                    <button onClick={back}><RxCross2 size={20} />
                    </button>
                </div>
            </div>
            <form className='h-full' onSubmit={FormAdded} method='POST' >
                <div className='w-[90%] my-5 h-[75%] mx-auto '>
                    <input onChange={titlehandler} className='w-full p-5 text-3xl font-bold border-b-2 h-16 focus:border-0 focus:outline-none focus:border-b-2' name='title' placeholder='Title'></input>
                    <textarea onChange={discriptionhandler}
                        className='w-full p-5 text-lg h-[88%]  focus:border-0 focus:outline-none  resize-none'
                        name='description'
                        placeholder='Description'
                    />
                </div>
                < div className='h-12 p-2 m-5 flex justify-between items-center'>
                    <button className='mr-4 bg-blue-600 text-white py-2 px-4  rounded-3xl flex justify-center items-center font-semibold gap-2'>
                        <h1>Attach</h1>
                        <MdOutlineAttachment size={20} />
                    </button>
                    <button className='p-3 rounded-full
                     bg-green-500' type='submit' ><IoSend className='ml-1' color='white' size={20} />
                    </button>
                </div>
            </form>
        </div>
    )
};

export default AddForm