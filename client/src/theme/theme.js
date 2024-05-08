import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#673ab7",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#000000",
      contrastText: "#ffffff",
    },
  },
  // typography: {
  //   fontFamily: ["Poppins", "sans-serif"].join(","),
  // },
});

export default theme;
