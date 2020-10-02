import React from 'react';  
import '../App.css';  
import { Link } from 'react-router-dom';
import Firebase from "firebase";

class Popup extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    }
    this.writeUserData = this.writeUserData.bind(this);
  }

  handleFirstNameChange = (e) => {
    this.setState({firstName: e.target.value});
    console.log(this.state.firstName)
 }
 handleLastNameChange = (e) => {

    this.setState({lastName: e.target.value});
 }
 
 

  writeUserData() {
    let fn = this.state.firstName;
    let ln = this.state.lastName;
    const db = Firebase.database();
    localStorage.setItem('totalPoints', 0);
    db.ref('/voters').push({
      firstName: fn,
      lastName: ln
    })
    this.props.submitVote()
    localStorage.clear()
  }

  render() {  
return (  
<div className='popup'>  
<div className='popup-inner'>  
<h1>{this.props.text}</h1>
<form>
<label required>First Name: </label> 
<input required onChange={this.handleFirstNameChange} id='fn'/>
<label required> Last Name:</label> <input required onChange={this.handleLastNameChange} id='ln'/>

<button onClick={this.writeUserData}><Link to='/thankyou'>Submit Your Votes</Link></button>  

<button onClick={this.props.closePopup}>Never mind, I want to keep looking! Reset my votes.</button>  
</form>

</div>  
</div>  
);  
}  
}  

export default Popup;