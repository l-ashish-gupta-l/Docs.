import React, { useRef } from 'react'
import Card from './Card'

function ForeGround() {
    const ref = useRef(null)
    return (
        <div ref={ref} className='Foreground  fixed z-50 top-0 p-10  left-0 w-full h-screen bg-transparent  flex gap-10 items-end'>
            <Card reference={ref} />
            <Card reference={ref} />
            <Card reference={ref} />
            <Card reference={ref} />


        </div>
    )
}

export default ForeGround