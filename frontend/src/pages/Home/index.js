import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import  latestLyrics  from '../latestLyrics';

function Home() {
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
           alignSelf:"start", ml:"3rem"
        }}
      >
        གཞས་ཚིག་གསར་སྣོན།
      </Typography>

      <List sx={{
        width: '100%',
        maxWidth: 800,
        bgcolor: 'background.paper',
        padding: '1rem',
      }}>
        {latestLyrics.map((song, index) => (
          <React.Fragment key={index}>
            <Link
              to={`/songs/${encodeURIComponent(song.title)}`}
              style={{ textDecoration: 'none' }} // Remove default link styles
            >
              <Paper
                sx={{
                  bgcolor: "#FFF7EF",
                  mb: '20px',
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
                    <Avatar alt={song.singer} src={song.thumbnailurl} sx={{ width: 56, height: 56, }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' ,ml:'3rem',}}>
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
                            justifyContent:'space-between',
                            gap: 3,
                            ml: '3rem',
                            
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
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default Home;
