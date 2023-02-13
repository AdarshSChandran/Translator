import { SyncAlt } from "@mui/icons-material";
import { Autocomplete, Box, Container,  TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";



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
              "f4686a7ffemsh470bb22098c5827p1170c3jsnd2fb5d7ed901",
            "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
          },
        }
      );
      if (languages.status == 200) {
        setTotalLanguages(languages.data.data.languages);
        // setDefaultlanguage(languages.data.data.languages[0].name);
        console.log(languages.data.data.languages[0].name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Translate = async () => {
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
              "f4686a7ffemsh470bb22098c5827p1170c3jsnd2fb5d7ed901",
            "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
          },
        }
      );
      if (res.status == 200) {
        setoutputTextArea(res.data.data.translatedText);
      }
      setLoading(false);

      // .then((res) => {
      //   console.log(res.data);
      // });
    } catch (err) {
      setLoading(false);
      console.log("error is ", err);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  useEffect(() => {
    Translate();
  }, [inputTextArea]);

  useEffect(() => {
    Translate();
  }, [outputLanguage]);


  // console.log(inputLanguage);

  const handleExchange = () => {
    setinputLanguage(inputLanguage ? outputLanguage : inputLanguage);
    setoutputLanguage(outputLanguage ? inputLanguage : outputLanguage);
    setinputTextArea(inputTextArea ? outputTextArea : inputTextArea);
    setoutputTextArea(outputTextArea ? inputTextArea : outputTextArea);
  };

  // console.log(outputTextArea);
  //   const handleChange = (object,value)=>{
  //     console.log(value.name);
  //   }

  // console.log(inputLanguage.name);

  return (
    <Container>
      <div className="main">
        <div className="upper">
          <div className="inputLanguage">
            <Autocomplete
              onChange={(object, value) => {
                setinputLanguage({ name: value.name, code: value.code });
              }}
              // key={defaultlanguage}
              value={inputLanguage}
              defaultValue={{ code: "en", name: "English" }}
              disablePortal
              id="combo-box-demo"
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={Totallanguages}
              getOptionLabel={(Totallanguages) => Totallanguages.name || ""}
              // isOptionEqualToValue={(option, value) => option.id === value.id}
              sx={{ width: "100%", backgroundColor: "#ffffff" }}
              popupIcon=""
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.code}>
                  {option.name}
                </Box>
              )}
              //   isOptionEqualToValue={(option, value) => option.code === value}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label=""
                    sx={{
                      "& fieldset": { border: 'none' },
                      input: {textAlign: "center"}
                    }}
                    placeholder="Select Language"
                  />
                );
              }}
            />
          </div>
          <div className="arrow" onClick={handleExchange}><SyncAlt /> </div>
          <div className="outputLanguage">
            <Autocomplete
              disablePortal
              value={outputLanguage}
              defaultValue={{ name: "Hindi", code: "hi" }}
              key={Totallanguages.code}
              onChange={(object, value) => {
                setoutputLanguage({ name: value.name, code: value.code });
              }}
              id="combo-box-demo"
              options={Totallanguages}
              getOptionLabel={(Totallanguages) => Totallanguages.name || ""}
              // isOptionEqualToValue={(option, value) => option.id === value.id}
              popupIcon=""
              sx={{ width: "100%", backgroundColor: "#ffffff"}}
              renderOption={(props, option) => (
                <Box component="li" {...props} key={option.code} >
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField {...params} label="" 
                sx={{
                  "& fieldset": { border: 'none'},
                  input: {textAlign: "center"}
                  // "display":"flex",
                }}
                // inputProps={{min: 0, style: { textAlign: 'center' }}}
                placeholder="Select Language" />
              )}
            />
          </div>
        </div>
        {/* <div>{showpopup && <Popup /> }</div> */}
        <div className="bottom">
          <div className="InputText">
            <textarea
              className="inputTextArea"
              placeholder="Enter Text"
              onInput={(e) => {
                setinputTextArea(e.target.value);
              }}
              // onKeyUp={abc}
              // onKeyDown={clrr}
            ></textarea>
          </div>
          <div className="outputText">
            <textarea
              className="outputTextArea"
              placeholder={loading ? "loading..." : "translated text"}
              readOnly
              value={inputTextArea.length !== 0 ? outputTextArea : ""}
            ></textarea>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Body;
