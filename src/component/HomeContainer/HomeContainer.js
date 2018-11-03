import React from 'react';
import { connect } from 'react-redux';
//import * as firebase from 'firebase';
import ListUser from '../ListUser/ListUser'
//import firebaseConnect from '../../firebase/firebaseConnect';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'

const HomeContainer = ({ users,arrInfo, firebase }) => {
    //console.log(this.props)
    const usersList = !isLoaded(users)
        ? 'Loading'
        : isEmpty(users)
            ? 'Todo list is empty'
            : Object.values(users).map(
                (key, id) => (
                    <ListUser key={id} username={key.username} status={key.status} image={key.img} />
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
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
                                <div className="chat-about">
                                    <div className="chat-with">Chat with Vincent Porter</div>
                                    <div className="chat-num-messages">already 1 902 messages</div>
                                </div>
                                <i className="fa fa-star" />
                            </div> {/* end chat-header */}
                            <div className="chat-history">
                                <ul>
                                    <li className="clearfix">
                                        <div className="message-data align-right">
                                            <span className="message-data-time">10:10 AM, Today</span> &nbsp; &nbsp;
                                                <span className="message-data-name">Olia</span> <i className="fa fa-circle me" />
                                        </div>
                                        <div className="message other-message float-right">
                                            Hi Vincent, how are you? How is the project coming along?
                                            </div>
                                    </li>
                                    <li>
                                        <div className="message-data">
                                            <span className="message-data-name"><i className="fa fa-circle online" /> Vincent</span>
                                            <span className="message-data-time">10:12 AM, Today</span>
                                        </div>
                                        <div className="message my-message">
                                            Are we meeting today? Project has been already finished and I have results to show you.
                                            </div>
                                    </li>
                                    <li className="clearfix">
                                        <div className="message-data align-right">
                                            <span className="message-data-time">10:14 AM, Today</span> &nbsp; &nbsp;
                                                <span className="message-data-name">Olia</span> <i className="fa fa-circle me" />
                                        </div>
                                        <div className="message other-message float-right">
                                            Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                            </div>
                                    </li>
                                    <li>
                                        <div className="message-data">
                                            <span className="message-data-name"><i className="fa fa-circle online" /> Vincent</span>
                                            <span className="message-data-time">10:20 AM, Today</span>
                                        </div>
                                        <div className="message my-message">
                                            Actually everything was fine. I'm very excited to show this to our team.
                                            </div>
                                    </li>
                                    <li>
                                        <div className="message-data">
                                            <span className="message-data-name"><i className="fa fa-circle online" /> Vincent</span>
                                            <span className="message-data-time">10:31 AM, Today</span>
                                        </div>
                                        <i className="fa fa-circle online" />
                                        <i className="fa fa-circle online" style={{ color: '#AED2A6' }} />
                                        <i className="fa fa-circle online" style={{ color: '#DAE9DA' }} />
                                    </li>
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
        arrInfo:state.arrInfo
    }))
)(HomeContainer)