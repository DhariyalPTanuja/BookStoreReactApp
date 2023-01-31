import axios from "axios";

const id = localStorage.getItem('CustomerId')
const token = localStorage.getItem('Token')
class WishList {
  baseUrl = "http://localhost:8080/bookStoreSBProject/wishlist";

  addToWishList(data) {
    return axios.post(`${this.baseUrl}/add`, data,{ params: { token: token }});
  }

  getWishListById() {
    return axios.get(`${this.baseUrl}/get`, { params: { token: token } });
  }
  deleteWishListById(wId) {
    return axios.delete(`${this.baseUrl}/delete/${wId}`, { params: { token: token } });
  }
}

export default new WishList();