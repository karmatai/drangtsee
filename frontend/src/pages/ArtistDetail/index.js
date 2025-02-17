import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc,getDocs, query,collection,where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import VisibilityIcon from '@mui/icons-material/Visibility';

const db = getFirestore();
const auth = getAuth();


const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent:'space-between',
  height: '7rem',
  borderRight:'none',
  borderLeft:'none',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  alignItems:'center',
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
    opacity: '80%',
  },
}));

const ArtistDetailPage = () => {
  const [artistDetails, setArtistDetails] = useState(null);
  const { id } = useParams();
  const [discography, setDiscography] = useState([]);

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
    
    const fetchArtistDetails = async() => {
      // Simulate an API call delay
      if (id) {
        console.log('Fetching song with ID:', id); // Debugging step
        const docRef = doc(db, 'artists', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Artist data:', docSnap.data()); // Debugging step
          setArtistDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No ID provided!');
      }
    };

    fetchArtistDetails();
  }, [id]);

  useEffect(() => {
    const fetchDiscography = async () => {
      if(id) {
        const q = query(collection(db, 'songs'), where('artistId', '==', id));
        const querySnapshot = await getDocs(q);
        const discography = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDiscography(discography);
        console.log(discography);
      }else {
        console.log('No ID provided!');
      }
    };
    fetchDiscography();
  }, [id]);

  if (!artistDetails) {
    return <Typography>No artist found.</Typography>; // Show a message if artist details are not available
  }

  const user = auth.currentUser;
  const isEditor = user && user.email === 'karmatai6089@gmail.com'; // Replace with actual editor check

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: 3,
        width: '100%'
      }}
    >
      <Box sx={{ flex: 1, paddingRight: 3, alignItems: "center" }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar alt={artistDetails.name} src={artistDetails.thumbnailurl} sx={{ width: 120, height: 120 }} />
          <Typography variant="h4" gutterBottom>
            {artistDetails.nameTibetan}
            {!artistDetails.biography && isEditor && (
            <Link to={`/edit-artist/${id}`} style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="primary">
                Edit Profile~
              </Typography>
            </Link>
          )}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Typography variant="h6" gutterBottom>
            Biography
          </Typography>
          <Typography variant='body1' gutterBottom>
            {artistDetails.biography ? artistDetails.biography : 'No biography available'}
          </Typography>
          
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

      <Box sx={{ flex: 2 }}>
        <Typography variant="h6" sx={{ mt: 3 }}>Discography:</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
          {discography.map((song) => (
            <Link to={`/songs/${encodeURIComponent(song.id)}`} style={{ textDecoration: 'none' }} key={song.id}>
              <SyledCard variant="outlined">
                <Avatar alt={song.title} src={song.coverPhotoUrl} variant="square" sx={{ width: 60, height: 60, mr: 2 }} />
                <Typography variant="body1">{song.titleTibetan}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ mr: 2 }}>{song.views}</Typography>
                  <VisibilityIcon />
                </Box>
              </SyledCard>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ArtistDetailPage;
