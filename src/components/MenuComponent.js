import React,{Component} from "react";
import { Card,CardBody,CardText,CardImgOverlay,CardImg, CardTitle } from "reactstrap";
import DishDetail from "./DishdetailComponent";

class Menu extends Component{
    constructor(props)
    {
        super(props);

        this.state = {
            dishSelected:null
        };


    }

    onDishSelect(dish)
    {
        this.setState({dishSelected:dish});
    }

    renderDish(dish)
    {
        if(dish!=null)
        {
            return(
                <CardText>{dish.description}</CardText>
            );
        }
        else
        {
           return(
            <div></div>
           );
        }
    }

    render()
    {
        const menu=this.props.dishes.map((dish)=>{
            return(
                <div className="col-12 col-md-6 mt-5">
                    <Card  key={dish.id} onClick={()=>this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                        {this.renderDish(this.state.dishSelected)}
                    </Card>
                </div>
            );
        })
        return(
            <div className="container">
                <div className="row">
                    {menu}
                </div>
            </div>
        );
    }
}

export default Menu;