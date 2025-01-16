import React from 'react';
import { BrowserRouter as Router, Route, Routes,   } from 'react-router-dom';
import Home from './pages/Home';
import Contributor from './pages/Contributor';
import Artists from './pages/Artists';
import AboutUs from './pages/AboutUs';
import MenuComponent from './pages/MenuComponents';
import SongDetail from './pages/SongDetail';
import Songs from './pages/Songs';
import ArtistDetailPage from './pages/ArtistDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Footer from './pages/Footer';
import UserDashboard from './pages/UserDashboard';
import UploadSongForm from './pages/UploadSongForm';
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
            <Route path="/dashboard/*" element={<UserDashboard />} />
            <Route path="/contributor" element={<Contributor />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path='/songs' element={<Songs />}/>
            <Route path="/songs/:id" element={<SongDetail />} />
            <Route path="/artist/:singer" element={<ArtistDetailPage />}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/addsong' element={<UploadSongForm/>}/>
          </Routes>
        </Container>
        <Footer/>
      </AppTheme>
    </Router>
  );
}

export default App;
