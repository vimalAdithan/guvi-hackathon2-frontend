import { useState } from "react";
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


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export function CartItems({ itms }) {
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
  const [value1, setValue1] = React.useState(dayjs());
  const [num, setNum] = React.useState(0);
  const addItem = async () => {
    // handleClick();
    const newCard = {
      name: itms.name,
      image: itms.image,
      price: itms.price,
      status: true,
    };
    await fetch(`${API}/cart/${itms.id}`, {
      method: "PUT",
      body: JSON.stringify(newCard),
      headers: { "Content-Type": "application/json" },
    });
    window.location.href = "/";
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
                onChange={(newValue) => setValue(newValue)} />
              <DateTimePicker
                label="End Time"
                value={value1}
                onChange={(newValue1) => setValue1(newValue1)} />
            </DemoContainer>
          </LocalizationProvider>
          <div>
            <p>Total hours:{Math.floor((value1 - value) / 3600000)}</p>
            <p>Quantity :</p>
            <Input
              type="number"
              value={num}
              onChange={(e) => {
                setNum(e.target.value);
              }}
              slotProps={{
                input: {
                  min: 1,
                  max: 5,
                  step: 1,
                },
              }} />
            <p>
              amount :
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
            Remove from cart
          </Button>
        </div>
      </Card>
    </div>
  );
}
