import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import data from '../database/data.json'
import lang from '../database/lang.json'
import Filters from '../components/Filters.jsx'
import Products from '../components/Products.jsx'
import Cart from '../components/Cart.jsx'

class Layout extends Component {
  constructor(){
    super()
    this.state = {
      filters: {
        searchValue: '',
        categories: [],
        maxPrice: undefined,
        reversed: false
      },
      shoppingCart: {}
    }
    this.getFilters = this.getFilters.bind(this)
    this.getShoppingCart = this.getShoppingCart.bind(this)
    this.deleteCartItem = this.deleteCartItem.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
  }

  getFilters(...args){
    let [key,val] = Object.values(arguments)
    this.setState({
      filters: {
        ...this.state.filters,
        [key]:val
      }
    })
  }

  getShoppingCart(id,name,cat,price){
    let cart = this.state.shoppingCart
    if (!(id in cart)) {
      cart[id] = {
        'name': name,
        'cat': cat,
        'price': price,
        'quantity': 1
      }
      this.setState({shoppingCart: {...cart}})
    }
  }

  orderBy(objList,criteria,reversed){
    if (reversed) {
      return objList.sort((a,b) => b[criteria] - a[criteria])
    }
    else {
      return objList.sort((a,b) => a[criteria] - b[criteria])
    }
  }

  changeQuantity(id,amount){
    let c = this.state.shoppingCart
    if (c[id].quantity >= 0 && amount != '×') {
      this.setState({
        shoppingCart: {
          ...c,
          [id]: {
            ...c[id],
            quantity: c[id].quantity-((amount == '-') ? 1 : -1)
          }
        }
      })
    }
    else{
      this.deleteCartItem(id)
    }
  }

  deleteCartItem(id){
    let c = this.state.shoppingCart
    delete c[id]
    this.setState({
      shoppingCart: {
        ...c
      }
    })
  }

  render() {
    return(
      <div>
        <Filters
          getFilters={this.getFilters}
        />
        <Products
          setFilters={this.state.filters}
          products={this.orderBy(data, 'price',this.state.filters.reversed)}
          shoppingCart={this.getShoppingCart}
        />
        <Cart
          shoppingCart={this.state.shoppingCart}
          deleteCartItem={this.deleteCartItem}
          changeQuantity={this.changeQuantity}
        />
      </div>
    )
  }

}

ReactDOM.render(<Layout/>, document.getElementById('app'))
