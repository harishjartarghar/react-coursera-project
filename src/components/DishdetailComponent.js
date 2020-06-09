import React, { Component } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Row,
    Col,
    Label
  } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
  
    handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
     
    }
  
    render() {
      return (
        <div>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil" /> Submit Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={this.handleSubmit}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={12}>
                    Rating
                  </Label>
                  <Col md={{ size: 12 }}>
                    <Control.select
                      model=".rating"
                      name="rating"
                      className="form-control"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author" md={12}>
                    Your Name
                  </Label>
                  <Col md={12}>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15)
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less"
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={12}>
                    Comment
                  </Label>
                  <Col md={12}>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      rows={5}
                      className="form-control"
                    />
                  </Col>
                </Row>
                <Button type="submit" value="submit" color="primary">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }

const Dishdetail=(props)=>{

    
    
    
    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
      return(
          <div className="container">
              <div className="row">            
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }
  else if (props.dish != null) 
          return (
              <div className="container">
              <div className="row">
                  <Breadcrumb>
                  <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                      <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                      <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                      <h3>{props.dish.name}</h3>
                      <hr />
                  </div>                
              </div>
              <div className="row">
                  <div className="col-12 col-md-5 m-1">
                      <RenderDish dish={props.dish} loading={props.isLoading} errMess={props.errMess} />
                  </div>
                  <div className="col-12 col-md-5 m-1">
                  <h4>Comments</h4>
                  <RenderComments
                  comments={props.comments}
                  postComment={props.postComment}
                  dishId={props.dish.id}
                />
                      
                  </div>
              </div>
              </div>
              
          );
}


    function RenderDish({dish,loading,errMess})
    {
                if (dish!=null)
                {
                    return(
                      <FadeTransform
                      in
                      transformProps={{
                          exitTransform: 'scale(0.5) translateY(-50%)'
                      }}>
                  <Card>
                      <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                      <CardBody>
                          <CardTitle>{dish.name}</CardTitle>
                          <CardText>{dish.description}</CardText>
                      </CardBody>
                  </Card>
                  </FadeTransform>
                    )
                }
                else{
                    return(<div></div>)
                }
    }


   

    function RenderComments ({comments, postComment, dishId}) 
    {

        if (comments!=null)
        {
            const com = comments.map(comment=>{
                    
                    return(
                    <Fade in>
                        <div>
                        <li>{comment.comment}</li><br />
                        <li>-- {comment.author}, <FormatDate date={comment.date}/></li><br />
                        </div>
                    </Fade>
                )
                    
                }
                );
            return(
               <div>
                <ul className="list-unstyled">
                <Stagger in>
                    {com}
                </Stagger>
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />
               </div>
                
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