import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders, selectIsLoading, selectOrders } from '../../redux/features/order/orderSlice';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import { Box, CircularProgress, Typography, Container, Paper, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import OrderDetails from './OrderDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2c3d50',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);
    const isLoading = useSelector(selectIsLoading);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const columns = [
        { field: '_id', headerName: 'Order ID', flex: 1 },
        { field: 'user', headerName: 'User', flex: 0.5, valueGetter: (params) => params.row.user.name },
        { field: 'createdAt', headerName: 'Date', flex: 1 },
      
        { 
            field: 'action', 
            headerName: 'Action', 
            flex: 0.5, 
            renderCell: (params) => (
                <>
                    <VisibilityIcon 
                        style={{cursor: "pointer"}} 
                        onClick={() => handleViewClick(params.row)}
                        color="action" 
                    />
                    <DeleteIcon 
                        style={{cursor: "pointer", marginLeft: "20px"}} 
                        onClick={() => handleDeleteClick(params.row)}
                        color="error" 
                    />
                </>
            )
        },
        
    ];


    const handleViewClick = (row) => {
        setSelectedOrder(row._id);
    };

    const handleDeleteClick = (row) => {
        console.log("Delete clicked for row: ", row);
    };
    
      
    return (
        <Sidebar>
            <ThemeProvider theme={darkTheme}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', backgroundColor: 'transparent', padding: 3 }}>
                    <Typography variant="h4" component="div">
                        Orders
                    </Typography>
                    <Paper 
                        sx={{ 
                            marginTop: 3, 
                            height: 500, 
                            width: '100%', 
                            background: 'rgba(255, 255, 255, 0.04)', 
                            backdropFilter: 'blur(100px)', 
                            borderRadius: '10px', 
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)' 
                        }}
                    >
                        <DataGrid
                            getRowId={(row) => row._id} 
                            rows={orders}
                            columns={columns}
                            pageSize={5}
                            components={{
                                LoadingOverlay: CustomLoadingOverlay,
                            }}
                            loading={isLoading}
                            sortModel={[
                                {
                                    field: 'createdAt',
                                    sort: 'desc',
                                },
                            ]}
                        />
                    </Paper>
                    {/* Display the OrderDetails component when an order is selected */}
                    {selectedOrder && <OrderDetails orderId={selectedOrder} onClose={() => setSelectedOrder(null)} />}
                </Container>
            </ThemeProvider>
        </Sidebar>
    );
};

function CustomLoadingOverlay() {
    return (
        <GridOverlay>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
             <CircularProgress color="secondary" />
            </Box>
        </GridOverlay>
    );
}

export default Orders;

