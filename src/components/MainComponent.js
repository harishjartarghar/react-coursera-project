import React, { Component } from 'react';
import { Navbar , NavbarBrand } from 'reactstrap';
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Header from './HeaderComponents';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {


  constructor(props){
    super(props);
  }

    onDishSelect=(dishID)=>
    {
        this.setState({selectedDish:dishID});
    }

   
    


  render()
  {
    const DishWithId = ({match}) => {
      return(
          <Dishdetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      );
    };

    const HomePage=()=>{
      return (
        <Home 
        dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
    />
      );
    }

    return (
          <React.Fragment>
            <Header/>
           <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={Contact} />} />
              <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Redirect to="/home" />
           </Switch>
          <Footer/>
          </React.Fragment>
      
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
