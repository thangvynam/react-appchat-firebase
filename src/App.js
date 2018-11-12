import React, { Component } from 'react';
import { connect } from 'react-redux';


import Login from './component/Login/Login';
import firebaseconnect from './firebase/firebaseConnect';
import HomeContainer from './component/HomeContainer/HomeContainer';
import { CHECK_USER } from './contsants/actionType';

class App extends Component {

  componentDidMount() {
    this.props.authListener();
    //window.addEventListener("beforeunload", this.onUnload)
  }
  // onUnload(event) { // the method that will be used for both add and remove event
  //   console.log("sadas")
  //   event.returnValue = "Hellooww"
  // }
  render() {
    return (
      this.props.appReducer.user != null ? <HomeContainer /> : <Login />
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    appReducer: state.appReducer,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authListener() {

      firebaseconnect.auth().onAuthStateChanged((user) => {
        if (user) {
          dispatch({ type: CHECK_USER, user: user });
        } else {
          dispatch({ type: CHECK_USER, user: null });
        }

      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
