import React from "react";
import { TextField } from "@mui/material";

const sx = {
  "& .MuiInput-underline:before": {
    borderBottom: "3px solid #cfd3d7",
  },
  "& .MuiInput-underline:after": {
    borderBottom: "3px solid #cfd3d7",
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottom: "3px solid #cfd3d7",
  },
};

const InputProps = {
  style: { color: "#cfd3d7" },
};

const InputLabelProps = {
  style: { color: "#cfd3d7" },
};

const CustomTextField = ({ onChange }) => {
  return (
    <TextField
      onChange={onChange}
      id="standard-basic"
      label="title"
      variant="standard"
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      sx={sx}
    />
  );
};

export default CustomTextField;
