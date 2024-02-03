import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { MdOutlineAudioFile } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import html2pdf from 'html2pdf.js';

function Card(props) {
    const navigate = useNavigate();
    const opentask = () => {
        navigate(`/updatepage/${props.itemid}`)
    }

    const [task, settask] = useState(props)
    const deletetask = async () => {
        const deleteddata = await axios.delete(`http://localhost:5000/delete/${props.itemid}`)
        settask(null)
    }
    if (task == null) {
        return null
    }
    // console.log(task)

    const getFileTypeIcon = () => {
        if (props.fileType) {

            const fileType = props.fileType;

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

        return <IoDocumentTextOutline size={15} />;
    };

    const handleDownload = async () => {
        try {

            const response = await axios.get(`/generate-pdf/${props.itemid}`, {
                responseType: 'blob',
            });

            const pdfContent = `
      <div style="text-align: center; margin: auto; width:90%; padding:20px;">
    <h1 style="font-weight: bold; text-align: center; font-size:50px">${task.title}</h1>
    <p style="text-align : start; font-size:20px; margin-top:20px ">${task.discription}</p>
     
     <h2 style="font-weight: bold; margin-top:50px ; width:90%; text-align: center; font-size:20px" > ATTACHMENT LINK :</h2>
     <p style="font-weight :500; margin-top:20px; line-height:1rem" ><u>  ${task.fileUrl} </u> </p>
     </div>
    `;

            const element = document.createElement('div');
            element.innerHTML = pdfContent;
            const options = {
                margin: 10,
                filename: `${task.title}.pdf`,
            };

            html2pdf(element, options);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };




    return (
        <div className=' relative w-[250px] mx-auto h-[300px] gap-5 p-5 bg-zinc-200 rounded-2xl overflow-hidden'>
            <div onClick={opentask} className=' h-[72%]  overflow-hidden  '>
                {getFileTypeIcon()}
                <h1 className='text-lg mt-3 tracking-tighter font-semibold'>{task.title}</h1>
                <p className='text-sm  mt-3 tracking-tighter font-normal'>{task.discription}</p>
            </div>

            <div className='Footer absolute left-0 bottom-0    w-full   '>
                <div className='  flex justify-between px-3 gap-5 items-center ' >
                    <div>
                        {props.fileName && (
                            <button className={`flex overflow-hidden  justify-center items-center bg-slate-500  text-[.55rem] text-white rounded-full py-2 px-3 gap-2`}>
                                {getFileTypeIcon()}
                                <span >{props.fileName}</span>
                            </button>
                        )}
                    </div>
                    <button onClick={deletetask} className='bg-black text-white p-2  rounded-full'>
                        <MdDelete />
                    </button>
                </div>
                <button onClick={handleDownload} className=' Download mt-2 w-full h-10   left-0 flex items-center justify-center p-2  text-white  bg-green-500' >
                    <h5 className='text-sm'>Download Now</h5>
                </button>
            </div>
        </div>
    )
}

export default Card