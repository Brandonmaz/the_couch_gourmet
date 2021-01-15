class Gatekeeper extends React.Component {
  state = {
    restaurants: [],
    sessions:{
      currentRestaurant: {},
      currentUser: {},
      error: ""
    }
  }
  componentDidMount = () => {
    axios.get('/restaurant/').then(response => {
      this.setState({
        restaurants: response.data
      })
    })
  }
  showForm = () => {
    if(document.querySelector('#createDiv').style.display === 'block') {
      document.querySelector('#createDiv').style.display = 'none'
    } else {
      document.querySelector('#createDiv').style.display = 'block'
      document.querySelector('#newUserDiv').style.display = 'none'
      document.querySelector('#loginDiv').style.display = 'none'
    }
  }
  showLogin = () => {
    if(document.querySelector('#loginDiv').style.display === 'block') {
      document.querySelector('#loginDiv').style.display = 'none'
    } else {
      document.querySelector('#loginDiv').style.display = 'block'
      document.querySelector('#newUserDiv').style.display = 'none'
      document.querySelector('#createDiv').style.display = 'none'
    }
  }
  showNewUser = () => {
    if(document.querySelector('#newUserDiv').style.display === 'block') {
      document.querySelector('#newUserDiv').style.display = 'none'
    } else {
      document.querySelector('#newUserDiv').style.display = 'block'
      document.querySelector('#createDiv').style.display = 'none'
      document.querySelector('#loginDiv').style.display = 'none'
    }
  }
  createRestaurant = (data) => {
    event.preventDefault()
    axios.post('/restaurant/', data).then(response => {
      this.setState({
        restaurants: response.data
      })
      document.querySelector('#newRestForm').reset()
      this.showForm()
    })
  }
  createUser = (data) => {
    event.preventDefault()
    axios.post('/user/', data).then(response => {
      this.setState({
        restaurants: response.data
      })
      document.querySelector('#newUserForm').reset()
      this.showNewUser()
    })
  }
  editRestaurant = (data, id) => {
    event.preventDefault()
    axios.put('/restaurant/' + id, data).then(response => {
      this.setState({
        restaurants: response.data
      })
    })
  }
  deleteRestaurant = (id) => {
    axios.delete('/restaurant/' + id).then(response => {
      this.setState({
        restaurants: response.data
      })
    })
  }
  changeNav = (string) => {
    document.querySelector('#loggedOutNav').style.display = 'none'
    if(string === 'user') {
      document.querySelector('#currentPatronName').innerHTML = this.state.sessions.currentUser.username
      document.querySelector('#patronNav').style.display = 'block'
    } else {
      document.querySelector('#currentRestaurantName').innerHTML = this.state.sessions.currentRestaurant.username
      document.querySelector('#restaurantNav').style.display = 'block'
    }
  }
  resetNav = () => {
    document.querySelector('#currentPatronName').innerHTML = ''
    document.querySelector('#patronNav').style.display = 'none'
    document.querySelector('#currentRestaurantName').innerHTML = ''
    document.querySelector('#restaurantNav').style.display = 'none'
    document.querySelector('#loggedOutNav').style.display = 'block'
  }
  login = (data) => {
    event.preventDefault()
    axios.post('/sessions/', data).then(response => {
      console.log(response.data);
      if((typeof response.data) === 'string') {
        this.setState({
          sessions: {
            error: response.data
          }
        })
      } else {
        response.data.password= ''
        this.setState({
          sessions:{
            currentRestaurant: response.data,
            error: ""
          }
        })
        document.querySelector('#loginForm').reset()
        document.querySelector('#loginDiv').style.display = 'none'
        this.changeNav('restaurant')
      }
    })
  }
  loginUser = (data) => {
    event.preventDefault()
    axios.post('/user_sessions/', data).then(response => {
      console.log(response.data);
      if((typeof response.data) === 'string') {
        this.setState({
          sessions: {
            error: response.data
          }
        })
      } else {
        response.data.password= ''
        this.setState({
          sessions:{
            currentUser: response.data,
            error: ""
          }
        })
        document.querySelector('#loginForm').reset()
        document.querySelector('#loginDiv').style.display = 'none'
        this.changeNav('user')
      }
    })
  }
  logout = () => {
    this.setState({
      sessions:{
        currentRestaurant: {},
        currentUser: {},
        error: ""
      }
    })
    this.resetNav()
  }
  render = () => {
    return (
      <div id='appContainer'>
        <nav id='loggedOutNav' className='navBar'>
          <div id='createShowButton' className='navBtn' onClick={this.showForm}>Create a Restaurant Profile</div>
          <div id='createUserButton' className='navBtn' onClick={this.showNewUser}>Create a Patron Profile</div>
          <div id='loginShowButton' className='navBtn' onClick={this.showLogin}>Login</div>
        </nav>
        <nav id='restaurantNav' className='navBar' style={{display:'none'}}>
          <div className='currentUserName' id='currentRestaurantName'>
          </div>
          <div id='logoutButton' className='navBtn' onClick={this.logout}>Log Out</div>
        </nav>
        <nav id='patronNav' className='navBar' style={{display:'none'}}>
          <div className='currentUserName' id='currentPatronName'>
          </div>
          <div id='logoutButton' className='navBtn' onClick={this.logout}>Log Out</div>
        </nav>
        <div id='createDiv' style={{display: 'none'}}>
          <NewRestaurantForm createRestaurant={this.createRestaurant}></NewRestaurantForm>
        </div>
        <div id='newUserDiv' style={{display: 'none'}}>
          <NewUserForm createUser={this.createUser}></NewUserForm>
        </div>
        <div id='loginDiv' style={{display: 'none'}}>
          <LoginForm login={this.login} loginUser={this.loginUser} error={this.state.sessions.error}></LoginForm>
        </div>
        <div id='feedApp'>
          <RestaurantFeed restaurants={this.state.restaurants} editRestaurant={this.editRestaurant} deleteRestaurant={this.deleteRestaurant}></RestaurantFeed>
        </div>
      </div>
    )
  }
}


ReactDOM.render (
  <Gatekeeper></Gatekeeper>, document.querySelector('main')
)
