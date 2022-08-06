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
  measurementFor: { value: "", label: "Measurement For" },
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

const MeasurementInformation = ({ data }) => (
  <>
    {!Object.keys(data).length < 1 && (
      <>
        {Object.entries(data).map(([key, value]) => {
          console.log(key, value);
          return (
            <>
              {/* <Grid container spacing={2} mt={2} backgroundColor="red"> */}
              {/* <Grid xs={12} sm={3}> */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  sx={{ fontSize: { xs: "14px", sm: "20px", md: "25px" } }}
                  color={"#8B8989"}
                >
                  {key}
                </Typography>
                {/* </Grid> */}
                {/* <Grid xs={12} sm={3}> */}
                <Typography
                  sx={{ fontSize: { xs: "14px", sm: "20px", md: "25px" } }}
                >
                  {value}
                </Typography>
                {/* </Grid> */}
                {/* </Grid> */}
              </Box>
            </>
          );
        })}
      </>
    )}
  </>
);

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

  const handleAddMeasurement = () => {
    let id = 0;

    if (measurement.length > 0) {
      id = measurement[measurement.length - 1].id + 1;
    }
    setMeasurement([{ id: id, ...formData }, ...measurement]);
    setAdd(false);

    // console.log(formData);
  };

  React.useEffect(() => {
    // console.log(measurement);
  }, [measurement]);

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
        {measurement.map((item) => (
          <Tab key={item.id} label={item.measurementFor} />
        ))}
      </Tabs>
      {add ? (
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
      ) : (
        <Box
          sx={{
            maxHeight: "350px",
            overflow: "scroll",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          <MeasurementInformation data={measurement[0] || {}} />
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
