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
import Paper from '@mui/material/Paper';

// Sample lyrics data (replace with real data)


// Comparator function for sorting in Tibetan alphabetical order
const tibetanSort = (a, b) => {
  
  return a.singer.localeCompare(b.singer, 'bo');  // 'bo' is the locale for Tibetan
};

// Function to group songs by their first letter
const groupArtistByFirstLetter = (songs) => {
  return songs.reduce((acc, song) => {
    const cleanSingerTitle = song.singer.replace(/[^ཀ-ྼa-zA-Z]/g, ''); // Remove non-alphabet characters, keeping Tibetan and English alphabets
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

  // Sort the songs by Tibetan alphabetical order
  const sortedSongs = latestLyrics.sort(tibetanSort);

  // Group the sorted songs by their first Tibetan letter
  const groupedArtist = groupArtistByFirstLetter(sortedSongs);

  // Find the specific song using the title from URL
  const song = sortedSongs.find(song => song.title === decodeURIComponent(title));

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ml: "10%" }}>
      <Typography variant="h4" component="div" sx={{ my: 2 }}>
        གླུ་གཞས།
      </Typography>

      <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: '90%' }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper',ml:"10%" }}>
          {Object.keys(groupedArtist).map((letter, index) => (
            <React.Fragment key={index}>
              <Typography variant="h6" sx={{ mt: 2, ml: 2 }}>
                {letter} {/* Display the first Tibetan letter as header */}
              </Typography>
              

              {groupedArtist[letter].map((song, songIndex) => (
                <React.Fragment key={songIndex} display="flex" flexDirection="row">
                  
                  <ListItem sx={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                  <Paper elevation={1} sx={{width:"10"}}>
                  <ListItemAvatar >
                  <Avatar alt={song.artist} src={song.thumbnailurl} sx= {{width: 76, height: 76 }}/>
                  </ListItemAvatar>
                    <ListItemText
                      primary={<Link to={`/artists/${encodeURIComponent(song.singer)}`} style={{textDecoration:"None"}}>{song.singer}</Link>}
                      
                    />
                    </Paper>
                  </ListItem>
                  
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Artist;
