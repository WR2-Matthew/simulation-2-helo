import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { addCreatedPost } from '../../redux/actionCreators';
import './Form.css'

class Form extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      image: '',
      details: ''
    };
  };

  createPost = () => {
    const { user } = this.props,
      { title, image, details } = this.state,
      body = {
        title,
        image,
        details
      }
    axios
      .post(`/api/create/post/${user.id}`, body)
      .then(res => {
        this.props.addCreatedPost(res.data)
        this.props.history.push('/dashboard')
      })
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  render() {
    const { title, image, details } = this.state;
    // console.log(this.props.user)
    return (
      <div className='formHolder' >
        <div className='form' >
          <div className='formHeader' >
            <h1 className='formNew'>New Post</h1>
          </div>

          <div className='newPostDetails' >
            <label className='newPostLabels' >Title:</label>
            <input className='newPostInputs' placeholder="Post's Title" name='title' value={title} onChange={(e) => this.handleChange(e)} />

            <div className='newPostImg' >
              {!image ? <img className='newPostImage' alt='placeholder' src='https://lcp.mit.edu/static/images/missing.jpg' />
                : <img alt='post image' src={image} className='newPostImage' />
              }
            </div>

            <label className='newPostLabels' >Image URL:</label>
            <input className='newPostInputs' placeholder='Insert Image URL' name='image' value={image} onChange={(e) => this.handleChange(e)} />

            <label className='newPostLabels' >Content:</label>
            <input className='newPostInputs' placeholder='Enter Post Content' name='details' value={details} onChange={(e) => this.handleChange(e)} />
          </div>

          <div className='newButtonHolder'>
            <button className='newPostButton' onClick={() => this.createPost()} >Post</button>
          </div>
        </div>
      </div>
    )
  };
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps, { addCreatedPost })(Form);
