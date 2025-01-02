import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  IconButton,
  Button,
  TextField,
  Divider,
  Avatar,
  Grid,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => {
      if (item.productId === productId) {
        item.quantity = newQuantity;
      }
      return item;
    });

    setCart(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveProduct = (productId) => {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
    calculateTotal(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleProceedToCheckout = () => {
    const isAuthenticated = localStorage.getItem('token');
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ textAlign: 'center', marginBottom: '30px' }}
      >
        Carrito de Compras
      </Typography>

      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
            <Grid
              container
              alignItems="center"
              spacing={2}
              key={item.productId}
              style={{
                marginBottom: '15px',
                borderBottom: '1px solid #ddd',
                paddingBottom: '10px',
              }}
            >
              {/* Imagen */}
              <Grid item xs={2}>
                <Avatar
                  src={item.image}
                  alt={item.name}
                  variant="rounded"
                  style={{ width: 80, height: 80 }}
                />
              </Grid>

              {/* Nombre */}
              <Grid item xs={3}>
                <Typography variant="h6">{item.name}</Typography>
              </Grid>

              {/* Precio unitario */}
              <Grid item xs={2}>
                <Typography variant="body1">
                  ₲ {item.price.toLocaleString('es-PY')}
                </Typography>
              </Grid>

              {/* Cantidad */}
              <Grid item xs={2}>
                <TextField
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.productId, parseInt(e.target.value))
                  }
                  InputProps={{ inputProps: { min: 1 } }}
                  size="small"
                  style={{ width: '70px' }}
                />
              </Grid>

              {/* Precio total */}
              <Grid item xs={2}>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  ₲ {(item.price * item.quantity).toLocaleString('es-PY')}
                </Typography>
              </Grid>

              {/* Botón eliminar */}
              <Grid item xs={1}>
                <IconButton
                  onClick={() => handleRemoveProduct(item.productId)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}

          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="h6" style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Total: ₲ {total.toLocaleString('es-PY')}
          </Typography>

          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
          <Button
              variant="contained"
              color="primary"
              style={{ margin: '20px 0', width: '200px', height:'35px' }}
              onClick={handleProceedToCheckout}
            >
              Finalizar compra
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ margin: '20px 0', width: '300px' }}
              onClick={() => navigate('/products')}
            >
              ¡Quiero seguir comprando! <ShoppingCartIcon />
            </Button>
          </div>
        </>
      ) : (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          Tu carrito está vacío.
        </Typography>
      )}
    </div>
  );
}

export default CartPage;
