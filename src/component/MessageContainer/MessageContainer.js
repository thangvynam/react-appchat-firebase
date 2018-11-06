import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const MessageContainer = ({ todos, firebase, appReducer, arrInfo }) => {
    const messageListElement = [];
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
                                        let message = value.substring(value.indexOf(":")+1,value.lastIndexOf("-"))
                                        let time  = value.substring(value.lastIndexOf("-")+1,value.length)
                                        if (username === appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))) {
                                            messageListElement.push(
                                                <li  className="clearfix" style={{listStyleType:"none"}}>
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
                                                <li className="clearfix " style={{listStyleType:"none"}}>
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
                }

            )
    return (
        <div>
            {messageListElement}
        </div>
    )
}

export default compose(
    firebaseConnect([
        'Messagges'
    ]),
    connect((state) => ({
        todos: state.firebase.data.Messagges,
        appReducer: state.appReducer,
        arrInfo: state.listUserReducer
    }))
)(MessageContainer)