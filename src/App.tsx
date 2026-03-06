import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import {
  generate2DArray,
  checkAdjacentCellsAndReturnIfEmpty,
  checkIfGameIsComplete,
} from "./util";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  eachBox: {
    border: "1px solid",
    height: "48px",
    width: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "white",
    background: "red",
  },
}));

const App = () => {
  const classes = useStyles();
  const [twoDimArray, setDimArray] = useState([...generate2DArray(3, 3)]);

  const onClickOfEachCell = (
    row: number,
    col: number,
    value: number | undefined,
  ) => {
    // check the adjacent cells if empty
    // if empty, move the value from the current index to empty cell index
    setDimArray(
      checkAdjacentCellsAndReturnIfEmpty(row, col, value, twoDimArray),
    );
  };

  const eachBox = (
    rowIndex: number,
    colIndex: number,
    value: number | undefined,
  ) => (
    <Box
      className={classes.eachBox}
      onClick={() => onClickOfEachCell(rowIndex, colIndex, value)}
    >
      {value}
    </Box>
  );

  const renderRow = (rowIndex: number) => (
    <Box display="flex">
      {twoDimArray[rowIndex].map((eachValue, colIndex) => {
        return eachBox(rowIndex, colIndex, eachValue);
      })}
    </Box>
  );

  return (
    <Box className={classes.root}>
      <h1>Welcome to the Grid Game</h1>
      <Box>
        {twoDimArray.map((eachRow, rowIndex) => {
          return renderRow(rowIndex);
        })}
      </Box>
    </Box>
  );
};

export default App;
