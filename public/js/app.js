class Gatekeeper extends React.Component {
  state = {
    restaurants: []
  }
  showForm = () => {
    if(document.querySelector('#testApp').style.display === 'block') {
      document.querySelector('#testApp').style.display = 'none'
    } else {
      document.querySelector('#testApp').style.display = 'block'
    }
  }
  createRestaurant = (data) => {
    axios.post('/restaurant/', data).then(response => {
      this.setState({
        restaurants: response.data
      })
    })
    this.showForm()
  }
  render = () => {
    return (
      <div id='appContainer'>
        <nav id='createRestDiv'>
          <div id='createShowButton' className='navBtn' onClick={this.showForm}>Create a Restaurant Profile</div>

        </nav>
        <div id='testApp' style={{display: 'none'}}><NewRestaurantForm createRestaurant={this.createRestaurant}></NewRestaurantForm></div>
        <div id='feedApp'></div>
      </div>
    )
  }
}


ReactDOM.render (
  <Gatekeeper></Gatekeeper>, document.querySelector('main')
)
