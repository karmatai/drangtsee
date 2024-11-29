import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography,useMediaQuery, useTheme,  } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';

const latestLyrics = [
  { title: "༧གོང་ས་མཆོག་འཛམ་གླིང་གི་ཉི་མ།", singer: "ཨ་མཆོག་མགོན་པོ།", lyricist:"ཁ་སྒང་སྤྱན་འབངས།",  thumbnailurl:"http://img.youtube.com/vi/inzBJEM-ckA/hqdefault.jpg",composer:"ཡོན་ཏན་མགོན་པོ།",lyrics: "ནངས་སྔ་མོའི་སྐྱ་རེངས་ཀྱི་འཛུམ་གདངས། \n \
འཛུམ་མདངས་དེའི་ཁྲོད་ན། \n \
དད་སེམས་དང་གསོལ་འདེབས་དབྱངས་ལ་འགུག་བཞིན་ང་ཚོས། \n \
འཛམ་གླིང་གི་སེམས་དཔའ་ཆེན་མོའི་འཁྲུངས་སྐར་བསུ། \n \
༧གོང་ས་མཆོག་ལ་སྐུ་ཚེ་ཁྲི་ལོར་བརྟན་པར་ཤོག \n \
སྨོན་འདུན་དང་དགོད་སྒྲ་ངག་ལ་གྱེར་ནས། \n \
བོད་གཞིས་བྱེས་གཉིས་ནས་འཁྲུངས་སྐར་བསུ། \n \
ཨོ་ཧོ།  འཁྲུངས་སྐར་ལ་རྟེན་འབྲེལ་ཞུ། འཁྲུངས་སྐར་ལ་རྟེན་འབྲེལ་ཞུ། \n \
༧གོང་ས་རྒྱལ་བ་བསྟན་འཛིན་རྒྱ་མཚོ་ཡི། \n \
འཁྲུངས་སྐར་ལ་བཀྲ་ཤིས་སྨོན་འདུན་ཞུ། \n \
སྨོན་འདུན་ཞུ། \n \
ནངས་སྔ་མོའི་སྐྱ་རེངས་ཀྱི་འཛུམ་གདངས། \n \
འཛུམ་མདངས་དེའི་ཁྲོད་ན། \n \
ལྷ་བསང་དང་རླུང་རྟ་དགུང་ལ་གཏོར་བཞིན་ང་ཚོས། \n \
འཛམ་གླིང་གི་སེམས་དཔའ་ཆེན་མོའི་འཁྲུངས་སྐར་བསུ། \n \
༧གོང་ས་མཆོག་ལ་སྐུ་ཚེ་ཁྲི་ལོར་བརྟན་པར་ཤོག \n \
ཁ་གཡང་དང་ལྷ་དར་ལག་ལ་བཟུང་ནས། \n \
བོད་གཞིས་བྱེས་གཉིས་ནས་འཁྲུངས་སྐར་བསུ། \n \
ཨོ་ཧོ།  འཁྲུངས་སྐར་ལ་རྟེན་འབྲེལ་ཞུ། འཁྲུངས་སྐར་ལ་རྟེན་འབྲེལ་ཞུ། \n \
༧གོང་ས་རྒྱལ་བ་བསྟན་འཛིན་རྒྱ་མཚོ་ཡི། \n \
འཁྲུངས་སྐར་ལ་བཀྲ་ཤིས་སྨོན་འདུན་ཞུ། \n \
སྨོན་འདུན་ཞུ། \n \
ཨོ་ཧོ།  འཁྲུངས་སྐར་ལ་རྟེན་འབྲེལ་ཞུ། འཁྲུངས་སྐར་ལ་རྟེན་འབྲེལ་ཞུ། \n \
༧གོང་ས་རྒྱལ་བ་བསྟན་འཛིན་རྒྱ་མཚོ་ཡི། \n \
འཁྲུངས་སྐར་ལ་བཀྲ་ཤིས་སྨོན་འདུན་ཞུ། \n \
སྨོན་འདུན་ཞུ། \n \
འཁྲུངས་སྐར་ལ་བཀྲ་ཤིས་སྨོན་འདུན་ཞུ། \n \
སྨོན་འདུན་ཞུ།"},
{
  "title": "རང་མ་གཏོགས།",
  "singer": "ཚེ་དབང་ནོར་བུ།",
  "lyricist": "ཚེ་དབང་ནོར་བུ།",
  "composer": "ཚེ་དབང་ནོར་བུ།",
  "lyrics": "བསམ་རྒྱུ་རང་ལས་མི་འདུག  \n \
དྲན་རྒྱུ་རང་ལས་མི་འདུག  \n \
ཆུ་ཚོད་ཉི་ཤུ་རྩ་བཞི། སྐར་མ་ཆིག་སྟོང་བཞི་བརྒྱ་བཞི་བཅུ།  \n \
རང་གཅིག་པོ་ལས་མི་འདུག  \n \
ངའི་སྙིང་ཁང་ནི་ཁྱེད་རང་གཅིག་པོའི་གནས་ས་ཡིན།  \n \
ངའི་ལག་པ་ཁྱེད་རང་གཅིག་པོར་མ་གཏོགས་གཏོང་འདོད་མེད།  \n \
ངའི་རེ་བར་བུ་ཆུང་ཁྱེད་རང་མ་གཏོགས།  \n \
སུ་གང་མཉམ་དུ་སྐར་ཆ་གཅིག་ཀྱང་།  \n \
བསྡད་འདོད་མེད་ལ་འཚོ་བ་བསྐྱལ་འདོད་མེད།  \n \
ལས་དབང་དེ་ནི་ཆོ་ཚ་བ། རང་དང་འཕྲད་པ་དེ་གང་རེད།  \n \
བརྩེ་དུང་དེ་ནི་དགོད་བྲོ་བ། དང་ཐོག་དེ་འདྲ་མ་རེད།  \n \
རང་ནི་དེ་འདྲའི་ཤེས་དཀའ་བ། འཆར་གཞི་ག་རེ་ཡོད་མེད།  \n \
ང་གཉིས་བརྩེ་དུང་ནང་དིམ་ནས་ འཕུར་འགྲོ་འཕུར་འགྲོ  \n \
བསམ་རྒྱུ་རང་ལས་མི་འདུག  \n \
དྲན་རྒྱུ་རང་ལས་མི་འདུག  \n \
ཆུ་ཚོད་ཉི་ཤུ་རྩ་བཞི། སྐར་མ་ཆིག་སྟོང་བཞི་བརྒྱ་བཞི་བཅུ།  \n \
རང་གཅིག་པོ་ལས་མི་འདུག  \n \
རང་ཆེད་དུ་འཚོ་བ་བློས་བཏང་རུང་འགྱོད་པ་མེད།  \n \
རང་ཆེད་དུ་ཕུགས་བསམ་བློས་བཏང་རུང་འགྱོད་པ་མེད།  \n \
རང་ཆེད་དུ་ཡོད་ཚད་བློས་བཏང་རུང་།  \n \
ང་གཉིས་ལག་པ་བཏང་ནས།  \n \
མཉམ་དུ་འཚོ་བ་བསྐྱལ་རྒྱུའི་སེམས་ཤུགས་སེམས་ཤུགས་ཡོད།  \n \
དབུགས་བཏང་ དབུགས་བཏང་ \n \
རང་མཉམ་དུ་དབུགས་བཏང་། \n \
རང་མཉམ་དུ་འཚོ་བ་བསྐྱལ་རྒྱུའི་སེམས་ཤུགས་ཡོད། \n \
ངའི་སྙིང་ཁང་ནི་ཁྱེད་རང་གཅིག་པོའི་གནས་ས་ཡིན། \n \
ངའི་ལག་པ་ཁྱེད་རང་གཅིག་པོར་མ་གཏོགས་གཏོང་འདོད་མེད། \n \
ངའི་རེ་བར་བུ་ཆུང་ཁྱེད་རང་མ་གཏོགས། \n \
སུ་གང་མཉམ་དུ་སྐར་ཆ་གཅིག་ཀྱང་། \n \
བསྡད་འདོད་མེད་ལ་འཚོ་བ་བསྐྱལ་འདོད་མེད"}
,

  {
    "title": "སེམས་ཀྱི་མེ་ཏོག",
    "singer": "གཤེར་བརྟེན།",
    composer: "གཤེར་བརྟེན།",
    lyricist: "གཤེར་བརྟེན།",
    "lyrics": "ངའི་མེ་ཏོག  ངའི་སྙིང་སྡུག \n \
ཞལ་རས་དུང་གི་ཟླ་བ་རེད། \n \
ཟླ་་བ་རེད། ཟླ་བ་ལྷ་མོའི་འཛུམ། \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག \n \
དུས་གསུམ་ཀུན་གྱི་བདག་མོ་རེད། \n \
བདག་མོ་རེད་དབྱངས་ཅན་ལྷ་མོའི་ཉམས། \n \
ཨོ། \n \
མེ་ཏོག་དམར་པོ་ལས་སྐལ་རེད། \n \
ཨོ། \n \
སྒྲོལ་མ་དཀར་མོའི་མགུར་དབྱངས་རེད། \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག \n \
ངའི་མེ་ཏོག \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག \n \
ཐུལ་དཀར་འབྲི་མོའིེ་བཞོ་དབྱངས་རེད། \n \
བཞོ་དབྱངས་རེད། དགོ་དགོ་ངག་གི་གདངས། \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག \n \
འབྲུ་དྲུག་ཞིང་གི་བདག་མོ་རེད། \n \
བདག་མོ་རེད། གསེར་མདོག་སྙེ་མའི་རླབས། \n \
ཨོ། \n \
དབྱར་གཞུང་ཐང་གི་མེ་ཏོག་རེད། \n \
ཨོ། \n \
གངས་དཀར་ཨ་མའི་འཛུམ་གདངས་རེད། \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག \n \
ངའི་མེ་ཏོག \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག \n \
ངའི་མེ་ཏོག \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག \n \
བརྕེ་བ་གངས་ཀྱི་འདབ་མ་རེད། \n \
འདབ་མ་རེད། དུང་མདོག་ཁ་བའི་བརྒྱན། \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག \n \
དུང་བ་མཚོ་བའི་སྤང་རྒྱན་རེད། \n \
སྤང་རྒྱན་རེད། ཆུང་གྲོགས་བྱམས་པའི་མདངས། \n \
ཨོ། \n \
སྙིང་གཅེས་སེམས་ཀྱི་མི་ཏོག་རེད། \n \
ཨོ། \n \
རང་འབྱུང་ངག་གི་མཆོད་པ་རེད། \n \
ངའི་མེ་ཏོག ངའི་སྙིང་སྡུག"
  }  
];

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
  const { title } = useParams();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  // Find the song by its title
  const song = latestLyrics.find(song => song.title === decodeURIComponent(title));
  
  if (!song) {
    return <h2>Song not found!</h2>;
  }
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Grid container spacing={2} columns={12} width={'100%'} justifyContent={'center'}>
      {isSmallScreen ? (
        <>
          <Grid item xs={12}>
            <Typography variant='h1' gutterBottom>{song.title}</Typography>
          </Grid>
          <Grid item xs={6}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={song.thumbnailurl}
              sx={{
                aspectRatio: '1 / 1',
                width: '10rem',
                height: 'auto',
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" gap={1}>
              <Typography variant='body2' gutterBottom>{song.singer}</Typography>
              <Typography variant='body2' gutterBottom>{song.composer}</Typography>
              <Typography variant='body2' gutterBottom>ཁོར་ཐག</Typography>
            </Box>
          </Grid>
        </>
      ) : (
        <>
          <Grid item md={3}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={song.thumbnailurl}
              sx={{
                aspectRatio: '1 / 1',
                width: '10rem',
                height: 'auto',
              }}
            />
          </Grid>
          <Grid item md={9}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography variant='h1' gutterBottom>{song.title}</Typography>
              <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                <Typography variant='body2' gutterBottom>{song.singer}</Typography>
                <Typography variant='body2' gutterBottom>{song.composer}</Typography>
                <Typography variant='body2' gutterBottom>ཁོར་ཐག</Typography>
              </Box>
            </Box>
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <Paper align="center" 
        sx={{ py: 5,
        minWidth: { xs: '20rem', sm: '30rem', md: '40rem' }, 
        minHeight: '60rem',
        display: 'flex', 
        flexDirection: 'column', justifyContent: 'space-between' }}>
          <CustomTabPanel value={value} index={0}>
            {song.lyrics.split('\n').map((line, index) => (
              <Typography variant='body2' fontSize={30} gutterBottom={true} key={line}>{line}</Typography>
            ))}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <Typography variant='body2' fontSize={30} gutterBottom={true} >དོན་བརྙེད་མ་སོང་། དོན་གསར་པ་ཆུག</Typography>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
          <Typography variant='body2' fontSize={30} gutterBottom={true} >དོན་བརྙེད་མ་སོང་། དོན་གསར་པ་ཆུག</Typography>
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
  </Box>

    
   
  );
}

export default SongDetail;
