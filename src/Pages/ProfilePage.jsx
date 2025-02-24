import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { useNavigate } from "react-router-dom";

const SideMenuPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
  minWidth: 220,
  // Modified shadow to only appear on left and right sides
  boxShadow: "4px 0 6px -2px rgba(0,0,0,0.1), -4px 0 6px -2px rgba(0,0,0,0.1)",
  height: "100%", // Make sure it extends from top to bottom
  [theme.breakpoints.down("sm")]: {
    minWidth: "auto",
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: 0,
  marginBottom: theme.spacing(0.5),
  "&.Mui-selected": {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    borderLeft: "3px solid",
    borderColor: theme.palette.primary.main,
    paddingLeft: theme.spacing(2) - 3, // Adjust padding to account for border
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ProfileDashboard = () => {
  // Example: controlling the "Last x months" filter
  const [timeFilter, setTimeFilter] = React.useState("6");
  const [orders, setOrders] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState("Orders & Credits");
  const navigate = useNavigate();

  const handleTimeFilterChange = (event) => {
    setTimeFilter(event.target.value);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <Box sx={{ mt: 20, mb: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column: Side Menu */}
          <Grid item xs={12} md={3}>
            <SideMenuPaper elevation={0}>
              {" "}
              {/* Changed to elevation={0} to remove default shadow */}
              <Typography variant="h6" sx={{ mb: 1 }}>
                My Account
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <StyledListItemButton
                    selected={activeTab === "Orders & Credits"}
                    onClick={() => handleTabClick("Orders & Credits")}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <ReceiptOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Orders & Credits"
                      primaryTypographyProps={{
                        fontWeight:
                          activeTab === "Orders & Credits" ? 600 : 400,
                      }}
                    />
                  </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <StyledListItemButton
                    selected={activeTab === "Invite Friends"}
                    onClick={() => handleTabClick("Invite Friends")}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PersonAddAltOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Invite Friends"
                      primaryTypographyProps={{
                        fontWeight: activeTab === "Invite Friends" ? 600 : 400,
                      }}
                    />
                  </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <StyledListItemButton
                    selected={activeTab === "Customer Care"}
                    onClick={() => handleTabClick("Customer Care")}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <HeadsetMicOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Customer Care"
                      primaryTypographyProps={{
                        fontWeight: activeTab === "Customer Care" ? 600 : 400,
                      }}
                    />
                  </StyledListItemButton>
                </ListItem>
              </List>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Profile
              </Typography>
              <List disablePadding>
                <ListItem disablePadding>
                  <StyledListItemButton
                    selected={activeTab === "Personal Information"}
                    onClick={() => handleTabClick("Personal Information")}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PersonOutlineOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Personal Information"
                      primaryTypographyProps={{
                        fontWeight:
                          activeTab === "Personal Information" ? 600 : 400,
                      }}
                    />
                  </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <StyledListItemButton
                    selected={activeTab === "Address"}
                    onClick={() => handleTabClick("Address")}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <HomeOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Address"
                      primaryTypographyProps={{
                        fontWeight: activeTab === "Address" ? 600 : 400,
                      }}
                    />
                  </StyledListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <StyledListItemButton
                    selected={activeTab === "Payments"}
                    onClick={() => handleTabClick("Payments")}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <PaymentOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Payments"
                      primaryTypographyProps={{
                        fontWeight: activeTab === "Payments" ? 600 : 400,
                      }}
                    />
                  </StyledListItemButton>
                </ListItem>
              </List>
            </SideMenuPaper>
          </Grid>

          {/* Right Column: Main Content */}
          <Grid item xs={12} md={9}>
            <Box>
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                My Orders
              </Typography>
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  mb: 3,
                }}
              >
                {/* <FormControl size="small" sx={{ minWidth: 150 }}>
                  <InputLabel>Last x months</InputLabel>
                  <Select
                    value={timeFilter}
                    label="Last x months"
                    onChange={handleTimeFilterChange}
                  >
                    <MenuItem value="3">Last 3 months</MenuItem>
                    <MenuItem value="6">Last 6 months</MenuItem>
                    <MenuItem value="9">Last 9 months</MenuItem>
                    <MenuItem value="12">Last 12 months</MenuItem>
                  </Select>
                </FormControl> */}
              {/* </Box> */}

              {/* Empty Orders State */}
              {orders.length === 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    py: 8,
                    px: 2,
                  }}
                >
                  <ShoppingBagOutlinedIcon
                    sx={{ fontSize: 80, color: "text.disabled", mb: 3 }}
                  />
                  <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                    YOUR ORDER HISTORY IS EMPTY
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: 600 }}
                  >
                    Looks like you haven't placed any orders yet. Start
                    exploring and shop for your favorite products.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/shop")}
                    sx={{
                      textTransform: "none",
                      px: 4,
                      bgcolor: "#f5f5dc",
                      color: "black", // Or theme.palette.text.primary if using a theme
                      "&:hover": {
                        bgcolor: "#e6e6d1",
                      },
                    }}
                  >
                    Explore Products
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProfileDashboard;