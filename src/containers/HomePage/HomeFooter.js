import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
class HomeFooter extends Component {

    render() {

        return (
            <div className='home-footer'>
                <div>
                    <p>&copy; 2023 Phan Thị Bảo Ngọc - Luận Văn Tốt Nghiệp. </p>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
