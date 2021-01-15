class RestaurantFeed extends React.Component {
  state = {
    username: "",
    password: "",
    about: ""
  }
  checkRequired = (userName, password, about, event) => {
    let thisForm = event.target.parentElement
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
  deletePost = (event) => {
    this.props.deleteRestaurant(event.target.getAttribute('_id'))
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
                  <button id='deleteButton' onClick={this.deletePost} _id={restaurant._id}>Delete Restaurant Profile</button>
                  <button id='editButton' onClick={this.toggleEdit}>Edit This Restaurant</button>
                  <div className='editDiv container' style={{display: 'none'}}>
                    <form onSubmit={this.submitForm} id='editRestForm' _id={restaurant._id}>

                        <label htmlFor="name"><b>Name</b></label>
                        <h6>This field is required and must be between 5 and 16 characters.</h6>
                        <input type="text" id="name" placeholder="Enter Name" onChange={this.changeState} defaultValue={restaurant.username}/>
                        <br/>
                        <label htmlFor="password"><b>Password</b></label>
                        <h6>This field is required and must be between 7 and 16 characters.</h6>
                        <input type="text" id="password" placeholder="Enter Password" onChange={this.changeState} defaultValue={restaurant.password}/>
                        <br/>
                        <label htmlFor="about"><b>About</b></label>
                        <h6>This field is required</h6>
                        <input type="text" id="about" placeholder="Enter About" onChange={this.changeState} defaultValue={restaurant.about}/>

                        <input className="myButton" type="submit" id="submitEdit" value="Edit Restaurant Profile" style={{display: 'block'}}/>
                        </form>
                    </div>
                </li>
              )})}
        </ul>
      </div>
     )
  }
}
