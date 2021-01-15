class NewRestaurantForm extends React.Component {
  state = {
    username: "",
    password: "",
    about: ""
  }
  checkRequired = (userName, password, about) => {
      if (userName && password && about) {
        document.querySelector('#submitRest').style.display = 'block'
      } else {
        document.querySelector('#submitRest').style.display = 'none'
      }
    }
  changeState = (event) => {
    this.setState({
      username: document.querySelector('#name').value,
      password: document.querySelector('#password').value,
      about: document.querySelector('#about').value
    })
      let userName = false
      let password = false
      let about = false
      if(this.state.username.length < 5 || this.state.username.length > 16) {
          document.querySelector('#name').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#name').previousSibling.style.display = 'none'
          userName = true
        }
      if(this.state.password.length < 7 || this.state.password.length > 50) {
          document.querySelector('#password').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#password').previousSibling.style.display = 'none'
          password = true
        }
      if(this.state.about.length === 0) {
          document.querySelector('#about').previousSibling.style.display = 'block'
        } else {
          document.querySelector('#about').previousSibling.style.display = 'none'
          about = true
        }
    this.checkRequired(userName, password, about)
  }
  submitForm = () => {
    this.props.createRestaurant(this.state)
  }
  changeToLogin = () => {
    document.querySelector('#createDiv').style.display = 'none'
    document.querySelector('#loginDiv').style.display = 'block'
  }
  render = () => {
    return (
      <div className="mainContainer">
          <form onSubmit={this.submitForm} id='newRestForm'>
            <div className="container">
              <h1>Register</h1>
              <p id="topP">Please fill in this form to create an account.</p>

              <label htmlFor="name"><b>Name</b></label>
              <h6>This field is required and must be between 5 and 16 characters.</h6>
              <input type="text" placeholder="Enter Name" id="name" onChange={this.changeState}/>

              <label htmlFor="password"><b>Password</b></label>
              <h6>This field is required and must be between 7 and 16 characters.</h6>
              <input type="text" placeholder="Enter Password" id="password" onChange={this.changeState}/>

              <label htmlFor="about"><b>About</b></label>
              <h6>This field is required</h6>
              <input type="text" placeholder="Enter About" id="about" onChange={this.changeState}/>

              <p id="bottomP">By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p>

              <input className="myButton" type="submit" id="submitRest" value="Create Restaurant Profile" style={{display: 'none'}}/>
            </div>

            <div className="container signin">
              <p>Already have an account? <a onClick={this.changeToLogin}>Sign in</a>.</p>
            </div>
          </form>
      </div>
    )
  }
}
