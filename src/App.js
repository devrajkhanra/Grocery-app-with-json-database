import './App.css';
import Header from './Components/Headercomponent/Header';
import Footer from './Components/Footercomponent/Footer';
import { useState, useEffect } from 'react';
import Content from './Components/Contentcomponent/Content';
import Additem from './Components/Additemcomponent/Additem';
import Searchitem from './Components/Searchitemcomponent/Searchitem';
import apiRequest from './Components/apiRequest';

function App() {

  const API_URL = 'http://localhost:3500/items'

  const [items, setItems] = useState([])
  const [newItems, setNewItems] = useState('')
  const [searchItem, setSearchItem] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Loads one time hence useEffect is used
  // Calling database through async function
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw Error('Did not recieve expected data')
        const listItems = await response.json()
        setItems(listItems)
        setFetchError(null)
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    setTimeout(() => {
      // Calling async function within the function
      (async () => await fetchItems())()
    }, 2000);

  }, [])


  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
    setItems(listItems)

    const myItem = listItems.filter((item) => item.id === id)
    const updateOption = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOption)
    if (result) setFetchError(result)
  }

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id)
    setItems(listItems)

    const deleteOption = { method: 'DELETE' }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOption)
    if (result) setFetchError(result)

  }

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItems = { id, checked: false, item }
    const listItems = [...items, myNewItems]
    setItems(listItems)

    const postOption = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItems)
    }
    const result = await apiRequest(API_URL, postOption)
    if (result) setFetchError(result)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if (!newItems) return
    addItem(newItems)
    setNewItems('')
  }

  return (

    <div className="App">
      <Header title='Groceries' />
      <Additem items={newItems} setItems={setNewItems} handleAdd={handleAdd} />
      <Searchitem searchItem={searchItem} setSearchItem={setSearchItem} />
      <div className='flex flex-row justify-center'>
        {isLoading &&
          <button type="button" className=" p-10 bg-white flex flex-row justify-center items-center" disabled>
            {/* <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg> */}
            <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <p className='text-4xl text-gray-500'>Loading . . .</p>
          </button>}
        {fetchError && !isLoading && <p style={{ color: 'red' }}>{`Error:${fetchError}`}</p>}
        {!fetchError && <Content items={items.filter(item => ((item.item).toLowerCase().includes(searchItem.toLowerCase())))} handleCheck={handleCheck} handleDelete={handleDelete} />}
      </div>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
