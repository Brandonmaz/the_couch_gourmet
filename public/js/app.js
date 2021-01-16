class Gatekeeper extends React.Component {
  state = {
    restaurants: [],
    sessions:{
      currentRestaurant: {
        username: "",
        about: ""
      },
      currentUser: {
        username: "",
        about: "",
        favorites: ""
      },
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
  editUser = (id, data) => {
    event.preventDefault()
    axios.put('/user/' + id, data).then(response => {
      console.log(response);
      this.setState({
        restaurants: response.data[0],
        sessions:{
          currentUser: response.data[1],
          currentRestaurant: {
            username: "",
            about: "",
            favorites: ""
          },
          error: ""
        }
      })
    })
  }
  editRestaurant = (data, id) => {
    event.preventDefault()
    axios.put('/restaurant/' + id, data).then(response => {
      console.log(response);
      this.setState({
        restaurants: response.data[0],
        sessions:{
          currentRestaurant: response.data[1],
          currentUser: {
            username: "",
            about: "",
            favorites: ""
          },
          error: ""
        }
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
    document.querySelector('#userProfile').style.display = 'none'
    document.querySelector('#restaurantProfile').style.display = 'none'
    document.querySelector('#feedApp').style.display = 'block'
  }
  login = (data) => {
    event.preventDefault()
    axios.post('/sessions/', data).then(response => {
      console.log(response.data);
      if((typeof response.data) === 'string') {
        this.setState({
          sessions:{
            currentRestaurant: {
              username: "",
              about: ""
            },
            currentUser: {
              username: "",
              about: "",
              favorites: ""
            },
            error: response.data
          }
        })
      } else {
        response.data.password= ''
        this.setState({
          sessions:{
            currentRestaurant: response.data,
            currentUser: {
              username: "",
              about: "",
              favorites: ""
            },
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
          sessions:{
            currentRestaurant: {
              username: "",
              about: ""
            },
            currentUser: {
              username: "",
              about: "",
              favorites: ""
            },
            error: response.data
          }
        })
      } else {
        response.data.password= ''
        this.setState({
          sessions:{
            currentUser: response.data,
            currentRestaurant: {
              username: "",
              about: ""
            },
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
          currentRestaurant: {
            username: "",
            about: ""
          },
          currentUser: {
            username: "",
            about: "",
            favorites: ""
          },
          error: ""
        }
    })
    this.resetNav()
  }
  viewMyRestaurantProfile = () => {
    document.querySelector('#restaurantProfile').style.display = 'block'
    document.querySelector('#feedApp').style.display = 'none'
  }
  viewMyPatronProfile = () => {
    document.querySelector('#userProfile').style.display = 'block'
    document.querySelector('#feedApp').style.display = 'none'
  }
  showFeed = () => {
    document.querySelector('#userProfile').style.display = 'none'
    document.querySelector('#restaurantProfile').style.display = 'none'
    document.querySelector('#feedApp').style.display = 'block'
  }
  render = () => {
    return (
      <div id='appContainer'>
        <ul id='loggedOutNav' className='navBar'>
          <li id='createShowButton' className='navBtn' onClick={this.showForm}>Create a Restaurant Profile</li>
          <li id='createUserButton' className='navBtn' onClick={this.showNewUser}>Create a Patron Profile</li>
          <li id='loginShowButton' className='navBtn active' onClick={this.showLogin}>Login</li>
        </ul>
        <ul id='restaurantNav' className='navBar' style={{display:'none'}}>
          <li className='navBtn' onClick={this.showFeed}>Feed</li>
          <li className='navBtn' id='currentRestaurantName' onClick={this.viewMyRestaurantProfile}>
          </li>
          <li id='logoutButton' className='navBtn active' onClick={this.logout}>Log Out</li>
        </ul>
        <ul id='patronNav' className='navBar' style={{display:'none'}}>
          <li className='navBtn' onClick={this.showFeed}>Feed</li>
          <li className='navBtn' id='currentPatronName' onClick={this.viewMyPatronProfile}>
          </li>
          <li id='logoutButton' className='navBtn active' onClick={this.logout}>Log Out</li>
        </ul>
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
        <div id='userProfile' style={{display: 'none'}}>
          <UserProfile editUser={this.editUser} sessions={this.state.sessions}></UserProfile>
        </div>
        <div id='restaurantProfile' style={{display: 'none'}}>
          <RestaurantProfile editRestaurant={this.editRestaurant} sessions={this.state.sessions}></RestaurantProfile>
        </div>
      </div>
    )
  }
}


ReactDOM.render (
  <Gatekeeper></Gatekeeper>, document.querySelector('main')
)
