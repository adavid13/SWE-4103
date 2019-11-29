import { COLORS } from "../../common/styles/styles";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: COLORS.LIGHT_BLUE
  },
  title: {
    flexGrow: 1
  },
  link: {
    color: "white",
    fontWeight: "bold",
    "&:hover": {
      color: "white"
    },
    marginLeft: 10,
    marginRight: 10
  },
  appBar: {
    backgroundColor: COLORS.LIGHT_BLUE
  },
  toolBar: {
    height: "4.375em"
  },
  buttonGroup: {
    flexGrow: 1,
    height: "100%",
  },
  button: {
    height: "100%",
    fontSize: "1em",
    padding: "0 1em"
  },
  username: {
    fontSize: "1em",
    fontWeight: 700,
    margin: "0 0.625em"
  },
  avatar: {
    width: "2em",
    height: "2em"
  }
};

export default styles;
