import { Col, Image, Row } from "antd";
import React from "react";

const BookingHistoryItem = (props) => {
  const { data } = props;

  return (
    <>
      <div className="booking-history-item">
        <div className="booking-history-container-createdAt">
          Booking date: <b>{data?.createdAt || ""}</b>
        </div>
        <div className="booking-history-container-doctor-info">
          <h6>Doctor information</h6>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={12} sm={12} xs={24}>
              <div>
                Name:{" "}
                <b>
                  {data?.doctor?.firstName || "" + data?.doctor?.lastName || ""}
                </b>
              </div>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <div>
                Email: <b>{data?.doctor?.email}</b>
              </div>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24}>
              <div>
                Address: <b>{data?.doctor?.address || ""}</b>
              </div>
            </Col>
          </Row>
        </div>
        <div className="booking-history-container-booking-info">
          <h6>Attack file</h6>
          <div>
            <div style={{ backgroundImage: `url(${data?.files})` }}></div>

            <Image
              src={
                data?.files ||
                "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/339247963_1260924928174380_3272443495506821651_n.jpg?stp=cp6_dst-jpg&_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=qpZUAyUK12UAX__SCiG&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDjAXK6qm9HqHhJSA5YDrner5c6y-g5x1JE8EN7OBuQ_Q&oe=6435FDD0"
              }
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistoryItem;
