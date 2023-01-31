import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Order.css';

import { Link, useNavigate } from 'react-router-dom';

import cx from 'clsx';

import OrderService from '../services/OrderService'
import CartServices from '../services/CartService'
import CustomerServices from '../services/CustomerService'
import { Accordion, AccordionSummary, Box,
Button, TextField, TextareaAutosize, FormControl, FormLabel, ImageListItem, 
Typography, FormControlLabel, Card, Radio, RadioGroup, AccordionDetails } from '@mui/material';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	root: {
		marginTop: "2rem",
		transition: '0.3s',
		//   boxShadow: '0px 10px 20px #1687d933',
		position: 'relative',
		width: 535,
		overflow: 'initial',
		background: '#ffffff',
		alignItems: 'center',
		// borderRadius: spacing(2), // 16px
		//paddingBottom: spacing(2),
	// 	[breakpoints.up('md')]: {
	// 		// flexDirection: 'row',
	// 		paddingTop: spacing(2),
	// 	},
	 },
	media: {
		width: '40%',
		height: 0,
		paddingBottom: '48%',
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: '#fff',
		position: 'relative',
		marginRight: "5rem",
		//borderRadius: spacing(2),
		// [breakpoints.up('md')]: {
		// 	width: '90%',
		// 	marginLeft: spacing(-3),
		// 	marginTop: 0,
		// 	transform: 'translateX(-8px)',
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

function Order() {
	let navigate=useNavigate();
	const [customerDetails, setCustomerDetails] = useState([]);

	//Fetching Cart Data
	const [cartDetails, setCartDetails] = useState([]);

	useEffect(() => {
		fetchCartDetails();
		fetchCustomerDetails();
	}, []);
	const fetchCartDetails = () => {
		CartServices.getAllData().then((response) => {
		  console.log("cartDetail",response.data.data)
		  //localStorage.setItem("CartId", response.data.data.cartID);
		  setCartDetails(response.data.data);
		 
		})
	  };
	
	// const fetchCartDetails = () => {
	// 	CartServices.getAll().then((response) => {
	// 		setCartDetails(response.data.data);

	// 		localStorage.setItem('CartId', response.data.data.cartID);

	// 	})
	// };
	console.log("cartDetail" ,cartDetails);
	const fetchCustomerDetails = () => {
		CustomerServices.getUserById().then((response) => {
			setCustomerDetails(response.data.data);
			console.log(response.data.data);
		})
	};
	console.log(customerDetails);//null

	const [expanded, setExpanded] = React.useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const styles = useStyles();
	const {
		button: buttonStyles,
		...contentStyles
	} = useBlogTextInfoContentStyles();
	const shadowStyles = useOverShadowStyles();

	const order = () => {
		console.log("Order Placed Page")
		const custId = localStorage.getItem('CustomerId')
		const customerId = JSON.parse(custId);
		console.log("CustomerId", customerId)
		let object = {
			customerID: customerId,
			orderQuantity:cartDetails.cartQuantity,
			deliveryAddress: customerDetails.address,
			user:cartDetails.userID,
			book:cartDetails.bookID
			// user:cartDetails.cartID.userID,
			// book:cartDetails.cartID.bookID
		}
		console.log(object);
		OrderService.addOrderedItems(object).then((response) => {
			console.log(response);
			// window.location.reload();
		});
		alert("OrderPlaced Successfully")
		navigate("/ordersuccess");
	}
	return (<>
		<Header />
		<div className="form-content">
			<form className="form" action="#" onSubmit="">
				<div className="form-head">
				</div>
				<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header">
						<Typography sx={{ width: '33%', flexShrink: 0 }}>
							Customer Details
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div>
							<TextField
								id="name" name="name"
								marginRight="10px"
								value={customerDetails.name}
							/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<TextField
								id="contact"
								name="contact"
								value={customerDetails.contact}
							/>
						</div> <br />
						<div>
							<TextField
								id="pinCode"
								name="pinCode"
								value={customerDetails.pinCode}
							/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<TextField
								id="locality"
								name="locality"
								value={customerDetails.locality}
							/>
						</div> <br />
						<div >
							<TextareaAutosize
								id="address"
								name="address"
								aria-label="minimum height"
								placeholder="Address..."
								// style={{ width:, height: 100 }}
								padding-bottom="10"
								value={customerDetails.address}
							/>
						</div> <br />
						<div>
							<TextField
								name="city"
								id="city"
								value={customerDetails.city}
							/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<TextField
								id="landmark"
								name="landmark"
								value={customerDetails.landmark}
							/>
						</div>
						<br />
						<div>
							<FormControl>
								<FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
								<RadioGroup
									row
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
								>
									<FormControlLabel name="home" id="home" control={<Radio />} label="Home" />
									<FormControlLabel name="work" id="work" control={<Radio />} label="Work" />
									<FormControlLabel name="other" id="other" control={<Radio />} label="Other" />
								</RadioGroup>
							</FormControl>
						</div>
					</AccordionDetails>
				</Accordion>
				<Card className={cx(styles.root, shadowStyles.root)}>
					{cartDetails.map((cartItem, index) => {
						return (
							<Box
								sx={{
									display: 'flex',
									// marginRight: '50px',
									// marginLeft: '10rem',
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
												src={cartItem.bookID.bookImg}
												loading="lazy"
											/>
										</ImageListItem>
									</Item>
								</div>
								<div className="info-calss">
									<h2>{cartItem.bookID.bookName}</h2>
									<h5>by {cartItem.bookID.authorName}</h5>
									<h5>Rs.{cartItem.bookID.price}</h5>
									<h5>Quantity.{cartItem.cartQuantity}</h5>
									<h4>Total Price <br />{cartItem.bookID.price + cartItem.bookID.price}</h4>
								</div>
							</Box>
						)
					})}
					<Button variant="contained" style={{ marginLeft: "75%" }} onClick={order} >Checkout</Button>
				</Card>

			</form>
		</div >
	</>)
}
export default Order