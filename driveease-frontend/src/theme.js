import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d6efd"
    },
    secondary: {
      main: "#19857b"
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif'
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true }
    }
  }
});

export default theme;