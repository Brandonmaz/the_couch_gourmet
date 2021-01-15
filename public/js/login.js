class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  }
  checkRequired = (userName, password, about) => {
      if (userName && password) {
        document.querySelector('#submitLogin').style.display = 'block'
        document.querySelector('#enterLoginNotice').style.display = 'none'
      } else {
        document.querySelector('#submitLogin').style.display = 'none'
        document.querySelector('#enterLoginNotice').style.display = 'block'
      }
    }
  changeState = (event) => {
    this.setState({
      username: document.querySelector('#loginname').value,
      password: document.querySelector('#loginpassword').value
    })
      let userName = false
      let password = false
      let currentUserNameInput = document.querySelector('#loginname').value
      let currentPasswordInput = document.querySelector('#loginpassword').value
      if(currentUserNameInput.length !== 0) {
          userName = true
        }
      if(currentPasswordInput.length !== 0) {
          password = true
        }
    this.checkRequired(userName, password)
  }
  changeSubmit = (event) => {
    if (event.target.id === 'restaurantType') {
      document.querySelector('#patronType').checked = false
    } else {
      document.querySelector('#restaurantType').checked = false
    }
    event.target.checked = true
    if(document.querySelector('#restaurantType').checked === true) {
      document.querySelector('#loginForm').setAttribute('onSubmit', this.submitUser)
    } else {
      document.querySelector('#loginForm').setAttribute('onSubmit', this.submitForm)
    }
  }
  submitForm = () => {
    this.props.login(this.state)
  }
  submitUser = () => {
    this.props.loginUser(this.state)
  }
  render = () => {
    return (
      <div id='loginDiv'>
      <div id='enterLoginNotice'><h2>Login Form</h2></div>
        <form onSubmit={this.submitForm} className="sign-form" id='loginForm'>
        <div className="imgContainer">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9dsmG0mf7G_IbvdSFt7UkWhDwnOsBjtbEmQ&usqp=CAU" className="avatar"/>
        </div>
            <div className="sign-container">
              <label htmlFor="loginname"><b>Username</b></label>
              <input type="text" placeholder="Enter Username" id="loginname" onChange={this.changeState}/>

              <label htmlFor="loginpassword"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" id="loginpassword" onChange={this.changeState}/>

              <p>Are you logging into a Patron or a Restaurant Account?</p>
              <div>
                <input type="radio" id="restaurantType" onChange={this.changeSubmit}  className='loginSwitch'checked/>
                <label htmlFor="resaurantType"><b>Restaurant Account</b></label>
              </div>
              <div>
                <input type="radio" id="patronType" onChange={this.changeSubmit} className='loginSwitch'/>
                <label htmlFor="patronType"><b>Patron Account</b></label>
              </div>

              <input className="myButtonLogin" type="submit" id="submitLogin" value="Login" style={{display: 'none'}}/>
              <input className="myButtonCancel" type="submit" id="submitLogin" value="Cancel"/>

              <span className="psw">Forgot <a href="#">password?</a></span>
            </div>
        </form>
      </div>
    )
  }
}
