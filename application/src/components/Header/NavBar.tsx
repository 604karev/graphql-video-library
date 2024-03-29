import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MouseEvent, useState } from "react";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { authToken } = useAuth();
  const { logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => handleMenuClick("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {!authToken && (
                <>
                  <MenuItem onClick={() => handleMenuClick("/signin")}>
                    <Typography textAlign="center">SignIn</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuClick("/signup")}>
                    <Typography textAlign="center">SignUp</Typography>
                  </MenuItem>
                </>
              )}
              {authToken && (
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">LogOut</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => handleMenuClick("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {!authToken && (
              <>
                <MenuItem onClick={() => handleMenuClick("/signin")}>
                  <Typography textAlign="center">SignIn</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/signup")}>
                  <Typography textAlign="center">SignUp</Typography>
                </MenuItem>
              </>
            )}
            {authToken && (
              <MenuItem onClick={logout}>
                <Typography textAlign="center">LogOut</Typography>
              </MenuItem>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
