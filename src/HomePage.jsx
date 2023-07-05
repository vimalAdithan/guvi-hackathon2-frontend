import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div>
        <h1>Welcome you have logged in</h1>
      </div><br />
      <div>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back
        </Button>
      </div>
    </div>
  );
}
