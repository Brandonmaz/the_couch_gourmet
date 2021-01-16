class UserFeed extends React.Component {
  toggleAdd = (event) => {

    if(event.target.innerHTML === "Cancel Edit") {
      event.target.nextSibling.style.display = 'none'
      event.target.innerHTML = 'Edit this Review'
    } else {
      let reviewDivs = document.querySelectorAll('#reviewEditDiv')
      for(let x = 0; x < reviewDivs.length; x++) {
        reviewDivs[x].style.display = 'none'
      }
      let reviewButtons = document.querySelectorAll('#editReview')
      for(let z = 0; z < reviewButtons.length; z++) {
        reviewButtons[z].innerHTML = 'Edit this Review'
      }
        event.target.nextSibling.style.display = 'block'
        event.target.innerHTML = 'Cancel Edit'
    }
  }
  editPost = (postid, restid, data) => {
    this.props.editReview(postid, restid, data)
  }
  render = () => {
    return (
      <div>
        <ul>
          {this.props.posts.map((post) => {
            return(
                <li key={post._id}>
                  <h4>{post.title}</h4>
                  <h4>{post.stars} Stars</h4>
                  <h6>By: {post.author}</h6>
                  <h5>{post.body}</h5>
                  {(this.props.sessions.currentUser._id !== "" && post) ?
                    <div id='allowPostsDiv'>
                        <button id='editReview' _id={post._id} onClick={this.toggleAdd}>Edit this Review</button>
                        <div id='reviewEditDiv' style={{display: 'none'}}>
                         <EditPostForm sessions={this.props.sessions} postid={post._id} posttitle={post.title} poststars={post.stars} postbody={post.body} editPost={this.editPost} restaurantName={post.restName} restaurantId={post.restId}></EditPostForm>
                         </div>
                     </div>
                     : null}
                </li>
              )
            })}
        </ul>
      </div>
     )
  }
}
