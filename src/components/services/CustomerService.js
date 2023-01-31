import axios from "axios";

const id = localStorage.getItem('CustomerId')

const customerId = JSON.parse(id);
const token = localStorage.getItem('Token')

class CustomerServices {
  baseUrl = "http://localhost:8080/bookStoreSBProject/customer";

  addperson(data) {
    return axios.post(`${this.baseUrl}/add`, data);
  }

  getUserById() {
    return axios.get(`${this.baseUrl}/get/${customerId}`);
  }
}

export default new CustomerServices();