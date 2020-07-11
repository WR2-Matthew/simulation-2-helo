import React, { Component } from 'react';

class Nav extends Component {
  constructor() {
    super();

    this.state = {

    };
  };

  render() {
    console.log(this.props.history)
    return (
      <div>
        Nav
      </div>
    )
  };
};

export default Nav;
