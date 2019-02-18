import { relative } from "path";

const generalStyle = {
  aboveTable: {
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "0",
    height: "30px",
    borderBottom: "1px solid rgb(51, 51, 51)",
    width: "100%",
    textAlign: "right",
    fontWeight: "500",
    display: "table"
  },
  resultSection: {
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: "0",
    height: "20px",
    borderBottom: "1px solid rgb(51, 51, 51)",
    width: "100%",
    padding: "7px",
    fontWeight: "500",
    display: "table"
  },
  aboveTableIcon: {
    display: "table-cell",
    verticalAlign: " middle",
    fontSize: "13px",
    paddingRight: "7px"
  },
  buttonMargin: {
    margin: "5px -40px"
  },
  alternativeContainer: {
    marginLeft: "2.6%"
  },
  divider: {
    height: "10px",
    width: "100%",
    backgroundColor: "#333"
  },
  tableHeadSpace: {
    padding: "10px"
  },
  removeBorder: {
    border: "none",
    width: "100px"
  },
  styleSelect: {
    marginTop: "-3px",
    borderBottomWidth: " 1px"
  },
  pt3: {
    paddingTop: "30px"
  },
  pt2_5: {
    paddingTop: "25px"
  },
  pt1_5: {
    paddingTop: "15px"
  },
  mt3: {
    marginTop: "30px"
  },
  text2: {
    color: "#1b4aa5",
    marginTop: "30px",
    fontWeight: "700"
  },
  positionRelative: {
    position: "relative"
  },
  positionIcon: {
    position: "absolute",
    right: "20px",
    top: "33px",
    color: "#0072c6"
  },
  printIcon: {
    fontSize: "32px",
    position: "absolute",
    top: "10px"
  },
  pr: {
    position: "relative"
  },
  positionCenter: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none"
  },
  fs1: {
    fontSize: "13px",
    fontWeight: "600",
    top: "20px",
    position: "absolute",
    marginLeft: "35px"
  },
  rtable: {
    display: "inline-block",
    verticalAlign: "top",
    maxWidth: "100%",
    overflowX: "auto",
    borderCollapse: "collapse",
    borderSpacing: "0"
  },
  tableTh: {
    fontSize: "11px",
    textAlign: "left",
    textTransform: "uppercase",
    background: "#000",
    padding: "6px 12px",
    maxWidth: "100px",
    minWidth: "50px",
    border: " 1px solid #d9d7ce",
    color: "#fff",
    borderCollapse: "collapse"
  },
  tableTd: {
    padding: "6px 12px",
    border: "1px solid #d9d7ce",
    borderCollapse: "collapse",
    maxWidth: "100px",
    minWidth: "52px"
  },
  tableTd2: {
    padding: "6px 12px",
    border: "1px solid #d9d7ce",
    borderCollapse: "collapse",
    minWidth: "60px"
  },
  tableTd3: {
    padding: "4px 5px",
    border: "1px solid #d9d7ce",
    borderCollapse: "collapse",
    minWidth: "66px"
  },
  sTable: {
    display: "block",
    verticalAlign: "top",
    maxWidth: "100%",
    overflowX: "auto",
    borderCollapse: "collapse",
    borderSpacing: "0",
    float: "right",
    textAlign: "left"
  },
  PO: {
    fontFamily: "arial, helvetica, sans-serif",
    border: "1px solid #000",
    width: " 100%",
    textAlign: "center",
    borderCollapse: "collapse"
  },
  tablePOTop: {
    fontFamily: "arial, helvetica, sans-serif",
    border: "1px solid #000",
    width: "100%",
    textlign: "center",
    borderCollapse: "collapse"
  },
  POTopth: {
    border: "1px solid #000",
    padding: "3px 2px"
  },
  POToptd: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#000"
  },
  bold: {
    fontWeight: "700"
  },
  text5: {
    fontSize: "9px",
    float: "left",
    textAlign: "left"
  },
  text6: {
    fontSize: "9px",
    borderLeft: "1px solid #000",
    textAlign: "right"
  },
  text11: {
    fontSize: "9px",
    display: "block",
    padding: "3px 0",
    marginTop: "5px"
  },
  alignRight: {
    textAlign: "right"
  },
  alignLeft: {
    textAlign: "left"
  },
  floatRight: {
    position: "absolute",
    right: "0"
  },
  strong7: {
    fontWeight: "700"
  },
  text13: {
    fontSize: "11px",
    fontWeight: "700",
    display: "block",
    padding: "1px 0"
  },
  text14: {
    fontSize: "10.5px",
    fontWeight: "700",
    display: "block",
    padding: "2px 0"
  },
  left: {
    textAlign: "left"
  },
  POLabel: {
    float: "none",
    display: "inline-block",
    verticalAlign: "middle"
  },
  POLabel2: {
    float: "none",
    display: "inline-block",
    verticalAlign: "middle",
    margin: "5px 0"
  },
  POinput: {
    float: "none",
    display: "inline-block",
    verticalAlign: "middle",
    outline: "0",
    borderWidth: "0",
    borderColor: "#000",
    marginBottom: "5px",
    marginLeft: "",
    width: "70px"
  },
  space20: {
    height: "20px"
  },
  noPaddingMargin: {
    display: "block",
    padding: "0",
    margin: "0"
  },
  tableDiv: {
    position: "relative"
  },
  POtitle: {
    fontWeight: "bold",
    padding: "10px 0",
    marginTop: "-30px"
  },
  POtitle2: {
    fontWeight: "bold",
    padding: "10px 0"
  },
  POinput2: {
    float: "none",
    display: "inline-block",
    verticalAlign: "middle",
    outline: "0",
    borderWidth: "0 0 1px",
    borderColor: "#000",
    float: "right",
    maxWidth: "150px"
  },
  divider: {
    height: "1px",
    background: "#000"
  },
  header: {
    position: "absolute",
    top: "10px",
    left: "2px",
    right: "2px",
    fontFamily: "arial, helvetica, sans-serif",
    fontSize: "9px",
    padding: "10px 25px"
  },
  fixedHeader: {
    position: "absolute",
    top: "0%",
    left: "0%"
  },
  fixedFooter: {
    position: "absolute",
    bottom: "0%",
    left: "0%"
  },
  footer: {
    position: "absolute",
    bottom: "15px",
    left: "2px",
    right: "2px",
    fontFamily: "arial, helvetica, sans-serif",
    fontSize: "9px",
    padding: "0 25px"
  },
  eq_btn: {
    color: " #FFFFFF",
    backgroundColor: "#5f5f5f",
    borderRadius: "5px",
    padding: "7px 10px",
    position: "absolute",
    right: "10px",
    cursor: "pointer"
  },
  qe_btn: {
    color: " #FFFFFF",
    backgroundColor: "#0a71b0",
    borderRadius: "5px",
    padding: "7px 20px",
    position: "absolute",
    right: "10px",
    marginTop: " 20px",
    cursor: "pointer"
  },
  evaluationTable: {
    borderCollapse: "collapse"
  },
  tableContainer: {
    overflowX: "scroll"
  },

  etd: {
    textAlign: "center",
    border: "1px solid #ccc",
    maxWidth: "160px",
    padding: "4px 10px",
    color: "#444"
  },
  etd2: {
    textAlign: "center",
    border: "1px solid #ccc",
    padding: "4px 10px",
    color: "#444"
  },
  eth: {
    textAlign: "left",
    border: "1px solid #ccc",
    maxWidth: "160px",
    minWidth: "75px",
    padding: "4px 10px",
    color: "#0a71b0"
  },
  eth2: {
    textAlign: "left",
    minWidth: "140px",
    padding: "4px 10px",
    backgroundColor: "#0a71b0",
    color: "#fff"
  },
  lastRow: {
    textAlign: "center",
    border: "1px solid #ccc",
    padding: "4px 10px",
    color: "#444",
    borderBottom: " 1px solid #000"
  },
  tableTop: {
    backgroundColor: "#0a71b0",
    height: "50px",
    width: "100%",
    padding: "4px 10",
    textAlign: "left",
    color: "#fff",
    textTransform: "uppercase"
  },
  tpcl: {
    padding: "10px",
  },
  tpc2: {
    textAlign: "center"
  },
  firstCell: {
    backgroundColor: "#f2f2f2",
    minWidth: "150px",
    textAlign: "left",
    border: "1px solid #ccc",
    fontWeight: "600",
    color: "#444",
    padding: "4px 10px"
  },
  iw: {
    width: " 90px"
  },
  sw: {
    width: " 60px"
  },
  p15: {
    paddingBottom: "150px"
  },
  nextPrevious: {
    fontWeight: "900",
    textTransform: "uppercase",
    color: "blue",
    backgroundColor: "fff",
    textDecoration: "none"
  },
  previous: {
    color: " #f1f1f1",
    fontWeight: "900",
    textTransform: "uppercase",
    backgroundColor: "fff",
    textDecoration: "none",
    float: "right",
    borderRight: "1px solid #ccc",
    padding: "5px 20px",
    marginBottom: "5px"
  },
  next: {
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#0a71b0",
    backgroundColor: "fff",
    textDecoration: "none",
    float: "right",
    borderLeft: "1px solid #ccc",
    padding: "5px 20px",
    marginBottom: "5px"
  },
  tr: {
    float: "right"
  },

  notthingInNextPrevious: {},
  tableContainer2: {
    overflowX: "scroll",
    width: "600px",
    marginLeft: "24.5em",
    overflowY: "visible"
  },
  fixedCell: {
    position: "absolute",
    width: "12em",
    left: "11em",
    top: "auto",
    borderBottomWidth: "1px",
    textAlign: "left",
    border: "1px solid #ccc",
    padding: "4px 10px",
    color: "#0a71b0"
  },
  fixedCell2: {
    position: "absolute",
    width: "12em",
    left: "11em",
    top: "auto",
    borderBottomWidth: "1px",
    textAlign: "left",
    border: "1px solid #ccc",
    padding: "4px 10px",
    color: "#0a71b0",
    borderBottom: " 1px solid #000"
  },
  fixedCellLeft: {
    position: "absolute",
    width: "9.45em",
    left: "1em",
    top: "auto",
    fontWeight: "700",
    borderBottomWidth: "1px",
    textAlign: "left",
    backgroundColor: "#E1ECF4",
    height: "259px",
    paddingLeft: "10px",
    borderBottom: " 1px solid #000"
  },
  fixedCellRight: {
    position: "absolute",
    width: "4.2em",
    right: "0",
    top: "auto",
    borderBottomWidth: "1px",
    padding: "5px 2px",
    textAlign: "center",
    backgroundColor: "#E1ECF4",
    fontWeight: "700",
    color: "#39739d",
    margin: "2px",
    borderRadius: "70px"
  },

  aTable: {
    borderCollapse: " separate",
    borderSpacing: "0",
    borderTop: "1px solid grey"
  },
  wik1: {}
  // tr:hover {background-color:#f5f5f5;}
};

export default generalStyle;
