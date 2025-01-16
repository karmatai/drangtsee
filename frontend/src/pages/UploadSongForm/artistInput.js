import React, { useState,useEffect } from 'react';
import { TextField, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import {  collection, addDoc,  query, where, getDocs,getFirestore } from 'firebase/firestore';


const db = getFirestore();

const ArtistInput = ({ labelTibetan, labelEnglish, nameTibetan, nameEnglish, valueTibetan, valueEnglish, onChange, onSave }) => {
  const [open, setOpen] = useState(false);
  const [newArtistTibetan, setNewArtistTibetan] = useState('');
  const [newArtistEnglish, setNewArtistEnglish] = useState('');
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    if (open && !addingNew) {
      const searchArtists = async () => {
        const q = query(collection(db, 'artists'), where(searchField === 'tibetan' ? 'nameTibetan' : 'nameEnglish', '==', searchValue));
        const querySnapshot = await getDocs(q);
        const matches = [];
        querySnapshot.forEach((doc) => {
          matches.push({ id: doc.id, ...doc.data() });
        });
        setFilteredArtists(matches);
      };
      searchArtists();
    }
  }, [open, searchField, searchValue, addingNew]);

  const handleOpen = (field) => {
    setSearchField(field);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddingNew(false);
  };

  const handleAddNewArtist = async () => {
    const docRef = await addDoc(collection(db, 'artists'), {
      nameTibetan: newArtistTibetan,
      nameEnglish: newArtistEnglish
    });
    onSave({ id: docRef.id, nameTibetan: newArtistTibetan, nameEnglish: newArtistEnglish });
    setNewArtistTibetan('');
    setNewArtistEnglish('');
    handleClose();
  };

  const handleSelectArtist = (artist) => {
    onSave(artist);
    handleClose();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (searchField === 'tibetan') {
      onChange({ target: { name: nameTibetan, value } });
    } else {
      onChange({ target: { name: nameEnglish, value } });
    }
  };

  return (
    <Box>
      <TextField
        label={labelTibetan}
        name={nameTibetan}
        value={valueTibetan}
        onChange={onChange}
        onClick={() => handleOpen('tibetan')}
        required
        sx={{ width: '40%' }}
        variant="filled"
      />
      <TextField
        label={labelEnglish}
        name={nameEnglish}
        value={valueEnglish}
        onChange={onChange}
        onClick={() => handleOpen('english')}
        sx={{ width: '40%' }}
        variant="filled"
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{addingNew ? 'Add New Artist' : 'Select or Add Artist'}</DialogTitle>
        <DialogContent>
          {addingNew ? (
            <>
              <TextField
                autoFocus
                margin="dense"
                label="Artist Name (Tibetan)"
                type="text"
                fullWidth
                variant="standard"
                value={newArtistTibetan}
                onChange={(e) => setNewArtistTibetan(e.target.value)}
                required
              />
              <TextField
                margin="dense"
                label="Artist Name (English)"
                type="text"
                fullWidth
                variant="standard"
                value={newArtistEnglish}
                onChange={(e) => setNewArtistEnglish(e.target.value)}
              />
            </>
          ) : (
            <>
              <TextField
                label={searchField === 'tibetan' ? labelTibetan : labelEnglish}
                value={searchValue}
                onChange={handleChange}
                fullWidth
                variant="filled"
              />
              {filteredArtists.length > 0 ? (
                <List>
                  {filteredArtists.map((artist) => (
                    <ListItem button onClick={() => handleSelectArtist(artist)} key={artist.id}>
                      <ListItemText primary={`${artist.nameTibetan} / ${artist.nameEnglish}`} />
                    </ListItem>
                  ))}
                  <ListItem button onClick={() => setAddingNew(true)}>
                    <ListItemText primary="Add New Artist" />
                  </ListItem>
                </List>
              ) : (
                <Button onClick={() => setAddingNew(true)}>Add New Artist</Button>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {addingNew && <Button onClick={handleAddNewArtist}>Save</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ArtistInput;