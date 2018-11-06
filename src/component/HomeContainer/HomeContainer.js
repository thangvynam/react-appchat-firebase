import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import * as firebase from 'firebase';

import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import MessageContainer from '../MessageContainer/MessageContainer'
import ListUser from '../ListUser/ListUser'
import SendMessage from '../SendMessage/SendMessage';
import Navbar from '../Navbar/Navbar';
const HomeContainer = ({ users, arrInfo, appReducer }) => {
    const usersList = !isLoaded(users)
        ? 'Loading'
        : isEmpty(users)
            ? 'Todo list is empty'
            : Object.values(users).map(
                (value, id) => (
                    <ListUser key={id} username={value.username} status={value.status} image={value.img} />
                )
            )
    return (
        <div>
            <div className="row">
                <Navbar username={appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))}/>
            </div>
            <br/>
            <div className="container clearfix">
                <div className="row">
                    <div style={{ float: "left" }}>
                        <div className="people-list" id="people-list">
                            <div className="search">
                                <input type="text" placeholder="search" />
                                <i className="fa fa-search" />
                            </div>
                            <ul className="list">
                                {usersList}
                            </ul>
                        </div>
                    </div>
                    <div style={{ float: "left" }}>
                        <div className="chat">
                            <div className="chat-header clearfix">
                                <div>
                                    <Avatar size="70" src={arrInfo.arrInfo.image} />
                                </div>
                                <div className="chat-about">
                                    <div className="chat-with">Chat with {arrInfo.arrInfo.username}</div>
                                </div>
                                <i className="fa fa-star" />
                            </div> {/* end chat-header */}
                            <div className="chat-history">
                                <ul>
                                    <MessageContainer />
                                </ul>
                            </div> {/* end chat-history */}
                            <SendMessage />
                        </div> {/* end chat */}
                    </div>

                </div>
            </div>
        </div>
    );
}
export default compose(
    firebaseConnect([
       
        { path:  'Users/',queryParams: [ 'orderByPriority' ]}
    ]),
    connect((state) => ({
        users: state.firebase.data.Users,
        arrInfo: state.listUserReducer,
        appReducer: state.appReducer
    }))
)(HomeContainer)