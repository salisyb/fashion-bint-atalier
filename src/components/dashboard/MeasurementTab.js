import React from "react";
import CardGrid from "./CardGrid";
import Table from "./StyleTable";
import Modal from "./Modal";
import Form from "./Form";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MeasurementForm from "./MeasurementForm";
import { deleteClientMeasurement, getClientMeasurement } from "api/clients.api";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircle from "@mui/icons-material/AddCircle";
import Edit from "@mui/icons-material/Edit";

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

const MeasurementText = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography
      sx={{ fontSize: { xs: "14px", sm: "20px", md: "25px" } }}
      color={"#8B8989"}
    >
      {label}
    </Typography>

    <Typography sx={{ fontSize: { xs: "14px", sm: "20px", md: "25px" } }}>
      {value}
    </Typography>
  </Box>
);

const MeasurementInformation = ({ measurement }) => (
  <Box>
    {Object.entries(measurement).map(([key, value]) => (
      <>
        {key !== "id" && key !== "owner" && (
          <MeasurementText label={key.replaceAll("_", " ")} value={value} />
        )}
      </>
    ))}
  </Box>
  // <Box>
  //   <MeasurementText label={"Owner"} value={measurement.measurement_owner} />
  //   <MeasurementText label={"Bust Point"} value={measurement.bust_point} />
  //   <MeasurementText label={"Under Bust"} value={measurement.under_bust} />
  //   <MeasurementText label={"Half Length"} value={measurement.half_length} />
  //   <MeasurementText
  //     label={"Shoulder to hip"}
  //     value={measurement.shoulder_to_hip}
  //   />
  //   <MeasurementText
  //     label={"Under Bust Round"}
  //     value={measurement.under_bust_round}
  //   />
  //   <MeasurementText
  //     label={"Shoulder to knee"}
  //     value={measurement.shoulder_to_knee}
  //   />
  //   <MeasurementText label={"Gown Length"} value={measurement.gown_length} />

  //   <MeasurementText
  //     label={"Waist to Knee"}
  //     value={measurement.waist_to_knee}
  //   />
  //   <MeasurementText label={"Skirt Length"} value={measurement.skirt_length} />

  //   <MeasurementText label={"Bust round"} value={measurement.bust_round} />
  //   <MeasurementText label={"Waist Round"} value={measurement.waist_round} />

  //   <MeasurementText label={"Hips Round"} value={measurement.hips_round} />
  //   <MeasurementText
  //     label={"Sleeve Length"}
  //     value={measurement.sleeve_length}
  //   />

  //   <MeasurementText
  //     label={"Sleeve round/biceps"}
  //     value={measurement.sleeve_round_biceps}
  //   />
  //   <MeasurementText label={"Arm Hole"} value={measurement.arm_hole} />

  //   <MeasurementText
  //     label={"Blouse Length"}
  //     value={measurement.blouse_length}
  //   />
  //   <MeasurementText label={"Shoulder"} value={measurement.shoulder} />
  //   <MeasurementText
  //     label={"Back Half Length"}
  //     value={measurement.back_half_length}
  //   />

  //   <MeasurementText
  //     label={"Corset Length"}
  //     value={measurement.corset_length}
  //   />
  //   <MeasurementText label={"Neck Round"} value={measurement.neck_round} />

  //   <MeasurementText label={"Center Front"} value={measurement.center_front} />
  // </Box>
);

export default function MeasurementTab({ userData }) {
  const [measurement, setMeasurement] = React.useState([]);
  const [formData, setFormData] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [add, setAdd] = React.useState(false);
  const [update, setUpdate] = React.useState(false);

  const { token } = useSelector((state) => state.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onFormTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMeasurement = (data) => {
    if (update) {
      setMeasurement(measurement.map((m) => (m.id === data.id ? data : m)));
      setAdd(false);

      return;
    }
    setMeasurement([...measurement, data]);
    setAdd(false);

    // console.log(formData);
  };

  React.useEffect(() => {
    // console.log(measurement);
    getMeasurement();
  }, []);

  const getMeasurement = async () => {
    const data = await getClientMeasurement(userData.id, token);
    setMeasurement(data);
  };

  const handleDelete = async () => {
    const result = await deleteClientMeasurement(measurement[value].id);
    if (result) {
      setMeasurement(measurement.filter((m) => m.id !== measurement[value].id));
      setValue(0);
    }
  };

  const handleUpdate = () => {
    setFormData(measurement[value]);
    setUpdate(true);
    setAdd(true);
  };

  const handleCreate = () => {
    setUpdate(false);
    setAdd(true);
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
        {measurement.map((item) => (
          <Tab key={item.id} label={item.measurement_owner} />
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
            userData={userData}
            update={update}
            onTextChange={onFormTextChange}
          />
          <Box
            sx={{
              width: { xs: "200px" },
              position: "absolute",
              bottom: 20,
            }}
          >
            {/* <Button
              onClick={handleAddMeasurement}
              variant="contained"
              sx={{ width: { xs: "100%" } }}
            >
              Add Measurement
            </Button> */}
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
          {measurement.length > 0 && (
            <MeasurementInformation measurement={measurement[value]} />
          )}
        </Box>
      )}
      {!add && (
        <Box
          sx={{
            width: { xs: "90%", sm: "650px" },
            position: "absolute",
            bottom: 20,
            // backgroundColor: "red",
            // display: "flex",
            // flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            onClick={handleCreate}
            variant="outlined"
            startIcon={<AddCircle />}
            size={"small"}
          >
            Add
          </Button>
          <Button
            onClick={handleUpdate}
            variant="outlined"
            color="success"
            startIcon={<Edit />}
            size={"small"}
            marginX="10px"
          >
            Edit
          </Button>
          <Button
            onClick={handleDelete}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            size={"small"}
          >
            Delete
          </Button>
        </Box>
      )}
    </Box>
  );
}
