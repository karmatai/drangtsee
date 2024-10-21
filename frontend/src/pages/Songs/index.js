import React from 'react';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemAvatar } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import latestLyrics from '../latestLyrics';
import Paper from '@mui/material/Paper';

// Comparator function for sorting in Tibetan alphabetical order
const tibetanSort = (a, b) => {
  return a.title.localeCompare(b.title, 'bo'); // 'bo' is the locale for Tibetan
};

// Function to group songs by their first letter
const groupSongsByFirstLetter = (songs) => {
  return songs.reduce((acc, song) => {
    const cleanTitle = song.title.replace(/[^ཀ-ྼa-zA-Z]/g, ''); // Remove non-alphabet characters
    const firstLetter = cleanTitle ? cleanTitle[0] : null; // Get the first valid Tibetan letter
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(song);
    return acc;
  }, {});
};

function SongDetail() {
  const { title } = useParams();

  // Sort the songs by Tibetan alphabetical order
  const sortedSongs = latestLyrics.sort(tibetanSort);

  // Group the sorted songs by their first Tibetan letter
  const groupedSongs = groupSongsByFirstLetter(sortedSongs);

  // Find the specific song using the title from URL
  const song = sortedSongs.find(song => song.title === decodeURIComponent(title));

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
        གླུ་གཞས་ཆ་ཚང་།
      </Typography>

      <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: '800px', width: '100%' }}>
        <List sx={{ width: '70%', bgcolor: 'background.paper', padding: '1rem' , ml:10}}>
          {Object.keys(groupedSongs).map((letter, index) => (
            <React.Fragment key={index}>
              <Typography variant="h2" sx={{ mt: 2, ml: 2, mb: 3 }}>
                {letter} {/* Display the first Tibetan letter as header */}
              </Typography>

              {groupedSongs[letter].map((song, songIndex) => (
                <React.Fragment key={songIndex}>
                  <Link
                    to={`/songs/${encodeURIComponent(song.title)}`}
                    style={{ textDecoration: 'none' }} // Remove default link styles
                  >
                    <Paper
                      sx={{
                        bgcolor: "#FFF7EF",
                        mb: '20px',
                        ml:10,
                        p: '10px',
                        borderRadius: '15px',
                        boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.03)',
                          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                        }
                      }}
                    >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={song.singer} src={song.thumbnailurl} sx={{ width: 56, height: 56 }} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                              {song.title}
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: 3,
                                }}
                              >
                                <Box>
                                  <Typography
                                    component="span"
                                    variant="body1"
                                    sx={{ color: 'black', fontWeight: '500', display: 'block', textAlign: 'left' }}
                                  >
                                    <b>གཞས་པ།</b> {song.singer}
                                  </Typography>
                                  <Typography
                                    component="span"
                                    variant="body1"
                                    sx={{ color: 'text.primary', display: 'block', textAlign: 'left' }}
                                  >
                                    <b>གདངས།</b> {song.composer}
                                  </Typography>
                                  <Typography
                                    component="span"
                                    variant="body1"
                                    sx={{ color: 'text.primary', display: 'block', textAlign: 'left' }}
                                  >
                                    <b>ཚིག</b> {song.lyricist}
                                  </Typography>
                                </Box>
                                <Box
                                  component="img"
                                  sx={{
                                    height: 150,
                                    width: 300,
                                    objectFit: 'cover',
                                    borderRadius: '10px',
                                  }}
                                  alt={song.title}
                                  src={song.thumbnailurl}
                                />
                              </Box>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </Paper>
                  </Link>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </div>
  );
}

export default SongDetail;
