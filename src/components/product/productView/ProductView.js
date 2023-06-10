import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/product/productSlice";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styled  from "@emotion/styled";


const ProductImage = styled("img")`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(15px);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.8);
  }
`;


const ProductView = ({ productId, onClose }) => {
  const product = useSelector(selectProduct);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (productId) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [productId]);

  if (!showModal) {
    return null;
  }

  return (
    <StyledDialog open={showModal} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography style={{color:"#ededed"}} variant="h5">{product?.name}</Typography>
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
        <Grid item xs={12} md={6}>
          <ProductImage src={product?.image.url} alt={product?.name} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography style={{color:"#ededed"}} variant="subtitle1">
            <strong>Price:</strong> Rs. {product?.price}
          </Typography>
          <Typography style={{color:"#ededed"}} variant="subtitle1">
            <strong>Availability:</strong> {String(product?.availability)}
          </Typography>
        </Grid>
      </Grid>
    </DialogContent>
  </StyledDialog>
  );
};

export default ProductView;
