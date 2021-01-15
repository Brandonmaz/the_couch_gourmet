class RestaurantFeed extends React.Component {
  state = {
    username: "",
    password: "",
    about: ""
  }
  checkRequired = (userName, password, about) => {
      if (userName && password && about) {
        document.querySelector('#submitEdit').style.display = 'block'
      } else {
        document.querySelector('#submitEdit').style.display = 'none'
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
    this.checkRequired(userName, password, about)
  }
  toggleEdit = (event) => {
    if(event.target.nextSibling.style.display === 'none') {
      let allRests = document.querySelectorAll('.editDiv')
      for(let i = 0; i < allRests.length; i++) {
        allRests[i].style.display = 'none'
      }
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
    event.target.style.display = 'none'
    this.setState({
      username: "",
      password: "",
      about: ""
    })
  }
  render = () => {
    return (
      <div>
        <ul>
          {this.props.restaurants.map((restaurant) => {
            return(
                <li>
                  <h4>{restaurant.username}</h4>
                  <h5>{restaurant.about}</h5>
                  <img src={restaurant.password} alt={restaurant.name}/>
                  <button id='editButton' onClick={this.toggleEdit}>Edit This Restaurant</button>
                  <div className='editDiv' style={{display: 'none'}}>
                    <form onSubmit={this.submitForm} id='editRestForm' _id={restaurant._id}>
                      <label htmlFor="name">Name</label>
                      <h6>This field is required and must be between 5 and 16 characters.</h6>
                      <input type="text" id="name" onChange={this.changeState} defaultValue={restaurant.username}/>
                      <br/>
                      <label htmlFor="password">Password</label>
                      <h6>This field is required and must be between 7 and 16 characters.</h6>
                      <input type="text" id="password" onChange={this.changeState} defaultValue={restaurant.password}/>
                      <br/>
                      <label htmlFor="about">About</label>
                      <h6>This field is required</h6>
                      <input type="text" id="about" onChange={this.changeState} defaultValue={restaurant.about}/>
                      <input type="submit" id="submitEdit" value="Edit Restaurant Profile" style={{display: 'none'}}/>
                    </form>
                  </div>
                </li>
              )})}
        </ul>
      </div>
     )
  }
}
