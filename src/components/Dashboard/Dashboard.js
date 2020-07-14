import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAllPosts } from '../../redux/actionCreators'
import { Link } from 'react-router-dom'
import './Dashboard.css';


class Dashboard extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      myPosts: false
    };

    this.getPosts = this.getPosts.bind(this)
  };

  componentDidMount = () => {
    console.log('hit')
    axios
      .get('/api/posts')
      .then(res => {
        this.props.setAllPosts(res.data)
      })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { myPosts, search } = this.state
    console.log(myPosts)
    if (prevState.myPosts !== myPosts || prevState.search !== search) {
      this.getPosts()
    }
  }

  getPosts() {
    const { search, myPosts } = this.state,
      { user } = this.props
    // console.log(user.id)
    axios
      .get(`/api/posts/${user.id}?userposts=${myPosts}&search=${search}`)
      .then(res => this.props.setAllPosts(res.data))
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  checkValue = () => {
    const { myPosts } = this.state
    this.setState({
      myPosts: !myPosts
    })
  };

  resetValues = () => {
    this.setState({
      search: '',
      myPosts: false
    })
  }

  render() {
    const { search, myPosts } = this.state
    const { posts } = this.props
    const mappedPosts = posts.map((e, i) => {
      return (
        <Link className='postLink' to={`/post/${e.post_id}`} key={i} style={{ textDecoration: 'none' }}>
          <div className='post'>
            <div className='postTitle'>
              <h1 className='itsTheTitle'>{e.title}</h1>
            </div>

            <div className='postUserInfo'>
              <div className='usernamePost'>
                <p>{`by ${e.username}`}</p>
              </div>

              <div className='postProfilePic'>
                <img className='img' alt='profile' src={e.profile_picture} />
              </div>
            </div>
          </div>
        </Link>
      )
    })
    return (
      <div className='dashboard'>
        <div className='dashBar' >
          <div className='dashInput'>
            <input className='dashInput' name='search' value={search} placeholder='Search Posts' onChange={(e) => this.handleChange(e)} />
          </div>

          <div className='dashNavButtons' >
            <button className='resetButton' onClick={() => this.resetValues()}>Reset</button>
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

        <div className='dashHolder'>
          {mappedPosts}
        </div>
      </div>
    )
  };
};

function mapStateToProps(state) {
  // console.log(state.user)
  return {
    posts: state.posts,
    user: state.user
  }
}

export default connect(mapStateToProps, { setAllPosts })(Dashboard);
