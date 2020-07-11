import React, { Component } from 'react';
import './Dashboard.css'

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      myPosts: false
    };
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  checkValue = () => {
    const { myPosts } = this.state
    if (!myPosts) {
      this.setState({ myPosts: true })
    }
    else {
      this.setState({ myPosts: false })
    }
  };

  render() {
    const { search, myPosts } = this.state
    return (
      <div className='dashboard'>
        <div className='dashHolder'>

          <div className='dashNavBar' >
            <div className='dashInput'>
              <input name='search' value={search} placeholder='Search Posts' onChange={(e) => this.handleChange(e)} />
            </div>

            <div className='dashNavButtons' >
              <button></button>
              <button>Reset</button>
            </div>

            <div className='checkBoxHolder'>
              <p>My Posts</p>
              <input type='checkbox'
                name='myPosts'
                id='checkValue'
                checked={myPosts}
                onChange={this.checkValue} />
            </div>
          </div>


        </div>
      </div>
    )
  };
};

export default Dashboard;
