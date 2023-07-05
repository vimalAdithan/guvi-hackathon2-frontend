import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const formValidationSchema = yup.object({
  password:yup.string().required().min(8),
  repassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Forgot_Password() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { id, token } = useParams();
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const userValid = async () => {
    const result = await fetch(
      `https://sample-login-node.vercel.app/forgotpassword/${id}/${token}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await result.json();
    if (data.status == 201) {
      console.log("user valid");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    userValid();
  }, []);
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        password: "",
        repassword: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (e) => {
        console.log(e);
        const result = await fetch(`https://sample-login-node.vercel.app/${id}/${token}`, {
          method: "POST",
          body: JSON.stringify(e),
          headers: { "Content-Type": "application/json" },
        });
        const data = await result.json();
        if (data.status == 201) {
          navigate("/");
        } else {
          handleClick();
        }
      },
    });
  return (
    <div style={{ padding: "80px 0" }}>
      <div></div>
      <div className="login-box">
        <p>New Password</p>
        <form onSubmit={handleSubmit}>
          <TextField
            autoComplete="on"
            id="password"
            label="password"
            variant="outlined"
            size="small"
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password ? errors.password : null}
          <TextField
            autoComplete="on"
            id="repassword"
            label="retype-password"
            variant="outlined"
            size="small"
            type="password"
            name="repassword"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.repassword}
          />
          {touched.repassword && errors.repassword ? errors.repassword : null}
          <Button variant="contained" type="submit">
            Send
          </Button>
        </form>
        <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            User name is already exist!
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
