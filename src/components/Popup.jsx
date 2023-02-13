import { Autocomplete,  TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

// const useStyles = makeStyles({

// })

const Popup = () => {
  const [Totallanguages, setTotalLanguages] = useState();
  

  const getLanguages = async () => {
    try {
      const languages = await axios.get("https://libretranslate.com/languages");
      setTotalLanguages(languages.data);
    //   setcurrentLanguage(languages.data[0].name)
    } catch (error) {
        console.log(error);
    }
};
// console.log(currentLanguage);

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <div className="inputLanguage">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={Totallanguages}
        getOptionLabel={(Totallanguages) => Totallanguages.name || ""}
        sx={{ width: "100%", backgroundColor: "#ffffff" }}
        popupIcon=""
        renderInput={(params) => (
          <TextField {...params} label="Select Language" />
        )}
      />
    </div>
  );
};

export default Popup;
