import React from 'react';
import { Card, CardContent, Typography } from '@mui/material'; // Import material-ui components

const BirthdayCard = ({ firstName, lastName, dateOfBirth, designation }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h1" component="div">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography color="textSecondary">
          Date of Birth: {dateOfBirth}
        </Typography>
        <Typography variant="body2">
          Designation: {designation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BirthdayCard;
