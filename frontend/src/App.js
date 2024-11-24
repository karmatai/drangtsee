import React from 'react';
import { BrowserRouter as Router, Route, Routes,   } from 'react-router-dom';
import Home from './pages/Home';
import Songs from './pages/Songs';
import Artists from './pages/Artists';
import AboutUs from './pages/AboutUs';
import MenuComponent from './pages/MenuComponents';
import SongDetail from './pages/SongDetail';
import ArtistDetailPage from './pages/ArtistDetail';
import SignInPage from './pages/SignIn';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppTheme from './shared-theme/AppTheme';
import './App.css';
import './i18n'; 


function App(props) {
  return (
    <Router>
      <AppTheme {...props}>
        <MenuComponent/>
        <CssBaseline enableColorScheme />
        <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/songs/:title" element={<SongDetail />} />
            <Route path="/artist/:singer" element={<ArtistDetailPage />}/>
            <Route path='/signin' element={<SignInPage/>}/>
          </Routes>
        </Container>
      </AppTheme>
    </Router>
  );
}

export default App;
