import React from 'react'
import Button from "../button/button"
import './productItem.css'

const ProductItem = ({ product, className, onAdd }) => {

  const onAddHandler = () => {
    onAdd(product)
  }

  return (
    <div className={'product ' + className}>
      <div className={'img'}><img src={product.thumbnail} alt="" /></div>
      <div className={'title'}>{product.title}</div>
      <div className={'description'}>{product.description}</div>
      <div className={'price'}>Price: <b>${product.price}</b></div>
      <div style={{ marginBottom: '2em' }}></div>
      <div className={'btn-cont'}>
        <Button className={'add-btn'} onClick={onAddHandler}>
          Add to Basket
        </Button>
      </div>
    </div>
  )
}

export default ProductItem