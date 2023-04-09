import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Notification(props) {
  const { uuid, onClick } = props;

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="subtitle1" fontFamily="monospace" gutterBottom>
        Enter an Email ID below if you want to be notified when file processing
        ends
      </Typography>
      <Box flexDirection="column">
        <TextField
          sx={{ width: "65%", m: 1, input: { color: "whitesmoke" } }}
          label="Email"
          color="primary"
          focused
          id="email"
        />
        <Button
          size="large"
          sx={{ m: 1.5 }}
          variant="contained"
          endIcon={<SendIcon />}
          onClick={onClick}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
