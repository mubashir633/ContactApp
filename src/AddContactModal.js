
import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddContactModal extends Component{
    constructor(props){
        super(props);
        this.state={conts:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:5001/api/contact',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ContactId:null,
                ContactFirstName:event.target.ContactFirstName.value,
                ContactLastName:event.target.ContactLastName.value,
                ContactEmailAddress:event.target.ContactEmailAddress.value


            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }
    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Contact
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            < Col sm={4}>
            <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="ContactFirstName">
                        <Form.Label> First Name</Form.Label>
                        <Form.Control type="text" name="ContactFirstName" required 
                        placeholder="First Name"/>
                    </Form.Group>
                    <Form.Group controlId="ContactLastName">
                        <Form.Label> Last Name</Form.Label>
                        <Form.Control type="text" name="ContactLastName" required 
                        placeholder="Last Name"/>
                    </Form.Group>
                    <Form.Group controlId="ContactEmailAddress">
                        <Form.Label> Email Address</Form.Label>
                        <Form.Control type="text" name="ContactEmailAddress" required 
                        placeholder="Email Address"/>
                    </Form.Group>
                    <Form.Group>
                    <Button variant="primary" type="submit">
                            Add Contact
                    </Button>
                    </Form.Group>                    
                    </Form>
            </Col>
            
        </Row>
       
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}