import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
 
const NoDataFound = () => {
  return (
    <div
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight:'20px' }}
    >
      <Card sx={{width: 500, padding: 2, borderRadius: 2, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', textAlign: 'center'}}>
        <CardContent>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/007/872/974/small/file-not-found-illustration-with-confused-people-holding-big-magnifier-search-no-result-data-not-found-concept-can-be-used-for-website-landing-page-animation-etc-vector.jpg" alt="No Data Found" style={{width: 300}} />
          <Typography sx={{fontFamily:'Monospace'}}>No Data Found !</Typography>
        </CardContent>
      </Card>
    </div>
  );
};
 
export default NoDataFound;