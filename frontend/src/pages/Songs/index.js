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

// Sample lyrics data (replace with real data)
const latestLyrics = [
  { title: "སྐད་ཅིག་རྩལ།", artist: "Artist 1", lyrics: "བསམ་ཡས་ལྷུན་གྲུབ་..." },
  { title: "བསྟན་བཤད།", artist: "Artist 2", lyrics: "མཚན་གྲུབ་བུམ་དཀར་..." },
  { title: "དགེ་བཤེས།", artist: "Artist 3", lyrics: "འགྱུར་མཐའ་བསྒྲགས་བཞིན་..." },
];

// Comparator function for sorting in Tibetan alphabetical order
const tibetanSort = (a, b) => {
  return a.title.localeCompare(b.title, 'bo');  // 'bo' is the locale for Tibetan
};

// Function to group songs by their first letter
const groupSongsByFirstLetter = (songs) => {
  return songs.reduce((acc, song) => {
    const firstLetter = song.title[0]; // Get the first letter of the song title
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h4" component="div" sx={{ my: 2 }}>
        {song ? song.title : "Song not found"}
      </Typography>

      <Box sx={{ flex: 1, overflowY: 'auto', maxHeight: '300px' }}>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
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
                  <Avatar alt={song.artist} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                    <ListItemText
                      primary={<Link to={`/songs/${encodeURIComponent(song.title)}`}>{song.title}</Link>}
                      secondary={<Typography variant="body2" color="text.secondary">{song.artist}</Typography>}
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
