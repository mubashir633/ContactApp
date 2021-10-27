import React,{Component} from 'react'; 
import { Table } from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddContactModal} from './AddContactModal';
import {EditContactModal} from './EditContactModal';

export class Contact extends Component {

    constructor(props){
        super(props);
        this.state={conts:[], addModalShow:false, editModalShow:false
    }
}

    refreshList=()=>{
        fetch ('https://localhost:5001/api/contact')
        .then(response=>response.json())
        .then(data =>{
            console.log('data', data)
            this.setState({conts:data});
        });
    }

componentDidMount(){
    //runs only once on every page refresh
    this.refreshList();
}
        componentDidUpdate(){
        //runs on every state update
       this.refreshList();
     }
    deleteCont(contid){
        if(window.confirm('Are you sure?')){
            fetch('https://localhost:5001/api/contact/'+contid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }


render() {
    console.log('s', this.state)
    const {conts, contid,contsfname,contslname,conteadd}=this.state;

    //never change the state inside render
   let addModalClose=()=>this.setState({addModalShow:false});
    let editModalClose=()=>this.setState({editModalShow:false});

        
    return (
         <div>
                    <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th> Contact # </th>
                        <th> First Name </th>
                        <th> Last Name </th>
                        <th> Email Address </th>
                        <th> Options </th>
                        </tr>
                    </thead>
                        <tbody>
                            {console.log(conts)}

                            {conts.map(cont=>
                            <tr key={cont.ContactId}>
                                <td> {cont.ContactId}</td>
                                <td> {cont.ContactFirstName}</td>
                                <td> {cont.ContactLastName}</td>
                                <td> {cont.ContactEmailAddress}</td>
                                <td> 
                        <ButtonToolbar>
                            <Button className="mr-2" variant="info"
                            onClick={()=>this.setState({editModalShow:true,
                                contid:cont.ContactId,contsfname:cont.ContactFirstName,
                                contslname:cont.ContactLastName,conteadd:cont.ContactEmailAddress})}>
                                    Edit
                                </Button>

                                <Button className="mr-2" variant="danger"
                            onClick={()=>this.deleteCont(cont.ContactId)}>
                                    Delete
                                </Button>
                                
                                <EditContactModal show={this.state.editModalShow}
                                onHide={editModalClose}
                                contid={contid}
                                contsfname={contsfname}
                                contslname={contslname}
                                conteadd={conteadd}
                                />
                     </ButtonToolbar>
                        </td>
                            </tr>)}
                        </tbody>
                    </Table>
                    <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Contact</Button>

                    <AddContactModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
         </div>
    );
}
}
