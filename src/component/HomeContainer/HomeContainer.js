import React from 'react';
import { connect } from 'react-redux';


import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import MessageContainer from '../MessageContainer/MessageContainer'
import ListUser from '../ListUser/ListUser'
import Navbar from '../Navbar/Navbar';


const HomeContainer = ({ users, arrInfo, appReducer,ownProps }) => {
    users.sort()
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
                                <i className="fa fa-search"  />
                            </div>
                            <ul className="list">
                                {usersList}
                            </ul>
                        </div>
                    </div>
                    <div style={{ float: "left" }}>
                        <div className="chat">
                            <MessageContainer/>

                            
                        </div> {/* end chat */}
                    </div>

                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        users: state.firebase.data.Users,
        arrInfo: state.listUserReducer,
        appReducer: state.appReducer,
        ownProps:ownProps
    }
}
export default compose(
    firebaseConnect([
        { path:  'Users/'}
    ]),
    connect(mapStateToProps)
)(HomeContainer)