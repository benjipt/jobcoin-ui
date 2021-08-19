import React, { Component } from 'react'
import AddressName from './AddressName'
import SignOutBtn from './SignOutBtn'

export default class AppBar extends Component {
    render() {
        return (
            <div className="container-fluid pt-2 pb-2 d-flex flex-row justify-content-between app-bar app-bar-border">
                <AddressName address={ this.props.address } />
                <SignOutBtn handleLogout={ this.props.handleLogout } />
            </div>
        )
    }
}
