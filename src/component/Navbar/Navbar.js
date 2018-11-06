import React, { Component } from 'react';
import firebaseConnectCustomize from '../../firebase/firebaseConnect';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.signOut = this.signOut.bind(this);
    }
    signOut(){
        firebaseConnectCustomize.auth().signOut();
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

export default Navbar;