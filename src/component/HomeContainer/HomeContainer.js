import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

import MessageContainer from '../MessageContainer/MessageContainer'
import ListUser from '../ListUser/ListUser'
import Navbar from '../Navbar/Navbar';
import Search from '../Search/Search';


const HomeContainer = ({ users, star, appReducer, searchReducer }) => {
    const swapElement = (array, index1, index2) => {
        const newArray = array.slice();
        newArray[index1] = array[index2];
        newArray[index2] = array[index1];
        return newArray;
    }
    var priorityUser = [];
    var arrUser = [];
    if (star != undefined || star != null) {
        Object.keys(star).map(  // determine who you are
            (valueStar, id) => {
                if (valueStar === appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))) {
                    Object.entries(star[valueStar]).forEach(([key, value]) => {
                        priorityUser.push(value.username);
                    })
                }
            })
    }
    if (users != undefined || users != null) {
        Object.values(users).map( // list user
            (valueUsers, id) => {
                return arrUser.push(valueUsers);
            }
        )
        let priority = 0;
        for (let i = priorityUser.length - 1; i >= 0; i--) { // ưu tiên cho người mới bấm 
            for (let k in arrUser) {
                if (arrUser[k].username === priorityUser[i]) {
                    if (arrUser[k].username === priorityUser[i]) {
                        arrUser = swapElement(arrUser, priority++, k)
                    }
                }
            }
        }
    }
    const usersList = !isLoaded(arrUser)
        ? 'Loading'
        : isEmpty(arrUser)
            ? 'Loading'
            : Object.values(arrUser).map((value, id) => {
                if (searchReducer.items.length !== 0) {
                    for (let i = 0; i < searchReducer.items.length; i++) {
                        if (value.username === searchReducer.items[i].username) {
                            return (
                                <ListUser key={id} username={value.username} status={value.status} image={value.img} />
                            );
                        }
                    }
                }else{
                    return (
                        <ListUser key={id} username={value.username} status={value.status} image={value.img} />
                    );
                }

            })
    if (arrUser.length !== 0) {
        return (
            <div>
                <div className="row">
                    <Navbar username={appReducer.user.email.substring(0, appReducer.user.email.indexOf("@"))} />
                </div>
                <br />
                <div className="container clearfix">
                    <div className="row">
                        <div style={{ float: "left" }}>
                            <div className="people-list" id="people-list">
                                <Search listuser={arrUser} />
                                <ul className="list">
                                    {usersList}
                                </ul>
                            </div>
                        </div>
                        <div style={{ float: "left" }}>
                            <div className="chat">
                                <MessageContainer />
                            </div> {/* end chat */}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
    return <div></div>
}
const mapStateToProps = (state, ownProps) => {
    return {
        star: state.firebase.data.Star,
        users: state.firebase.data.Users,
        arrInfo: state.listUserReducer,
        appReducer: state.appReducer,
        searchReducer: state.searchReducer,
        ownProps: ownProps
    }
}
export default compose(
    firebaseConnect([
        { path: 'Users/' },
        { path: 'Star/' }
    ]),
    connect(mapStateToProps)
)(HomeContainer)