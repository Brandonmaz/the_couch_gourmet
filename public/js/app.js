class Gatekeeper extends React.Component {

  showForm = () => {
    if(document.querySelector('#testApp').style.display === 'block') {
      document.querySelector('#testApp').style.display = 'none'
    } else {
      document.querySelector('#testApp').style.display = 'block'
    }
  }

  render = () => {
    return (
      <div id='appContainer'>
        <nav id='createRestDiv'>
          <div id='createShowButton' addClass='navBtn' onClick={this.showForm}>Create a Restaurant Profile</div>

        </nav>
        <div id='testApp' style={{display: 'none'}}></div>
        <div id='feedApp'></div>
      </div>
    )
  }
}


ReactDOM.render (
  <Gatekeeper></Gatekeeper>, document.querySelector('main')
)
