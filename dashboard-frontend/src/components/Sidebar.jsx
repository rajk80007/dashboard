import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ArrowLeftEndOnRectangleIcon from '@heroicons/react/20/solid/ArrowLeftEndOnRectangleIcon';
import ArrowRightEndOnRectangleIcon from '@heroicons/react/20/solid/ArrowRightEndOnRectangleIcon';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1024) {
                setIsOpen(true);
            } else {
                setIsOpen(false);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[]);
    return (
        <>
            {
                isOpen ?            
            (<ArrowLeftEndOnRectangleIcon
                onClick={() => setIsOpen(!isOpen) && this.classList.toggle('left-64')}
                 className='lg:hidden z-50 w-12 h-12 absolute top-24 left-64 duration-300 text-[#ffffff] hover:text-[#413a3a] cursor-pointer hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] p-2 rounded ' />)
            :(<ArrowRightEndOnRectangleIcon
                onClick={() => setIsOpen(!isOpen)} className='lg:hidden z-50 w-12 h-12 absolute top-24 left-0 text-[#6e6161] hover:text-[#413a3a] cursor-pointer hover:shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] p-2 rounded ' />)
        }
            <div className={`w-[300px] absolute lg:top-[76px] top-[87px] z-10 bg-[#613e59] text-white h-screen py-5 ${isOpen ? 'ml-0' : 'ml-[-300px]'} duration-500 transition-all shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)]`}>
                <h2 className='text-xl font-bold text-center'>Sidebar</h2>
                <ul className='flex flex-col gap-3 px-5 mt-5 text-lg text-center'>
                    <li className='hover:text-[#413a3a] cursor-pointer hover:bg-[#f7d2cf] p-2 rounded '>
                       <Link to='/' >
                        Analytics
                       </Link>
                    </li>
                    <li className='hover:text-[#413a3a] cursor-pointer hover:bg-[#f7d2cf] p-2 rounded '>
                       <Link to='/insert'>
                        Insert Data
                       </Link>
                    </li>
                    <li className='hover:text-[#413a3a] cursor-pointer hover:bg-[#f7d2cf] p-2 rounded '>
                       <Link to='/show' >
                        show Data
                       </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar