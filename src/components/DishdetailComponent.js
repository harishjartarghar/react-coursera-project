import React from "react";
import { Card,CardBody,CardText,CardImg, CardTitle } from "reactstrap";


const Dishdetail=(props)=>{

    
    
    const {dish} = props;
    return ( 
        <div >

        <RenderDish dish={props.dish}/>

        </div>
    );
}


    function RenderDish({dish})
    {
        if (dish!=null)
        {
            return(
            <div className="row">
            <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </div>
            <div className="col-12 col-md-5 m-1" >
            <h4>Comments</h4>
            <RenderComments comments={dish.comments}/>
            </div>
            </div>
            )
        }
        else{
            return(<div></div>)
        }
    }


   

    function RenderComments ({comments}) 
    {

        if (comments!=null)
        {
            const com = comments.map(comment=>{
                    
                    return(
                    <div>
                    <li>{comment.comment}</li><br />
                    <li>-- {comment.author}, <FormatDate date={comment.date}/></li><br />
                    </div>
                )
                    
                }
                );
            return(
                <ul className="list-unstyled">
                {com}
                </ul>
            )
        }
        else{
            return(<div></div>)
        }
    }

    function FormatDate({date})
    {
        const option = {year: 'numeric', month: 'short', day: 'numeric' };
        const date1 = new Date(date)
        const newdate = date1.toLocaleDateString("en-US", option)
        return newdate;
    
    }
    

 
export default Dishdetail;