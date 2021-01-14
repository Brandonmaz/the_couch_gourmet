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
  render = () => {
    return (
      <div>
        <h1>New Restaurant Works</h1>
          <form onSubmit={this.submitForm} id='newRestForm'>
            <label htmlFor="name">Name</label>
            <h6>This field is required and must be between 5 and 16 characters.</h6>
            <input type="text" id="name" onChange={this.changeState}/>
            <br/>
            <label htmlFor="password">Password</label>
            <h6>This field is required and must be between 7 and 16 characters.</h6>
            <input type="text" id="password" onChange={this.changeState}/>
            <br/>
            <label htmlFor="about">About</label>
            <h6>This field is required</h6>
            <input type="text" id="about" onChange={this.changeState}/>
            <input type="submit" id="submitRest" value="Create Restaurant Profile" style={{display: 'none'}}/>
          </form>
      </div>
    )
  }
}
