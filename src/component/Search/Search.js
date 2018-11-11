import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SEARCH_USER } from '../../contsants/actionType';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedList: this.props.listuser,
            items:[]
        }
    }
    // filterList(event) {
    //     var updatedList = this.state.updatedList;
    //     updatedList = updatedList.filter(function (item) {
    //         return item.username.toLowerCase().search(
    //             event.target.value.toLowerCase()) !== -1;
    //     });
    //     this.setState({ items: updatedList });
    // }
    render() {
        return (
            <div className="search filter-list">
                <input type="text" placeholder="Search" onChange={(event) => this.props.filterList(event)} />
                <i className="fa fa-search" />
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        filterList: (event) => {
            var updatedList = ownProps.listuser;
            updatedList = updatedList.filter(function (item) {
                return item.username.toLowerCase().search(
                    event.target.value.toLowerCase()) !== -1;
            });
            dispatch({ type: SEARCH_USER, updatedList: updatedList });
        }
    }
}
export default connect(undefined, mapDispatchToProps)(Search);