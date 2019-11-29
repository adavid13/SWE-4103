import { createMuiTheme } from '@material-ui/core/styles';
import { COLORS } from "./components/common/styles/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.LIGHT_BLUE
    },
    secondary: {
      main: COLORS.PINK
    },
    text: {
      primary: COLORS.GREY
    }
  },
  typography: {
    fontFamily: [
      'Raleway',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    button: {
      fontWeight: 700
    }
  },
});

export default theme
