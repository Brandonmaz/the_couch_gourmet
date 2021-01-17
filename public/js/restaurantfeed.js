class RestaurantFeed extends React.Component {
  state= {
    posts: []
  }
  createPost = (id, data) => {
    event.preventDefault()
    event.target.reset()
    event.target.style.display= "none"
    this.props.createReview(id, data)
  }
  toggleReviews = (event) => {
    let id = event.target.getAttribute('_id')
    event.persist()
    if(event.target.innerHTML === "Hide Reviews") {
      event.target.nextSibling.style.display = 'none'
      event.target.innerHTML = 'Reviews'
      this.setState({
        posts: []
      })
    } else {
      let reviewLists = document.querySelectorAll('#reviewList')
      for(let x = 0; x < reviewLists.length; x++) {
        reviewLists[x].style.display = 'none'
      }
      let viewButtons = document.querySelectorAll('.viewReviews')
      for(let z = 0; z < viewButtons.length; z++) {
        viewButtons[z].innerHTML = 'Reviews'
      }
        event.target.nextSibling.style.display = 'block'
        event.target.innerHTML = 'Hide Reviews'
        axios.get('/post/' + id).then(response => {
          this.setState({
            posts: response.data
          })
        })
    }

  }
  toggleAdd = (event) => {
    event.persist()
    if(event.target.innerHTML === "Cancel Post") {
      event.target.nextSibling.style.display = 'none'
      event.target.innerHTML = 'Post a Review'
    } else {
      let reviewDivs = document.querySelectorAll('#reviewFormDiv')
      for(let x = 0; x < reviewDivs.length; x++) {
        reviewDivs[x].style.display = 'none'
      }
      let reviewButtons = document.querySelectorAll('#addReview')
      for(let z = 0; z < reviewButtons.length; z++) {
        reviewButtons[z].innerHTML = 'Post a Review'
      }
        event.target.nextSibling.style.display = 'block'
        event.target.innerHTML = 'Cancel Post'
    }
  }


toggleModal = () => {
  event.persist()
  /* Get the modal */
  let modal = document.getElementById("myModal");

  /* Get the image and insert it inside the modal - use its "alt" text as a caption */
  let img = document.getElementById("myImg")
  let mImg = document.getElementById("img01")
  let cText = document.getElementById("caption")
  img.onclick = () => {
    modal.style.display = "block"
    mImg.src = this.src
    cText.innerHTML = this.alt
  }
}
toggleSpan = (event) => {
  /* Get the <span> element that closes the modal */
  let span = document.getElementsByClassName("close")[0]
  event.persist()
  /* When the user clicks on <span> (x), close the modal */
  span.onclick = () => {
    modal.style.display = "none"
  }
}
  render = () => {
    return (
      <div className="feedContainer">
        <div className="feedContent">
          {this.props.restaurants.map((restaurant) => {
            return(
              <div className="individualContent">
                <h2 id="restName">{restaurant.username}</h2>
                <img id="myImg" src={restaurant.img} alt={restaurant.about} onClick={this.toggleModal}/>
                <div id="myModal" className="modal">
                  <span className="close" onClick={this.toggleSpan}>&times;</span>
                  <img className="modal-content" id="img01" src={restaurant.img}/>
                  <div id="caption"></div>
                </div>
                  <button className='viewReviews' _id={restaurant._id} onClick={this.toggleReviews}>Reviews</button>
                  <ul id="reviewList" style={{display:'none'}}>
                    {restaurant.posts.map((post) => {
                      return(
                        <li key={post._id}>
                          <h4>{post.title}</h4>
                          <h4>{post.stars} Stars</h4>
                          <h6>By: {post.author}</h6>
                          <h5>{post.body}</h5>
                        </li>
                      )
                    })}
                  </ul>
                  {(this.props.sessions.currentUser._id !== "") ?
                    <div id='allowPostsDiv'>
                        <button id='addReview' _id={restaurant._id} onClick={this.toggleAdd}>Post a Review</button>
                        <div id='reviewFormDiv' style={{display: 'none'}}>
                         <NewPostForm sessions={this.props.sessions} restaurantName={restaurant.username} restaurantId={restaurant._id} createPost={this.createPost}></NewPostForm>
                         </div>
                     </div>
                     : null}
              </div>
            )})}
        </div>
      </div>
     )
  }
}
