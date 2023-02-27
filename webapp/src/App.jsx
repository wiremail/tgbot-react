import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

import './App.css'

import { useTelegram } from './hooks/useTelegram'
import Header from './components/header/header'
import ProductList from './components/productList/productList'
import Form from './components/form/form'

function App() {

  const { tg } = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList />} />
        <Route path={'form'} element={<Form />} />
      </Routes>
    </div>
  )
}

export default App
