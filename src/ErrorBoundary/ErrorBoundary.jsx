import React, { Component } from "react";
import { Typography, Container, Button, Box } from "@mui/material";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "6rem",
  gap: "1rem",
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={containerStyle}>
          <Typography variant="h4" color="error">
            Oops! Something went wrong.
          </Typography>
          <Typography variant="body1" color="error">
            {this.state.error && this.state.error.toString()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ marginRight: "1rem" }}
          >
            Reload
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
