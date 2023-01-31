import axios from "axios";
const id=localStorage.getItem('UserID')
const userId = JSON.parse(id);
const token=localStorage.getItem('Token')

class UserService {
    baseUrl =  "http://localhost:8080/bookStoreSBProject/user";

    addUser(data) {
    return axios.post(`${this.baseUrl}/register`, data);
  } 
  getAllBooks() {
    return axios.get(`${this.baseUrl}/getAllRecord`);
  }

//   getUserById(userid) {
//     return axios.get(`${this.baseUrl}/getRecordById/${userid}`,{params:{token: token}});
//   }
getUserById(userid) {
    return axios.get(`${this.baseUrl}/getRecordById/${userid}`);
  }
  getUserByToken() {
    return axios.get(`${this.baseUrl}getRecordByToken`,{params:{token: token}});
  }
 
  getUserEmailId(userEmail) {
    return axios.get(`${this.baseUrl}/getRecordByEmail/${userEmail}`);
  }

userLogin(data) {
  return axios.post(`${this.baseUrl}/loginUser`,data);
}

    
   
    // updateUserData(data, userId){
    //     return  axios.put(`${this.baseUrl}/updateById/${userId}`, data);
    // }
    // deleteUserData(userId){
    //     return   axios.delete(`${this.baseUrl}/deleteRecord/${userId}`);
    // }
  
    // forgetPassword(data, userEmail){
    //     return  axios.put(`${this.baseUrl}/forgetPassword/${userEmail}`, data);
    // }
     
}



export default new UserService();