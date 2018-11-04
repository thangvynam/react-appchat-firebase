import React from 'react';
import { connect } from 'react-redux';
//import * as firebase from 'firebase';

//import firebaseConnect from '../../firebase/firebaseConnect';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import MessageContainer from '../MessageContainer/MessageContainer'
import ListUser from '../ListUser/ListUser'
const HomeContainer = ({ users,arrInfo, firebase }) => {
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
            
            <div className="container clearfix">
                <div className="row">
                    <div  style={{float:"left"}}>
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
                    <div style={{float:"left"}}>
                        <div className="chat">
                            <div className="chat-header clearfix">
                                <img src={arrInfo.arrInfo.img} alt="avatar" />
                                <div className="chat-about">
                                    <div className="chat-with">Chat with {arrInfo.arrInfo.username}</div>
                                    <div className="chat-num-messages">already 1 902 messages</div>
                                </div>
                                <i className="fa fa-star" />
                            </div> {/* end chat-header */}
                            <div className="chat-history">
                                <ul>
                                    <MessageContainer/>
                                </ul>
                            </div> {/* end chat-history */}
                            <div className="chat-message clearfix">
                                <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} />
                                <i className="fa fa-file-o" /> &nbsp;&nbsp;&nbsp;
                                    <i className="fa fa-file-image-o" />
                                <button>Send</button>
                            </div> {/* end chat-message */}
                        </div> {/* end chat */}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default compose(
    firebaseConnect([
        'Users/'
    ]),
    connect((state) => ({
        users: state.firebase.data.Users,
        arrInfo:state.listUserReducer
    }))
)(HomeContainer)