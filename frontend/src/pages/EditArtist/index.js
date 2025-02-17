import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const db = getFirestore(); 
const EditArtist = () => {
    const { id } = useParams();
    const [artist, setArtist] = useState({
        dob: '',
        pob: '',
        bio: '',
        dobTibetan: '',
        pobTibetan: '',
        bioTibetan: ''
    });

    useEffect(() => {
        const fetchArtist = async () => {
            const artistRef = doc(db, 'artists', id);
            const artistSnap = await getDoc(artistRef);
            if (artistSnap.exists()) {
                setArtist(artistSnap.data());
            }
        };
        fetchArtist();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtist((prevArtist) => ({
            ...prevArtist,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const artistRef = doc(db, 'artists', id);
        await setDoc(artistRef, artist);
        alert('Artist updated successfully');
    };

    return (

        <Box type="submit" variant="contained" color="primary" display="flex" flexDirection="column" >
            <Box display="flex" alignItems={'flex-end'} gap={2}>
            <TextField
                    label="Date of Birth (Tibetan)"
                    variant="outlined"
                    name="dobTibetan"
                    type='date'
                    value={artist.dobTibetan}
                    onChange={handleChange}
                    required

            />
            <TextField
                    label="Date of Birth (English)"
                    variant="outlined"
                    name="dob"
                    value={artist.dob}
                    onChange={handleChange}
                    type='date'
                    
            />
            </Box>
            <Box display={'flex'} gap={2}>
            <TextField
                    label="Place of Birth (Tibetan)"
                    name="pobTibetan"
                    value={artist.pobTibetan}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
            <TextField
                    label="Place of Birth (English)"
                    variant="outlined"
                    name="pob"
                    value={artist.pob}
                    onChange={handleChange}
                    margin="normal"
                />
            </Box>
            
            <TextField
                    label="Bio (Tibetan)"
                    variant="filled"
                    name="bioTibetan"
                    value={artist.bioTibetan}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                 <TextField
                    label="Bio (English)"
                    variant="filled"
                    name="bio"
                    value={artist.bio}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={4}
                />  
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} sx={{width:'7rem',alignSelf:'flex-end'}}>
                Save
            </Button>
            </Box>
    );
};

export default EditArtist;
