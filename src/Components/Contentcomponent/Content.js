import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const Content = ({ items, handleCheck, handleDelete }) => {

    return (
        <div className='py-6 flex flex-col justify-center items-center'>
            <ul>
                {items.map((item) => (
                    <li className='flex flex-row' key={item.id}>
                        <input className='mx-4 h-9 w-4' type='checkbox' onChange={() => handleCheck(item.id)} />
                        <label className='mx-4 font-thin grow text-2xl' onClick={() => handleCheck(item.id)}>{item.item}</label>
                        <FaTrashAlt role='button' className='mx-4 h-8 text-red-500' onClick={() => handleDelete(item.id)}></FaTrashAlt>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Content