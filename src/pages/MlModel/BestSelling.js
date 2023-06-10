import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBestSelling, selectBestSelling, selectIsLoading, selectError } from '../../redux/features/mlmodel/mlModelSlice';
import { DataGrid, GridOverlay } from '@mui/x-data-grid';
import { Box, CircularProgress, Typography, Alert, Container, Paper, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import './BestSelling.scss'

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

const BestSelling = () => {
    const dispatch = useDispatch();
    const bestSelling = useSelector(selectBestSelling);
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);

    console.log(bestSelling, bestSelling);
    
    useEffect(() => {
        dispatch(fetchBestSelling());
    }, [dispatch]);

    if (error) return <Alert severity="error">{`Error: ${error}`}</Alert>;

    const columns = [
        { field: 'antecedents', headerName: 'First Fish Bought', flex: 1 },
        { field: 'consequents', headerName: 'Next Fish Bought', flex: 1, },
        { field: 'support', headerName: 'Frequency of Pair Bought', type: 'number', flex: 1,},
        { field: 'confidence', headerName: 'Likelihood of Buying Next Fish', type: 'number', flex: 1,  },
        { field: 'lift', headerName: 'Association Strength', type: 'number', flex: 1, },
    ];

    const rows = bestSelling.map((row, index) => ({
        id: index, 
        ...row
    }));

    return (
        <Sidebar>
        <ThemeProvider theme={darkTheme}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#fff', backgroundColor: 'transparent', padding: 3 }}>
            <Typography variant="h4" component="div">
                Best Selling Fish Pairs
            </Typography>
            <Paper sx={{ 
                        marginTop: 3, 
                        height: 500, 
                        width: '100%' ,
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
            <Paper sx={{ marginTop: 3, padding: 2 }}>
                <Typography variant="body1" component="p">
                <b style={{fontWeight:600, fontFamily:"-apple-system"}}>Note: </b>
                </Typography>
                <Typography variant="body2" component="p">
                <b style={{fontWeight:600, fontFamily:"-apple-system"}}>First Fish Bought:</b> <span style={{fontWeight:100, fontFamily:"-apple-system"}}>This is the fish that customers typically buy first.</span>
                </Typography>
                <Typography variant="body2" component="p">
                <b style={{fontWeight:600, fontFamily:"-apple-system"}}>Next Fish Bought:</b> <span style={{fontWeight:100, fontFamily:"-apple-system"}}>This is the fish that customers often buy after buying the first fish.</span>
                </Typography>
                <Typography variant="body2" component="p">
                <b style={{fontWeight:600, fontFamily:"-apple-system"}}>Frequency of Pair Bought:</b> <span style={{fontWeight:100, fontFamily:"-apple-system"}}>This measures how often these two types of fish are bought together.</span>
                </Typography>
                <Typography variant="body2" component="p">
                <b style={{fontWeight:600, fontFamily:"-apple-system"}}>Likelihood of Buying Next Fish:</b> <span style={{fontWeight:100, fontFamily:"-apple-system"}}>This shows how likely customers are to buy the second fish after they have bought the first one.</span>
                        </Typography>
                        <Typography variant="body2" component="p">
                        <b style={{fontWeight:600, fontFamily:"-apple-system"}}>Association Strength:</b> <span style={{fontWeight:100, fontFamily:"-apple-system"}}>This value indicates how strong the association is between buying the first and the second fish. The higher the value, the stronger the association, meaning that it's more common for the two fish to be bought together.</span>
                        </Typography>
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

export default BestSelling;