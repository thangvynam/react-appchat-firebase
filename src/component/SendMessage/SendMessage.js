import React from 'react'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
const SendMessage = ({ firebase, appReducer, arrInfo }) => {
    let userFrom = appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))
    let userTo = arrInfo.arrInfo.username
    let message = ''
    const pushSample = () => {
        let curTime = new Date().toLocaleString()
        let editMessage = `${userFrom}:${message}-${curTime}`
        firebase.push(`Messagges/${userFrom}/${userTo}`, editMessage)
        firebase.push(`Messagges/${userTo}/${userFrom}`, editMessage)
    }
    const handleInputChange = (event) => {
        message = event.target.value
    }
    return (
        <div className="chat-message clearfix">
            <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} defaultValue={""} onChange={(event) => handleInputChange(event)} />
            <button onClick={pushSample} >Send</button>
        </div>
    )
}
export default compose(
    withFirebase,
    connect((state) => ({
        appReducer: state.appReducer,
        arrInfo: state.listUserReducer
    }))
)(SendMessage)