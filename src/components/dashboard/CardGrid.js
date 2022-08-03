import React from "react";
import Grid from "@mui/material/Grid";

function CardGrid(props) {
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <div
          style={{
            ...{
              width: "100%",
              height: "100px",
              backgroundColor: "#191c24",
              borderRadius: 10,
            },
            ...props.style,
          }}
        >
          {props.children}
        </div>
      </Grid>
    </>
  );
}

export default CardGrid;
