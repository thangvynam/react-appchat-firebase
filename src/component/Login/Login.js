import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';

import { CHECK_USER } from '../../contsants/actionType';
import firebaseConnect from '../../firebase/firebaseConnect';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.onFailure = this.onFailure.bind(this);
        //this.onSuccess = this.onSuccess.bind(this);
    }
    onFailure(response) {
        console.log(response)
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
                                        <input type="submit" name="submit" className="btn btn-info btn-md" defaultValue="submit" onClick={this.props.login} />
                                        <span> </span>
                                        <GoogleLogin
                                            clientId="927943389389-bsst1e00uq07kct4gnohbu6o49m0ism9.apps.googleusercontent.com"
                                            buttonText="Login"
                                            onSuccess={(response) => this.props.onSuccess(response)}
                                            onFailure={this.onFailure}
                                        >
                                            {/* <FontAwesome
                                                name='google'
                                            /> */}
                                            <span> Login with Google</span>
                                        </GoogleLogin>
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
            firebaseConnect.auth().signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    var errorMessage = error.message;
                    console.log(errorMessage);
                })
        },
        handleInputChangeEmail: (event) => {
            email = event.target.value;
        },
        handleInputChangePassword: (event) => {
            password = event.target.value;
        },
        onSuccess: (response) => {
            debugger
            console.log(response.profileObj);
            dispatch({ type: CHECK_USER, user: response.profileObj });
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);