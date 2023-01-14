import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from "react-slick";
import MedicalFacilities from "../../../assets/medical-facility/115837-3anh-bia-diag.png"

class MedicalFacility extends Component {

    render() {
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-content'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tết nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>

                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Trung tâm xét nghiệm Diag1</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Trung tâm xét nghiệm Diag2</div>
                            </div>

                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Trung tâm xét nghiệm Diag3</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Trung tâm xét nghiệm Diag4</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Trung tâm xét nghiệm Diag5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-medical-facility' />
                                <div>Trung tâm xét nghiệm Diag6</div>
                            </div>

                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
