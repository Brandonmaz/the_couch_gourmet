class EditPostForm extends React.Component {
  state = {
    stars: "",
    title: "",
    body: "",
    author: "",
    authorId: "",
    restName: "",
    restId: ""
  }
  checkRequired = (event) => {
    let stars = true
    let title = true
    let body = true
    if(Number(event.target.parentElement.querySelector('#editStars').value) < 1 || Number(event.target.parentElement.querySelector('#editStars').value) > 5) {
        event.target.parentElement.querySelector('#editStarsWarning').style.display = 'block'
        stars = false
      } else {
        event.target.parentElement.querySelector('#editStarsWarning').style.display = 'none'
        console.log('should have changed stars');
      }
    if(event.target.parentElement.querySelector('#editTitle').value.length === 0) {
        event.target.parentElement.querySelector('#editTitleWarning').style.display = 'block'
        title = false
      } else {
        event.target.parentElement.querySelector('#editTitleWarning').style.display = 'none'
      }
    if(event.target.parentElement.querySelector('#editBody').value.length === 0) {
        event.target.parentElement.querySelector('#editBodyWarning').style.display = 'block'
        body = false
      } else {
        event.target.parentElement.querySelector('#editBodyWarning').style.display = 'none'
      }
      if (stars && title && body) {
        event.target.parentElement.querySelector('#editReview').style.display = 'block'
      } else {
        event.target.parentElement.querySelector('#editReview').style.display = 'none'
      }
    }
  changeState = (event) => {
    event.persist()
        this.setState({
          title: event.target.parentElement.querySelector('#editTitle').value,
          stars: event.target.parentElement.querySelector('#editStars').value,
          body: event.target.parentElement.querySelector('#editBody').value,
          author: this.props.sessions.currentUser.username,
          authorId: this.props.sessions.currentUser._id,
          restName: this.props.restaurantName,
          restId: this.props.restaurantId
        })
    this.checkRequired(event)
  }
  submitForm = (event) => {
    event.persist()
    this.props.editPost(this.props.postid, this.props.restaurantId, this.state)
    event.preventDefault()
    event.target.reset()
    event.target.parentElement.parentElement.previousSibling.innerHTML = 'Edit this Review'
    event.target.parentElement.parentElement.style.display= "none"
  }
  render = () => {
    return (
      <div className="mainContainer">
          <form onSubmit={this.submitForm} id='editPostForm'>
            <div className="container">
              <p id="topP">Edit Your Review</p>

              <label htmlFor="editTitle"><b>Review Title</b></label>
              <h6 id="editTitleWarning" style={{display:'none'}}>This field is required.</h6>
              <input type="text" placeholder="Enter title" id="editTitle" onChange={this.changeState} defaultValue={this.props.posttitle}/>

              <label htmlFor="editStars"><b>Number of Stars</b></label>
              <h6 id='editStarsWarning' style={{display:'none'}}>Please enter a number between 1 and 5.</h6>
              <input type="text" placeholder="Enter number of stars" id="editStars" onChange={this.changeState} defaultValue={this.props.poststars}/>

              <label htmlFor="editBody"><b>Review</b></label>
              <h6 id="editBodyWarning" style={{display:'none'}}>This field is required.</h6>
              <input type="text" placeholder="Enter review here" id="editBody" onChange={this.changeState} defaultValue={this.props.postbody}/>

              <input type='hidden' value={this.props.sessions.currentUser.username} id='editAuthor'/>
              <input type='hidden' value={this.props.sessions.currentUser._id} id='editAuthorId'/>
              <input type='hidden' value={this.props.sessions.restuarantName} id='restName'/>
              <input type='hidden' value={this.props.sessions.currentUser.restaurantId} id='restId'/>

              <p id="bottomP">By posting a review you agree to abide by our <a href="#">Community Guidelines</a>.</p>

              <input className="myButton" type="submit" id="editReview" value="Submit Changes" style={{display:'none'}}/>
            </div>
          </form>
      </div>
    )
  }
}
