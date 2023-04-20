import { useState, useEffect } from "react";
import * as React from "react";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import { API } from "./global";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function CartItems({ itms, setAmount, amount }) {
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

  const [value, setValue] = React.useState(dayjs());
  const [value1, setValue1] = React.useState(dayjs().add(1, "hour"));
  const [num, setNum] = React.useState(0);
  const addItem = async () => {
    // handleClick();
    const newCard = {
      name: itms.name,
      image: itms.image,
      price: itms.price,
      status: true,
    };
    await fetch(`${API}/cart/${itms._id}`, {
      method: "PUT",
      body: JSON.stringify(newCard),
      headers: { "Content-Type": "application/json" },
    });
    location.reload("/cart");
  };
  return (
    <div className="checkout_card">
      <Card sx={{ display: "flex", gap: "30px" }}>
        <div>
          <div className="item-img">
            <img src={itms.image} alt="jcb" />
          </div>
          <div>
            <p>{itms.name}</p>
            <br />
            <p>Hourly : ${itms.price}.00/-</p>
          </div>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Start Time"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
              <DateTimePicker
                label="End Time"
                value={value1}
                onChange={(newValue1) => {
                  setValue1(newValue1);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div>
            <p>Hours:{Math.floor((value1 - value) / 3600000)}</p>
            <div>
              <p>Quantity :</p>
              <IconButton
                aria-label="delete"
                size="large"
                color="error"
                onClick={() => {
                  if (num >= 1) {
                    setNum(num - 1);
                    setAmount(amount - itms.price);
                  }
                }}
              >
                <RemoveIcon />
              </IconButton>
              <label type="number">{num}</label>
              <IconButton
                aria-label="delete"
                size="large"
                color="success"
                onClick={() => {
                  if (num <= 4) {
                    setNum(num + 1);
                    setAmount(
                      amount +
                        Math.floor((value1 - value) / 3600000) * itms.price
                    );
                  }
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
            <p>
              Amount :
              {Math.floor((value1 - value) / 3600000) * itms.price * num}
            </p>
            <br />
          </div>
        </div>
        <div className="remove">
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Item Removed from cart
            </Alert>
          </Snackbar>
          <Button
            className="bitem"
            sx={{ margin: "10px 10px" }}
            size="small"
            variant="contained"
            color="error"
            onClick={() => addItem()}
          >
            Remove
          </Button>
        </div>
      </Card>
    </div>
  );
}
