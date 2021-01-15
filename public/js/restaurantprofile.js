class RestaurantProfile extends React.Component {
  state = {
    username: "",
    password: "",
    about: ""
  }
  checkRequired = (userName, password, about, event) => {
    let thisForm = document.querySelector('#editRestForm')
      if (userName && password && about) {
        thisForm.lastChild.style.display = 'block'
      } else {
        thisForm.lastChild.style.display = 'none'
      }
    }
  changeState = (event) => {
    let thisForm = event.target.parentElement
    this.setState({
      username: thisForm.querySelector('#name').value,
      password: thisForm.querySelector('#password').value,
      about: thisForm.querySelector('#about').value
    })
      let userName = false
      let password = false
      let about = false
      if(thisForm.querySelector('#name').value.length < 5 || thisForm.querySelector('#name').value.length > 16) {
          thisForm.querySelector('#name').previousSibling.style.display = 'block'
        } else {
          thisForm.querySelector('#name').previousSibling.style.display = 'none'
          userName = true
        }
      if(thisForm.querySelector('#password').value.length < 7 || thisForm.querySelector('#password').value.length > 50) {
          thisForm.querySelector('#password').previousSibling.style.display = 'block'
        } else {
          thisForm.querySelector('#password').previousSibling.style.display = 'none'
          password = true
        }
      if(thisForm.querySelector('#about').value.length === 0) {
          thisForm.querySelector('#about').previousSibling.style.display = 'block'
        } else {
          thisForm.querySelector('#about').previousSibling.style.display = 'none'
          about = true
        }
    this.checkRequired(userName, password, about, event)
  }
  toggleEdit = (event) => {
    if(event.target.nextSibling.style.display === 'none') {
      event.target.nextSibling.style.display = 'block'
      this.changeState(event)
    } else {
      event.target.nextSibling.firstChild.reset()
      event.target.nextSibling.style.display = 'none'
      this.setState({
        username: "",
        password: "",
        about: ""
      })
    }
  }
  submitForm = (event) => {
    this.props.editRestaurant(this.state, event.target.getAttribute('_id'))
    event.target.reset()
    document.querySelector('.editDiv').style.display = 'none'
    this.setState({
      username: "",
      password: "",
      about: ""
    })
  }
  deletePost = (event) => {
    this.props.deleteRestaurant(event.target.getAttribute('_id'))
  }
  render = () => {
    return (
      <div id='currentRestaurantProfile'>
        <h4>{this.props.sessions.currentRestaurant.username}</h4>
        <h5>{this.props.sessions.currentRestaurant.about}</h5>
        <img src={this.props.sessions.currentRestaurant.password} alt={this.props.sessions.currentRestaurant.name}/>
        <button id='deleteButton' onClick={this.deletePost} _id={this.props.sessions.currentRestaurant._id}>Delete Restaurant Profile</button>
        <button id='editButton' onClick={this.toggleEdit}>Edit This Restaurant</button>
        <div className='editDiv container' style={{display: 'none'}}>
          <form onSubmit={this.submitForm} id='editRestForm' _id={this.props.sessions.currentRestaurant._id}>

              <label htmlFor="name"><b>Name</b></label>
              <h6>This field is required and must be between 5 and 16 characters.</h6>
              <input type="text" id="name" placeholder="Enter Name" onChange={this.changeState} defaultValue={this.props.sessions.currentRestaurant.username}/>
              <br/>
              <label htmlFor="password"><b>Password</b></label>
              <h6>Please enter a password to save your changes.</h6>
              <input type="text" id="password" placeholder="Enter Password" onChange={this.changeState}/>
              <br/>
              <label htmlFor="about"><b>About</b></label>
              <h6>This field is required</h6>
              <input type="text" id="about" placeholder="Enter About" onChange={this.changeState} defaultValue={this.props.sessions.currentRestaurant.about}/>

              <input className="myButton" type="submit" id="submitEdit" value="Edit Restaurant Profile" style={{display: 'block'}}/>
              </form>
          </div>
      </div>
     )
  }
}
