import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

const db = getFirestore();

const StyledCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
  },
}));

function groupSongsByInitialLetter(songs) {
  return songs.reduce((acc, song) => {
    const initialLetter = song.titleTibetan.charAt(0);
    if (!acc[initialLetter]) {
      acc[initialLetter] = [];
    }
    acc[initialLetter].push(song);
    return acc;
  }, {});
}

function Songs() {
  const { i18n } = useTranslation();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      const querySnapshot = await getDocs(collection(db, 'songs'));
      const songsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSongs(songsList);
      
    };

    fetchSongs();
  }, []);

  // Sort the songs alphabetically in Tibetan order
  const sortedSongs = [...songs].sort((a, b) => a.titleTibetan.localeCompare(b.titleTibetan, 'bo'));
  // Group the songs by their initial letter
  const groupedSongs = groupSongsByInitialLetter(sortedSongs);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          སྦྲང་ཚང་།
        </Typography>
        <Typography>ཁ་བ་རི་པའི་གླུ་གར་གྱི་གར་སྟེགས་ལ་འཕེབས་པ་དགའ་བསུ་བཞུ།</Typography>
      </div>
      {Object.keys(groupedSongs).map((initialLetter) => (
        <Box key={initialLetter} sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            {initialLetter}
          </Typography>
          <Grid container spacing={2}>
            {groupedSongs[initialLetter].map((song, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Link to={`/songs/${song.id}`} style={{ textDecoration: 'none' }}>
                  <StyledCard>
                    <Typography variant="h6" component="div">
                      {i18n.language === 'eng' ? song.titleEnglish || song.titleTibetan : song.titleTibetan}
                    </Typography>
                  </StyledCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default Songs;