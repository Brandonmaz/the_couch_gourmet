class NewPostForm extends React.Component {
  state = {
    stars: "",
    title: "",
    body: "",
    author: "",
    authorId: ""
  }
  checkRequired = (stars, title, body) => {
      if (stars && title && body) {
        document.querySelector('#submitPost').style.display = 'block'
      } else {
        document.querySelector('#submitPost').style.display = 'none'
      }
    }
  changeState = (event) => {
    this.setState({
      title: document.querySelector('#title').value,
      stars: document.querySelector('#stars').value,
      body: document.querySelector('#body').value,
      author: this.props.sessions.currentUser.username,
      authorId: this.props.sessions.currentUser._id
    })
      let stars = false
      let title = false
      let body = false
      if(Number(this.state.stars.value) < 1 || Number(this.state.stars.value > 5)) {
          document.querySelector('#title').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#title').previousSibling.style.display = 'none'
          stars = true
        }
      if(this.state.title.length === 0) {
          document.querySelector('#stars').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#stars').previousSibling.style.display = 'none'
          title = true
        }
      if(this.state.body.length === 0) {
          document.querySelector('#body').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#body').previousSibling.style.display = 'none'
          body = true
        }
    this.checkRequired(stars, title, body)
  }
  submitForm = () => {
    this.props.createPost(this.props.restaurantId, this.state)
  }
  render = () => {
    return (
      <div className="mainContainer">
          <form onSubmit={this.submitForm} id='newPostForm'>
            <div className="container">
              <h1>Review</h1>
              <p id="topP">Leave a Review for {this.props.restaurantName}</p>

              <label htmlFor="title"><b>Review Title</b></label>
              <h6>This field is required.</h6>
              <input type="text" placeholder="Enter title" id="title" onChange={this.changeState}/>

              <label htmlFor="stars"><b>Number of Stars</b></label>
              <h6>Please enter a number between 1 and 5.</h6>
              <input type="text" placeholder="Enter number of stars" id="stars" onChange={this.changeState}/>

              <label htmlFor="body"><b>Review</b></label>
              <h6>This field is required.</h6>
              <input type="text" placeholder="Enter review here" id="body" onChange={this.changeState}/>

              <input type='hidden' value={this.props.sessions.currentUser.username} id='author'/>
              <input type='hidden' value={this.props.sessions.currentUser._id} id='authorId'/>

              <p id="bottomP">By posting a review you agree to abide by our <a href="#">Community Guidelines</a>.</p>

              <input className="myButton" type="submit" id="submitPost" value="Submit Review" style={{display: 'none'}}/>
            </div>

          </form>
      </div>
    )
  }
}
