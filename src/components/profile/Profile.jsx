import React from "react";
import HomeHeader from "../../containers/HomePage/HomeHeader";
import UserInfor from "./components/user-info/UserInfor";
import { Tabs } from "antd";
import "./profile.scss";

const Profile = () => {
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
              label: <span className="tab-bg">Thông tin cá nhân</span>,
              key: "1",
              children: <UserInfor></UserInfor>,
            },
            {
              label: "Lịch sử khám bệnh",
              key: "2",
              children: (
                <>
                  <div>lịch sử khám bệnh</div>
                </>
              ),
            },
          ]}
        />
      </div>
    </>
  );
};

export default Profile;
