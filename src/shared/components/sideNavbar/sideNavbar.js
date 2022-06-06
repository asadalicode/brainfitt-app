import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import navLogo from "../../../assets/images/navLogo.svg";
import Style from "./sideNavbar.module.scss";
import profileIcon from "../../../assets/images/sidebar/profileIcon.png";
import { useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "../../../assets/images/sidebar/home.svg";
import { ReactComponent as BoostIcon } from "../../../assets/images/sidebar/boost.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/images/sidebar/settings.svg";
import { ReactComponent as NoticationIcon } from "../../../assets/images/sidebar/notification.svg";
import { ReactComponent as EmpowermentIcon } from "../../../assets/images/sidebar/empowerment.svg";
import { ReactComponent as UnstoppableIcon } from "../../../assets/images/sidebar/unstoppable.svg";
import { useEffect, useState } from "react";
import { getUserData } from "../../js/userCredential";
import environment from "../../../environment";
import DisplayImage from "../displayImage/displayImage";
import { useSelector } from "react-redux";

const drawerWidth = 220;

const navbar = [
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
    Icon: NoticationIcon,
    active: false,
  },
];

const SideNavbar = ({ handleBackgroundImage }) => {
  const navigate = useNavigate();
  const [navbarItems, setNavbarItems] = useState(navbar);
  const _location = window.location?.pathname;
  const [selectedPeople, setSelectedPeople] = useState({});
  const isProfileUpdate = useSelector((state) => state.isProfileUpdate);
  const unSeenCount = useSelector((state) => state.unSeenNotificationCount);
  useEffect(() => {
    let _route = _location
      .replace(/\/+$/, "")
      .split("/")
      .pop()
      .toLocaleLowerCase();
    _route = _route === "dashboard" ? `${"/" + _route}` : _route;
    handleSelectedNavItem(_route);
  }, [_location]);

  useEffect(async () => {
    setSelectedPeople(await getUserData());
  }, [isProfileUpdate]);

  const handleNavigation = (url) => {
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
    let _navbar = [...navbarItems];
    let item = _navbar.find((item) => item.active === true);
    if (item) {
      item.active = false;
    }
    item = _navbar.find((item) => item.navigate === route);
    if (item) {
      item.active = true;
    }
    setNavbarItems(_navbar);
    handleBackground(route);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
      className={`${Style.sidebar}`}
    >
      <Toolbar className="justify-content-center mb-3">
        <img className={`${Style.navlogo}`} src={navLogo} />
      </Toolbar>
      <List>
        {navbarItems.slice(0, navbarItems.length - 1).map((item, index) => (
          <a key={index} onClick={() => handleNavigation(item.navigate)}>
            <ListItem
              button
              key={index}
              className={`${Style.listItem} ${item.active ? Style.active : ""}`}
            >
              <ListItemIcon>
                <item.Icon height={16} fill={"white"} />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          </a>
        ))}
      </List>
      <Toolbar
        className={`${Style.bottomToolbar} flex-column align-items-start`}
      >
        {navbarItems.slice(-1).map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleNavigation(item.navigate)}
            className={`${Style.listItem} ${item.active ? Style.active : ""}`}
          >
            <ListItemIcon>
              <span className={Style.NoticationCount}> {unSeenCount} </span>
              <item.Icon height={16} fill={"white"} />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box className={Style.profileIconBox}>
            {/* <img src={environment.baseUrl+selectedPeople.imageUrl} /> */}
            <DisplayImage
              imageUrl={environment.serverUrl + selectedPeople.imageUrl}
              className="rounded-circle"
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            className={`${Style.profileBox}`}
          >
            <h5>
              {selectedPeople.firstName} {selectedPeople.lastName}
            </h5>
            <span>{selectedPeople.email}</span>
          </Box>
        </Box>
      </Toolbar>
    </Drawer>
  );
};

export default SideNavbar;
