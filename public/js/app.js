class Gatekeeper extends React.Component {
  state = {
    restaurants: []
  }
  componentDidMount = () => {
    axios.get('/restaurant/').then(response => {
      this.setState({
        restaurants: response.data
      })
    })
  }
  showForm = () => {
    if(document.querySelector('#testApp').style.display === 'block') {
      document.querySelector('#testApp').style.display = 'none'
    } else {
      document.querySelector('#testApp').style.display = 'block'
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
  render = () => {
    return (
      <div id='appContainer'>
        <nav id='createRestDiv'>
          <div id='createShowButton' className='navBtn' onClick={this.showForm}>Create a Restaurant Profile</div>

        </nav>
        <div id='testApp' style={{display: 'none'}}>
          <NewRestaurantForm createRestaurant={this.createRestaurant}></NewRestaurantForm>
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
