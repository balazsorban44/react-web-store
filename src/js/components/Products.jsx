import React, {Component} from "react"
import lang from "../database/lang.json"


export default class Products extends Component {
  constructor(){
    super()
    this.state = {
      class: ''
    }
    this.handleEvent = this.handleEvent.bind(this)
    this.gridView = this.gridView.bind(this)
    this.listView = this.listView.bind(this)
  }
  listView() {this.setState({class: ''})}
  gridView() {this.setState({class: 'grid'})}

  handleEvent(e){
    const a = e.target,
          cartBtn = document.getElementById('cart-button')
    this.props.shoppingCart(
      a.getAttribute('data-id'),
      a.getAttribute('data-name'),
      a.getAttribute('data-category'),
      parseInt(a.getAttribute('data-price')),
      1
    )
    if (cartBtn != null) {
      cartBtn.style.animation = "shake .5s forwards"
      setTimeout(() => cartBtn.style.animation = "none",500)
    }
  }

  scaleUpItem(event){
    let e = event.currentTarget
    if (e.style.transform == '') {
      e.style.transform = 'rotate(180deg)'
    }
    else {
      e.style.transform = ''
    }
    document.getElementsByClassName(e.getAttribute('data-id'))[0].classList.toggle('item-scaled-up')
  }

  render() {
    const items = [],
          f = this.props.setFilters
    this.props.products.forEach((product) => {
      if (
          ((f.searchValue.length == 0) ||
          (product.name.concat(product.desc).toLowerCase().includes(f.searchValue.toLowerCase())))
        &&
          ((f.maxPrice === undefined) || (f.maxPrice >= product.price))
        &&
          ((f.categories.includes(product.cat) || (f.categories.length == 0))
        ))
      {
        items.push(
          <article className={product.id} key={product.id}>
            <div className='item-wrapper'>
              <div className='item-title'>
                <h4>{product.name}</h4>
                <h5>{product.cat}</h5>
                <span
                  data-id={product.id}
                  onClick={this.scaleUpItem}
                  className='more'
                ></span>
              </div>
              <div className='item-content'>
                <img className='item-img' src={`dist/assets/images/products/${product.cat}.jpg`} alt={product.name}/>
                <div>
                  <p className='item-desc'>{product.desc}</p>
                  <div className='item-price'>{product.price}{lang.en.currency}</div>
                  <div className='item-buttons'>
                    <button
                      onClick={this.handleEvent}
                      className='item-button'
                      data-id={product.id}
                      data-name={product.name}
                      data-category={product.cat}
                      data-price={product.price}
                    >
                      {lang.en.cart}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <img className='item-bg' src={`dist/assets/images/products/${product.cat}.jpg`} alt='item bg'/>
          </article>)
      }
    })

    return (
      <section id='items'>
        <h2>{lang.en.itemList}</h2>
        <h3>({items.length} {lang.en.found})</h3>
        <div id='items-layout'>
          <button onClick={this.listView}>{lang.en.listView}</button>
          <button onClick={this.gridView}>{lang.en.gridView}</button>
        </div>
        <div className={this.state.class}>
          {items}
        </div>
      </section>
    )
  }
}
