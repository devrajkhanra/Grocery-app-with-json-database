import React, { useRef } from 'react'
import { FaPlus } from 'react-icons/fa'

const Additem = ({ items, setItems, handleAdd }) => {
    const inputRef = useRef()
    return (
        <div className='flex flex-col'>
            <form onSubmit={handleAdd}>
                <input
                    ref={inputRef}
                    className='border px-12 shadow-lg'
                    placeholder='Add Item'
                    type='text'
                    required
                    value={items}
                    onChange={(e) => setItems(e.target.value)} />
                <button
                    className='self-auto text-center text-1xl h-10 text-green-600 hover:text-green-50 hover:bg-green-600 px-2 rounded-sm shadow-lg'
                    type='submit'
                    onClick={() => inputRef.current.focus()}><FaPlus /></button>
            </form>
        </div>
    )
}

export default Additem