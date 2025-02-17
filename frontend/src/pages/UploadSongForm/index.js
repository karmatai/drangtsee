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
        let artistId = formData.artistId;

        if (isNewArtist) {
          const artistDocRef = await addDoc(collection(db, 'artists'), artistData);
          artistId = artistDocRef.id;
        }

        const songDocRef = await addDoc(collection(db, 'songs'), {
          ...formData,
          coverPhotoUrl,
          userId: user.uid,
          artistId,
          timestamp: new Date(),
          contributedBy: user.displayName || user.email,
        });

        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          await setDoc(userRef, {
            points: 0,
            lyricsCount: 0,
            artistCount: 0,
            milestone: 0,
            contributions: [],
          });
        }

        await updateDoc(userRef, {
          points: increment(10),
          lyricsCount: increment(1),
          contributions: increment({
            contribution_type: 'upload',
            song_id: songDocRef.id,
            song_name_eng: formData.titleEnglish,
            song_name_tib: formData.titleTibetan,
          }),
        });

        if (isNewArtist) {
          await updateDoc(userRef, {
            artistCount: increment(1),
          });
        }

        const updatedUserDoc = await getDoc(userRef);
        const userData = updatedUserDoc.data();
        if (userData) {
          let milestoneMessageEng = '';
          let milestoneMessageTib = '';

          if (userData.points >= 100 && userData.points % 100 === 0) {
            milestoneMessageEng = `Earned ${userData.points} bee points`;
            milestoneMessageTib = `སྦྲང་རྩིའི་སྐར་གྲངས་་ ${userData.points} ཐམ་པ་ཐོབ།`
          } else if (userData.lyricsCount >= 5 && userData.lyricsCount % 5 === 0) {
            milestoneMessageEng = `གཞས་ཚིག་ ${userData.lyricsCount}ཐམ་པ་བླུགས།`;
            milestoneMessageTib =`${userData.lyricscount}`;
          } else if (userData.artistCount >= 5 && userData.artistCount % 5 === 0) {
            milestoneMessageEng = `Uploaded ${userData.artistCount} artists`;
            milestoneMessageTib =`གླུ་པ་ ${userData.lyricscount}ཐམ་པ་བླུགས།`;
          } else if (userData.lyricsCount === 1) {
            milestoneMessageEng = 'Uploaded your first song';
            milestoneMessageTib =`གཞས་ཚིག་དང་པོ་དེ་བླུགས།`;
          } else if (userData.artistCount === 1) {
            milestoneMessageEng = 'Uploaded your first artist';
            milestoneMessageTib =`གླུ་པ་དང་པོ་དེ་བླུགས`;
          }
          await updateDoc(userRef, {
            milestone: {milestoneMessageEng:milestoneMessageEng,milestoneMessageTib:milestoneMessageTib}
          });
          console.log('New milestone reached!');
        }
        setSnackbarMessage('Song uploaded successfully! You have been awarded 10 bee points.');
        setSnackbarOpen(true);
        setFormData(initialFormData);
        setArtistData(initialArtistData);
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
      <ArtistInput
          labelTibetan="Artist (བོད།)"
          labelEnglish="Artist (English)"
          nameTibetan="artistTibetan"
          nameEnglish="artistEnglish"
          valueTibetan={formData.artistTibetan}
          valueEnglish={formData.artistEnglish}
          width="40%"
          onChange={handleChange}
          onSave={(artist) => handleSave(artist, 'artist')}
          required
        />
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
        <ArtistInput
          labelTibetan="Featuring (བོད།)"
          labelEnglish="Featuring (English)"
          nameTibetan="featuringTibetan"
          nameEnglish="featuringEnglish"
          valueTibetan={formData.featuringTibetan}
          valueEnglish={formData.featuringEnglish}
          width="40%"
          onChange={handleChange}
          onSave={(featuring) => handleSave(featuring, 'featuring')}
        />
        <ArtistInput
          labelTibetan="Composer (བོད།)"
          labelEnglish="Composer (English)"
          nameTibetan="composerTibetan"
          nameEnglish="composerEnglish"
          valueTibetan={formData.composerTibetan}
          valueEnglish={formData.composerEnglish}
          width="40%"
          onChange={handleChange}
          onSave={(composer) => handleSave(composer, 'composer')}
        />
        <ArtistInput
          labelTibetan="Producer (བོད།)"
          labelEnglish="Producer (English)"
          nameTibetan="producerTibetan"
          nameEnglish="producerEnglish"
          valueTibetan={formData.producersTibetan}
          valueEnglish={formData.producersEnglish}
          width="40%"
          onChange={handleChange}
          onSave={(producer) => handleSave(producer, 'producer')}
        />
        <ArtistInput
          labelTibetan="Writers (བོད།)"
          labelEnglish="Writers (English)"
          nameTibetan="writersTibetan"
          nameEnglish="writersEnglish"
          valueTibetan={formData.writersTibetan}
          valueEnglish={formData.writersEnglish}
          onChange={handleChange}
          onSave={(featuring) => handleSave(featuring, 'featuring')}
        />
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
          required
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