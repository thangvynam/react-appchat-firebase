import React, { Component } from 'react';
import { connect } from 'react-redux';

import firebaseConnect  from '../firebase/firebaseConnect';
class Home extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        
        firebaseConnect.auth().signOut();
    }
    render() {
        console.log(this.props.appReducer.user.email)
        return (
            <div>
                <p>Home</p>
                <button onClick={this.logout}>Log out</button> <br />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
      appReducer: state.appReducer,
    }
  }
export default connect(mapStateToProps, undefined)(Home);