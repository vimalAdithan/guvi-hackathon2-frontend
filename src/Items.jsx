import { useState } from "react";
import Button from "@mui/material/Button";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./global";
import Card from "@mui/material/Card";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Items({ itms, cart, setCart }) {
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
