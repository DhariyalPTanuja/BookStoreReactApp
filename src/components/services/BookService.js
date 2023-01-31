import axios from "axios";

class BookService {
    baseUrl =  "http://localhost:8080/bookStoreSBProject/book";

    addBook(data) {
        return axios.post(`${this.baseUrl}/insert`, data);
      }
    
      getAllBooks() {
        return axios.get(`${this.baseUrl}/getAllRecord`);
      }

      getBookById(bookId) {
        return axios.get(`${this.baseUrl}/getRecordById/${bookId}`);
      }


    sortByHigher() {
      return axios.get(`${this.baseUrl}/sortingDesc`);
    }
    sortByLower() {
      return axios.get(`${this.baseUrl}/sortingAsce`);
    }
    
    
    // updateBookData(data, bookId){
    //     return  axios.put(`${this.baseUrl}/updateRecordById/${bookId}`, data);
    // }
    // deleteBookData(bookId){
    //     return  axios.delete(`${this.baseUrl}/deleteRecord/${bookId}`);
    // }
    
 
}
export default new BookService();