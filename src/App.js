import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import BasicTable from "./components/BasicTable";
import { Box, Button } from "@mui/material";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { uuidv4, filesRender } from "./utils";
import Notification from "./components/Notification";

function App() {
  const [files, setFile] = useState([]);
  const [headers, setHeaders] = useState([
    "File Name",
    "File Type",
    "File Size",
    "File Status",
  ]);
  const [upload, setUpload] = useState(false);

  const [FileUploadDisable, setFileUploadDisable] = useState(false);
  const [uuid, setuuid] = useState("");

  const handleChange = async (event) => {
    event.preventDefault();
    setFile(await filesRender(event.target.files));
    console.log(files);
    console.log(uuid);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!headers.includes('File Status'))
    //   setHeaders((prev) => ([...prev, 'File Status']))
    if (uuid === "") {
      setuuid(uuidv4());
    }
    setUpload(true);
    
  };

  const handleClick = (event) => {
    setuuid(uuidv4());
  };

  useEffect(() => {
    const email = document.getElementById("email").value;
    const params = { uuid: uuid, email: email };
    if (email != "") {
      axios
        .post(
          "https://i5ln09jpwf.execute-api.us-east-1.amazonaws.com/analysis-api/subscribe",
          params
        )
        .then((resp) => {
          console.log(resp);
        });
    }
    console.log(params);
  }, [uuid]);


  useEffect(() => {
    if (files.length > 0 && upload) {
      setFile((prev) =>
        prev.map((f) => ({
          ...f,
          status: "Uploading to Cloud",
        }))
      );

      files.map((file) => {
        const params = {
          fname: file.name,
          uuid: uuid,
          base64: file.base64,
        };
        console.log(file);
        console.log(params);
        let out;
          axios
            .post(
              "https://i5ln09jpwf.execute-api.us-east-1.amazonaws.com/analysis-api/upload-to-s3",
              { ...params }
            )
            .then((resp) => {
              setFileUploadDisable(true);
              console.log(params);
              console.log(resp);
              setFile((prev) =>
                prev.map((f) => ({
                  ...f,
                  status: "Processing in Cloud Started",
                }))
              );
              out = resp;
            })
            .catch((err) => {
              alert(err);
              setFile((prev) =>
                prev.map((f) => ({
                  ...f,
                  status: "Upload Failed",
                }))
              );
            });
        return out;
      });
    }
  }, [upload]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Upload CSV files to perform analysis.</p>
        <Notification uuid={uuid} onClick={handleClick} />
        <Box component="form" m={2}>
          <Button
            sx={{ margin: 2 }}
            variant="contained"
            component="label"
            disabled={FileUploadDisable}
            startIcon={<AttachFileIcon />}
          >
            Select Files
            <input
              hidden
              accept="text/*"
              multiple
              type="file"
              onChange={handleChange}
            />
          </Button>
          <br></br>
          <div>
            {files.length > 0 && <BasicTable rows={files} headers={headers} />}
          </div>
          {files.length > 0 && (
            <Button
              type="submit"
              sx={{ margin: 2 }}
              variant="contained"
              component="label"
              endIcon={<BackupOutlinedIcon />}
              onClick={handleSubmit}
              // disabled={FileUploadDisable}
            >
              Upload
            </Button>
          )}
        </Box>
      </header>
    </div>
  );
}

export default App;
