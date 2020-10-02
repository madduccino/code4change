import React from 'react';
import { Link } from 'react-router-dom';

class ThankYou extends React.Component{
  
//   constructor(props) {
//     super(props);
//     this.state = {
      
//     }
//   };

 clear() {
   localStorage.clear()
 }
 
  render() {
      return(
          <div className="header">          
            <h1>Thanks for voting!</h1>
          <h3>Don't forget to tune into our Twitch stream at <a target="_blank" href="https://twitch.tv/thecodingspace">twitch.tv/thecodingspace</a> at 3pm on May 9th to see the results live!</h3>

          </div>
      )
  }

}

  export default ThankYou