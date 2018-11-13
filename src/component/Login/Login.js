import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect } from 'react-redux-firebase'
import firebase from 'firebase';
import { ToastContainer, ToastStore } from 'react-toasts';

import firebaseConnectCustomize from '../../firebase/firebaseConnect';
import { googleProvider } from '../../firebase/firebaseConnect';

class Login extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                        <form className="login100-form validate-form">
                            <span className="login100-form-title p-b-55">
                                Login
                            </span>
                            <div className="wrap-input100 validate-input m-b-16" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Email" onChange={(event) => this.props.handleInputChangeEmail(event)} />
                                <span className="focus-input100" />
                                <span className="symbol-input100">
                                    <span className="lnr lnr-envelope" />
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input m-b-16" data-validate="Password is required">
                                <input className="input100" type="password" name="pass" placeholder="Password" onChange={(event) => this.props.handleInputChangePassword(event)} />
                                <span className="focus-input100" />
                                <span className="symbol-input100">
                                    <span className="lnr lnr-lock" />
                                </span>
                            </div>
                            <div className="container-login100-form-btn p-t-25">
                                <button className="login100-form-btn" onClick={this.props.login}>
                                    Login
                                </button>
                                <ToastContainer store={ToastStore} />
                            </div>
                            <div className="text-center w-full p-t-42 p-b-22">
                                <span className="txt1">
                                    Or login with
                                </span>
                            </div>
                            <a className="btn-google m-b-10" onClick={this.props.googleLogin} style={{ cursor: "pointer", marginLeft: "5em" }}>
                                <img src="images/icons/icon-google.png" alt="GOOGLE" />
                                <span style={{ color: "red" }}>Google</span>
                            </a>
                            <div className="text-center w-full p-t-115">
                                <span className="txt1">
                                    Not a member?
                                </span>
                                <a className="txt1 bo1 hov1" onClick={this.props.signup}>
                                    <span className="txt1" style={{cursor:"pointer"}}>
                                        Sign up now
                                    </span>
                                </a>
                            </div>
                        </form>
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
            firebaseConnectCustomize.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    let username = user.user.email.substring(0, user.user.email.indexOf("@"))
                    var userApp = {
                        username: username,
                        status: 'online',
                        img: "https://www.drupal.org/files/issues/default-avatar.png" // deafult image
                    }
                    ownProps.firebase.set(`Users/${username}`, userApp)
                })
                .catch(function (error) {
                    var errorMessage = error.message;
                    ToastStore.error(errorMessage)
                })
        },
        handleInputChangeEmail: (event) => {
            email = event.target.value;
        },
        handleInputChangePassword: (event) => {
            password = event.target.value;
        },
        googleLogin: () => {
            firebase.auth().signInWithPopup(googleProvider).then(function (result) {
                let username = result.user.email.substring(0, result.user.email.indexOf("@"))
                var userApp = {
                    username: username,
                    status: 'online',
                    img: result.user.photoURL
                }
                ownProps.firebase.set(`Users/${username}`, userApp)
            }).catch(function (error) {
                var errorMessage = error.message;
                console.log(errorMessage)
            });
        },
        signup:()=>{
            ToastStore.error("This feature is not set up");
        }
    }
}
export default compose(
    firebaseConnect(),
    connect(mapStateToProps, mapDispatchToProps))(Login)

