import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            reviewImgURL: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phonenumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: '',
            userEditId: ''


        }


    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            let arrGender = this.props.genderRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }
        if (prevProps.list_users !== this.props.list_users) {
            let arrRole = this.props.roleRedux;
            let arrGender = this.props.genderRedux;
            let arrPosition = this.props.positionRedux

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phonenumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }
    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                reviewImgURL: objectUrl,
                avatar: file
            })

        }



    }

    openPreviewImage = () => {
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position

            })
        } else {
            if (action === CRUD_ACTIONS.EDIT) {
                this.props.editAUserRedux({
                    id: this.state.userEditId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phonenumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    // avatar: this.state.avatar

                })
            }
        }

        // fire redux reacte



    }




    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phonenumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })


    }

    handleEditUserFromParent = (user) => {
        console.log('bn check handleEditUserFromParent ', user);
        this.setState({

            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phonenumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isGetGenders = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phonenumber, address,
            gender, position, role, avatar } = this.state;


        console.log('check props from redux component: ', this.state)
        return (
            <div className='user-redux-container'>
                <div className='title'>Danh sách người dùng</div>
                {/* <div>{isGetGenders === true ? 'Loading genders' : ''}</div> */}
                <div className="user-redux-body" >
                    <div className='container'>
                        <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                        <div className='row'>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.firstname" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.lastname" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phonenumber" /></label>
                                <input className='form-control' type='text'
                                    value={phonenumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phonenumber') }}

                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }}

                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    value={gender}
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}

                                >
                                    {genders && genders.length > 0 && genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    value={position}
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}

                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control"
                                    value={role}
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}

                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i> </label>
                                    <div className='preview-image' style={{ backgroundImage: `url(${this.state.reviewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>

                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}
                                </button>

                            </div>
                            <div className='col-12'>
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.reviewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}


                    />
                }

            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        list_users: state.admin.users


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editAUserRedux: (data) => dispatch(actions.editAUser(data))
        //processLogout: () => dispatch(actions.processLogout()),
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
