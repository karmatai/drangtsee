import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Button
} from '@mui/material';

const ArtistDetailPage = () => {
  const { artistName } = useParams(); // Get the artist name from the URL parameters
  const [artistDetails, setArtistDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock artist data
  const mockArtistData = {
    name: "Tibetan Artist",
    thumbnailurl: "https://example.com/artist-thumbnail.jpg",
    biography: "This is a brief biography of the Tibetan artist.",
    discography: [
      {
        title: "Album Title 1",
        coverUrl: "https://example.com/album1-cover.jpg",
        releaseDate: "2022-01-01"
      },
      {
        title: "Album Title 2",
        coverUrl: "https://example.com/album2-cover.jpg",
        releaseDate: "2023-01-01"
      },
      {
        title: "Album Title 3",
        coverUrl: "https://example.com/album3-cover.jpg",
        releaseDate: "2024-01-01"
      }
    ]
  };

  // Simulate fetching artist details when the component mounts
  useEffect(() => {
    const fetchArtistDetails = () => {
      // Simulate an API call delay
      setTimeout(() => {
        setArtistDetails(mockArtistData); // Set the mock data
        setLoading(false); // Update loading state
      }, 500); // Simulate a 500ms delay
    };

    fetchArtistDetails();
  }, [artistName]);

  if (loading) {
    return <Typography>Loading...</Typography>; // Show a loading message while fetching data
  }

  if (!artistDetails) {
    return <Typography>No artist found.</Typography>; // Show a message if artist details are not available
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', // Full height of the viewport
        padding: 3
      }}
    >
      <Typography variant="h4" gutterBottom>
        {artistDetails.name}
      </Typography>
      <Avatar alt={artistDetails.name} src={artistDetails.thumbnailurl} sx={{ width: 120, height: 120, mb: 2 }} />
      
      <Typography variant="h6">Biography:</Typography>
      <Typography align="center">{artistDetails.biography}</Typography>
      
      <Typography variant="h6" sx={{ mt: 3 }}>Discography:</Typography>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {artistDetails.discography.map((album, index) => (
          <Paper key={index} sx={{ mb: 1 }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={album.title} src={album.coverUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={album.title}
                secondary={`Released: ${album.releaseDate}`}
              />
            </ListItem>
          </Paper>
        ))}
      </List>

      <Button variant="contained" sx={{ mt: 2 }} onClick={() => window.history.back()}>
        Back to Artists
      </Button>
    </Box>
  );
};

export default ArtistDetailPage;
