import { Box, Button,  Card, ImageListItem } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header/Header'
import cx from 'clsx';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import CartServices from '../services/CartService'
import OrderServices from '../services/OrderService';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(({ breakpoints, spacing }) => ({

  root: {
    margin: "1rem",
    //borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 10px 20px #1687d933',
    position: 'relative',
    width: 800,
    marginLeft: "17rem",
    overflow: 'initial',
    background: '#ffffff',
    alignItems: 'center',
    // paddingBottom: spacing(2),
    // [breakpoints.up('md')]: {
    //   flexDirection: 'row',
    //   // paddingTop: spacing(2),
    // },
  },
  media: {
    width: '40%',
    height: 0,
    paddingBottom: '48%',
    display: 'flex',
    flexDirection: 'row',
    // borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    marginRight: "5rem",
    // [breakpoints.up('md')]: {
    //   width: '90%',
    //   // marginLeft: spacing(-3),
    //   marginTop: 0,
    //   transform: 'translateX(-8px)',
    // },
  },
  content: {
    padding: 50,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default function FlexDirection() {

  let navigate = useNavigate();
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();

  let [qty, setQty] = useState(0);
  function handleDecrement(cartID, cartQuantity) {
    qty = cartQuantity - 1
    if (cartQuantity === 0) {
      return
    }
    else {
      setQty(cartQuantity - 1);
    }
    let object = {
      cartQuantity: qty,
    }
    CartServices.updateQuantity(cartID, object).then((response) => {
      console.log(response.data.data)
      window.location.reload();
    })
  }
  function handleIncrement(cartID, cartQuantity) {
    qty = cartQuantity + 1
    setQty(cartQuantity + 1);
    let object = {
      cartQuantity: qty,
    }
    console.log(object)
    console.log(cartID)
    CartServices.updateQuantity(cartID, object).then((response) => {
      console.log(response.data.data)
      window.location.reload();
    })
  }

  //Fetching Data
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
   // const userID = localStorage.getItem(userID);
    fetchCartDetails();
  }, []);

  const fetchCartDetails = () => {

    CartServices.getAllData().then((response) => {
     // CartServices.getCartById(userID).then((response) => {
      console.log(response.data.data)
     // localStorage.setItem("cartID", response.data.data.cartID);
      setCartDetails(response.data.data);
    
    })
  };
  console.log(cartDetails);

  const deleteCartItem = (bookID) => {
    console.log(bookID);
    CartServices.deleteCartItem(bookID);
    window.location.reload();
  };
  const updateQuantity = (cartID) => {

    CartServices.updateQuantity(cartID).then((response) => {
      console.log(response)
    })
  }

  const getOrder = (cartID) => {
    navigate(`Order/${cartID}`);
    console.log(cartID);
  }


  return (
    <div style={{ width: '100%' }}>
      <Header />
      <Card className={cx(styles.root, shadowStyles.root)}>
        <>Hello</>
        {cartDetails.map((cartItem) => (
          <Box
            sx={{
              display: 'flex',
              marginRight: '50px',
              marginLeft: '10rem',
              alignContent: 'center',
              flexDirection: 'row',
              paddingLeft: '50px',
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          > <div>
              <Item>
                <ImageListItem>
                  <img
                    src={cartItem.bookID.bookImg }
                  
                    loading="lazy"
                  />
                </ImageListItem>
              </Item>
            </div>
            <div className="info-calss">
              <h2>{cartItem.bookID.bookName}</h2>
              <h5>by {cartItem.bookID.authorName}</h5>
              <h5>Rs.{cartItem.bookID.price}</h5>
              <h5>Quantity</h5>
              <>
                <div class="wrapper">
                  <span class="minus" onClick={() => handleDecrement(cartItem.cartID, cartItem.cartQuantity)}> - </span>
                  <span class="num" id="root" onChange={""}>{cartItem.cartQuantity}</span>
                  <span class="plus" onClick={() => handleIncrement(cartItem.cartID, cartItem.cartQuantity)}> + </span><br />

                </div>

              </>
              <h4>Total Price <br />{cartItem.totalPrice}</h4>

              <Button onClick={() => deleteCartItem(cartItem.cartID)} variant="outlined" color="secondary">Remove Item</Button>
            </div>
          </Box>


        ))}
        <Link to="/customer">
          <Button variant="contained" >Continue</Button>
        </Link>
      </Card>

    </div>
  );
}