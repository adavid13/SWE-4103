import { COLORS } from "../common/styles/styles";

const styles = {
  button: {
    float: "right",
    backgroundColor: COLORS.LIGHT_NAVY,
    color: "white",
    "&:hover": {
      backgroundColor: COLORS.DARK_NAVY
    },
    marginLeft: "auto"
  }
};

export default styles;
