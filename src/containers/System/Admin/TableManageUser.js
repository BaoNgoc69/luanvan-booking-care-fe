import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from "../../../store/actions";

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []


        }
    }
    componentDidMount() {
        this.props.fetchUserRedux();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.list_users !== this.props.list_users) {
            this.setState({
                userRedux: this.props.list_users
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user);
    }

    render() {
        console.log('baongoc check all user: ', this.props.list_users);
        console.log('bao ngoc check state: ', this.state.userRedux);
        let arrUsers = this.state.userRedux;
        return (
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td>
                                    <button className='btn-edit'
                                        onClick={() => this.handleEditUser(item)}
                                    ><i className='fas fa-pencil-alt'></i></button>
                                    <button
                                        onClick={() => this.handleDeleteUser(item)}
                                        className='btn-delete' ><i className='fas fa-trash'></i></button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

        );
    }

}

const mapStateToProps = state => {
    return {
        list_users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
