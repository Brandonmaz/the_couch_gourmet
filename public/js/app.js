class App extends React.Component {

  showForm = () => {
    if(document.querySelector('#testApp').style.display === 'block') {
      document.querySelector('#testApp').style.display = 'none'
    } else {
      document.querySelector('#testApp').style.display = 'block'
    }
  }

  render = () => {
    return (
      <div>
        <h1 onClick={this.showForm}>App.js</h1>
        <div id='testApp'>
        </div>
      </div>
    )
  }
}


ReactDOM.render (
  <App></App>, document.querySelector('main')
)
