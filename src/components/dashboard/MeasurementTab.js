import React from "react";
import CardGrid from "./CardGrid";
import Table from "./StyleTable";
import Modal from "./Modal";
import Form from "./Form";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MeasurementForm from "./MeasurementForm";

const initialMFData = {
  bustPoint: { value: 10, label: "Bust Point" },
  underBust: { value: 14, label: "Under Bust" },
  halfLength: { value: 16, label: "Half Length" },
  shoulderToHip: { value: 19, label: "Shoulder to hip" },
  blouseLength: { value: 16, label: "Blouse Length" },
  shoulderToKnee: { value: 16, label: "Shoulder to Knee" },
  gownLength: { value: 16, label: "Gown Length" },
  waistToKnee: { value: 16, label: "Waist to Knee" },
  skirtLength: { value: 16, label: "Skirt Length" },
  bustRound: { value: 16, label: "Bust Round" },
  underBustRound: { value: 16, label: "Under Bust Round" },
  waistRound: { value: 16, label: "Waist Round" },
  hipsRound: { value: 16, label: "Hips Round" },
  sleeveLength: { value: 16, label: "Sleeves Length" },
  sleeveRoundBiceps: { value: 16, label: "Sleeves Round/Biceps" },
  shoulder: { value: 16, label: "Shoulder" },
  armHole: { value: 16, label: "Arm Hole" },
};

const getInitialMFData = () => {
  let form = {};
  Object.entries(initialMFData).forEach(([key, value]) => {
    form[key] = "";
  });

  return form;
};

export default function MeasurementTab() {
  const [measurement, setMeasurement] = React.useState([]);
  const [formData, setFormData] = React.useState(getInitialMFData());
  const [value, setValue] = React.useState(0);
  const [add, setAdd] = React.useState(false);

  const [measurementList, setMeasurementList] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onFormTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMeasurement = (m) => {
    setMeasurement([m, ...measurement]);
    setAdd(false);

    // console.log(formData);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        indicatorColor="secondary"
        // style={{ backgroundColor: "red" }}
        aria-label="scrollable auto tabs example"
      >
        {measurementList.map((item) => (
          <Tab key={item.id} label={item.measurementName} />
        ))}
      </Tabs>
      {add && (
        <Box
          sx={{
            maxHeight: "350px",
            overflow: "scroll",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <MeasurementForm
            onMeasurementAdd={handleAddMeasurement}
            formData={formData}
            onTextChange={onFormTextChange}
          />
          <Box
            sx={{
              width: { xs: "200px" },
              position: "absolute",
              bottom: 20,
            }}
          >
            <Button
              onClick={handleAddMeasurement}
              variant="contained"
              sx={{ width: { xs: "100%" } }}
            >
              Add Measurement
            </Button>
          </Box>
        </Box>
      )}
      {!add && (
        <Box
          sx={{
            width: { xs: "200px" },
            position: "absolute",
            bottom: 20,
          }}
        >
          <Button
            onClick={() => setAdd(true)}
            variant="contained"
            sx={{ width: { xs: "100%" } }}
          >
            Add Measurement
          </Button>
        </Box>
      )}
    </Box>
  );
}
