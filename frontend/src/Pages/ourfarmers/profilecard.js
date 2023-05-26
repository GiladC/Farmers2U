


/*
farmName = the name of the farm
Image = the logo of the farm
location = the address
fullProfile = the way to reference the actual profile 
however that may be (a profile page url, a full profile card...) Image={imageurl}
Use like this:
1) Create something of the sort:
  const farm: {
    farmName: 'The Farm Name',
    Image: 'https://example.com/farm-image.jpg',
    location: 'Somewhere',
    fullProfile: 'This is the full profile of Farm, a page or something that we are yet to decide',
    style: {{marginRight: ?, marginTop: ?, marginLeft: ?, whatever else}},
  };

2) Call it like this:
      <profileCard
        farmName={farm.farmName}
        Image={farm.Image}
        location={farm.location}
        fullProfile={farm.fullProfile}
        style={{some style stuff}}
      />
*/


import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';

const FarmCard = ({ farmName, Image, location, fullProfile, style }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    maxWidth: 280,
    borderRadius: '30px',
    outline: isHovered ? '3px solid orange' : 'none',
    transition: 'outline 0.3s',
  };

  return (
    <div style={{ direction: 'rtl', ...style }}>
      <Card
        sx={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '210px',
            width: '80%',
            padding: '22px',
            paddingTop: '16px',
            margin: '0 auto',
          }}
        >
          <img
            src={Image}
            alt={farmName}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </div>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '1.35rem' }} style={{ marginTop: '-30px' }}>
            {farmName}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '-14px' }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '1rem' }} style={{ marginTop: '10px' }}>
              <LocationOnIcon sx={{ fontSize: 18, marginLeft: '8px' }} />
              {location}
            </Typography>
          </div>
          <Button
            sx={{
              width: '95%',
              bgcolor: '#00DEF3',
              borderRadius: '30px',
            }}
            style={{ marginTop: '0px' }}
            variant="outlined"
            size="large"
            href={fullProfile}
            target="_blank"
            rel="noopener noreferrer"
          >
            לפרטים נוספים
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmCard;