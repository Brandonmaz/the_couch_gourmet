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
  submitForm = () => {
    this.props.login(this.state)
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

              <input className="myButtonLogin" type="submit" id="submitLogin" value="Login" style={{display: 'none'}}/>
              <input className="myButtonCancel" type="submit" id="submitLogin" value="Cancel"/>

              <span className="psw">Forgot <a href="#">password?</a></span>
            </div>
        </form>
      </div>
    )
  }
}
