import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { LANGUAGES } from '../../../utils'
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false

        }
    }



    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ PHÒNG KHÁM</div>
                    <div className='name-clinic'>Phòng khám chuyên khoa da liễu</div>
                    <div className='detail-address'>207 - Phố Huế</div>

                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-info'>
                            GIÁ KHÁM: 250.000đ. <span onClick={() => { this.showHideDetailInfor(true) }}>
                                Xem chi tiết</span>
                        </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>GIÁ KHÁM: .</div>
                            <div className='detail-info'>
                                <div className='price'>
                                    <span className='left'>GIÁ KHÁM: .</span>
                                    <span className='right'>250.000đ</span>

                                </div>
                                <div className='note'> hksdfhsdkfwn</div>
                            </div>

                            <div className='payment'>Người bệnh pla pla..</div>

                            <div className='hide-price'>
                                <span onClick={() => { this.showHideDetailInfor(false) }}>
                                    Ẩn bảng giá</span>
                            </div>

                        </>
                    }
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);