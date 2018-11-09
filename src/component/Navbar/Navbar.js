import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'

import firebaseConnectCustomize from '../../firebase/firebaseConnect';
import { CHECK_USER } from '../../contsants/actionType';
    
class Navbar extends Component {
    constructor(props){
        super(props);
        this.signOut = this.signOut.bind(this);
    }
    signOut(){
        firebaseConnectCustomize.auth().signOut();
        this.props.firebase.update(`Users/${this.props.username}`, { status: "offline" })
    }
    render() {
            return (
                <div>
                    <nav className="navbar navbar-dark bg-primary fixed-top">
                        <div className="navbar-brand">
                            1512341 - App Chat
                        </div>
                        <div>
                            <label className="mr-2 text-white">{this.props.username}</label>
                            <button className="btn btn-dark" onClick={this.signOut}>Sign Out</button>
                        </div>
                    </nav>
                </div>
            );
    }
}
export default compose(
    firebaseConnect(), 
    connect(undefined, undefined))(Navbar)