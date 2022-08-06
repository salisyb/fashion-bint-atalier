import * as React from "react";
import Form from "./Form";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";

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

const genForm = () => {
  let form = [];

  Object.entries(initialMFData).forEach(([key, data]) => {
    form.push({ name: key, label: data.label });
  });

  return form;
};

const getInitialMFData = () => {
  let form = {};
  Object.entries(initialMFData).forEach(([key, value]) => {
    form[key] = "";
  });

  return form;
};

export default function MeasurementForm({
  onMeasurementAdd,
  onTextChange,
  formData,
}) {
  const [formError, setFormError] = React.useState("");
  const [generateForm, setGenForm] = React.useState(genForm());

  return (
    <Form>
      <Typography color={"red"}>{formError}</Typography>
      {generateForm.map((item) => (
        <TextField
          key={item.name}
          id="standard-password-input"
          label={item.label}
          //   required
          name={item.name}
          value={formData[item.name]}
          onChange={onTextChange}
          type="text"
          autoComplete="current-password"
          variant="standard"
        />
      ))}

      {/* <Box mt={2}>
        <Button
          variant={"contained"}
          sx={{ width: "100%" }}
          onClick={handleAddMeasurement}
        >
          Add New Measurement
        </Button>
      </Box> */}
    </Form>
  );
}
