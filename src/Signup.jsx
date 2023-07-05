import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate,NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const formValidationSchema = yup.object({
  username: yup.string().required().min(5),
  password: yup.string().required().min(8),
  repassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Signup() {
  const [open, setOpen] = React.useState(false);
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
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        repassword: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (e) => {
        const result = await fetch("https://sample-login-node.vercel.app/signup", {
          method: "POST",
          body: JSON.stringify(e),
          headers: { "Content-Type": "application/json" },
        }).then((data) => data);
        if (result.status == 201) {
          navigate("/");
        } else {
          handleClick();
        }
      },
    });
  return (
    <div style={{ padding: "80px 0" }}>
      <div className="login-box">
        <p>Sign up</p>
        <form onSubmit={handleSubmit}>
          <TextField
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            id="username"
            label="Email Id"
            variant="outlined"
            size="small"
          />
          {touched.username && errors.username ? errors.username : null}
          <TextField
            autoComplete="on"
            id="password"
            label="Password"
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
            label="Confirm Password"
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
            Signup
          </Button>
          <div>
          <p style={{ display: "inline-block" }}>Already have an account? <NavLink to="/">Sign In</NavLink></p>
          </div>
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
