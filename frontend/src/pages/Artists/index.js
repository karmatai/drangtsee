import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Card } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import {  styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { collection, getDocs, query } from 'firebase/firestore';import { db } from '../../firebase_setup/firebase';
import logo from '../../logo.jpg';
import { useTranslation } from 'react-i18next';


const StyledCard = styled(Card)(({ theme }) => ({
  height: '7rem',
  width: '20rem',
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

function Artist() {
  const [sortedArtist, setSortedArtist] = useState([]);
  const { i18n } = useTranslation();

  const getField = (field,song) => {
    return i18n.language === 'eng' ? song[field + 'English'] || song[field + 'Tibetan'] : song[field + 'Tibetan'];
  };


  useEffect(() => {
    // Simulate data fetching
    const fetchArtists = async () => {
    const q = query(collection(db, 'artists'));
    const querySnapshot = await getDocs(q);
    const sortedArtist = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setSortedArtist(sortedArtist);
    }
    fetchArtists();
  }, []);

  return (
    <Box width='100%' sx={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      <Typography variant="h1" gutterBottom>
        ཁ་ག་རི་པའི་སྒྲགས་ཅན་རྒྱུ་རྩལ་པ།
      </Typography>
      <Grid container spacing={1} columns={12}>
        {sortedArtist.map((artist, songIndex) => (
          <Grid item xs={6} md={3} key={songIndex}>
            <Link to={`/artists/${encodeURIComponent(artist.id)}`} style={{ textDecoration: 'none' }}>
            <StyledCard>
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography variant='body2'>{getField('name',artist)}</Typography>
                  <Typography variant='body2'>1,200</Typography>
                </Box>
                <Avatar src="https://example.com/artist-thumbnail.jpg" variant='square' />
            </StyledCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Artist;