class RestaurantProfile extends React.Component {
  state = {
    username: "",
    password: "",
    about: "",
    img: ""
  }
  checkImage = () => {
    if(this.state.img === "") {
      this.setState({
        img: this.props.sessions.currentRestaurant.img
      })
    }
  }
  checkRequired = (userName, password, about, event) => {
    let thisForm = document.querySelector('#editRestForm')
      if (userName && password && about) {
        thisForm.lastChild.style.display = 'block'
        this.checkImage()
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
      event.target.nextSibling.style.display = 'block'
      event.target.innerHTML = 'Cancel Edit'
      this.changeState(event)
    } else {
      event.target.innerHTML = 'Edit This Restaurant'
      document.querySelector('#editRestForm').reset()
      event.target.nextSibling.style.display = 'none'
      this.setState({
        username: "",
        password: "",
        about: "",
        img: ""
      })
    }
  }
  submitForm = (event) => {
    this.props.editRestaurant(this.state, event.target.getAttribute('_id'))
    event.target.reset()
    document.querySelector('.editDiv').style.display = 'none'
    this.setState({
      username: "",
      password: "",
      about: "",
      img: ""
    })
  }
  deletePost = (event) => {
    this.props.deleteRestaurant(event.target.getAttribute('_id'))
  }
  openWidget = () => {
    var myWidget = cloudinary.createUploadWidget({
    cloudName: 'onelinrprofilepics',
    uploadPreset: 'rlrj84dh', public_id: this.props.sessions.currentRestaurant._id}, (error, result) => {
      if (!error && result && result.event === "success") {
        this.setState({
          img: result.info.url
        })
        console.log('Done! Here is the image info: ', result.info);
      }
    }
    )
    myWidget.open()
  }

  render = () => {
    return (
      <div id='currentRestaurantProfile'>
        <div className="card">
          <h2 id="userProfile">Restaurant Profile Card</h2>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9dsmG0mf7G_IbvdSFt7UkWhDwnOsBjtbEmQ&usqp=CAU" className="avatar"/>
          <img src={this.props.sessions.currentRestaurant.password} alt={this.props.sessions.currentRestaurant.name}/>
          <h1>{this.props.sessions.currentRestaurant.username}</h1>
          <h3>About Our Restaurant</h3>
          <h4>{this.props.sessions.currentRestaurant.about}</h4>



          <button className="myButton restButton" id='editButton' onClick={this.toggleEdit}>Edit This Restaurant</button>

          <div className='editDiv container profileDiv' style={{display: 'none'}}>
            <button className="myButton" id="upload_widget" class="cloudinary-button" onClick={this.openWidget}>Upload Profile Image</button>
            <form onSubmit={this.submitForm} id='editRestForm' _id={this.props.sessions.currentRestaurant._id}>

                <label htmlFor="name"><b>Name</b></label>
                <h6>This field is required and must be between 5 and 16 characters.</h6>
                <input type="text" id="name" placeholder="Enter Name" onChange={this.changeState} defaultValue={this.props.sessions.currentRestaurant.username}/>
                <br/>
                <label htmlFor="password"><b>Password</b></label>
                <h6>Please enter a password to save your changes.</h6>
                <input type="text" id="password" placeholder="Enter Password" onChange={this.changeState}/>
                <br/>
                <label htmlFor="about"><b>About</b></label>
                <h6>This field is required</h6>
                <textarea className="textarea" id="about" placeholder="Enter About" onChange={this.changeState} defaultValue={this.props.sessions.currentRestaurant.about}></textarea>

                <input className="myButton" type="submit" id="submitEdit" value="Edit Restaurant Profile" style={{display: 'block'}}/>
                </form>
            </div>
            <button className="myButton restButton" id='deleteButton' onClick={this.deletePost} _id={this.props.sessions.currentRestaurant._id}>Delete Restaurant Profile</button>
        </div>
      </div>
     )
  }
}
