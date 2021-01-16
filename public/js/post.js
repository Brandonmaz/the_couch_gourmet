class NewPostForm extends React.Component {
  state = {
    stars: "",
    title: "",
    body: "",
    author: "",
    authorId: ""
  }
  checkRequired = (event) => {
    let stars = false
    let title = false
    let body = false
    if(Number(event.target.parentElement.querySelector('#stars').value) < 1 || Number(event.target.parentElement.querySelector('#stars').value) > 5) {
        event.target.parentElement.querySelector('#starsWarning').style.display = 'block'
      } else {
        event.target.parentElement.querySelector('#starsWarning').style.display = 'none'
        console.log('should have changed stars');
        stars = true
      }
    if(event.target.parentElement.querySelector('#title').value.length === 0) {
        event.target.parentElement.querySelector('#titleWarning').style.display = 'block'
      } else {
        event.target.parentElement.querySelector('#titleWarning').style.display = 'none'
        title = true
      }
    if(event.target.parentElement.querySelector('#body').value.length === 0) {
        event.target.parentElement.querySelector('#bodyWarning').style.display = 'block'
      } else {
        event.target.parentElement.querySelector('#bodyWarning').style.display = 'none'
        body = true
      }
      if (stars && title && body) {
        event.target.parentElement.querySelector('#submitPost').style.display = 'block'
      } else {
        event.target.parentElement.querySelector('#submitPost').style.display = 'none'
      }
    }
  changeState = (event) => {
    event.persist()
        this.setState({
          title: event.target.parentElement.querySelector('#title').value,
          stars: event.target.parentElement.querySelector('#stars').value,
          body: event.target.parentElement.querySelector('#body').value,
          author: this.props.sessions.currentUser.username,
          authorId: this.props.sessions.currentUser._id
        })
    this.checkRequired(event)
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
              <h6 id="titleWarning">This field is required.</h6>
              <input type="text" placeholder="Enter title" id="title" onChange={this.changeState}/>

              <label htmlFor="stars"><b>Number of Stars</b></label>
              <h6 id='starsWarning'>Please enter a number between 1 and 5.</h6>
              <input type="text" placeholder="Enter number of stars" id="stars" onChange={this.changeState}/>

              <label htmlFor="body"><b>Review</b></label>
              <h6 id="bodyWarning">This field is required.</h6>
              <input type="text" placeholder="Enter review here" id="body" onKeyDown={this.changeState}/>

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
