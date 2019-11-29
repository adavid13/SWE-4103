import { COLORS } from "../common/styles/styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    padding: 15,
    minHeight: "75vh",
    backgroundColor: "white"
  },
  formContainer: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    maxWidth: "25em"
  },
  formSide: {
    flex: 2.5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto"
  },
  photoSide: {
    flex: 4
  },
  textField: {
    width: 316,
    height: 83,
    alignSelf: "center"
  },
  loginButton: {
    width: 92,
    height: 36,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    backgroundColor: COLORS.PINK,
    alignSelf: "center"
  },
  header: {
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 57,
    color: COLORS.LIGHT_BLUE,
    alignSelf: "center"
  },
  helperText: {
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.LIGHT_GREY,
    paddingBottom: 30
  },
  radioButtonFormControl: {
    margin: 10,
    marginLeft: -30
  },
  icon: {
    display: "flex"
  },
  hub: {
    display: "block",
    position: "relative",
    margin: "auto",
    maxWidth: "80%",
    minWidth: "400px",
    minHeight: "300px",
    maxHeight: "80%",
    bottom: "-5%",
    paddingRight: "20px",
    paddingLeft: "10px"
  },
  logo: {
    display: "block",
    position: "relative",
    margin: "auto",
    marginLeft: "initial",
    maxWidth: "300px",
    left: "5%"
  }
};

export default styles;
