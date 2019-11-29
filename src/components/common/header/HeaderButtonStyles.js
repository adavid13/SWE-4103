import { COLORS } from "../../common/styles/styles";

const styles = {
  buttonGroup: {
    flexGrow: 1,
    height: "100%",
  },
  button: {
    height: "100%",
    fontSize: "1em",
    padding: "0 1em",
    paddingTop: props => props.isSelected 
      ? "4px"
      : "unset",
    borderBottom: props => props.isSelected 
      ? "4px solid"
      : "unset",
    borderBottomColor: props => props.isSelected 
      ? COLORS.PINK
      : "unset",
  },
  username: {
    fontSize: "1em",
    margin: "0 1em"
  },
  avatar: {
    width: "2em",
    height: "2em"
  }
};

export default styles;