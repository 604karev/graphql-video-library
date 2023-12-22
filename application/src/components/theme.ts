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
    text: "#FFFFFF",
    contrastThreshold: 3,
    tonalOffset: 0.2,
    contrastText: "#fff",
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
} as any);
