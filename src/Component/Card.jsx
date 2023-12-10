import React from 'react'
import { FaRegFileAlt } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
function Card() {
  return (
      <div className=' w-[20%]  p-5 bg-zinc-200 rounded-2xl'>
          <FaRegFileAlt />
          <p className='text-sm mt-5 font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nemo dolore minima.</p>
          <div className='Footer flex mt-10 justify-between items-center' >
              <h5 className='font-semibold  text-sm '>.4 mb</h5>
              <div className='bg-black text-white p-1  rounded-full'>
                  <MdDownload />
              </div>
          </div>  
    </div>
  )
}

export default Card