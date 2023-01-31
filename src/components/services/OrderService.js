import axios from "axios";

const id=localStorage.getItem('UserID')
const userId = JSON.parse(JSON.stringify(id));
const token = localStorage.getItem('Token');
const customerId = localStorage.getItem('CustomerId');
class OrderService {
  baseUrl = "http://localhost:8080/bookStoreSBProject/ordertoken";
  baseUrl1 ="http://localhost:8080/bookStoreSBProject/order";

  addOrderedItems(data) {
    return axios.post(`${this.baseUrl}/createOrder`, data, { params: { token: token } });
  }
  addOrderedItems(data) {
    return axios.post(`${this.baseUrl1}/createOrder`, data);
  }
  getAll() {
    return axios.get(`${this.baseUrl}/get-all`, { params: { token: token } });
  }
  getAllData() {
    return axios.get(`${this.baseUrl1}/getAll`);
  }

  getUserById() {
    return axios.get(`${this.baseUrl}/get`, { params: { token: token } });
  }

  //   updateEmployee(employeeId,data) {
  //     return axios.put(`${this.baseUrl}/edit/${employeeId}`, data);
  //   }
  // deleteCartItem(bookId) {
  //       return axios.put(`${this.baseUrl}/delete/${bookId}`, {params:{token: token}});
  //     }

  deleteCartItem(bookId) {
    return axios.delete(`${this.baseUrl}/remove/${bookId}`, { params: { token: token } });
  }

}


export default new OrderService();