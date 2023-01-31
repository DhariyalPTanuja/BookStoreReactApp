import React, { Component } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router';
import BookServices from '../services/BookService';
import Button from '@mui/material/Button';
import Header from '../Header/Header'
import CartServices from '../services/CartService'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import WishListServices from '../services/WishListService'
import SearchIcon from '@mui/icons-material/Search';

export const withNavigation = (Component: Component) => {
  return props => <Component {...props} navigate={useNavigate()} />
}

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      selectBoxValue: "none",
      search: ''
    };
  }

  componentDidMount() {
    this.fetchData();
    console.log(this.props)
  }

  fetchData() {
    BookServices.getAllBooks().then((response) => {
      this.setState({ books: response.data.data })
      console.log(response);
    })
  }

  handleSearch = (e) =>{
this.setState({search: e.target.value}); 
}
  addToCart(bookID) {
    // const id = localStorage.getItem('Authorization')
    // const userId = JSON.parse(id);
    const userID = localStorage.getItem('userID')
    console.log("UserId", userID)
    let object = {
      book: bookID,
      cartQuantity: 1,
      user: userID,
    }
    console.log("BookId", bookID)
    console.log(object);
    CartServices.addCartItem(object).then((response) => {
      console.log(response);
      console.log(response.data.data.cartID)
      window.location.reload();
    })
  }
  addToWishList(bookID) {
    // const id = localStorage.getItem('Authorization')
    // const userID = JSON.parse(id);
    const userID = localStorage.getItem('UserID')
    console.log("UserId", userID)
    let object = {
      bookID: bookID,
    }
    console.log("BookId", bookID)
    console.log(object);
    WishListServices.addToWishList(object).then((response) => {
      console.log(response);
      window.location.reload();
    })
  }

  sortByLower = () => {
    console.log("Sort to low")
    BookServices.sortByLower().then((response) => {
      this.setState({ books: response.data.data })
    }).catch((err) => {
      console.log(err);
    })
  }

  sortByHigher = () => {
    console.log("High to low")
    BookServices.sortByHigher().then((response) => {
      this.setState({ books: response.data.data })
    }).catch((err) => {
      console.log(err);
    })
  }

  onSelect = (event) => {
    console.log("Hello")
    if (event.target.value === "low_to_high") {
      console.log("High")

      this.sortByLower()
    }
    else {
      this.sortByHigher()
    }
  }

  render = () => {

    return (<>
      <Header />
      {/* <div style={{ marginTop: "10rem", marginRight: "85rem" }}> */}
      <div style={{ marginTop: "1rem" , display: "flex", flexDirection: "row", 
      justifyContent: "space-between"}}>
      <p sx={{marginBottom: "5px"}}>Books:({this.state.books.length})</p>
      <div className="SearchContainer">
            <SearchIcon style={{ color: "grey", fontSize: 20 }} />
            <TextField
             //  onChange={this.handleSearch.bind(this)}
            // onChange={(e) => setSearch(e.target.value)}
            //  onChange={(e) =>this.setState({search: e.target.value})}
            onChange={this.handleSearch}
            size="medium"
            id="standard-basic"
            label="Search"
            placeholder="Search …"
            variant="filled"
            sx={{ marginBottom: "5px", width: { sm: 200, md: 300 } }}
          />
          </div>
      {/* <FormControl sx={{ marginTop: "10rem", marginLeft: "70rem", marginbottom: "5px" }}> */}
      <FormControl sx={{ marginbottom: "5px" }}>
        <InputLabel htmlFor="grouped-native-select">Sort by</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" label="Grouping" onChange={this.onSelect}>
          <option aria-label="None" />
          <option value="low_to_high" id="low_to_high" onClick={this.sortByLower}>Low to high</option>
          <option value="high_to_low" id="high_to_low" onClick={this.sortByHigher}>high to low</option>
        </Select>
      </FormControl>

      </div>
      
     
      <div style={{ width: "100%", margin: "3rem" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "stretch",
            bgcolor: "background.paper",
            gap: "2.5rem",
            marginLeft: "0.5rem",
            marginTop: "0rem",
          }}
        >
        {this.state.books.filter((val) => {
          if (this.state.search === "") {
            return val;
          } else if (
            val.bookName.toLowerCase().includes(this.state.search.toLowerCase()) ||
            val.authorName.toLowerCase().includes(this.state.search.toLowerCase())
          ) {
            return val;
          }  
        }) 
           // {/* {this.state.books && this.state.books.map((book, index) => ( */}
          .map((book, index) => (
            <p key={`${index}`}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid",
                  padding: "1rem"

                }}
              >
                <FormControl>
                  <CardActionArea>
                    <CardMedia component="img" height="150" padding="1rem" width="50" src={book.bookImg} />
                    <CardContent>
                      <h3>{book.bookName}</h3>
                      <h6>{book.authorName}</h6>
                      <h5>RS.{book.price}</h5>
                      
                      <IconButton id='btn' aria-label="add to favorites" onClick={() => this.addToWishList(book.bookID)}>
                        <FavoriteIcon />
                      </IconButton>
                      <Button variant="contained"disabled = {book.quantity ==="1"} size="large" type="submit"  id="submitButton" onClick={() => this.addToCart(book.bookID)}>{'Add to Cart'}</Button>
                      
                    </CardContent>
                  </CardActionArea>
                </FormControl>
              </Card></p>
          ))}
        </Box>
      </div>
    </>
    );
  }
}
export default withNavigation(Home);