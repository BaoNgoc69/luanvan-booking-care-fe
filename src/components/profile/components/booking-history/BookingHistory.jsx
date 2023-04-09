import { Col, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import BookingHistoryItem from "./BookingHistoryItem";
import userApi from "../../../../api/userApi.";
import { globalState$ } from "../../../../rxjs/store";

const BookingHistory = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await userApi.bookingHistory(
          globalState$.value?.user?.id || null
        );
        setBookingHistory(response.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <Spin spinning={isLoading}>
      <div className="booking-history">
        <h4>Booking information</h4>
        <div className="booking-history-container">
          {bookingHistory &&
            bookingHistory.length > 0 &&
            bookingHistory.map((item, index) => {
              return (
                <BookingHistoryItem
                  data={item}
                  key={index}
                ></BookingHistoryItem>
              );
            })}
        </div>
      </div>
    </Spin>
  );
};

export default BookingHistory;
