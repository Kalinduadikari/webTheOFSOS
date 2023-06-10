import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBestSellingProducts, selectBestSelling, selectIsLoading, selectError } from '../../redux/features/mlmodel/mlModelSlice';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import { Box, CircularProgress, Typography, Container, Paper, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';

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

const BestProducts = () => {
    const dispatch = useDispatch();
    const bestSelling = useSelector(selectBestSelling);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchBestSellingProducts());
    }, [dispatch]);

    if (error) return <Box m={2}><Typography variant="h6" color="error">Error: {error}</Typography></Box>;

    const columns = [
        { field: 'rank', headerName: 'Rank', flex: 1 },
        { field: 'name', headerName: 'Product', flex: 2 },
        { field: 'quantity', headerName: 'Quantity (g)', flex: 1, },
    ];

    const rows = bestSelling.map((row, index) => ({
        id: index,
        rank: index + 1,
        ...row
    }));

    return (
        <Sidebar>
            <ThemeProvider theme={darkTheme}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', backgroundColor: 'transparent', padding: 3 }}>
                    <Typography variant="h4" component="div">
                        Best Selling Products
                    </Typography>
                    <Paper sx={{ 
                        marginTop: 3, 
                        height: 500, 
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.04)', 
                        backdropFilter: 'blur(100px)', 
                        borderRadius: '10px', 
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.8)' 
                             }}>
                        <DataGrid
                            getRowId={(row) => row.id}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            components={{
                                LoadingOverlay: CustomLoadingOverlay,
                            }}
                            loading={isLoading}
                        />
                    </Paper>
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

export default BestProducts;
