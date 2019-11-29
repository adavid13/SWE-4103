import { COLORS } from "../common/styles/styles";

const styles = {
  root: {
    flexGrow: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontFamily: "Raleway, Helvetica, Arial, sans-serif",
    fontSize: "1.75em",
    color: COLORS.GREY
  },
  avatar: {
    width: "8em",
    height: "8em",
    color: COLORS.LIGHT_GREY
  },
  pictureContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  pictureContainer2: {
    marginLeft: "-450px"
  },
  pictureContainer3: {
    marginLeft: "450px",
    marginTop: "-120px"
  }
};

export default styles;
