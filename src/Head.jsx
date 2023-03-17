import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Container from "@mui/material/Container";
import Badge from "@mui/material/Badge";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./global";
import Paper from "@mui/material/Paper";
import CallIcon from "@mui/icons-material/Call";
import MailIcon from "@mui/icons-material/Mail";

export function Head() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(0);
  const [items, setItems] = useState([]);
  const [available, setAvailable] = useState(true);
  const [search, setSearch] = useState("");
  const getCard = () => {
    fetch(`${API}/cart`)
      .then((data) => data.json())
      .then((res) => setItems(res));
  };
  useEffect(() => getCard(), []);

  const filter = () => {
    fetch(`${API}/available`)
      .then((data) => data.json())
      .then((res) => setItems(res));
  };
  useEffect(() => getCard(), []);

  //    const deleteCard = (id) => {
  //   fetch(`${API}/items/${id}`, {
  //     method: "DELETE",
  //   }).then(() => getCard());
  // };

  return (
    <div>
      <div className="nav">
        <div className="info">
          <div style={{ display: "flex" }}>
            <MailIcon color="success" fontSize="medium" />
            <div>
              <p>Rentals@gmail.com</p>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <CallIcon fontSize="medium" />
            <div>
              <p>1234567890</p>
            </div>
          </div>
        </div>
        <div className="bcart">
          <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Product"
              inputProps={{ "aria-label": "search google maps" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Button
            variant="outlined"
            // startIcon={<ShoppingCartIcon />}
            startIcon={
              <Badge
                badgeContent={cart}
                color="primary"
                sx={{ margin: "0px 5px" }}
              >
                <ShoppingCartIcon />
              </Badge>
            }
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
          {available ? (
            <IconButton
              type="button"
              sx={{ color: "black", margin: "0px 5px" }}
              aria-label="filter"
              onClick={() => (filter(), setAvailable(!available))}
            >
              <TuneIcon />
            </IconButton>
          ) : (
            <IconButton
              type="button"
              sx={{ color: "black", margin: "0px 5px" }}
              aria-label="filter"
              onClick={() => (getCard(), setAvailable(!available))}
            >
              <TuneIcon />
            </IconButton>
          )}
        </div>
      </div>
      <div className="title">
        <h1>Heavy Truck Rentals</h1>
      </div>
      <Container fixed>
        <div className="list">
          {items.map((itms) => (
            <Items key={itms.id} itms={itms} cart={cart} setCart={setCart} />
          ))}
        </div>
      </Container>
    </div>
  );
}

import Card from "@mui/material/Card";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Items({ itms, cart, setCart }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const navigate = useNavigate();
  const [show, setShow] = useState(itms.status);
  const addItem = () => {
    const newCard = {
      status: !itms.status,
    };
    fetch(`${API}/cart/${itms.id}`, {
      method: "PUT",
      body: JSON.stringify(newCard),
      headers: { "Content-Type": "application/json" },
    });
    // fetch(`${API}/cart`, {
    //   method: "POST",
    //   body: JSON.stringify(newCard),
    //   headers: { "Content-Type": "application/json" },
    // });
  };
  return (
    <div className="card">
      <Card>
        <div className="item-img">
          <img src={itms.image} alt="jcb" />
        </div>
        <div>
          <p>{itms.name}</p>
          <br />
          <p>Hourly</p>
          <br />
          <p>${itms.price}.00/-</p>
          <br />
          <div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Item Added to cart
              </Alert>
            </Snackbar>
            {show ? (
              <Button
                className="bitem"
                sx={{ margin: "10px 10px" }}
                size="small"
                variant="outlined"
                onClick={() => (
                  setCart(cart + 1), setShow(!show), addItem(), handleClick()
                )}
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                className="bitem"
                sx={{ margin: "10px 10px" }}
                size="small"
                variant="outlined"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
