import axios from "axios";

// const id = localStorage.getItem('Authorization')
const  id=localStorage.getItem('userID')
const userId = JSON.parse(JSON.stringify(id));
const token = localStorage.getItem('Token')

class CartService {
 
  baseUrl = "http://localhost:8080/bookStoreSBProject/cart";

  addCartItem(data) {
    console.log(data);
    return axios.post(`${this.baseUrl}/add`, data, { params: { token: token } });
  }

  getAll() {
    return axios.get(`${this.baseUrl}/get-all`, { params: { token: token } });
  }
  getAllData() {
    return axios.get(`${this.baseUrl}/get-all-data`);
  }

  getUserById() {
    console.log(userId)
    return axios.get(`${this.baseUrl}/search/${userId}`, { params: { token: token } });
  }
  getCartById() {
    console.log(userId)
    return axios.get(`${this.baseUrl}/searchById/${userId}`);
  }
  deleteCartItem(bookId) {
    return axios.delete(`${this.baseUrl}/remove/${bookId}`, { params: { token: token } });
  }

  emptyCart() {
    return axios.delete(`${this.baseUrl}/empty`, { params: { token: token } });
  }
  updateQuantity(cartId,data) {
    return axios.put(`${this.baseUrl}/updateQuantity/${cartId}`, data, { params: { token: token } });
  }

}


export default new CartService();