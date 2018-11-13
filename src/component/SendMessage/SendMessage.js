import React from 'react'
import { withFirebase } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { ToastContainer, ToastStore } from 'react-toasts';
import { CLEAR_MESSAGE } from '../../contsants/actionType';
const SendMessage = ({ firebase, appReducer, arrInfo, state, sendReducer }) => {
    let userFrom = appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))
    let userTo = arrInfo.arrInfo.username
    let message = ''
    let imageUrl = ''
    let checkSendImg = false;
    const pushSample = (event) => {
        if (sendReducer.message === '' && !checkSendImg ) {
            ToastStore.error("You must type message :'(")
        } else {
            event.preventDefault();
            let curTime = new Date().toLocaleString()
            let editMessage = `${userFrom}:${sendReducer.message}-${curTime}*${imageUrl}`
            firebase.push(`Messagges/${userFrom}/${userTo}`, editMessage)
            firebase.push(`Messagges/${userTo}/${userFrom}`, editMessage)
            state.dispatch({ type: CLEAR_MESSAGE, message: '' })
        }
    }
    const handleInputChange = (event) => {
        message = event.target.value
        state.dispatch({ type: CLEAR_MESSAGE, message: message })
        
    }
    // const handleChange = (event) => {
    //     let files = event.target.files;
    //     let reader = new FileReader();
    //     reader.readAsDataURL(files[0])
    //     reader.onload = (event) => {
    //         imageUrl=event.target.result;
    //         console.log(imageUrl)
    //     }
    //     checkSendImg=true;
    // }
    const handlePreviewImg = (event) =>{
        let files = event.target.files;
        if(files.length!=0){
            imageUrl=files[0].result;
        }
        checkSendImg=true;
    }
    const handleKeyPress = (event) =>{
        if (event.key === 'Enter') {
            if (sendReducer.message === '' && !checkSendImg ) {
                ToastStore.error("You must type message :'(")
            } else {
                event.preventDefault();
                let curTime = new Date().toLocaleString()
                let editMessage = `${userFrom}:${sendReducer.message}-${curTime}*${imageUrl}`
                firebase.push(`Messagges/${userFrom}/${userTo}`, editMessage)
                firebase.push(`Messagges/${userTo}/${userFrom}`, editMessage)
                state.dispatch({ type: CLEAR_MESSAGE, message: '' })
            }
        }
    }
    return (
        <div className="chat-message clearfix">
            <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} value={sendReducer.message} onChange={(event) => handleInputChange(event)} onKeyPress={(event) => handleKeyPress(event)}/>
            <button onClick={(event) => pushSample(event)} >Send</button>
            <ToastContainer store={ToastStore} />
            {/* <input type="file" onChange={(event) => handleChange(event)} /> */}
            <div className="fileinput fileinput-new" data-provides="fileinput">
                    
                    <div className="fileinput-preview fileinput-exists thumbnail" style={{ maxWidth: 200, maxHeight: 150 }} />
                    <div>
                        <span className="btn btn-default btn-file" style={{ cursor: "pointer" }} >
                            <i className="fa fa-file-image-o" ><span className="fileinput-new"></span></i>
                            <span className="fileinput-exists">Change</span>
                            <input type="file" onBlur={(event) => handlePreviewImg(event) }/>
                        </span>
                        <a href="#" className="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                    </div>
                </div>
        </div>
    )
}
export default compose(
    withFirebase,
    connect((state, ownprops) => ({
        appReducer: state.appReducer,
        arrInfo: state.listUserReducer,
        state: ownprops,
        sendReducer: state.sendReducer
    })))(SendMessage)