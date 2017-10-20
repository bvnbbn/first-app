import React, { Component } from 'react';

const urlForUsername = username =>
  `https://api.github.com/users/${username}`

class GitHub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false
    }
  }

  componentDidMount() {
    fetch(urlForUsername(this.props.username))
      .then(response => {
	//fetch api does not look for error so we have to check 
	//for the error in the network request 
        if (!response.ok) {
          throw Error("Network request failed")
        }

        return response
      })
	//fetching json data in this method
      .then(d => d.json())
      .then(d => {
	// Now that we have the data. let's make it 			
	//available to our app by setting the state in the 
	//app
        this.setState({
          githubData: d
        })
      }, () => {
        this.setState({
          requestFailed: true // setting the state to be true if 					//network failed  
        })
      })
  }

  render() {

    if (this.state.requestFailed) return <p>Failed!</p>
    if (!this.state.githubData) return <p>Loading...</p>
    return (
      <div>
        <h2>{this.state.githubData.login}</h2>
	<h3>{this.state.githubData.url}</h3>
	<h3>{this.state.githubData.following_url}</h3>
	<h3>{this.state.githubData.organizations_url}</h3>
	<h3>{this.state.githubData.repos_url}</h3>

      </div>
    )
  }
}

export default GitHub;

