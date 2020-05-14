import React, { Component } from 'react';
import { Navbar , NavbarBrand } from 'reactstrap';
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import {DISHES} from '../shared/dishes'
import Header from './HeaderComponents';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect} from 'react-router-dom';

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

    const HomePage=()=>{
      return (
        <Home/>
      );
    }
    return (
          <React.Fragment>
            <Header/>
           <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Redirect to="/home" />
           </Switch>
          <Footer/>
          </React.Fragment>
      
    );
  }
}

export default Main;
