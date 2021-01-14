class RestaurantFeed extends React.Component {
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

  render = () => {
    return (
      <div>
      {this.state.restaurants.map((restaurant) => {
        return(
          <ul>
            <li>{restaurant.name}</li>
            <li>{restaurant.about}</li>
            <img src={restaurant.image} alt={restaurant.name}/>
          </ul>
        )
      })}
      </div>
    )
  }
}



ReactDOM.render(
  <RestaurantFeed></RestaurantFeed>, document.querySelector('#feedApp')
)
