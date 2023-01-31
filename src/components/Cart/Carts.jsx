import React, {useState, useEffect} from 'react'
import cx from 'clsx';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Header from '../Header/Header'
import { Link, useNavigate  } from 'react-router-dom';
import './Carts.css'
import CartServices from '../services/CartService'



const useStyles = makeStyles(({ breakpoints, spacing }) => ({   

  root: {
    margin: "1rem",
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 10px 20px #1687d933',
    position: 'relative',
    width: 800,
    marginLeft: "17rem",
    overflow: 'initial',
    background: '#ffffff',
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      // flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  media: {
    width: '40%',
    height: 0,
    paddingBottom: '48%',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    marginRight:"5rem",
    [breakpoints.up('md')]: {
      width: '90%',
      marginLeft: spacing(-3),
      marginTop: 0,

      transform: 'translateX(-8px)',
    },
  },
  content: {
    padding: 50,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

export const BlogCardDemo = React.memo(function BlogCard() {

  let navigate = useNavigate();
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();


  const [qty, setQty] = useState(0);
  function handleDecrement() {
    if(qty==0){
      return
    }
    else{
    setQty(qty - 1);
    }
  }
  function handleIncrement() {
    setQty(qty + 1);
  }

  
//Fetching Data
  const [cartDetails, setCartDetails] = useState([]);

  useEffect(() => {
    fetchCartDetails();
  },[]);

  const fetchCartDetails = () => {
    // CartServices.getAll().then((response) => {
      CartServices.getAllData().then((response) => {
        setCartDetails(response.data.data);
      })
  };
  console.log(cartDetails);

  const deleteCartItem=(bookID) => {
    console.log(bookID);
    CartServices.deleteCartItem(bookID);
    window.location.reload();
};

const updateQuantity=(qty) => {
    let quantity = qty
}
const getOrder=(cartID) => {
 navigate(`Order/${cartID}`);
  console.log(cartID);
}
  
return(<>
 <Header/>
  <Typography style={{marginRight:"40rem",marginTop:"5rem" }}>Cart Count:{cartDetails.length}</Typography>
  {cartDetails.map((cartItem, index) => {  
  return (<>
     
    <Card className={cx(styles.root, shadowStyles.root)}>
      
    <CardMedia
        className={styles.media}
        image={cartItem.bookID.bookImg}
      />
      <CardContent>
        
       <h2>{cartItem.bookID.bookName}</h2>
       <h5>by {cartItem.bookID.authorName}</h5>
        <h5>Rs.{cartItem.bookID.price}</h5>
        <h5>Quantity</h5>
        <div class="wrapper">
            <span class="minus" onClick={handleDecrement}>-</span>
            <span class="num" id="root" onClick = {()=> updateQuantity(cartItem.bookID.quantity)}>{qty+1}</span>
            <span class="plus" onClick={handleIncrement}>+</span>
        </div>
        <h4>Total Price <br/>{cartItem.bookID.price+cartItem.bookID.price * qty}</h4>
        <Link to="/order">
        <Button className={buttonStyles} onClick={() =>getOrder(cartItem.cartID)} >Checkout</Button></Link>
        <Button onClick={() =>deleteCartItem(cartItem.cartID)} >Remove Item</Button>
        
      </CardContent>
      <CardMedia
        className={styles.media}
        image={cartItem.bookID.bookImg}
      />
      <CardContent>
        
       <h2>{cartItem.bookID.bookName}</h2>
       <h5>by {cartItem.bookID.authorName}</h5>
        <h5>Rs.{cartItem.bookID.price}</h5>
        <h5>Quantity</h5>
        <div class="wrapper">
            <span class="minus" onClick={handleDecrement}>-</span>
            <span class="num" id="root" onClick = {()=> updateQuantity(cartItem.bookID.quantity)}>{qty+1}</span>
            <span class="plus" onClick={handleIncrement}>+</span>
        </div>
        <h4>Total Price <br/>{cartItem.bookID.price+cartItem.bookID.price * qty}</h4>
        <Link to="/order">
        <Button className={buttonStyles} onClick={() =>getOrder(cartItem.cartID)} >Checkout</Button></Link>
        <Button onClick={() =>deleteCartItem(cartItem.cartID)} >Remove Item</Button>
        
      </CardContent>
    </Card>
    </>
  );
})}
  </>)
});

export default BlogCardDemo