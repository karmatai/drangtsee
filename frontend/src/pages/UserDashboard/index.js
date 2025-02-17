import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();
const db = getFirestore();

const badges = [
  { titleTibetan: 'གངས་ལྷ་མེ་ཏོག།', titleEnglish: 'Snow Flower 1', image: <Avatar variant="square">1</Avatar> },
  { titleTibetan: 'པད་མ་མེ་ཏོག།', titleEnglish: 'Lotus Flower 1', image: <Avatar variant="square">2</Avatar> },
  { titleTibetan: 'སྐལ་བཟང་མེ་ཏོག།', titleEnglish: 'Fortunate Flower 1', image: <Avatar variant="square">3</Avatar> },
  { titleTibetan: 'ཨུཏྤལ་མེ་ཏོག།', titleEnglish: 'Utpala Flower 1', image: <Avatar variant="square">4</Avatar> },
  { titleTibetan: 'ཉི་མ་མེ་ཏོག།', titleEnglish: 'Sun Flower 1', image: <Avatar variant="square">5</Avatar> },
  { titleTibetan: 'སྤང་རྒྱན་མེ་ཏོག།', titleEnglish: 'Meadow Flower 1', image: <Avatar variant="square">6</Avatar> },
  { titleTibetan: 'ཀུ་མུད་མེ་ཏོག།', titleEnglish: 'Kumud Flower 1', image: <Avatar variant="square">7</Avatar> },
  { titleTibetan: 'བྱུ་རུའི་མེ་ཏོག།', titleEnglish: 'Coral Flower 1', image: <Avatar variant="square">8</Avatar> },
  { titleTibetan: 'སྟག་མ་མེ་ཏོག།', titleEnglish: 'Tiger Flower 1', image: <Avatar variant="square">9</Avatar> },
  { titleTibetan: 'ཀླུ་ཤིང་མེ་ཏོག།', titleEnglish: 'Naga Tree Flower 1', image: <Avatar variant="square">10</Avatar> },
  { titleTibetan: 'གུར་གུམ་མེ་ཏོག།', titleEnglish: 'Gur Gum Flower 1', image: <Avatar variant="square">11</Avatar> },
  { titleTibetan: 'ཐག་འཁྱུད་མེ་ཏོག།', titleEnglish: 'Thread Flower 1', image: <Avatar variant="square">12</Avatar> },
  { titleTibetan: 'སེར་ཆེན་མེ་ཏོག།', titleEnglish: 'Golden Flower 1', image: <Avatar variant="square">13</Avatar> },
  { titleTibetan: 'སྣ་མ་མེ་ཏོག།', titleEnglish: 'Nema Flower 1', image: <Avatar variant="square">14</Avatar> },
  { titleTibetan: 'ཙམ་པ་ཀ་མེ་ཏོག།', titleEnglish: 'Tsampa Flower 1', image: <Avatar variant="square">15</Avatar> },
  { titleTibetan: 'ཧ་ལོ་མེ་ཏོག།', titleEnglish: 'Halo Flower 1', image: <Avatar variant="square">16</Avatar> },
  { titleTibetan: 'སྲན་མ་མེ་ཏོག།', titleEnglish: 'Bean Flower 1', image: <Avatar variant="square">17</Avatar> },
  { titleTibetan: 'དྲིལ་བུའི་མེ་ཏོག།', titleEnglish: 'Bell Flower 1', image: <Avatar variant="square">18</Avatar> },
  { titleTibetan: 'སེ་བ་མེ་ཏོག།', titleEnglish: 'Apple Flower 1', image: <Avatar variant="square">19</Avatar> },
  { titleTibetan: 'རྒྱ་སེར་མེ་ཏོག།', titleEnglish: 'Golden Flower 1', image: <Avatar variant="square">20</Avatar> },
  { titleTibetan: 'ལྕམ་པ་མེ་ཏོག།', titleEnglish: 'Lampa Flower 1', image: <Avatar variant="square">21</Avatar> },
];

const ITEMS_PER_PAGE = 5;

export default function UserDashboard() {
  const { t, i18n } = useTranslation();
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [userData, setUserData] = useState([]);
  const [user, setUser] = useState(null);

  const handleSeeMore = () => {
    setVisibleItems(badges.length);
  };

  useEffect(() => {
    if (!i18n.language || i18n.language === 'en') {
      i18n.changeLanguage('bo'); 
    }
  }, [i18n]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h1" variant="h1">
        {t('Profile')}
      </Typography>
      <Grid
        container
        spacing={4}
        rows={12}
        direction={'row'}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid item size={{ xs: 9, sm: 6, md: 5, lg: 3 }}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
              p: '2rem',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Avatar gutterBottom sx={{ height: '7rem', width: '7rem' }}>
              M
            </Avatar>
            <Typography variant="body12" gutterBottom>
              {user?user.displayName : 'karma'}
            </Typography>
            <Box sx={{ alignSelf: 'start' }}>
              <Typography variant="h6" sx={{ alignSelf: 'start' }}>
                {t('Bio')}:
              </Typography>
              <Typography variant="body2" sx={{ alignSelf: 'start' }}>
                {t('Nothing to show here.')}
              </Typography>
            </Box>

            <Typography sx={{ alignSelf: 'start' }}>
              {t('Dino Rank')}: {t('Melody Master')} 🐝
            </Typography>
            <Typography sx={{ alignSelf: 'start' }}>
              {t('Total Points')}: {userData.points}
            </Typography>
            <Typography sx={{ alignSelf: 'start' }}>
              {t('Total Contribution')}: {userData.lyricsCount}
            </Typography>
            <Typography sx={{ alignSelf: 'start' }}>
              {t('Milestones')}: {t('10 Verified Lyrics')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item size={{ sx: 12, md: 9, l: 9 }}>
          <Box
            sx={{
              flexGrow: 1,
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h4" textAlign="center" gutterBottom>
              {t('Badges')}
            </Typography>
            <Grid container spacing={2} rows={12} direction="row">
              {badges.slice(0, visibleItems).map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={3} lg={3}>
                  <Box
                    sx={{
                      height: '8rem',
                      width: '9rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      //boxShadow: 1,
                      p: 2,
                      bgcolor: 'background.paper2',
                    }}
                  >
                    <Avatar
                      variant="square"
                      sx={{ height: '3.5rem', width: '3rem', mb: 2 }}
                    >
                      M
                    </Avatar>
                    <Typography variant="body1">
                      {(i18n.language === "eng"?item.titleEnglish:item.titleTibetan)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
              {visibleItems < badges.length && (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Button onClick={handleSeeMore} sx={{ textDecoration: 'underline' }}>
                    {t('more')}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} columns={12}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            sx={{
              minHeight: '12rem',
              p: '2rem',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h2">{t('Recent Activity')}</Typography>
            <Typography>{t('Added song sherten')}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}