import React from 'react';
import { useParams } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemAvatar } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { latestLyrics } from '../Home';

// Sample lyrics data (replace with real data)


// Comparator function for sorting in Tibetan alphabetical order
const tibetanSort = (a, b) => {
  return a.title.localeCompare(b.title, 'bo');  // 'bo' is the locale for Tibetan
};

// Function to group songs by their first letter
const groupSongsByFirstLetter = (songs) => {
  return songs.reduce((acc, song) => {
    const cleanTitle = song.title.replace(/[^ཀ-ྼa-zA-Z]/g, ''); // Remove non-alphabet characters, keeping Tibetan and English alphabets
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: "10%" }}>
      <Typography variant="h4" component="div" sx={{ my: 2 }}>
        གླུ་གཞས།
      </Typography>

      <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: '༩༠༵' }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper',ml:"10%" }}>
          {Object.keys(groupedSongs).map((letter, index) => (
            <React.Fragment key={index}>
              <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
                {letter} {/* Display the first Tibetan letter as header */}
              </Typography>
              <Divider />

              {groupedSongs[letter].map((song, songIndex) => (
                <React.Fragment key={songIndex}>
                  <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                  <Avatar alt={song.artist} src={song.thumbnailurl} />
                  </ListItemAvatar>
                    <ListItemText
                      primary={<Link to={`/songs/${encodeURIComponent(song.title)}`} style={{textDecoration:"None"}}>{song.title}</Link>}
                      secondary={
                        <React.Fragment>
                        <Box
                          sx={{
                            display: 'flex', // Flexbox to manage layout
                            flexDirection: 'row', // Align items in a row (image + text)
                            alignItems: 'flex-start', // Align items at the start
                            gap: 2, // Add spacing between the image and the text
                          }}
                        >
                          <Box
                            component="img"
                            sx={{
                              height: 233,
                              width: 350,
                              maxHeight: { xs: 233, md: 167 },
                              maxWidth: { xs: 350, md: 250 },
                            }}
                            alt="The house from the offer."
                            src={song.thumbnailurl}
                          />
                      <Typography variant="body2" color="text.secondary">-  {song.singer}</Typography>
                      </Box>
                      </React.Fragment>}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default SongDetail;
