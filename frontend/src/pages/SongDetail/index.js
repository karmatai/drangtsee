import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography, useMediaQuery, useTheme, TextField, Button, Divider, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getFirestore, doc, getDoc, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import Link from '@mui/material/Link';

const db = getFirestore();
const auth = getAuth();

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SongDetail() {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const [save, setSave] = useState(false);
  const [song, setSong] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const fetchSong = async () => {
      if (id) {
        console.log('Fetching song with ID:', id); // Debugging step
        const docRef = doc(db, 'songs', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Song data:', docSnap.data()); // Debugging step
          setSong(docSnap.data());
          await updateDoc(docRef, { views: increment(1) }); // Increment view count
        } else {
          console.log('No such document!');
        }
      } else {
        console.log('No ID provided!');
      }
    };

    fetchSong();
  }, [id]);

  

  useEffect(() => {
    const user = auth.currentUser;
    setIsLoggedIn(!!user);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSave = async () => {
    setSave(!save);
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        favorites: arrayUnion(id),
      });
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFieldUpdate = async (field) => {
    setLoading({ ...loading, [field]: true });
    const docRef = doc(db, 'songs', id);
    await updateDoc(docRef, { [field]: formData[field] });
    setLoading({ ...loading, [field]: false });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setFormData('');
  };

  if (!song) {
    return <h2>Song not found!</h2>;
  }

  const getField = (field) => {
    return i18n.language === 'eng' ? song[field + 'English'] || song[field + 'Tibetan'] : song[field + 'Tibetan'];
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', px: '5%' }}>
      <Grid container spacing={2} columns={12} width={'100%'} justifyContent={'center'}>
        <Grid item xs={12} md={3} l={3}>
          <CardMedia
            component="img"
            alt="song thumbnail"
            image={song.coverPhotoUrl}
            sx={{
              aspectRatio: '1 / 1',
              width: '10rem',
              height: 'auto',
            }}
          />
        </Grid>
        <Grid item xs={12} md={9} l={9}>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems={isSmallScreen ? 'center' : 'flex-start'}>
            <Typography variant='h1' gutterBottom>{getField('title')}</Typography>
            <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            <Link href={`/artist/${song.artistId}`} variant='body2'  color="inherit" >
            {getField('artist')}
            </Link>
            <Link href={`/artist/${song.writersId}`} variant='body2'  color="inherit" >{getField('writers')}</Link>
            <Link href={`/artist/${song.featuringId}`} variant='body2'  color="inherit" >{getField('featuring')}</Link>
            <Link href={`/artist/${song.composerId}`} variant='body2'  color="inherit" >{getField('composer')}</Link>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} l={12} xl={12}>
          <Paper align="center" 
          sx={{ py: 5,
          minWidth: { xs: '20rem', sm: '30rem', md: '50rem', l:'60rem', }, 
          minHeight: '60rem',
          display: 'flex',
          width:'100%', 
          flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'}>
                <Typography variant='body2' sx={{ml:2, color:'text.secondary'}}>{song.views || 0}</Typography>
                <VisibilityIcon  sx={{ml:1,color:'text.secondary'}}/>
              </Box>
              {save ? <FavoriteIcon sx={{mr:2,color:'text.secondary'}} onClick={handleSave}/>
              : <FavoriteBorderIcon sx={{mr:2,color:'text.secondary' }} onClick={handleSave}/>
              }
            </Box>
            <CustomTabPanel value={value} index={0}>
              {getField('lyrics').split('\n').map((line, index) => (
                <Typography variant='body2' fontSize={30} gutterBottom={true} key={line}>{line}</Typography>
              ))}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Typography variant='body2' fontSize={30} gutterBottom={true} >{getField('lyrics').split('\n').map((line, index) => (
                <Typography variant='body2' fontSize={30} gutterBottom={true} key={line}>{line}</Typography>
              ))|| 'Translation not available'}</Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Typography variant='body2' fontSize={30} gutterBottom={true} >{song.translationEnglish || 'Translation not available'}</Typography>
            </CustomTabPanel>
            <Box sx={{ mt: 'auto' }}>
              <Tabs value={value} onChange={handleChange} centered>
                <Tab label="བོད་སྐད།" {...a11yProps(0)} />
                <Tab label="དོན།" {...a11yProps(1)} />
                <Tab label="དབྱིན་འགྱུར།" {...a11yProps(2)} />
              </Tabs>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {isLoggedIn && (
        <>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ width: '100%', maxWidth: '600px'}}>
            <Typography variant="h5" gutterBottom>Update Song Information</Typography>
            {Object.keys(song).map((field) => (
  !song[field] && (
    <Box key={field} sx={{ mb: 2, display: 'flex', alignItems: 'center',
      flexDirection:field.includes('lyrics') || field.includes('translation') ? 'column' : 'row'
     }}>
      <TextField
        fullWidth
        label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        name={field}
        value={formData[field] || ''}
        onChange={handleFormChange}
        multiline={field.includes('lyrics') || field.includes('translation')}
        rows={field.includes('lyrics') || field.includes('translation') ? 14 : 1}
        variant='filled'
        sx={{ mb: 2, flex: field.includes('lyrics') || field.includes('translation') ? '1 1 100%' : '1 1 auto' }}
      />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleFieldUpdate(field)}
          disabled={loading[field]}
          sx={{ ml: 2 }}
        >
          {loading[field] ? 'Updating...' : 'Update'}
        </Button>
          </Box>
          )
          ))}
          </Box>
          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
              Field updated successfully! You've gained relevant points.
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
}

export default SongDetail;