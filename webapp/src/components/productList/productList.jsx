//import 'dotenv/config'
import React, { useState } from 'react'
import './productList.css'
import ProductItem from "../productItem/productItem"
import { useTelegram } from "../../hooks/useTelegram"
import { useCallback, useEffect } from "react"

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => acc += item.price, 0)
}

const webAppUrl = 'https://33dc-37-214-51-154.eu.ngrok.io'

const ProductList = () => {
  const [addedItems, setAddedItems] = useState([])
  const { tg, queryId } = useTelegram()

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    }
    fetch('http://37.214.51.154:8000/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }, [addedItems])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find(item => item.id === product.id)
    let newItems = []

    if (alreadyAdded) {
      newItems = addedItems.filter(item => item.id !== product.id)
    } else {
      newItems = [...addedItems, product]
    }

    setAddedItems(newItems)

    if (newItems.length === 0) {
      tg.MainButton.hide()
    } else {
      tg.MainButton.show()
      tg.MainButton.setParams({
        text: `Purchase $${getTotalPrice(newItems)}`
      })
    }
  }

  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(json => setProducts(json.products))
  }, [])

  return (
    <div className={'list'}>
      {products.map(item => (
        <ProductItem
          product={item}
          onAdd={onAdd}
          className={'item'}
        />
      ))}
    </div>
  )
}

export default ProductList