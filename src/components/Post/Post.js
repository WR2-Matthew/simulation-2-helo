import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import './Post.css';

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
  };

  deletePost = () => {
    // console.log('hit')
    axios
      .delete(`/api/delete/post/${this.props.match.params.postid}`)
      .then(() => this.props.history.push('/dashboard'))
  };

  render() {
    const { singlePost } = this.state
    const { user } = this.props
    console.log(singlePost)
    return (
      <div className='thePost'>
        {!singlePost ? null :
          <div className='postHolder'>
            <div className='postInfo' >
              <div className='titleBox'>
                <h1 className='postTitleH1' >{singlePost[0].title}</h1>
              </div>

              <div className='divity'>
                <div className='usernameInfo'>
                  <p>{`by ${singlePost[0].username}`}</p>
                </div>

                <div className='ProfilePicDisplay'>
                  <img className='profImg' alt='profile' src={singlePost[0].profile_picture} />
                </div>
              </div>
            </div>

            <div className='postDetails'>
              <div className='postImage'>
                <img className='postImage' alt='posted' src={singlePost[0].image} />
              </div>

              <div className='postBody'>
                <p className='postContent'>{singlePost[0].details}</p>

                {singlePost[0].author_id !== user.id ? null
                  : <button className='postDelete' onClick={() => this.deletePost()} >Delete Post</button>
                }
              </div>
            </div>
          </div>
        }
      </div>
    )
  };
};

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Post);
