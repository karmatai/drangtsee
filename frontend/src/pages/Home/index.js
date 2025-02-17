import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';
import TopSongs from './TopSongs';
import { useTranslation } from 'react-i18next';






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
    <TopSongs/>
    </Box>
  );
}

export default Home;
