import { Toolbar, Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getHappinessScoreAPICall,
  getMyActivityAPICall,
  getSummaryStatsAPICall,
} from "../../dashboardService/dashboard";
import Style from "./containerHeader.module.scss";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiToggleButton from "@mui/material/ToggleButton";

const ContainerHeader = ({
  title,
  mode,
  setSummaryStats,
  setHappinessScore,
  setMyActivity,
  handleChangeFilter,
}) => {
  const [alignment, setAlignment] = useState("daily");

  useEffect(() => {
    handleChange(true, "daily");
  }, []);

  const handleChange = async (event, newAlignment) => {
    setAlignment(newAlignment);
    handleChangeFilter(newAlignment, mode);
  };
  return (
    <div className={`d-flex justify-content-between ${Style.container}`}>
      <Box>
        <span className={Style.title}>{title}</span>
      </Box>
      <Box>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          className={`${Style.groupButton}`}
        >
          <ToggleButtons value="daily" selectedColor="white">
            <span className="text-transform-none">Daily</span>
          </ToggleButtons>
          <ToggleButtons value="weekly" selectedColor="white">
            <span className="text-transform-none">Weekly</span>
          </ToggleButtons>
          <ToggleButtons value="monthly" selectedColor="white">
            <span className="text-transform-none">Monthly</span>
          </ToggleButtons>
        </ToggleButtonGroup>
      </Box>
    </div>
  );
};
const ToggleButtons = styled(MuiToggleButton)(({ selectedColor }) => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    backgroundColor: `${selectedColor} !important`,
    span: {
      color: "black !important",
    },
  },
}));
export default ContainerHeader;
