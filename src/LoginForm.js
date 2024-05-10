import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { loginUserStart } from './redux/actions/LoginActions';
import { loginUserApi } from './redux/apis/loginUserApi';
import { toast, ToastContainer } from 'react-toastify';
import PersonIcon from '@mui/icons-material/Person';
import 'react-toastify/dist/ReactToastify.css';
import theme from './Theme';
import { InputAdornment } from '@mui/material';
import HttpsIcon from '@mui/icons-material/Https';

function LoginForm() {
  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required";
    }
    if (Object.values(newErrors).some(error => error !== "")) {
      setErrors(newErrors);
      return;
    }
    try {
      const result = await loginUserApi(loginData);
      if (result?.response?.data?.errors) {
        toast.error(result?.response?.data?.errors);
      } else if (result) {
        dispatch(loginUserStart(loginData));
        navigate("/", { state: result.data });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const backgroundImageUrl = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeOLnBT7cevvNx5T_p1E2euGVSx_c6dMYCig&usqp=CAU)';
  // backgroundImage: `url('../assets/images/LOG 3.png')`
  return (
    <ThemeProvider theme={createTheme()}>
      <Grid
        container
        component="main"
        sx={{
          backgroundImage: 'url("/assets/images/actimize_Logo_bg_img.png")',
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={3.3}
          component={Paper}
          elevation={6}
          square
          sx={{
            // backgroundColor: theme.palette.customColorOrange.main,
            backgroundColor: "transparent",
            backdropFilter: "blur(20px)",
            borderRadius: 3,
            margin: "auto",
          }} // Add border radius here
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold", // Increase font weight for emphasis
                // color: theme.palette.success.main, // Use primary color for text
                color: theme.typography.h1,
                marginBottom: theme.spacing(1), // Add some bottom margin for spacing
                textAlign: "center", // Center align the text
                textTransform: "uppercase", // Convert text to uppercase
                letterSpacing: "0.1em", // Add some letter spacing for a modern look
              }}
            >
              Log in
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PersonIcon sx={{ color: theme.palette.error.main }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  borderRadius: theme.shape.borderRadius,

                  // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.shape.borderRadius,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.error.main, // Border color on hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.error.main, // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.error.main, // Label color
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    border: "2px solid",
                    borderColor: theme.palette.error.main,
                    borderRadius: "40px",
                  },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: theme.palette.error.main, // Label color when focused
                  },
                  '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]':
                    {
                      backgroundColor: theme.palette.error.main, // Background color for input and selected option
                    },
                  '& .MuiAutocomplete-option[data-focus="true"]': {
                    backgroundColor: theme.palette.success.main, // Background color for selected option
                  },
                  '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]':
                    {
                      backgroundColor: theme.palette.success.main, // Background color for input
                      "& .MuiAutocomplete-listbox": {
                        backgroundColor: theme.palette.success.main, // Background color for auto-suggestion list
                      },
                    },
                }}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <HttpsIcon sx={{ color: theme.palette.error.main }} />
                    </InputAdornment>
                  ),
                }}
                // sx={{
                //   borderRadius: theme.shape.borderRadius,
                //   // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                //   "& .MuiOutlinedInput-root": {
                //     borderRadius: theme.shape.borderRadius,
                //     "&:hover .MuiOutlinedInput-notchedOutline": {
                //       borderColor: theme.palette.success.main, // Border color on hover
                //     },
                //     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                //       borderColor: theme.palette.success.main, // Border color when focused
                //     },
                //   },
                //   "& .MuiInputLabel-root": {
                //     color: theme.palette.success.main, // Label color
                //   },
                //   "& .MuiOutlinedInput-notchedOutline": {
                //     border: "none",
                //     border: "2px solid",
                //     borderColor: theme.palette.success.main,
                //     borderRadius: "40px",
                //   },
                //   "& .MuiInputLabel-outlined.Mui-focused": {
                //     color: theme.palette.success.main, // Label color when focused
                //   },
                // }}
                sx={{
                  borderRadius: theme.shape.borderRadius,

                  // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.shape.borderRadius,
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.error.main, // Border color on hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.error.main, // Border color when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: theme.palette.error.main, // Label color
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                    border: "2px solid",
                    borderColor: theme.palette.error.main,
                    borderRadius: "40px",
                  },
                  "& .MuiInputLabel-outlined.Mui-focused": {
                    color: theme.palette.error.main, // Label color when focused
                  },
                  '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]':
                    {
                      backgroundColor: theme.palette.error.main, // Background color for input and selected option
                    },
                  '& .MuiAutocomplete-option[data-focus="true"]': {
                    backgroundColor: theme.palette.success.main, // Background color for selected option
                  },
                  '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]':
                    {
                      backgroundColor: theme.palette.success.main, // Background color for input
                      "& .MuiAutocomplete-listbox": {
                        backgroundColor: theme.palette.success.main, // Background color for auto-suggestion list
                      },
                    },
                }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: "40px", // Use theme's border radius value
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.shape.borderRadius, // Apply border radius to the input field
                  },
                  mt: 3,
                  padding: 1.5,
                  backgroundColor: theme.palette.success.main,
                  color: theme.palette.error.main,
                  "&:hover": { backgroundColor: theme.palette.success.main },
                }}
                onClick={handleSubmit}
              >
                Log In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default LoginForm;
