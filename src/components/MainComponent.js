import React, { Component } from 'react';
import { Navbar , NavbarBrand } from 'reactstrap';
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import {DISHES} from '../shared/dishes'
import Header from './HeaderComponents';
import Footer from './FooterComponent';


class Main extends Component {


  constructor(props){
    super(props);
    this.state={
      dishes:DISHES,
      SelectedDish:null
    }
  }

    onDishSelect=(dishID)=>
    {
        this.setState({selectedDish:dishID});
    }


  render()
  {
    return (
      <div>
        <Header />
      <div className="container">
        <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      </div>
      <Footer />
      </div>
      
    );
  }
}

export default Main;
