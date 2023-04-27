import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { API } from "./global";
import { useFormik } from "formik";
import * as yup from "yup";

const formValidationSchema = yup.object({
  name: yup.string().required().min(4),
  price: yup.number().required().min(1),
  image: yup.string().required().min(5),
});

export function AddForm() {
  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        image: "",
        price: "",
        status: true,
      },
      validationSchema: formValidationSchema,
      onSubmit: (e) => {
        fetch(`${API}/add`, {
          method: "POST",
          body: JSON.stringify(e),
          headers: { "Content-Type": "application/json"},
        });
        console.log(JSON.stringify(e));
        navigate("/home");
      },
    });

  return (
    <div className="wrap">
      <form onSubmit={handleSubmit} className="full">
        <TextField
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          label="Name"
          size="small"
        />
        {touched.name && errors.name ? errors.name : null}
        <TextField
          label="Image url"
          size="small"
          name="image"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.image}
        />
        {touched.image && errors.image ? errors.image : null}

        <TextField
          label="Price"
          size="small"
          name="price"
          type="number"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price}
        />
        {touched.price && errors.price ? errors.price : null}
        <Button variant="contained" size="small" color="success" type="submit">
          ADD
        </Button>
      </form>
    </div>
  );
}
