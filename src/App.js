import React, { Component } from 'react'
import AppBar from './components/AppBar'
import SignInPage from './components/SignInPage'

const baseURL = 'https://jobcoin.gemini.com/greyhound-abruptly/api/'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      loggedInAddress: '',
      balance: '',
      transactions: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin(address) {
    fetch(baseURL + 'addresses/' + address)
      .then(data => { return data.json()}, err => console.log(err))
      .then(parsedData => this.setState({ 
        isLoggedIn: true,
        loggedInAddress: address,
        balance: parsedData.balance,
        transactions: parsedData.transactions }), err => console.log(err))
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false,
      loggedInAddress: '',
      balance: '',
      transactions: ''
    })
  }

  render() {
    return (
      <div>
        { !this.state.isLoggedIn && 
          <SignInPage
            handleLogin={ this.handleLogin } /> }

        { this.state.isLoggedIn &&
          <AppBar 
            handleLogout={ this.handleLogout }
            address={ this.state.loggedInAddress } /> }
      </div>
    )
  }
}

