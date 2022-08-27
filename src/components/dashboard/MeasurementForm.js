import * as React from "react";
import Form from "./Form";
// import Box from "@mui/material/Box";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { createClientMeasurement } from "api/clients.api";
import CircularProgress from "@mui/material/CircularProgress";

const addClientMeasurement = yup.object().shape({
  bust_point: yup.string().required("this field is required"),
  under_bust: yup.string().required("this field is required"),
  half_length: yup.string().required("this field is required"),
  shoulder_to_hip: yup.string().required("this field is required"),
  blouse_length: yup.string().required("this field is required"),
  shoulder_to_knee: yup.string().required("this field is required"),
  gown_length: yup.string().required("this field is required"),
  waist_to_knee: yup.string().required("this field is required"),
  skirt_length: yup.string().required("this field is required"),
  bust_round: yup.string().required("this field is required"),
  under_bust_round: yup.string().required("this field is required"),
  waist_round: yup.string().required("this field is required"),
  hips_round: yup.string().required("this field is required"),
  sleeve_length: yup.string().required("this field is required"),
  sleeve_round_biceps: yup.string().required("this field is required"),
  shoulder: yup.string().required("this field is required"),
  arm_hole: yup.string().required("this field is required"),
});

export default function MeasurementForm({
  onMeasurementAdd,
  onTextChange,
  formData,
  userData,
}) {
  const form = {
    measurement_owner: "",
    bust_point: "",
    under_bust: "",
    half_length: "",
    shoulder_to_hip: "",
    blouse_length: "",
    shoulder_to_knee: "",
    gown_length: "",
    waist_to_knee: "",
    skirt_length: "",
    bust_round: "",

    center_front: "",
    back_half_length: "",
    corset_length: "",
    neck_round: "",

    under_bust_round: "",
    waist_round: "",
    hips_round: "",
    sleeve_length: "",
    sleeve_round_biceps: "",
    shoulder: "",
    arm_hole: "",
  };

  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);

  const handleAddMeasurement = async (measurement) => {
    if (measurement.measurement_owner === "") {
      alert("You need to set a measurement owner");
      return;
    }
    setLoading(true);
    console.log({
      owner: userData.id,
      ...measurement,
    });
    const data = await createClientMeasurement(
      {
        owner: userData.id,
        ...measurement,
      },
      token
    );

    setLoading(false);

    if (data) {
      onMeasurementAdd(data);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",

          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "300px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Formik
      // validationSchema={addClientMeasurement}
      initialValues={form}
      onSubmit={(e) => handleAddMeasurement(e)}
    >
      {({
        errors,
        values,
        handleSubmit,
        handleBlur,
        handleChange,
        handleReset,
      }) => (
        <Box>
          <Form>
            <TextField
              id="standard-password-input"
              label={"Measurement owner"}
              required
              name={"measurement_owner"}
              value={values.measurement_owner}
              onChange={handleChange("measurement_owner")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Bust Point"}
              required
              name={"bust_point"}
              value={values.bust_point}
              onChange={handleChange("bust_point")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Under Bust"}
              required
              name={"under_bust"}
              value={values.under_bust}
              onChange={handleChange("under_bust")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Half Length"}
              required
              name={"half_length"}
              value={values.half_length}
              onChange={handleChange("half_length")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Shoulder to hip"}
              required
              name={"shoulder_to_hip"}
              value={values.shoulder_to_hip}
              onChange={handleChange("shoulder_to_hip")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Blouse Length"}
              required
              name={"blouse_length"}
              value={values.blouse_length}
              onChange={handleChange("blouse_length")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Center Front"}
              required
              name={"center_front"}
              value={values.center_front}
              onChange={handleChange("center_front")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Back Half Length"}
              required
              name={"back_half_length"}
              value={values.back_half_length}
              onChange={handleChange("back_half_length")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Corset Length"}
              required
              name={"corset_length"}
              value={values.corset_length}
              onChange={handleChange("corset_length")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Neck Round"}
              required
              name={"neck_round"}
              value={values.neck_round}
              onChange={handleChange("neck_round")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Shoulder to Knee"}
              required
              name={"shoulder_to_knee"}
              value={values.shoulder_to_knee}
              onChange={handleChange("shoulder_to_knee")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Gown Length"}
              required
              name={"gown_length"}
              value={values.gown_length}
              onChange={handleChange("gown_length")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Waist to Knee"}
              required
              name={"waist_to_knee"}
              value={values.waist_to_knee}
              onChange={handleChange("waist_to_knee")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Skirt Length"}
              required
              name={"skirt_length"}
              value={values.skirt_length}
              onChange={handleChange("skirt_length")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Bust round"}
              required
              name={"bust_round"}
              value={values.bust_round}
              onChange={handleChange("bust_round")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Under bust round"}
              required
              name={"under_bust_round"}
              value={values.under_bust_round}
              onChange={handleChange("under_bust_round")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Waist Round"}
              required
              name={"waist_round"}
              value={values.waist_round}
              onChange={handleChange("waist_round")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Hips Round"}
              required
              name={"hips_round"}
              value={values.hips_round}
              onChange={handleChange("hips_round")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Sleeve Length"}
              required
              name={"sleeve_length"}
              value={values.sleeve_length}
              onChange={handleChange("sleeve_length")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Sleeve round/biceps"}
              required
              name={"sleeve_round_biceps"}
              value={values.sleeve_round_biceps}
              onChange={handleChange("sleeve_round_biceps")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Shoulder"}
              required
              name={"shoulder"}
              value={values.shoulder}
              onChange={handleChange("shoulder")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label={"Arm Hole"}
              required
              name={"arm_hole"}
              value={values.arm_hole}
              onChange={handleChange("arm_hole")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
          </Form>
          <Box
            sx={{
              width: { xs: "200px", sm: "540px" },
              position: "absolute",
              bottom: 10,
              // backgroundColor: "red",
            }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ width: { xs: "100%", sm: "50%" } }}
              >
                Add Measurement
              </Button>
              {Object.keys(errors).length > 0 && (
                <Typography color="red">
                  Please fill in all the field
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
