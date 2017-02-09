import React, {Component} from 'react'
import lang from '../database/lang.json'
import Swipe from 'react-swipe'

export default class Cart extends Component{
  toggleCart(){
    const cart = document.getElementById('cart-items').style
    if (cart.animation == '' || cart.animation.includes('Out')) {
      cart.animation = 'slideInRight .4s forwards'
    } else{
      cart.animation = 'slideOutRight .4s forwards'
    }
  }

  render() {
    let c = this.props.shoppingCart,
        sum = 0
    Object.keys(c).forEach((key) => sum+=(c[key].quantity*c[key].price))
    if (Object.keys(c).length != 0) {
      return (
        <div id='cart-wrapper'>
          <div id='cart-button' onClick={this.toggleCart}>
            <img src='dist/assets/images/icons/cart.svg'/>
          </div>
          <div id='cart-items'>
            <h2>{lang.en.cartItems}</h2>
               <CartItems
                 shoppingCart={this.props.shoppingCart}
                 changeQuantity={this.props.changeQuantity}
                 deleteCartItem={this.props.deleteCartItem}
               />
            <div id='cart-sum'>{`${lang.en.cartSum}: ${sum} ${lang.en.currency}`}</div>
            <button id='cart-finish'>{lang.en.finishAndPurchase}</button>
          </div>
        </div>
    )}

    else {
      return (
        <div id='no-cart' style={{animation: 'none'}}></div>
    )}
  }
}

class CartItems extends Component{
  constructor(){
    super()
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }
  handleChangeQuantity(event){
    let e = event.target
    this.props.changeQuantity(e.getAttribute('data-id'),e.innerText)
  }
  handleDeleteItem(...args){
    // if (window.confirm("Vil du virkelig slette produktet?")) {
      // document.getElementsByClassName(`cart-item ${arguments[1].getAttribute('data-id')}`)[0].style.transform = 'scaleY(0)'
      // setTimeout(() =>
        this.props.deleteCartItem(arguments[1].getAttribute('data-id'))

        // , 400)
    // }
  }
  render() {
    let shoppingCart = this.props.shoppingCart,
        cart = []
    Object.keys(shoppingCart).forEach((key) => {
      cart.push(
          <Swipe key={key}
            className={`cart-item ${key}`}
            swipeOptions={{
              startSlide: 0,
              continuous: false,
              callback: this.handleDeleteItem
            }}
          >
            <div className='cart-item-details'>
              <div>{shoppingCart[key].name}</div>
              <div className='cart-item-price'>
                {`${shoppingCart[key].price} ${lang.en.currency}`}
              </div>
              <div className='cart-item-quantity'>
                <button data-id={key} onClick={this.handleChangeQuantity}>{shoppingCart[key].quantity != 0 ? '-' : '×'}</button>
                <div className='cart-item-quantity-value'>{`${shoppingCart[key].quantity} ×`}</div>
                <button data-id={key} onClick={this.handleChangeQuantity}>+</button>
              </div>
            </div>
            <div
              className='cart-item-remove'
              data-id={key}
              >
              <span>×</span>
              <p>{lang.en.deleteCartItem}</p>
            </div>
          </Swipe>
      )
    })
    return <div>{cart}</div>
  }
}
