import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase_setup/firebase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {  styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link  } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';



const SyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    height: '10rem',
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
  
  const SyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 0,
    flexGrow: 1,
    justifyContent:'center',
    alignItems:'center',
    '&:last-child': {
      paddingBottom: 16,
    },
    
  });
  
  
  
  
  function Author({ authors }) {
    const [liked, setLiked] = useState(false);
    const handleLike = () => {
      setLiked(!liked);
    };
    return (
      <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      gap: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px',
    }}
  >
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
    >
      <AvatarGroup max={3} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        {authors.map((author, index) => (
          <Avatar
            key={index}
            alt={author.name}
            src={author.avatar}
            sx={{ width: 24, height: 24 }}
          />
        ))}
      </AvatarGroup>
      {liked ? (
        <FavoriteIcon onClick={handleLike} fontSize="large" />
      ) : (
        <FavoriteBorderIcon onClick={handleLike} fontSize="large" />
      )}
    </Box>
    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={0.5}>
    <Typography variant="caption">2021,23</Typography>
    <VisibilityIcon fontSize='sm'/>
    </Box>
    
    
  </Box>
    )
  }
  
  Author.propTypes = {
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

const TopSongs = () => {
  const [topSongs, setTopSongs] = useState([]);
  const { i18n } = useTranslation();

  const getField = (field,song) => {
    return i18n.language === 'eng' ? song[field + 'English'] || song[field + 'Tibetan'] : song[field + 'Tibetan'];
  };
  

  useEffect(() => {
    const fetchTopSongs = async () => {
      const q = query(collection(db, 'songs'), orderBy('views', 'desc'), limit(10));
      const querySnapshot = await getDocs(q);
      const songsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTopSongs(songsData);
    };

    fetchTopSongs();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant='h3' gutterBottom>
        གླུ་གཞས་ལྟ་གྲངས་མང་ཤོས།
      </Typography>
      <Box display={'flex'} flexDirection={'column'} minWidth={'100%'}>
        {topSongs.map((song, index) => (
          <Link to={`/songs/${encodeURIComponent(song.id)}`} style={{textDecoration: 'none'}}  >
          <SyledCard key={song.id} variant="outlined">
            <Box sx={{ m: 3, width: '3%' }}>
              <Typography variant='h1' sx={{ fontSize: '3rem' }}>{index + 1}</Typography>
            </Box>
              <CardMedia
                component="img"
                alt={song.title}
                image={song.coverPhotoUrl}
                sx={{
                  aspectRatio: '8 / 6',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  width: '60px',
                  height: '60px',
                  m: '6px',
                }}
              />
            
            <SyledCardContent>
              <Typography gutterBottom variant="h6" component="div">
                {getField('title',song )}
              </Typography>
              <Typography gutterBottom variant="caption" component="div">
                {getField('artist',song)}
              </Typography>
            </SyledCardContent>
            {
            //<Author savedBy={song.savedBy} />
}           
            <Box sx={{flexDirection:'row',display:'flex',gap:1,alignItems:'center'}}>
            <Typography variant='body2' sx={{ ml: 2, color: 'text.secondary' }}>
              {song.views || 0} 
            </Typography>
            <VisibilityIcon sx={{pr:'10px'}}/>
            </Box>
          </SyledCard>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default TopSongs;