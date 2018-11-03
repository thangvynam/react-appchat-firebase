import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DETERMINE_USER } from '../../contsants/actionType';
import './ListUser.scss'
class ListUser extends Component {

    render() {
       
        return (
            <li className="clearfix" style={{listStyleType:"none",cursor: "pointer" }} onClick={this.props.clickItemUser}>
                <img src={this.props.image} alt="avatar" />
                <div className="about">
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
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
        clickItemUser: () => {
            dispatch({type:DETERMINE_USER,arrInfo:ownProps})
        }
    }
}

export default connect(undefined, mapDispatchToProps)(ListUser);