import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import MedicalFacilities from "../../../assets/medical-facility/115837-3anh-bia-diag.png";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
    console.log("hoi dan it check res clinic: ", res);
  }

  handleViewClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };

  render() {
    let { dataClinics } = this.state;
    return (
      <div
        className="section-share section-medical-facility"
        style={{ background: "#e8eae0" }}
      >
        <div className="section-content">
          <div className="section-header">
            <span className="title-section">Cơ sở y tết nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div style={{ width: "95%", background: "#c69" }}>
                      <div
                        className="section-customize section-medical-facilit"
                        style={{ background: "#fff", marginRight: "16px" }}
                      >
                        <div
                          className="bg-image section-medical-facility"
                          onClick={() => this.handleViewClinic(item)}
                          key={index}
                        >
                          <img src={item.image}></img>
                        </div>
                        <div className="clinic-name-wrap">
                          <div className="clinic-name">{item.name}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
