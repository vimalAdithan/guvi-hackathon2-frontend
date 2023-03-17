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
import { Items } from "./Items";


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




