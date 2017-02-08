import React from "react"
import data from "../database/data.json"
import lang from "../database/lang.json"

export default class Filters extends React.Component {
  toggleFilters(e){
    const filters = document.getElementById('not-search')
    if (!filters.classList.contains('filters-hidden')) {
      filters.classList.add('filters-hidden')
      e.target.style.backgroundImage = 'url(app/images/icons/down.svg)'
    }
    else {
      filters.classList.remove('filters-hidden')
      e.target.style.backgroundImage = 'url(app/images/icons/up.svg)'
    }
  }

  render() {
    return (
      <section id='filters'>
        <h2>{lang.en.search}</h2>
      <SearchFilter filters={this.props.getFilters}/>
        <div id='not-search'>
          <CategoryFilter filters={this.props.getFilters}/>
          <PriceFilter filters={this.props.getFilters}/>
          <OrderItems filters={this.props.getFilters}/>
        </div>
        <button id='filters-toggle' onMouseUp={this.toggleFilters}></button>
      </section>
    )
  }
}
class SearchFilter extends React.Component {
  constructor() {
    super()
    this.state = {
      searchValue: ''
    }
    this.handleEvent = this.handleEvent.bind(this)
  }
  handleEvent(e){
    let val = e.target.value
    this.props.filters('searchValue',val)
    if (val.length > 0) {
      this.setState({val})
    }
  }
  render() {
    return (
      <input id='search-bar' onChange={this.handleEvent} placeholder={lang.en.searchPlaceholder}/>
    )
  }
}

class CategoryFilter extends React.Component {
  constructor(){
    super()
    this.state = {
      filterCategoryList: [],
      active: '',
      categoryList: [...new Set(data.map((i) => i.cat))]
    }
    this.handleEvent = this.handleEvent.bind(this)
  }
  handleEvent(e){
    let categories = this.state.filterCategoryList,
        el = e.target.innerHTML

    this.state.active ? this.state.active='' : this.state.active='active'
    if (categories.includes(el)) {
      categories.splice(categories.indexOf(el),1)
    }
    else {
      categories.push(el)
    }
    this.props.filters('categories',categories)
    e.target.classList.toggle('active-category')
  }
  render() {
    return (
      <div id='category-filter'>
        <h3>{lang.en.filterByCategory}</h3>
        <ul>
          {this.state.categoryList.map((i) =>
            <li key={i}>
              <a href='#' onClick={this.handleEvent}>{i}</a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

class PriceFilter extends React.Component {
  constructor(){
    super()
    this.state = {
      maxPrice: Math.max(...new Set(data.map((i) => i.price))),
      price: undefined
    }
    this.handleEvent = this.handleEvent.bind(this)
  }
  handleEvent(e){
    let maxPrice = this.state.price = e.target.value
    this.props.filters('maxPrice',maxPrice)
  }

  render() {
    return (
      <div id='price-filter'>
        <h3>{lang.en.filterByPrice}</h3>
        <div>
          <span>{`0 ${lang.en.currency}`}</span>
          <input
            defaultValue={this.state.maxPrice}
            onTouchEnd={this.handleEvent}
            onMouseUp={this.handleEvent}
            type='range'
            min={0}
            max={this.state.maxPrice}
          />
          <span>{`${this.state.price === undefined ? this.state.maxPrice : this.state.price} ${lang.en.currency}`}</span>
        </div>
      </div>
    )
  }

}

class OrderItems extends React.Component {
  constructor(){
    super()
    this.handleEvent = this.handleEvent.bind(this)
  }
  handleEvent(e){
    this.props.filters('reversed',(e.target.value != 0) && true)
  }
  render() {
    return (
      <div id='order'>
        <h3>{lang.en.order}</h3>
        <select onChange={this.handleEvent} name='price-order'>
          <option value={0}>{lang.en.priceIncrease}</option>
          <option value={1}>{lang.en.priceDecrease}</option>
        </select>
    {/* <select name='name-order'>
          <option>Név szerint növekvő</option>
          <option>Név szerint csökkenő</option>
        </select> */}
      </div>
    )
  }
}
