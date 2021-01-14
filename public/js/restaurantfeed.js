class RestaurantFeed extends React.Component {
  state = {
    restaurants: []
  }
  componentDidMount = () => {
    axios.('/restaurant/').then(response => {
      this.setState({
        restaurants: response.data
      })
    })
  }

  render = () => {
    return (
      <h1>Feed Works</h1>
    )
  }
}



ReactDOM.render(
  <RestaurantFeed></RestaurantFeed>, document.querySelector('#feedApp')
)
