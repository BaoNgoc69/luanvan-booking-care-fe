import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "/login";
    return axiosClient.post(url, data);
  },

  bookingHistory(id) {
    const url = `/user/my-booking/${id}`;
    return axiosClient.get(url);
  },
};

export default userApi;
