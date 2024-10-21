import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid2, CircularProgress, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import latestLyrics from '../latestLyrics'; // Replace with your data fetching logic

// Comparator function for sorting in Tibetan alphabetical order
const tibetanSort = (a, b) => {
  return a.singer.localeCompare(b.singer, 'bo'); // 'bo' is the locale for Tibetan
};

// Function to group songs by their first letter
const groupArtistByFirstLetter = (songs) => {
  return songs.reduce((acc, song) => {
    const cleanSingerTitle = song.singer.replace(/[^ཀ-ྼa-zA-Z]/g, ''); // Keep Tibetan and English alphabets
    const firstLetter = cleanSingerTitle ? cleanSingerTitle[0] : null; // Get the first valid Tibetan letter
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(song);
    return acc;
  }, {});
};

function Artist() {
  const { title } = useParams();
  const [sortedSongs, setSortedSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => resolve(latestLyrics), 1000); // Simulated delay
        });
        const sorted = response.sort(tibetanSort);
        setSortedSongs(sorted);
      } catch (err) {
        setError('Failed to fetch lyrics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupedArtist = groupArtistByFirstLetter(sortedSongs);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem',
      minHeight: '100vh',
    }}>
      <Typography
        variant="h4"
        component="div"
        sx={{
          my: 2,
          fontWeight: 'bold',
          color: 'black',
          alignSelf: "start",
          ml: "3rem"
        }}
      >
        གཞས་པ།།
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
          {error}
        </Typography>
      )}

{!loading && !error && (
        <Grid2 container spacing={3}>
          {Object.keys(groupedArtist).map((letter, index) => (
            <Grid2 item xs={12} key={index}>
              <Typography variant="h5" sx={{ my: 2, ml: 10,}}>
                {letter} {/* Display the first Tibetan letter as header */}
              </Typography>
              <Grid2 container spacing={2} sx={{ flexWrap: 'wrap', ml: 1}}>
                {groupedArtist[letter].map((song, songIndex) => (
                  <Grid2 item xs={6} sm={4} md={3} key={songIndex}>
                    <Link 
                      to={`/artists/${encodeURIComponent(song.singer)}`} 
                      style={{ textDecoration: "none" }}
                    >
                      <Paper 
                        elevation={3} 
                        sx={{
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.4)',
                          },
                          display: 'flex',
                          alignItems: 'center',
                          flexDirection: 'column',
                          padding: 2,
                          textAlign: 'center', // Center text for a cleaner look
                          backgroundColor: '#f5f5f5', // Light background for cards
                        }}
                      >
                        <ListItem alignItems="flex-start" sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                          <ListItemAvatar>
                            <Avatar alt={song.singer} src={song.thumbnailurl} sx={{ width: 76, height: 76 }} />
                          </ListItemAvatar>
                          <ListItemText primary={<b>{song.singer}</b>} />
                        </ListItem>
                      </Paper>
                    </Link>
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>
          ))}
        </Grid2>
      )}
        
    </div>
  );
}

export default Artist;
