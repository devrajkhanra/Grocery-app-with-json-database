import React from 'react'

const Footer = ({ length }) => {
    return (
        <footer className='flex flex-row justify-center items-center py-6 bg-gray-600'>
            <div className='flex flex-col'>
                <p className='text-blue-300 font-thin text-2xl'>Number of Grocery {length === 1 ? 'Item' : 'Items'}: <strong className='text-3xl'>{length}</strong></p>
                <p className='font-thin text-4-xl text-gray-100'>App &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer