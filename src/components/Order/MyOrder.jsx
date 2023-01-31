import React, { useState, useEffect } from 'react';
import Header from '../Header/Header'
import cx from 'clsx';
import { Card, Box, ImageListItem, CardContent, Table, TableContainer, TableHead, TableRow,
    TableCell, TableBody, Paper } from '@mui/material';
// import {
//     Table, TableContainer, TableHead, TableRow,
//     TableCell, TableBody, Box, Typography, IconButton,
//     Card, CardContent, Button
// } from '@mui/material'
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import OrderService from '../services/OrderService';
import './MyOrder.css'


const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	root: {
		marginTop: "2rem",

		transition: '0.3s',
		//   boxShadow: '0px 10px 20px #1687d933',
		position: 'relative',
		width: '100%',
		overflow: 'initial',
		background: '#ffffff',
		alignItems: 'center',
		// borderRadius: spacing(2), // 16px
		// paddingBottom: spacing(2),
		// [breakpoints.up('md')]: {
		// 	// flexDirection: 'row',
		// 	paddingTop: spacing(2),
		// },
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
		// borderRadius: spacing(2),
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

function MyOrders() {
	const styles = useStyles();
	const {
		button: buttonStyles,
		...contentStyles
	} = useBlogTextInfoContentStyles();
	const shadowStyles = useOverShadowStyles();

	const [OrderSummary, setOrderSummary] = useState([]);
	useEffect(() => {
		fetchOrderDetails();
	}, []);

	const fetchOrderDetails = () => {
		OrderService.getAllData().then((response) => {
			console.log(response.data.data)
			setOrderSummary(OrderSummary => [...OrderSummary, response.data.data]);
		})
	};
	console.log(OrderSummary)




	return (
		<>
			<Header />
			<div className="header-content">
						<div className="emp-detail-text">
							Order Summery<div className="{order.length}"></div>
						</div>
					</div>
			<Card sx={{ minWidth: 275, border: '1px solid black', width: '100%' }}>
                    <CardContent>
					<Box component="div" sx={{
                            p: 2, border: '1px solid grey', position: 'relative', margin: 'auto',
                        }}>
                            <TableContainer component={Paper} >
                                <Table>
                                    <TableHead variant="h4" sx={{bgcolor:'blue' , color: 'white', fontSize: '16px'}}>
                                        <TableRow>
										<TableCell>Order Date</TableCell>
								<TableCell>Book Details</TableCell>
								<TableCell>Customer Details</TableCell>
								<TableCell>order Quantity</TableCell>
								<TableCell>Total Price</TableCell>
								<TableCell>Delivery Address</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            OrderSummary.map(
                                               (order)  => (
                                                    <TableRow key={order.orderID}>
                                                        <TableCell> {order.date} </TableCell>
                                                        <TableCell> {order.book} </TableCell>
                                                        <TableCell> {order.user} </TableCell>
                                                        <TableCell> {order.orderQuantity} </TableCell>
                                                        <TableCell> {order.orderPrice} </TableCell>
														<TableCell> {order.deliveryAddress}</TableCell>
                                                        <TableCell>
                                                        {/* <IconButton aria-label="delete" onClick={() => this.deletePersonData(person.id)}>
                                <DeleteIcon /> </IconButton>
                                <IconButton aria-label="edit"  onClick={() => this.editPersonData(person.id)}>
                                <EditIcon /> </IconButton> */}
                            
                        
                                                        </TableCell>
                                                    </TableRow>

                                               )) }
                                        
                                        <TableRow>

                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

				</CardContent>
				</Card>
			
				
		</>
	)
}

export default MyOrders