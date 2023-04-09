import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES, LANGUAGRS } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { withRouter } from "react-router";
import { Button, Drawer } from "antd";
import { BREAK_POINT } from "../../enum";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { globalState$ } from "../../rxjs/store";

class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  componentDidMount() {
    globalState$.subscribe((val) => {
      if (val) {
        this.setState({
          user: val.user,
        });
      }
    });

    const trackingPageResize = () => {
      if (window.innerWidth < BREAK_POINT.TABLET) {
        console.log("__start responsive___");
        this.setState({
          isTablet: true,
        });
      } else {
        this.setState({
          isTablet: false,
        });
      }
    };

    trackingPageResize();

    const handleResize = () => {
      trackingPageResize();
    };

    window.addEventListener("resize", () => handleResize());
  }

  constructor(props) {
    super(props);
    this.state = {
      isTablet: false,
      openDrawer: false,
      user: null,
    };
  }

  showDrawer() {
    this.setState({
      openDrawer: true,
    });
  }

  onClose() {
    this.setState({
      openDrawer: false,
    });
  }

  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div
                className="headerLogo"
                onClick={() => this.returnToHome()}
              ></div>
            </div>
            {!this.state.isTablet && (
              <>
                <div className="center-content">
                  <div className="child-content">
                    <div>
                      <b>
                        {" "}
                        <FormattedMessage id="homeheader.speciality" />{" "}
                      </b>
                    </div>
                    <div className="sub-title">
                      <FormattedMessage id="homeheader.search-doctor" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div>
                      <b>
                        {" "}
                        <FormattedMessage id="homeheader.health-facility" />{" "}
                      </b>
                    </div>
                    <div className="sub-title">
                      <FormattedMessage id="homeheader.select-room" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div>
                      <b>
                        <FormattedMessage id="homeheader.doctor" />
                      </b>
                    </div>
                    <div className="sub-title">
                      <FormattedMessage id="homeheader.select-doctor" />
                    </div>
                  </div>
                  <div className="child-content">
                    <div>
                      <b>
                        <FormattedMessage id="homeheader.fee" />
                      </b>
                    </div>
                    <div className="sub-title">
                      <FormattedMessage id="homeheader.check-health" />
                    </div>
                  </div>
                </div>
                <div className="right-content">
                  <div
                    className="support"
                    style={{
                      maxWidth: "150px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {this.state.user ? (
                      <Link to={"/profile"}>{this.state.user?.email}</Link>
                    ) : (
                      <Link to={"/user/login"}> Tài khoản</Link>
                    )}
                  </div>
                  <div
                    className={
                      language === LANGUAGES.VI
                        ? "language-vi active"
                        : "language-vi"
                    }
                  >
                    <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                      VN
                    </span>
                  </div>
                  <div
                    className={
                      language === LANGUAGES.EN
                        ? "language-en active"
                        : "language-en"
                    }
                  >
                    <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                      EN
                    </span>
                  </div>
                </div>
              </>
            )}
            {this.state.isTablet && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                    width: "100%",
                  }}
                >
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => this.showDrawer()}
                  >
                    <MenuOutlined />
                  </span>
                  <Drawer
                    title="Menu"
                    placement="right"
                    onClose={() => this.onClose()}
                    open={this.state.openDrawer}
                  >
                    <div className="booking-list-wrap">
                      <p className="booing-list-item">Chuyên khoa</p>
                      <p className="booing-list-item">Cơ sở y tế</p>
                      <p className="booing-list-item">Bác sĩ</p>
                      <p className="booing-list-item">Gói khám</p>
                    </div>
                  </Drawer>
                </div>
              </>
            )}
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title-1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title-2" />
              </div>
              <div className="">
                {/* <i className='fas fa-search'></i>
                                <input title='text' placeholder='Tìm chuyên khoa khám bệnh....' /> */}
              </div>
            </div>
            <div className="content-down">
              <div className="option">
                <div className="option-child">
                  <div className="icon-child">
                    {" "}
                    <i className="far fa-hospital"></i>{" "}
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {" "}
                    <i className="fas fa-mobile-alt"></i>{" "}
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {" "}
                    <i className="fas fa-procedures"></i>{" "}
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {" "}
                    <i className="fas fa-flask"></i>{" "}
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {" "}
                    <i className="fas fa-user-md"></i>{" "}
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    {" "}
                    <i className="fas fa-briefcase-medical"></i>{" "}
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
