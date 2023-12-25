import { createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";

export default createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#E535AB",
    },
    secondary: blue,
    error: red,

    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      default: "#212121",
    },
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          position: "absolute",
          right: 0,
          bottom: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#424242",
          color: "#fff",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "4px 20px",
          blockSize: "48px",
          borderColor: "#515151",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            color: "#ffffff4d",
          },
        },
      },
    },
  },
});
