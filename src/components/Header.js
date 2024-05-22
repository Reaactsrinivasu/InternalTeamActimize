
import React from 'react';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme hook to access theme
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const ResuableHeaderTypo = (props) => {
  const theme = useTheme(); // Access the theme using useTheme hook

  const {
    typographyComponent,
    typographyVariant,
    typographyText,
    sx,
  } = props;

  return (
    <Typography
      color
      component={!typographyComponent ? 'span' : typographyComponent}
      variant={!typographyVariant ? 'h6' : typographyVariant}
      sx={{
        fontSize: theme.typography.h6.fontSize, // Use theme typography for fontSize
        mt: 0.5,
        ml: 2,
        color: theme.palette.text.primary, // Use theme text color
        ...sx,
      }}
    >
      {typographyText}
    </Typography>
  );
};

// Define prop types for prop validation
ResuableHeaderTypo.propTypes = {
  typographyComponent: PropTypes.string, // Component type of typography
  typographyVariant: PropTypes.string, // Variant of typography
  typographyText: PropTypes.string.isRequired, // Text content of typography
  sx: PropTypes.object, // Custom styles
};

export default ResuableHeaderTypo;
