import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Snackbar, Alert, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, increment, getDoc, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArtistInput from './artistInput.js';

const db = getFirestore();
const auth = getAuth();

const primaryTags = [
  'Rap',
  'Pop',
  'R&B',
  'Rock',
  'Country',
  'Non-Music',
  'Other',
];

const initialFormData = {
  artistTibetan: '',
  artistEnglish: '',
  artistId: '',
  titleTibetan: '',
  titleEnglish: '',
  primaryTag: '',
  otherTag: '',
  lyricsTibetan: '',
  translationEnglish: '',
  featuringTibetan: '',
  featuringEnglish: '',
  featuringId: '',
  composerTibetan: '',
  composerEnglish: '',
  composerId: '',
  producersTibetan: '',
  producersEnglish: '',
  writersTibetan: '',
  writersEnglish: '',
  writersId: '',
  soundcloudUrl: '',
  youtubeUrl: '',
  releaseDate: '',
  albumsTibetan: '',
  albumsEnglish: '',
  coverPhotoUrl: '',
};

const initialArtistData = {
  nameTibetan: '',
  nameEnglish: '',
  bioTibetan: '',
  bioEnglish: '',
  photoUrl: '',
};

function UploadSongForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialFormData);
  const [coverPhotoUrl, setCoverPhotoUrl] = useState('none');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [artistData, setArtistData] = useState(initialArtistData);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isNewArtist, setIsNewArtist] = useState(false);

  const extractYouTubeThumbnail = (youtubeUrl) => {
    const videoId = youtubeUrl.split('v=')[1];
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  useEffect(() => {
    if (formData.youtubeUrl) {
      const thumbnailUrl = extractYouTubeThumbnail(formData.youtubeUrl);
      setCoverPhotoUrl(thumbnailUrl);
    } else {
      setCoverPhotoUrl('none');
    }
  }, [formData.youtubeUrl]);

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (artist, role) => {
    setFormData((prevData) => ({
      ...prevData,
      [`${role}Tibetan`]: artist.nameTibetan,
      [`${role}English`]: artist.nameEnglish,
      [`${role}Id`]: artist.id,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = auth.currentUser;
      if (user) {
        let artistId = selectedArtist ? selectedArtist.id : null;

        if (isNewArtist) {
          const artistDocRef = await addDoc(collection(db, 'artists'), artistData);
          artistId = artistDocRef.id;
        }

        await addDoc(collection(db, 'songs'), {
          ...formData,
          coverPhotoUrl,
          userId: user.uid,
          artistId,
          timestamp: new Date(),
        });

        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            points: 0,
            lyricsCount: 0,
            milestoneReached: false,
          });
        }

        await updateDoc(userRef, {
          points: increment(10),
          lyricsCount: increment(1),
        });

        const updatedUserDoc = await getDoc(userRef);
        const userData = updatedUserDoc.data();
        if (userData.lyricsCount >= 5 && !userData.milestoneReached) {
          await updateDoc(userRef, {
            milestoneReached: true,
          });
          console.log('Milestone reached!');
        }

        setSnackbarMessage('Song uploaded successfully! You have been awarded 10 bee points.');
        setSnackbarOpen(true);
        setFormData(initialFormData);
        setArtistData(initialArtistData);
        setSelectedArtist(null);
        setIsNewArtist(false);
        console.log('Song uploaded successfully');
      } else {
        console.log('No user is signed in');
      }
    } catch (error) {
      console.error('Error uploading song: ', error);
      setSnackbarMessage('Error uploading song. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
    <Typography variant="h4" textAlign="center" gutterBottom>
      {t('uploadSong')}
    </Typography>
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} noValidate autoComplete="off">
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label={t('by') + ' (བོད།) *'}
            name="artistTibetan"
            value={formData.artistTibetan}
            onChange={handleChange}
            required
            sx={{ width: '40%' }}
            variant="filled"
          />
          <TextField
            label={t('by') + ' (English)'}
            name="artistEnglish"
            value={formData.artistEnglish}
            onChange={handleChange}
            sx={{ width: '40%' }}
            variant="filled"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexDirection: isSm ? 'column' : 'row' }}>
          <TextField
            label={t('title') + ' (བོད།) *'}
            name="titleTibetan"
            value={formData.titleTibetan}
            onChange={handleChange}
            sx={{ width: isSm ? '25rem' : '40rem' }}
            required
            variant="filled"
          />
          <TextField
            label={t('title') + ' (English)'}
            name="titleEnglish"
            value={formData.titleEnglish}
            onChange={handleChange}
            sx={{ width: isSm ? '25rem' : '40rem' }}
            variant="filled"
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: isSm ? 'column' : 'column' }}>
          <TextField
            select
            label={t('primaryTag') + ' *'}
            name="primaryTag"
            value={formData.primaryTag}
            onChange={handleChange}
            sx={{ width: '15rem' }}
            required
            variant="filled"
          >
            {primaryTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </TextField>
          {formData.primaryTag === 'Other' && (
            <TextField
              label={t('otherTag')}
              name="otherTag"
              value={formData.otherTag}
              onChange={handleChange}
              variant="filled"
              sx={{ width: '5rem' }}
            />
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: isSm ? 'column' : 'row' }}>
          <TextField
            label={t('lyrics') + ' (བོད།) *'}
            name="lyricsTibetan"
            value={formData.lyricsTibetan}
            onChange={handleChange}
            multiline
            rows={14}
            sx={{ width: isSm ? '25rem' : '40rem' }}
            required
            variant="filled"
          />
          <TextField
            label={t('translation') + ' (English)'}
            name="translationEnglish"
            value={formData.translationEnglish}
            onChange={handleChange}
            fullWidth
            multiline
            rows={14}
            sx={{ width: isSm ? '25rem' : '40rem' }}
            variant="filled"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label={t('featuring') + ' (བོད།)'}
            name="featuringTibetan"
            value={formData.featuringTibetan}
            onChange={handleChange}
            width="40%"
            variant="filled"
          />
          <TextField
            label={t('featuring') + ' (English)'}
            name="featuringEnglish"
            value={formData.featuringEnglish}
            onChange={handleChange}
            width="40%"
            variant="filled"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label={t('composer') + ' (བོད།)'}
            name="composerTibetan"
            value={formData.composerTibetan}
            onChange={handleChange}
            width="40%"
            variant="filled"
          />
          <TextField
            label={t('composer') + ' (English)'}
            name="composerEnglish"
            value={formData.composerEnglish}
            onChange={handleChange}
            width="40%"
            variant="filled"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
        <ArtistInput
          labelTibetan="Featuring (བོད།)"
          labelEnglish="Featuring (English)"
          nameTibetan="featuringTibetan"
          nameEnglish="featuringEnglish"
          valueTibetan={formData.featuringTibetan}
          valueEnglish={formData.featuringEnglish}
          onChange={handleChange}
          onSave={(featuring) => handleSave(featuring, 'featuring')}
        />
      </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label={t('producers') + ' (བོད།)'}
            name="producersTibetan"
            value={formData.producersTibetan}
            onChange={handleChange}
            width="40%"
            variant="filled"
          />
          <TextField
            label={t('producers') + ' (English)'}
            name="producersEnglish"
            value={formData.producersEnglish}
            onChange={handleChange}
            width="40%"
            variant="filled"
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label={t('writers') + ' (བོད།)'}
            name="writersTibetan"
            value={formData.writersTibetan}
            onChange={handleChange}
            width="40%"
            variant="filled"
          />
          <TextField
            label={t('writers') + ' (English)'}
            name="writersEnglish"
            value={formData.writersEnglish}
            onChange={handleChange}
            width="40%"
            variant="filled"
          />
        </Box>
        <TextField
          label={t('soundcloudUrl')}
          name="soundcloudUrl"
          value={formData.soundcloudUrl}
          onChange={handleChange}
          sx={{ width: isSm ? '25rem' : '40rem' }}
          variant="filled"
        />
        <TextField
          label={t('youtubeUrl')}
          name="youtubeUrl"
          value={formData.youtubeUrl}
          onChange={handleChange}
          sx={{ width: isSm ? '25rem' : '40rem' }}
          variant="filled"
        />
        <Box sx={{ display: 'flex', gap: 2, flexDirection: isSm ? 'column' : 'row' }}>
          <TextField
            label={t('releaseDate')}
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            sx={{ width: '15rem' }}
            type="date"
            variant="filled"
          />
          <TextField
            label={t('albums') + ' (བོད།)'}
            name="albumsTibetan"
            value={formData.albumsTibetan}
            onChange={handleChange}
            sx={{ width: '15rem' }}
            variant="filled"
          />
          <TextField
            label={t('albums') + ' (English)'}
            name="albumsEnglish"
            value={formData.albumsEnglish}
            onChange={handleChange}
            sx={{ width: '15rem' }}
            variant="filled"
          />
        </Box>

        <Button type="submit" variant="contained" sx={{ width: '10rem' }} disabled={isSubmitting}>
          {t('upload')}
        </Button>
      </Box>
    </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  ); 
}

export default UploadSongForm;