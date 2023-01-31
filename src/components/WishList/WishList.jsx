import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Header from '../Header/Header'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import WishListService from '../services/WishListService'

function WishList() {
  const [WishList, setWhishList] = useState([]);

  useEffect(() => {
    FetchWishList();
  }, []);

  const FetchWishList = () => {
    WishListService.getWishListById().then((response) => {
      setWhishList(response.data.data);
      console.log(response.data.data)
    })
  };
  console.log(WishList);

  return (
    <div>
       <Header />
      
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
          {WishList.map((wishList, index) => (
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
                    <CardMedia component="img" height="150" padding="1rem" width="50" src={wishList.bookID.bookImg} />
                    <CardContent>
                      <h4>{wishList.bookID.bookName}</h4>
                      <h6>{wishList.bookID.authorName}</h6>
                      <h5>RS.{wishList.bookID.price}</h5>
                      <IconButton id='btn' aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <Button variant="contained" size="large" type="submit" id="submitButton" onClick="">Add to Cart</Button>
                    </CardContent>
                  </CardActionArea>
                </FormControl>
              </Card></p>
          ))}
        </Box>
      </div>
    </div>
  )
}

export default WishList