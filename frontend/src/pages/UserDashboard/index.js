import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Avatar,Button } from '@mui/material';
import Paper from '@mui/material/Paper';


const badges = [
  { title: 'གཞས་རྒྱན་བཟང་པོ། ', image: <Avatar variant="square" sx={{height:'10rem',width:'10rem'}}>M</Avatar> },
  { title: 'དབྱངས་མཛོད་འཚོལ་མཁན། ', image: <Avatar variant="square">S</Avatar> },
  { title: 'གཞས་གློགས་བྱེད་པ། ', image: <Avatar variant="square">C</Avatar> },
  { title: 'གཏེར་གཞས་རྒྱན་མཛད། ', image: <Avatar variant="square">T</Avatar> },
  { title: 'དབྱངས་སྒྲ་བསྒྲགས་མཁན། ', image: <Avatar variant="square">E</Avatar> },
  { title: 'གཞས་སྐོར་སྲུང་མཁན། ', image: <Avatar variant="square">L</Avatar> },
  { title: 'མཛད་འཕྲིན་རབ་བརྩེགས། ', image: <Avatar variant="square">C</Avatar> },
  { title: 'རིན་ཆེན་དབྱངས་མཛད། ', image: <Avatar variant="square">M</Avatar> },
  { title: 'དབྱངས་འགུལ་བཏང་མཁན། ', image: <Avatar variant="square">H</Avatar> },
  { title: 'མངོན་གསལ་གཞས་མཛད། ', image: <Avatar variant="square">R</Avatar> }
];

const data = [
  {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Conversions',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Event count',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

const ITEMS_PER_PAGE = 5;

export default function UserDashboard() {
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const handleSeeMore = () => {
    setVisibleItems(badges.length);
  };
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h1" variant="h1" >
        Profile
      </Typography>
      <Grid
        container
        spacing={4}
        rows={12}
        direction={'row'}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        
      <Grid  item size={{ xs: 9, sm: 6, md:5, lg: 3 }}>
      
      <Paper sx={{
      display:'flex', 
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      gap:2,
      p:'2rem',
      border: '1px solid',
      borderColor: 'divider'}}>
      <Avatar gutterBottom sx={{height:'7rem',width:'7rem',}}>M</Avatar>
      <Typography variant='body12' gutterBottom >Karma Global Rank #1</Typography>
      <Box sx={{alignSelf:'start'}}>
      <Typography  variant='h6' sx={{alignSelf:'start'}}>Bio:</Typography>
      <Typography variant='body2'sx={{alignSelf:'start'}}>Nothing to show here.</Typography>
      </Box>
      
      <Typography sx={{alignSelf:'start'}}> Dino Rank: Melody Master 🐝</Typography>
      <Typography sx={{alignSelf:'start'}}> Total Points: 12,345 </Typography>
      <Typography sx={{alignSelf:'start'}}> Total Contribution: 345 </Typography>
      <Typography sx={{alignSelf:'start'}}> Milestones: 10 Verified Lyrics</Typography>
    </Paper>    
      </Grid>
      <Grid item size={{sx:12,md:9,l:9}}>
      <Box sx={{ flexGrow: 1, p: 2, 
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      bgcolor: 'background.paper'}} >
      <Typography variant="h4" textAlign="center" gutterBottom>
        Badges
      </Typography>
      <Grid container spacing={2} rows={12} direction="row" >
      {badges.slice(0, visibleItems).map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={3} lg={3}>
            <Box
              sx={{
                height: '8rem',
                width: '9rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                //boxShadow: 1,
                p: 2,
                bgcolor: 'background.paper2',
              }}
            >
              <Avatar variant="square" sx={{ height: '3.5rem', width: '3rem', mb: 2 }}>
                M
              </Avatar>
              <Typography variant="body1">{item.title}</Typography>
            </Box>
          </Grid>
        ))}
        {visibleItems < badges.length && (
          <Grid item xs={12} sm={6} md={3} lg={3} display="flex" justifyContent="center" alignItems="end">
            <Button  onClick={handleSeeMore} sx={{textDecoration:'underline'}}>
              more
            </Button>
          </Grid>
        )}
      </Grid>
    </Box>
      </Grid>
      </Grid>
      <Grid container spacing={2} columns={12}>
        <Grid size={{xs:12, lg:4}}>
          <Paper sx={{minHeight:'12rem',
            p:'2rem',
            display:'flex',
            flexDirection:'column',
            border: '1px solid',
            borderColor: 'divider'}}>
          <Typography variant='h2'>Recent Activity</Typography>
          <Typography>Added song sherten</Typography>
          </Paper>
        </Grid>
        
      </Grid>
    </Box>
  );
}