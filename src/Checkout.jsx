import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import * as React from "react";
import Input from "@mui/joy/Input";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { API } from "./global";

export function UserEdit() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch(`${API}/cart`)
      .then((data) => data.json())
      .then((crd) => setItems(crd));
  }, []);
  return items ? <Checkout items={items} /> : <h1>Loading...</h1>;
}
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Checkout({ items }) {
  const navigate = useNavigate();
  // const [items, setItems] = useState([
  //   {
  //     id: "1",
  //     image: "/images/jcb.jpg",
  //     name: "JCB",
  //     price: 200,
  //     status: "false",
  //   },
  //   {
  //     id: "2",
  //     image: "/images/ciment mixture.jpg",
  //     name: "Cement mixture",
  //     price: 175,
  //     status: "true",
  //   },
  //   {
  //     id: "3",
  //     image: "/images/road_roller.jpg",
  //     name: "Road roller",
  //     price: 180,
  //     status: "false",
  //   },
  //   {
  //     id: "4",
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSHKPiMxlEfAcUa_CFhDTjQpsFyxZbL7evWSWBzRmu7uYT6yJ0D0ubI1QxrsSuP5mkaNo&usqp=CAU",
  //     name: "Road roller",
  //     price: 180,
  //     status: "true",
  //   },
  //   {
  //     id: "5",
  //     image: "/images/crane.jpg",
  //     name: "Crane",
  //     price: 150,
  //     status: "true",
  //   },
  // ]);

  //  const getCard = () => {
  //   fetch(`${API}/cart`)
  //     .then((data) => data.json())
  //     .then((res) => setItems(res));
  // };
  //  useEffect(() => getCard(), []);

  //    const deleteCard = (id) => {
  //   fetch(`${API}/items/${id}`, {
  //     method: "DELETE",
  //   }).then(() => getCard());
  // };
  return (
    <div style={{ display: "grid" }}>
      <div className="checkout">
        <p>CHECKOUT PAGE</p>
      </div>
      <Container fixed>
        <div className="list_checkout">
          {items
            .filter((itms) => itms.status == false)
            .map((itms) => (
              <CartItems key={itms.id} itms={itms} />
            ))}
        </div>
      </Container>
      <Button
        className="bitem"
        sx={{ margin: "10px 10px" }}
        size="small"
        variant="contained"
      >
        Checkout
      </Button>
      <Button
        onClick={() => navigate("/")}
        className="bitem"
        sx={{ margin: "10px 10px", width: "30px" }}
        size="small"
        color="secondary"
        variant="contained"
      >
        Back
      </Button>
    </div>
  );
}

import Card from "@mui/material/Card";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CartItems({ itms, quantity }) {
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
                onChange={(newValue) => setValue(newValue)}
              />
              <DateTimePicker
                label="End Time"
                value={value1}
                onChange={(newValue1) => setValue1(newValue1)}
              />
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
              }}
            />
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
