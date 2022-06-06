import { BottomNavigation, Paper, BottomNavigationAction } from "@mui/material";
import Style from "./bottomNavbar.module.scss";
import { ReactComponent as HomeIcon } from "../../../assets/images/sidebar/home.svg";
import { ReactComponent as BoostIcon } from "../../../assets/images/sidebar/boost.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/images/sidebar/settings.svg";
import { ReactComponent as EmpowermentIcon } from "../../../assets/images/sidebar/empowerment.svg";
import { ReactComponent as UnstoppableIcon } from "../../../assets/images/sidebar/unstoppable.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const bottomNavbar = [
  { title: "Home", navigate: "/dashboard", Icon: HomeIcon, active: true },
  { title: "Boost", navigate: "boost", Icon: BoostIcon, active: false },
  {
    title: "Empowerment",
    navigate: "empowerment",
    Icon: EmpowermentIcon,
    active: false,
  },
  {
    title: "Unstoppable You",
    navigate: "unstoppable",
    Icon: UnstoppableIcon,
    active: false,
  },
  {
    title: "Settings",
    navigate: "settings",
    Icon: SettingsIcon,
    active: false,
  },
  {
    title: "Notification",
    navigate: "notification",
    Icon: <></>,
    active: false,
  },
];
const BottomNavbar = ({ handleBackgroundImage }) => {
  const [bottomNavbarItems, setBottomNavbarItems] = useState(bottomNavbar);
  const navigate = useNavigate();
  const _location = window.location?.pathname;

  useEffect(() => {
    let _route = _location
      .replace(/\/+$/, "")
      .split("/")
      .pop()
      .toLocaleLowerCase();
    _route = _route === "dashboard" ? `${"/" + _route}` : _route;
    handleSelectedNavItem(_route);
  }, [_location]);

  const handleNavigation = (event, url) => {
    navigate(url, {
      state: { key: Math.random() },
    });
    handleSelectedNavItem(url);
  };
  const handleBackground = (url) => {
    let _url = url === "/dashboard" ? "/dashboard" : "/dashboard/" + url;
    handleBackgroundImage(_url);
  };
  const handleSelectedNavItem = (route) => {
    let _navbar = [...bottomNavbar];
    let item = _navbar.find((item) => item.active === true);
    if (item) {
      item.active = false;
    }
    item = _navbar.find((item) => item.navigate === route);
    if (item) {
      item.active = true;
    }
    setBottomNavbarItems(_navbar);
    handleBackground(route);
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      className={`${Style.mainContainer}`}
    >
      <BottomNavigation
        showLabels
        onChange={handleNavigation}
        className={`${Style.bottomContainer}`}
      >
        {bottomNavbarItems.slice(0, bottomNavbar.length - 1).map((item) => {
          return (
            <BottomNavigationAction
              key={Math.random()}
              value={item.navigate}
              className={`${Style.navItem} ${
                item.active ? Style.activeItem : ""
              }`}
              label={item.title}
              icon={<item.Icon fill={item.active ? "white" : "black"} />}
            />
          );
        })}
      </BottomNavigation>
    </Paper>
  );
};
export default BottomNavbar;
