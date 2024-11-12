import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Breadcrumbs,
  Link,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Add as AddIcon,
  ViewList as ViewListIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  }),
}));

const BreadcrumbsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    position: "fixed",
    top: 64,
    left: 0,
    right: 0,
    zIndex: theme.zIndex.drawer,
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Add Task", icon: <AddIcon />, path: "/add-task" },
    { text: "View Tasks", icon: <ViewListIcon />, path: "/view-tasks" },
  ];

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [
      {
        text: "Home",
        icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
        path: "/",
      },
    ];

    pathSegments.forEach((segment, index) => {
      console.log(segment)
      const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const menuItem = menuItems.find((item) => item.path === path);
      if (menuItem) {
        breadcrumbs.push({
          text: menuItem.text,
          icon: menuItem.icon,
          path,
        });
      }
    });

    return breadcrumbs;
  };

  const renderBreadcrumbs = () => (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
    >
      {getBreadcrumbs().map((breadcrumb, index, array) => {
        const isLast = index === array.length - 1;
        return isLast ? (
          <Typography
            key={breadcrumb.path}
            sx={{
              display: "flex",
              alignItems: "center",
              color: isMobile ? "text.primary" : "white",
              fontSize: isMobile ? "0.875rem" : "1rem",
            }}
          >
            {breadcrumb.icon}
            {breadcrumb.text}
          </Typography>
        ) : (
          <Link
            key={breadcrumb.path}
            component={RouterLink}
            to={breadcrumb.path}
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
              fontSize: isMobile ? "0.875rem" : "1rem",
              "&:hover": {
                textDecoration: "none",
                color: "primary.main",
              },
            }}
          >
            {breadcrumb.icon}
            {breadcrumb.text}
          </Link>
        );
      })}
    </Breadcrumbs>
  );

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Toolbar
        style={{
          background: "#1976d2",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "white",
          }}
          noWrap
          component="div"
        >
          Taskify
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            {menuItems.find((item) => item.path === location.pathname)?.text ||
              "Dashboard"}
          </Typography>
          {!isMobile && (
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              {renderBreadcrumbs()}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Main open={!isMobile}>
        <Toolbar />
        {isMobile && (
          <BreadcrumbsContainer>
            <Container sx={{ py: 1 }}>{renderBreadcrumbs()}</Container>
          </BreadcrumbsContainer>
        )}
        {isMobile && <Toolbar />}
        <Container maxWidth="lg">{children}</Container>
      </Main>
    </Box>
  );
}
