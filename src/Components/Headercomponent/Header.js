import React from 'react'

const Header = (props) => {
    return (
        <header className='flex flex-row justify-center items-center py-6 bg-emerald-800'>
            <p className='text-5xl text-emerald-100 hover:text-white font-thin'>{props.title}</p>
        </header>
    )
}

export default Header