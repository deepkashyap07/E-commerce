import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
    const {currncy , getCartAmount , delivery_fee} = useContext(ShopContext)
  return (
    <div className='w-full'>
        <div className="text-2xl">
            <Title text1={"CART"} text2={"TOTAL"}/>
        </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className='flex justify-between '>
            <p>Subtotal</p>
            <p> {currncy} {getCartAmount()}.00 </p>

        </div>
        <hr />
        <div className='flex justify-between '>
            <p>Shipping Fee</p>
            <p> {currncy} {getCartAmount()==0?0:delivery_fee}.00 </p>
        </div>
        <hr />
        <div className='flex justify-between '>
            <b>Total</b>
            <b> {currncy} {getCartAmount()==0?0:getCartAmount()+delivery_fee}.00 </b>
        </div>

      </div>
    </div>
  )
}

export default CartTotal
