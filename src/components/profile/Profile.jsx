import React from "react";
import HomeHeader from "../../containers/HomePage/HomeHeader";
import UserInfor from "./components/user-info/UserInfor";
import { Space, Tabs } from "antd";
import "./profile.scss";
import BookingHistory from "./components/booking-history/BookingHistory";
import { BookOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { globalState$ } from "../../rxjs/store";
import { useHistory } from "react-router";

const Profile = () => {
  const history = useHistory();

  const hanleLogout = () => {
    localStorage.removeItem("booking-user");
    globalState$.next({
      ...globalState$.value,
      user: null,
    });

    history.push("/home");
  };

  return (
    <>
      <HomeHeader></HomeHeader>
      <br />
      <br />
      <div className="profile">
        <Tabs
          defaultActiveKey="1"
          tabPosition={"left"}
          style={{ minHeight: "90vh" }}
          items={[
            {
              label: (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <UserOutlined />
                    <span className="tab-bg">Patient Inforamtion</span>
                  </div>
                </>
              ),
              key: "1",
              children: <UserInfor></UserInfor>,
            },
            {
              label: (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <BookOutlined />
                    <span>Booking history</span>
                  </div>
                </>
              ),

              key: "2",
              children: (
                <>
                  <BookingHistory></BookingHistory>
                </>
              ),
            },
            {
              label: (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LogoutOutlined />
                    <div onClick={hanleLogout}>Logout</div>
                  </div>
                </>
              ),
              key: "3",
              children: <></>,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Profile;
