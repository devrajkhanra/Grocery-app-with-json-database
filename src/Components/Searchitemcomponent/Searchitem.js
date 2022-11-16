import React from 'react'

const Searchitem = ({ searchItem, setSearchItem }) => {
    return (
        <div className='flex flex-row justify-center'>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    className='w-52 border px-12 shadow-lg'
                    role='searchbox'
                    type='text'
                    placeholder='Search Item'
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                />
            </form>
        </div>
    )
}

export default Searchitem