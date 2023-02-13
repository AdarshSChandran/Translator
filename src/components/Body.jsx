/* eslint-disable react-hooks/exhaustive-deps */

import { ContentPaste, SyncAlt } from "@mui/icons-material";
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Body = () => {
  const [Totallanguages, setTotalLanguages] = useState([]);
  const [inputLanguage, setinputLanguage] = useState({
    name: "English",
    code: "en",
  });
  const [outputLanguage, setoutputLanguage] = useState({
    name: "Hindi",
    code: "hi",
  });
  const [inputTextArea, setinputTextArea] = useState("");
  const [outputTextArea, setoutputTextArea] = useState("");

  const [loading, setLoading] = useState(false);

  const getLanguages = async () => {
    try {
      const languages = await axios.get(
        "https://text-translator2.p.rapidapi.com/getLanguages",
        {
          headers: {
            "X-RapidAPI-Key":
              "481f8199afmshe2ef1e26b1ab0d4p1fd6b4jsn1ddb1eb26cb3",
            "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
          },
        }
      );
      if (languages.status === 200) {
        setTotalLanguages(languages.data.data.languages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const translate = async () => {
    try {
      setLoading(true);
      const encodedParams = new URLSearchParams();
      encodedParams.append("source_language", inputLanguage.code);
      encodedParams.append("target_language", outputLanguage.code);
      encodedParams.append("text", inputTextArea);

      let res = await axios.post(
        "https://text-translator2.p.rapidapi.com/translate",
        encodedParams,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key":
              "481f8199afmshe2ef1e26b1ab0d4p1fd6b4jsn1ddb1eb26cb3",
            "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
          },
        }
      );
      if (res.status === 200) {
        setoutputTextArea(res.data.data.translatedText);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log("error is ", err);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    translate();
  }, [inputTextArea]);

  useEffect(() => {
    translate();
  }, [outputLanguage]);

  const handleExchange = () => {
    setinputLanguage(inputLanguage ? outputLanguage : inputLanguage);
    setoutputLanguage(outputLanguage ? inputLanguage : outputLanguage);
    // setinputTextArea(inputTextArea ? outputTextArea : inputTextArea);
    // setoutputTextArea(outputTextArea ? inputTextArea : outputTextArea);
  };

  return (
    <Container>
      <div className="main">
        <div className="upper">
          <div className="inputLanguage">
            <Autocomplete
              onChange={(object, value) => {
                setinputLanguage({ name: value.name, code: value.code });
              }}
              value={inputLanguage}
              defaultValue={{ code: "en", name: "English" }}
              disablePortal
              id="combo-box-demo"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={Totallanguages}
              getOptionLabel={(Totallanguages) => Totallanguages.name || ""}
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                "&:hover": {
                  background: "#f5f7f9",
                },
              }}
              popupIcon=""
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.code}>
                  {option.name}
                </Box>
              )}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label=""
                    sx={{
                      "& fieldset": { border: "none" },
                      input: {
                        textAlign: "center",
                        cursor: "pointer",
                        "&:hover": {
                          background: "#f5f7f9",
                        },
                      },
                    }}
                    placeholder="Select Language"
                  />
                );
              }}
            />
          </div>

          <div className="arrow" onClick={handleExchange}>
            <SyncAlt
              sx={{
                cursor: "pointer",
                fontSize:"20px",
                "&:hover": {
                  background: "#f5f7f9",
                },
              }}
            />
          </div>

          <div className="outputLanguage">
            <Autocomplete
              disablePortal
              value={outputLanguage}
              defaultValue={{ name: "Hindi", code: "hi" }}
              key={Totallanguages.code}
              onChange={(_, value) => {
                setoutputLanguage({ name: value.name, code: value.code });
              }}
              id="combo-box-demo"
              options={Totallanguages}
              getOptionLabel={(Totallanguages) => Totallanguages.name || ""}
              // isOptionEqualToValue={(option, value) => option.id === value.id}
              popupIcon=""
              sx={{
                width: "100%",
                backgroundColor: "#ffffff",
                "&:hover": {
                  background: "#f5f7f9",
                },
              }}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.code}>
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  sx={{
                    "& fieldset": { border: "none" },
                    input: {
                      textAlign: "center",
                      cursor: "pointer",
                      "&:hover": {
                        background: "#f5f7f9",
                      },
                    },
                  }}
                  placeholder="Select Language"
                />
              )}
            />
          </div>
        </div>
        <div className="bottom">
          <div className="InputText">
            <textarea
              className="inputTextArea"
              placeholder="Enter Text"
              onInput={(e) => {
                setinputTextArea(e.target.value);
              }}
            ></textarea>
            <div className="clip1">
              <CopyToClipboard text={inputTextArea}>
                <ContentPaste
                  fontSize="small"
                  sx={{ position: "absolute", bottom: "12px", left: "10px" }}
                />
              </CopyToClipboard>
            </div>
          </div>
          <div className="outputText">
            <textarea
              className="outputTextArea"
              placeholder={loading ? "loading..." : "translated text"}
              readOnly
              value={inputTextArea.length !== 0 ? outputTextArea : ""}
            ></textarea>
            <div className="clip1">
              <CopyToClipboard text={outputTextArea}>
                <ContentPaste
                  fontSize="small"
                  sx={{ position: "absolute", bottom: "12px", right: "10px" }}
                />
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Body;
