import { createTheme } from "@mui/material/styles";
import blue from "@mui/material/colors/blue";
import red from "@mui/material/colors/red";

export default createTheme({
  typography: {
    useNextVariants: true,
    color: "#fff",
  },
  palette: {
    type: "dark",
    primary: {
      main: "#E535AB",
    },
    secondary: blue,
    error: red,
    text: "#FFF",
    contrastThreshold: 3,
    tonalOffset: 0.2,
    contrastText: "#fff",
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: "4px 20px",
        blockSize: "48px",
      },
    },
  },
});
