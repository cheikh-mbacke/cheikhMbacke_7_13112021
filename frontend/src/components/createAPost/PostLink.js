import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
export default function PostLink() {

    return (
        <Container sx={{textAlign: 'center', pt: 3}}>
            <form >
            <Box sx={{mb: 2}}>
                <TextField fullWidth id="outlined-basi" label="Titre" variant="outlined" />
            </Box>
            <Box sx={{mb: 2}}>
                <TextField fullWidth id="outlined-basic" label="URL" variant="outlined" />
            </Box>
            <Button type="submit" variant="contained" sx={{width: '32ch', mb: 2, bg: "#fff"}} size="large">
                Poster
            </Button>
            </form>
        </Container>
    )
}
