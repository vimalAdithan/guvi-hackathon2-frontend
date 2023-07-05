import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const formValidationSchema = yup.object({
  userid: yup.string().required().email(),
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Reset_Password() {
  const [state, setState] = React.useState({
    open: false,
    content: "email sent",
    severity: "success",
  });
  const { content, severity, open } = state;

  const handleClick = (newState) => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        userid: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (e) => {
        const result = await fetch(
          "https://sample-login-node.vercel.app/passwordlink",
          {
            method: "POST",
            body: JSON.stringify({
              username: e.userid,
              link:"https://polite-lollipop-713e27.netlify.app"
            }),
            headers: { "Content-Type": "application/json" },
          }
        ).then((data) => data);
        if (result.status == 201) {
          handleClick({
            severity: "success",
            content: "Reset link has sent to the EmailId",
          });
        } else {
          handleClick({
            severity: "error",
            content: "EmailId does not exist",
          });
        }
      },
    });
  const navigate = useNavigate();
  return (
    <div style={{ padding: "80px 0" }}>
      <div></div>
      <div className="login-box">
        <p>Enter your Email Id</p>
        <form onSubmit={handleSubmit}>
          <TextField
            name="userid"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.userid}
            label="Email Id"
            variant="outlined"
            size="small"
          />
          {touched.userid && errors.userid ? errors.userid : null}
          <Button variant="contained" type="submit">
            Send
          </Button>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {content}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
