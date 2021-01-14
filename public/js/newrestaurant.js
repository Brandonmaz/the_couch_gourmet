class NewRestaurantForm extends React.Component {



  render = () => {
    return (
      <div>
        <h1>New Restaurant Works</h1>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={this.changeState}/>
            <br/>
            <label htmlFor="password">Password</label>
            <input type="text" id="password" onChange={this.changeState}/>
            <br/>
            <label htmlFor="about">About</label>
            <input type="text" id="about" onChange={this.changeState}/>
          </form>
      </div>
    )
  }
}



ReactDOM.render(
  <NewRestaurantForm></NewRestaurantForm>, document.querySelector('#feedApp')
)
