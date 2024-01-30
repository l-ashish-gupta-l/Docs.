import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineOpenInFull } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineAttachment } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { MdOutlineAudioFile } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
function AddForm(props) {
    const { itemid } = useParams();
    const [Taskdata, setTaskdata] = useState([]);



    const titlehandler = (e) => {
        setTaskdata({
            ...Taskdata,
            title: e.target.value,
        });
    };

    const discriptionhandler = (e) => {
        setTaskdata({
            ...Taskdata,
            discription: e.target.value,
        });
    };

    const navigate = useNavigate();
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

    useEffect(() => {
        const task = async () => {
            const data = await axios.get(`http://localhost:5000/updatepage/${itemid}`)
            setTaskdata(data.data);
        }
        task();

    }, [])

    const updatetask = async (e) => {
        e.preventDefault();
        try {
            const updatedData = await axios.patch(`http://localhost:5000/updatetask/${itemid}`, {
                title: Taskdata.title,
                discription: Taskdata.discription,
            });

            navigate('/foreground');
        } catch (error) {
            console.error('Error updating task:', error.message);
        }
    };

    console.log(Taskdata);
    const getFileTypeIcon = () => {
        if (Taskdata.fileType) {

            const fileType = Taskdata.fileType;

            if (fileType.startsWith('image')) {
                return <TbPhotoSquareRounded size={15} />;
            } else if (fileType.startsWith('audio')) {
                return <MdOutlineAudioFile size={15} />;
            } else if (fileType.startsWith('video')) {
                return <IoVideocamOutline size={15} />;
            } else {
                return <IoDocumentTextOutline size={15} />;
            }
        }

        return null;
    };

    console.log(Taskdata.file);
    const handleButtonClick = (e) => {
        e.preventDefault();
        if (Taskdata.file) {
            window.open(Taskdata.file, '_blank');
        }
    };
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
            <form className='h-full' onSubmit={updatetask} method='Patch' encType="multipart/form-data" >
                <div className='w-[90%] my-5 h-[75%] mx-auto '>
                    <input onChange={titlehandler} className='w-full p-5 text-3xl font-bold border-b-2 h-16 focus:border-0 focus:outline-none focus:border-b-2' name='title'
                        value={Taskdata.title || " "} placeholder='Title'></input>
                    <textarea onChange={discriptionhandler}
                        value={Taskdata.discription || " "}
                        className='w-full p-5 text-lg h-[88%]  focus:border-0 focus:outline-none  resize-none'
                        name='description'
                        placeholder='Description'
                    />
                </div>
                < div className='h-12 p-2 m-5 flex justify-between items-center'>
                    <div className="flex items-center">
                        <label htmlFor="fileInput" className="mr-4 bg-blue-600 text-white py-2 px-4 rounded-3xl flex justify-center items-center font-semibold gap-2 cursor-pointer">
                            Attach
                            <MdOutlineAttachment size={20} />
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            className="hidden"
                            onChange={(e) => handleFileChange(e)}
                        />

                    </div>
                    {Taskdata.fileName && (
                        <button onClick={handleButtonClick} className={`flex justify-center items-center bg-slate-500 -ml-36 text-xs text-white rounded-full p-2 gap-2`}>
                            {getFileTypeIcon()}
                            <span >{Taskdata.fileName}</span>
                        </button>
                    )}

                    <button className='p-3 rounded-full
                     bg-green-500' type='submit' ><IoSend className='ml-1' color='white' size={20} />
                    </button>
                </div>
            </form>
        </div>
    )
};

export default AddForm