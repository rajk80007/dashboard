import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div className='w-1/5 bg-[#613e59] text-white h-screen py-5'>
                <h2 className='text-xl font-bold text-center'>Sidebar</h2>
                <ul className='flex flex-col gap-3 px-5 mt-5 text-lg text-center'>
                    <li className='hover:text-[#413a3a] cursor-pointer hover:bg-[#f7d2cf] p-2 rounded '>
                       <Link to='/'>
                        Analytics
                       </Link>
                    </li>
                    <li className='hover:text-[#413a3a] cursor-pointer hover:bg-[#f7d2cf] p-2 rounded '>
                       <Link to='/insert'>
                        Insert Data
                       </Link>
                    </li>
                    <li className='hover:text-[#413a3a] cursor-pointer hover:bg-[#f7d2cf] p-2 rounded '>
                       <Link to='/show'>
                        show Data
                       </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar