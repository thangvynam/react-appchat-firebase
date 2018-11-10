import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import firebase from 'firebase';

import firebaseConnectCustomize from '../../firebase/firebaseConnect';
import {googleProvider} from '../../firebase/firebaseConnect';

import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props) 
    }
    render() {
        return (
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div className="box">
                            <div className="shape1" />
                            <div className="shape2" />
                            <div className="shape3" />
                            <div className="shape4" />
                            <div className="shape5" />
                            <div className="shape6" />
                            <div className="shape7" />
                            <div className="float">
                                <div className="form">
                                    <div className="form-group">
                                        <label htmlFor="email" className="text-white">Email:</label><br />
                                        <input type="text" name="email" id="email" className="form-control" onChange={(event) => this.props.handleInputChangeEmail(event)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className="text-white">Password:</label><br />
                                        <input type="text" name="password" id="password" className="form-control" onChange={(event) => this.props.handleInputChangePassword(event)} />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" name="submit" className="btn btn-info btn-md" value="submit" onClick={this.props.login} />
                                        
                                        <input type="submit" name="submit1" className="btn btn-info btn-md" value="Google Login" onClick={this.props.googleLogin} style={{backgroundColor:"red"}}/>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        email: state.email,
        password: state.password,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    let password = "";
    let email = "";
    return {
        login: (event) => {
            event.preventDefault();
            firebaseConnectCustomize.auth().signInWithEmailAndPassword(email,password)
                .catch(function (error) {
                    var errorMessage = error.message;
                    console.log(errorMessage);
                })
                .then((user) => {  
                   let username =user.user.email.substring(0, user.user.email.indexOf("@"))
                    var userApp ={
                        username : username,
                        status : 'online',
                        img : "https://www.drupal.org/files/issues/default-avatar.png"
                    }
                    ownProps.firebase.set(`Users/${username}`, userApp)
                })
        },
        handleInputChangeEmail: (event) => {
            email = event.target.value;
        },
        handleInputChangePassword: (event) => {
            password = event.target.value;
        },
        googleLogin:()=>{
            
            firebase.auth().signInWithPopup(googleProvider).then(function(result) {
                let username =result.user.email.substring(0, result.user.email.indexOf("@"))
                    var userApp ={
                        username : username,
                        status : 'online',
                        img : result.user.photoURL
                    }
                    ownProps.firebase.set(`Users/${username}`, userApp)
              }).catch(function(error) {
                var errorMessage = error.message;
                console.log(errorMessage)
              });
        }
    }
}
export default compose(
    firebaseConnect(), 
    connect(mapStateToProps, mapDispatchToProps))(Login)

