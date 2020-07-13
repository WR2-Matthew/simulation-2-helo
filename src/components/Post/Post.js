import React, { Component } from 'react';
import axios from 'axios'
import './Post.css'

class Post extends Component {
  constructor() {
    super();

    this.state = {
      singlePost: null
    };
  };

  componentDidMount = () => {
    // console.log(this.props.match.params)
    axios
      .get(`/api/single/post/${this.props.match.params.postid}`)
      .then(res => this.setState({ singlePost: res.data }))
  }

  render() {
    const { singlePost } = this.state
    console.log(singlePost)
    return (
      <div className='thePost'>
        {!singlePost ? null :
          <div className='postHolder'>
            <div className='postInfo' >
              <div className='titleBox'>
                <h1>{singlePost[0].title}</h1>
              </div>

              <div className='usernameInfo'>
                <p>{`by ${singlePost[0].username}`}</p>
              </div>

              <div className='ProfilePicDisplay'>
                <img className='profImg' alt='profile' src={singlePost[0].profile_picture} />
              </div>
            </div>

            <div className='postDetails'>
              <div className='postImage'>
                <img alt='posted' src={singlePost[0].image} />
              </div>

              <div className='postBody'>
                <p>{singlePost[0].details}</p>
              </div>
            </div>
          </div>
        }
      </div>
    )
  };
};

export default Post;
