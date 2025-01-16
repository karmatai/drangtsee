import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import  latestLyrics  from '../latestLyrics';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import {  styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';


const cardData = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    tag: 'Engineering',
    title: 'Revolutionizing software development with cutting-edge tools',
    description:
      'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    tag: 'Product',
    title: 'Innovative product features that drive success',
    description:
      'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
    authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=3',
    tag: 'Design',
    title: 'Designing for the future: trends and insights',
    description:
      'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
    authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=4',
    tag: 'Company',
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    tag: 'Engineering',
    title: 'Pioneering sustainable engineering solutions',
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=6',
    tag: 'Product',
    title: 'Maximizing efficiency with our latest product updates',
    description:
      'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
    authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
  },
];

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



const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
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

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

function Home() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const navigate = useNavigate();
  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleAddSong =() => {
    navigate('/addsong');
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <div>
        <Typography variant="h1" gutterBottom>
        སྦྲང་ཚང་།
        </Typography>
        <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <Typography>ཁ་བ་རི་པའི་གླུ་གར་གྱི་གར་སྟེགས་ལ་འཕེབས་པ་དགའ་བསུ་བཞུ།</Typography>
        <Typography alignSelf={'end'} variant='caption' sx={{display:{xs:'flex',sm:'none'}}} onClick={handleAddSong}>Add a song</Typography>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
            justifyItems:'flex-end'
          }}
        >
        <Typography alignSelf={'end'} variant='caption' sx={{textDecoration:'underline'}} onClick={handleAddSong}>Add a song</Typography>
        <Search />  
        </Box>
        </Box> 
    </div>
    <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
    </Box>
    <Typography variant='h3' gutterBottom>
      གླུ་གཞས་ལྟ་གྲངས་མང་ཤོས།
    </Typography> 
    <Box display={'flex'} flexDirection={'column'} minWidth={'100%'}>
      {//<Grid container spacing={2} >
      }
      {latestLyrics.map((song, index) => (
        //<Grid item key={index} size={{ xs: 12, md: 6, lg:4 }}>
          
          <SyledCard
            variant="outlined"
            onFocus={() => handleFocus(0)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
            
          >
            <Box sx={{m:3,width:'3%'}} >
              <Typography variant='h1' sx={{fontSize:'3rem'}}>{index+1}</Typography>
            </Box>
            
            <Link
              to={`/songs/${encodeURIComponent(song.title)}`}
              style={{ textDecoration: 'none' }} // Remove default link styles
            >
            <CardMedia
              component="img"
              alt="green iguana"
              image={song.thumbnailurl}
              alignItems="center"
              sx={{
                aspectRatio: '8 / 6',
                borderBottom: '1px solid',
                borderColor: 'divider',
                width:'60px',
                height:'60px',
                alignItems:'center',
                justifyContent:'center',
                m:'6px',
              }}
            />
            </Link>
            <SyledCardContent >
             
              <Typography gutterBottom variant="h6" component="div">
                {song.title}
              </Typography>
              <Typography gutterBottom variant="caption" component="div">
                {song.singer}
              </Typography>
            </SyledCardContent>
            <Author authors={cardData[index].authors} />
          </SyledCard>  
        //</Grid>
        
        ))}
      </Box>
      
      {//</Grid>
      }
    </Box>
  );
}

export default Home;
