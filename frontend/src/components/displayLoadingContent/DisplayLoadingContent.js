import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useState } from 'react';

export default function DisplayLoadingContent(props) {

    const [toggle, setToggle] = useState(false);

        setTimeout(() => {
        setToggle(true)

    }, 2000)

    return (
        <Box>
            {toggle ? props.children : <Container >{props.loadingContent}</Container>}
        </Box>
    )
}
