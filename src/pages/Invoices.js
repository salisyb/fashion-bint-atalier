import React from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { MyDocument } from "components/documentGenerator/PDFfile";
import Button from "@mui/material/Button";

export default function Invoice() {
  return (
    <div style={{ textAlign: "center", width: "100%", height: "100%" }}>
      <PDFDownloadLink document={<MyDocument />} fileName="bint-test">
        {({ loading }) =>
          loading ? (
            <Button>loading document....</Button>
          ) : (
            <Button>Download</Button>
          )
        }
      </PDFDownloadLink>

      <PDFViewer style={{ width: "100vw", height: "100vh" }}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}
