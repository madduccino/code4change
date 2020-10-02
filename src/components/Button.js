import React, { Component } from 'react';


class Button extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
          selected: false
        }
    
        this.toggleVote = this.toggleVote.bind(this)
      }

      toggleVote() {
        this.setState({
          selected: !this.state.selected
        })
      }
}

export default Button;