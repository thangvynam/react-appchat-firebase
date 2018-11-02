import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import Home from '../Home/Home'
import firebaseConnect from '../../firebase/firebaseConnect';
class HomeContainer extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout() {

        firebaseConnect.auth().signOut();
    }
    render() {
        console.log(this.props.appReducer.user.email)
        var data = firebase.database().ref('Users/');
        data.once('value').then(function(snapshot){
            console.log(snapshot.val().length)
        })
        return (

            <Home/>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        appReducer: state.appReducer,
    }
}
export default connect(mapStateToProps, undefined)(HomeContainer);