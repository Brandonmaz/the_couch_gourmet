class UserProfile extends React.Component {
  state = {
    username: "",
    password: "",
    about: "",
    favorites: ""
  }
  checkRequired = (userName, password, about, favorites) => {
      if (userName && password && about && favorites) {
        document.querySelector('#saveUser').style.display = 'block'
      } else {
        document.querySelector('#saveUser').style.display = 'none'
      }
    }
  changeState = () => {
    this.setState({
      username: document.querySelector('#userEditName').value,
      password: document.querySelector('#userEditPassword').value,
      about: document.querySelector('#userEditAbout').value,
      favorites: document.querySelector('#userEditFavorites').value
    })
      let userName = false
      let password = false
      let about = false
      let favorites = false
      if(this.state.username.length < 5 || this.state.username.length > 16) {
          document.querySelector('#userEditName').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#userEditName').previousSibling.style.display = 'none'
          userName = true
        }
      if(this.state.password.length < 7 || this.state.password.length > 50) {
          document.querySelector('#userEditPassword').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#userEditPassword').previousSibling.style.display = 'none'
          password = true
        }
      if(this.state.about.length === 0) {
          document.querySelector('#userEditAbout').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#userEditAbout').previousSibling.style.display = 'none'
          about = true
        }
        if(this.state.favorites.length === 0) {
            document.querySelector('#userEditFavorites').previousSibling.style.display = 'block'
          } else {
            document.querySelector('#userEditFavorites').previousSibling.style.display = 'none'
            favorites = true
          }
    this.checkRequired(userName, password, about, favorites)
  }
  submitForm = () => {
    this.props.editUser(this.props.sessions.currentUser._id, this.state)
    event.target.reset()
    this.setState({
      username: "",
      password: "",
      about: "",
      favorites: ""
    })
    this.showEdit()
  }
  showEdit = () => {
    if(document.querySelector('#editUserDiv').style.display === 'block') {
        document.querySelector('#editUserDiv').style.display = 'none'
        document.querySelector('#showHideEditButton').innerHTML = 'Edit My Profile'
        document.querySelector('#userProfileInfo').style.display = 'block'
        this.setState({
          username: "",
          password: "",
          about: "",
          favorites: ""
        })
    } else {
        document.querySelector('#userProfileInfo').style.display = 'none'
        document.querySelector('#editUserDiv').style.display = 'block'
        document.querySelector('#showHideEditButton').innerHTML = 'Remove Changes'
        this.setState({
          username: this.props.sessions.currentUser.username,
          password: "",
          about: this.props.sessions.currentUser.about,
          favorites: this.props.sessions.currentUser.favorites
        })
    }
  }
  submitEdit = (postid, restid, data) => {
    this.props.editReview(postid, restid, data)
  }
  deleteReview = (postid, restid) => {
    this.props.deleteReview(postid, restid)
  }
  render = () => {
    return (
      <div id='currentUserProfile'>
        <div id='editUserDiv' className="mainContainer" style={{display: 'none'}}>
            <form onSubmit={this.submitForm} id='editUserForm'>
              <div className="container">
                <h1>Edit Patron Profile</h1>
                <p id="topP">Make changes to your profile here!</p>

                <label htmlFor="userEditName"><b>Username</b></label>
                <h6 style={{display: 'none'}}>This field is required and must be between 5 and 16 characters.</h6>
                <input type="text" placeholder="Enter Name" id="userEditName" defaultValue={this.state.username} onChange={this.changeState}/>

                <label htmlFor="userEditPassword"><b>Password</b></label>
                <h6>You must enter a password to save your changes.</h6>
                <input type="text" placeholder="Enter Password" id="userEditPassword" defaultValue={this.state.password} onChange={this.changeState}/>

                <label htmlFor="userEditAbout"><b>About</b></label>
                <h6 style={{display: 'none'}}>This field is required</h6>
                <input type="text" placeholder="Enter About" id="userEditAbout" defaultValue={this.state.about} onChange={this.changeState}/>

                <label htmlFor="userEditFavorites"><b>Favorite Cuisines</b></label>
                <h6 style={{display: 'none'}}>This field is required</h6>
                <input type="text" placeholder="Enter Favorite Cuisines" defaultValue={this.state.favorites} id="userEditFavorites" onChange={this.changeState}/>


                <input className="myButton" type="submit" id="saveUser" value="Save Changes" style={{display: 'none'}}/>
              </div>
            </form>
        </div>
        <div className="card" id='userProfileInfo'>
        <h2 id="userProfile">User Profile Card</h2>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9dsmG0mf7G_IbvdSFt7UkWhDwnOsBjtbEmQ&usqp=CAU" className="avatar"/>
          <h1 className='profileValue'>{this.props.sessions.currentUser.username}</h1>
          <h3 className='profileCatagory'>About Me</h3>
          <h4 className='profileValue'>{this.props.sessions.currentUser.about}</h4>
          <h3 className='profileCatagory'>Favorite Cuisines</h3>
          <h4 className='profileValue'>{this.props.sessions.currentUser.favorites}</h4>
          <UserFeed editReview={this.submitEdit} posts={this.props.currentUserPosts} sessions={this.props.sessions} deleteReview={this.deleteReview}></UserFeed>
        </div>
        <div className="button">
          <button className="myButton profileButton" id='showHideEditButton' onClick={this.showEdit}>Edit My Profile</button>
        </div>
      </div>
    )
  }
}
