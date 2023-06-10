import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, Grid, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { selectOrders } from '../../redux/features/order/orderSlice';
import './OrderDetails.scss'; 
import styled  from "@emotion/styled";

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  }
`;

const OrderDetails = ({ orderId, onClose }) => {
    const orders = useSelector(selectOrders);
    const [order, setOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (orderId) {
            const selectedOrder = orders.find(order => order._id === orderId);
            setOrder(selectedOrder);
            setShowModal(true);
        } else {
            setOrder(null);
            setShowModal(false);
        }
    }, [orderId, orders]);

    if (!showModal) {
        return null;
    }

    const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${order?.location?.coordinates[1]},${order?.location?.coordinates[0]}`;

    return (
        <StyledDialog open={showModal} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography style={{color:"#d1345b"}} variant="h5"><b style={{color:"white",}}>Order ID: </b>{order?._id}</Typography>
                    </Grid>
                    <Grid item>
                        <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        <strong className="userlabel">User:</strong> {order?.user?.name}
                        </Typography>
                        {order?.items?.map((item, index) => (
                        <Box key={index} my={1}>
                            <Typography variant="body1">
                            <strong className="itemlabel">Item Name:</strong> {item.name}
                            </Typography>
                            <Typography variant="body1">
                            <strong className="qlabel">Quantity:</strong> {item.quantity}
                            </Typography>
                        </Box>
                        ))}
                        <Typography variant="subtitle1">
                        <strong className="amountlabel">Total Amount:</strong> {order?.amount}
                        </Typography>
                        <Typography variant="subtitle1">
                        <strong className="datelabel">Order Date:</strong> {new Date(order?.createdAt).toLocaleString()}
                        </Typography>
                        <Typography variant="subtitle1">
                        <strong className="loclabel">Delivery Location:</strong>
                        <u style={{ color: "#f1c40f" }}>
                            <a style={{ color: "#f1c40f" }} href={googleMapsLink} target="_blank" rel="noreferrer">View on Google Maps</a>
                        </u>
                        </Typography>

                    </Grid>
                </Grid>
            </DialogContent>
            </StyledDialog>
    );
};

export default OrderDetails;
