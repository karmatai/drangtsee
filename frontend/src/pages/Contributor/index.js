import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Card,  Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {  styled } from '@mui/material/styles';
import latestLyrics from '../latestLyrics'; 


const StyledCard = styled(Card)(({ theme }) => ({
  height: '7rem',
  minWidth:'100%',
  backgroundColor: 'transparent',
  display: 'flex',
  flexDirection: 'row',
  justifyContent:'space-between',
  alignItems:'center',
  borderLeft:'none',
  borderRight:'none',
  borderTop:'none',
  borderRadius:0,
  '&:focus-visible': {
    outline: '3px solid',
    //outlineColor: 'hsla(210, 98%, 48%, 0.5)',
  },
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.background.paper,
    cursor: 'pointer',
    opacity: '80%',
  },
}));

function Contributor() {
  const [sortedSongs, setSortedSongs] = useState([]);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => resolve(latestLyrics), 1000); // Simulated delay
        });
        setSortedSongs(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box width='100%' sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      <Typography variant="h1" gutterBottom>
        སྦྲང་བརྩི་ཡི་འབུང་བ།
      </Typography>
      <Box display={'flex'} flexDirection={'column'} minWidth={'100%'}>
      {sortedSongs.map((song, songIndex) => (
          
            <Link to={`/artists/${encodeURIComponent(song.singer)}`} style={{ textDecoration: 'none' }}>
            <StyledCard>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant='h2'>{song.singer}</Typography>
                  <Typography variant='body2'>1234,34</Typography>
                </Box>
                <Avatar src={song.thumbnailurl} variant='square' />
            </StyledCard>
            </Link>
        ))}
      </Box>
    </Box>
  );
}

export default Contributor;