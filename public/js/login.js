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
          <form onSubmit={this.submitForm} id='loginForm'>
            <label htmlFor="loginname">Username</label>
            <input type="text" id="loginname" onChange={this.changeState}/>
            <br/>
            <label htmlFor="loginpassword">Password</label>
            <input type="password" id="loginpassword" onChange={this.changeState}/>
            <br/>
            <div id='enterLoginNotice'>Please Enter a Username and Password</div>
            <input type="submit" id="submitLogin" value="Login" style={{display: 'none'}}/>
          </form>
      </div>
    )
  }
}
