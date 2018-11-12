import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Avatar from 'react-avatar';
import SendMessage from '../SendMessage/SendMessage';

const MessageContainer = ({ todos, firebase, appReducer, arrInfo, star }) => {
    const messageListElement = [];
    var arrComponent = [];
    const imageExists = (image_url) => {
        if(image_url === "")
            return false;
        let check = true;
        try {
            var http = new XMLHttpRequest();
            http.open('HEAD', image_url, false);
            http.send();
            check = http.status != 404;
        }
        catch (err) {
            let formatImage = image_url.substring(image_url.lastIndexOf(".") + 1, image_url.length).toLowerCase();
            check = false;
            switch (formatImage) {
                case "jpg":
                    check = true;
                    break;
                case "tif":
                    check = true;
                    break;
                case "png":
                    check = true;
                    break;
                case "gif":
                    check = true;
                    break;
            }
        }
        return check;
    }
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
                                        let time = value.substring(value.lastIndexOf("-") + 1, value.indexOf("*"))
                                        let imageUrl = value.substring(value.indexOf("*") + 1, value.length)
                                        if (username === appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))) {
                                            if (imageUrl === "") {
                                                
                                                if (imageExists(message)) {
                                                    messageListElement.push(
                                                        <li className="clearfix" style={{ listStyleType: "none" }}>
                                                            <div className="message-data align-right">
                                                                <span className="message-data-time">{time}</span> &nbsp; &nbsp;
                                                            <span className="message-data-name">{username}</span> <i className="fa fa-circle me" />
                                                            </div>
                                                            <div className="message other-message float-right">
                                                                <img src={message} alt="nothing to show"  style={{ maxWidth: 200, maxHeight: 150 }}/>
                                                            </div>
                                                        </li>)
                                                } else {
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
                                                }
                                            } else {
                                
                                                if (imageExists(message)) {
                                                    messageListElement.push(
                                                        <li className="clearfix" style={{ listStyleType: "none" }}>
                                                            <div className="message-data align-right">
                                                                <span className="message-data-time">{time}</span> &nbsp; &nbsp;
                                                            <span className="message-data-name">{username}</span> <i className="fa fa-circle me" />
                                                            </div>
                                                            <div className="message other-message float-right">
                                                                <img src={message} alt="nothing to show"  style={{ maxWidth: 200, maxHeight: 150 }}/>
                                                                <img src={imageUrl} alt="nothing to show"  style={{ maxWidth: 200, maxHeight: 150 }}/>
                                                            </div>
                                                        </li>)
                                                } else {
                                                    messageListElement.push(
                                                        <li className="clearfix" style={{ listStyleType: "none" }}>
                                                            <div className="message-data align-right">
                                                                <span className="message-data-time">{time}</span> &nbsp; &nbsp;
                                                            <span className="message-data-name">{username}</span> <i className="fa fa-circle me" />
                                                            </div>
                                                            <div className="message other-message float-right">
                                                                <img src={imageUrl} alt="nothing to show"  style={{ maxWidth: 200, maxHeight: 150 }}/>
                                                                {message}
                                                            </div>
                                                        </li>)
                                                }
                                            }
                                        } else {
                                            if (imageUrl === "") {
                                                if (imageExists(message)) {
                                                    messageListElement.push(
                                                        <li className="clearfix " style={{ listStyleType: "none" }}>
                                                            <div className="message-data">
                                                                <span className="message-data-name"><i className="fa fa-circle online" /> {username}</span>
                                                                <span className="message-data-time">{time}</span>
                                                            </div>
                                                            <div className="message my-message">
                                                                <img src={message} alt="nothing to show"  style={{ maxWidth: 200, maxHeight: 150 }}/>
                                                            </div>
                                                        </li>
                                                    )
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
                                            }else{
                                                if (imageExists(message)) {
                                                    messageListElement.push(
                                                        <li className="clearfix " style={{ listStyleType: "none" }}>
                                                            <div className="message-data">
                                                                <span className="message-data-name"><i className="fa fa-circle online" /> {username}</span>
                                                                <span className="message-data-time">{time}</span>
                                                            </div>
                                                            <div className="message my-message">
                                                                <img src={message} alt="nothing to show"  style={{ maxWidth: 200, maxHeight: 150 }} />
                                                                <img src={imageUrl} alt="nothing to show" style={{ maxWidth: 200, maxHeight: 150 }} />
                                                            </div>
                                                        </li>
                                                    )
                                                } else {
                                                    messageListElement.push(
                                                        <li className="clearfix " style={{ listStyleType: "none" }}>
                                                            <div className="message-data">
                                                                <span className="message-data-name"><i className="fa fa-circle online" /> {username}</span>
                                                                <span className="message-data-time">{time}</span>
                                                            </div>
                                                            <div className="message my-message">
                                                            <img src={imageUrl} alt="nothing to show"  style={{ maxWidth: 200, maxHeight: 150 }} />
                                                                {message}
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            }


                                        }
                                    });
                                }
                            }
                        )
                    }
                })

    const MyStatelessComponent = () => {
        let check = false
        if (star != undefined || star != null) {
            Object.keys(star).map(  // determine who you are
                (valueStar, id) => {
                    if (valueStar === appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))) {
                        Object.entries(star[valueStar]).map(([key, value]) => {
                            if (arrInfo.arrInfo.username == value.username) {
                                check = true;
                                arrComponent.push(
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
                                        {/* <Send/> */}
                                    </div>
                                );
                            }
                        })
                    }
                })
            if (!check) {
                arrComponent.push(
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
        }
        return <div></div>
    }
    if (arrInfo.arrInfo.username != undefined) {
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