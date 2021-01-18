class NewUserForm extends React.Component {
  state = {
    username: "",
    password: "",
    about: "",
    favorites: ""
  }
  checkRequired = (userName, password, about, favorites) => {
      if (userName && password && about && favorites) {
        document.querySelector('#submitUser').style.display = 'block'
      } else {
        document.querySelector('#submitUser').style.display = 'none'
      }
    }
  changeState = (event) => {
    this.setState({
      username: document.querySelector('#usersName').value,
      password: document.querySelector('#userPassword').value,
      about: document.querySelector('#userAbout').value,
      favorites: document.querySelector('#userFavorites').value
    })
      let userName = false
      let password = false
      let about = false
      let favorites = false
      if(this.state.username.length < 5 || this.state.username.length > 16) {
          document.querySelector('#usersName').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#usersName').previousSibling.style.display = 'none'
          userName = true
        }
      if(this.state.password.length < 7 || this.state.password.length > 50) {
          document.querySelector('#userPassword').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#userPassword').previousSibling.style.display = 'none'
          password = true
        }
      if(this.state.about.length === 0) {
          document.querySelector('#userAbout').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#userAbout').previousSibling.style.display = 'none'
          about = true
        }
        if(this.state.favorites.length === 0) {
            document.querySelector('#userFavorites').previousSibling.style.display = 'block'
          } else {
            document.querySelector('#userFavorites').previousSibling.style.display = 'none'
            favorites = true
          }
    this.checkRequired(userName, password, about, favorites)
  }
  submitForm = () => {
    this.props.createUser(this.state)
  }
  changeToLogin = () => {
    document.querySelector('#newUserDiv').style.display = 'none'
    document.querySelector('#loginDiv').style.display = 'block'
  }
  render = () => {
    return (
      <div className="mainContainer">
          <form onSubmit={this.submitForm} id='newUserForm'>
            <div className="container">
              <h1>Register</h1>
              <p id="topP">Please fill in this form to create an account.</p>

              <label htmlFor="usersName"><b>Username</b></label>
              <h6>This field is required and must be between 5 and 16 characters.</h6>
              <input type="text" placeholder="Enter Name" id="usersName" onChange={this.changeState}/>

              <label htmlFor="userPassword"><b>Password</b></label>
              <h6>This field is required and must be between 7 and 16 characters.</h6>
              <input type="text" placeholder="Enter Password" id="userPassword" onChange={this.changeState}/>

              <label htmlFor="userAbout"><b>About</b></label>
              <h6>This field is required</h6>
              <textarea className="textarea" placeholder="Enter About" id="userAbout" onChange={this.changeState}></textarea>

              <label htmlFor="userFavorites"><b>Favorite Cuisines</b></label>
              <h6>This field is required</h6>
              <input type="text" placeholder="Enter Favorite Cuisines" id="userFavorites" onChange={this.changeState}/>

              <p id="bottomP">By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

              <input className="myButton" type="submit" id="submitUser" value="Create Patron Profile" style={{display: 'none'}}/>
            </div>

            <div className="container signin">
              <p>Already have an account? <a onClick={this.changeToLogin}>Sign in</a>.</p>
            </div>
          </form>
      </div>
    )
  }
}
