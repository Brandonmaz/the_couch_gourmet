class RestaurantFeed extends React.Component {
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
                </li>
              )})}
        </ul>
      </div>
     )
  }
}
