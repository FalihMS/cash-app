import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './title';
import { Paper } from '@mui/material';

interface ScorecardProps {
    title: string,
    number: string,
    info?: string
}
export default function Scorecard({ title, number, info }: ScorecardProps) {
    return (

        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 150,
            }}
        >
            <Title>{title}</Title>
            <Typography component="p" variant="h5">
                {number}
            </Typography>
            {
                info &&
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {info}
                </Typography>
            }
        </Paper>
    );
}
