import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Avatar from 'react-avatar';
import SendMessage from '../SendMessage/SendMessage';

const MessageContainer = ({ todos, firebase, appReducer, arrInfo, star }) => {
    const messageListElement = [];
    var arrComponent = [];
    const temp = !isLoaded(todos)
        ? 'Loading'
        : isEmpty(todos)
            ? 'Todo list is empty'
            : Object.keys(todos).map( // determine who you are 
                (key) => {
                    if (key === appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))) {
                        Object.keys(todos[key]).map( // determine who you want to chat 
                            (object) => {
                                if (arrInfo.arrInfo.username === object) {
                                    Object.entries(todos[key][object]).forEach(([key, value]) => { // determine which listchat 
                                        let username = value.substring(0, value.indexOf(":"))
                                        let message = value.substring(value.indexOf(":") + 1, value.lastIndexOf("-"))
                                        let time = value.substring(value.lastIndexOf("-") + 1, value.length)
                                        if (username === appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))) {
                                            messageListElement.push(
                                                <li className="clearfix" style={{ listStyleType: "none" }}>
                                                    <div className="message-data align-right">
                                                        <span className="message-data-time">{time}</span> &nbsp; &nbsp;
                                                    <span className="message-data-name">{username}</span> <i className="fa fa-circle me" />
                                                    </div>
                                                    <div className="message other-message float-right">
                                                        {message}
                                                    </div>
                                                </li>)
                                        } else {
                                            messageListElement.push(
                                                <li className="clearfix " style={{ listStyleType: "none" }}>
                                                    <div className="message-data">
                                                        <span className="message-data-name"><i className="fa fa-circle online" /> {username}</span>
                                                        <span className="message-data-time">{time}</span>
                                                    </div>
                                                    <div className="message my-message">
                                                        {message}
                                                    </div>
                                                </li>
                                            )
                                        }
                                    });
                                }
                            }
                        )
                    }
                })

    const MyStatelessComponent = () => {
        if (star != undefined || star != null) {
            Object.keys(star).map(  // determine who you are
                (valueStar, id) => {
                    if (valueStar === appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))) {
                        let check = false
                        Object.entries(star[valueStar]).map(([key, value]) => {
                            if (arrInfo.arrInfo.username == value.username) {
                                check = true;
                                return arrComponent.push(
                                    <div>
                                        <div className="chat-header clearfix">
                                            <div>
                                                <Avatar size="70" src={arrInfo.arrInfo.image} />
                                            </div>
                                            <div className="chat-about">
                                                <div className="chat-with">Chat with {arrInfo.arrInfo.username}</div>
                                            </div>
                                            <i className="fa fa-star" style={{ cursor: "pointer", color: "yellow" }} onClick={() => {
                                                firebase.push(`Star/${appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))}`, { username: `${arrInfo.arrInfo.username}` })
                                            }} />
                                        </div>
                                        <div className="chat-history">
                                            <ul>
                                                {messageListElement}
                                            </ul>
                                        </div>
                                        <SendMessage />
                                    </div>
                                );
                            } else {

                            }
                        })
                        if (!check)
                            return arrComponent.push(
                                <div>
                                    <div className="chat-header clearfix">
                                        <div>
                                            <Avatar size="70" src={arrInfo.arrInfo.image} />
                                        </div>
                                        <div className="chat-about">
                                            <div className="chat-with">Chat with {arrInfo.arrInfo.username}</div>
                                        </div>
                                        <i className="fa fa-star" style={{ cursor: "pointer" }} onClick={() => {
                                            firebase.push(`Star/${appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))}`, { username: `${arrInfo.arrInfo.username}` })
                                        }} />
                                    </div>
                                    <div className="chat-history">
                                        <ul>
                                            {messageListElement}
                                        </ul>
                                    </div>
                                    <SendMessage />
                                </div>
                            );
                    }
                    return <div></div>
                })
        }
        return <div></div>
    }
    if (arrInfo.arrInfo.username != undefined) {
        console.log(arrComponent)
        return (
            <div>
                <MyStatelessComponent />
                {arrComponent}
            </div>
        )
    }
    return (<div></div>)
}

export default compose(
    firebaseConnect([
        'Messagges',
        'Star'
    ]),
    connect((state) => ({
        todos: state.firebase.data.Messagges,
        appReducer: state.appReducer,
        arrInfo: state.listUserReducer,
        star: state.firebase.data.Star,
    }))
)(MessageContainer)