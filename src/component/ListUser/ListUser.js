import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import { DETERMINE_USER } from '../../contsants/actionType';
import './ListUser.scss'
class ListUser extends Component {

    render() {
       if(this.props.appReducer.user.email.substring(0, this.props.appReducer.user.email.indexOf("@")) !== this.props.username )
            return (
                <li className="clearfix" style={{listStyleType:"none",cursor: "pointer" }} onClick={this.props.clickItemUser}>
                    {/* <img src={this.props.image} alt="avatar" /> */}
                    <div style={{float:"left"}} >
                        <Avatar size="70" src={this.props.image} /> 
                    </div>
                    <div className="about" style={{float:"left"}}>
                        <div className="name">{this.props.username}</div>
                        <div className="status">
                            {
                                this.props.status==="online"?(<i className="fa fa-circle online" />):<i className="fa fa-circle offline" />
                            }
                            {this.props.status}
                        </div>
                    </div>
                    <hr/>
                </li>
            );
        return (
            <div></div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        appReducer: state.appReducer
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
        clickItemUser: () => {
            dispatch({type:DETERMINE_USER,arrInfo:ownProps})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);