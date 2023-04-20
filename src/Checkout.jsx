import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { API } from "./global";
import { CartItems } from "./CartItems";

export function UserEdit() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch(`${API}/cart`)
      .then((data) => data.json())
      .then((crd) => setItems(crd));
  }, []);
  return items ? <Checkout items={items} /> : <h1>Loading...</h1>;
}
function Checkout({ items }) {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const razor = () => {
    if (amount == 0) {
      alert("amount is zero");
    } else {
      var options = {
        key: "rzp_test_485xBrfBtJL1Mb",
        key_secret: "0Knbl7LYIXpc5FfxN4gA3yLD",
        amount:amount*100,
        currency:"INR",
        name:"HeavyRentals",
        description:"Payment",
        handler:function(response){
          alert(response.razor_payment_id)
        },
        theme:{
          color:"#3399cc"
        }
      };
      var pay=new window.Razorpay(options);
      pay.open()
    }
  };
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
    <div
      style={{
        display: "grid",
        fontFamily:
          "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
      }}
    >
      <div className="checkout">
        <p>CHECKOUT PAGE</p>
      </div>
      <Container fixed>
        <div className="list_checkout">
          {items
            .filter((itms) => itms.status == false)
            .map((itms) => (
              <CartItems
                key={itms._id}
                itms={itms}
                setAmount={setAmount}
                amount={amount}
              />
            ))}
        </div>
        <p>Total amount: {amount}</p>
      </Container>
      <Button
        className="bitem"
        sx={{ margin: "10px 10px" }}
        size="small"
        variant="contained"
        onClick={() => razor()}
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
