import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';

import Drawer from '@mui/material/Drawer';
import { MainListItem, SecondaryListItems } from '../../../components/listItems';

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Container, FormControl, InputLabel, ListItem, ListItemText, ListSubheader, MenuItem, Select, SelectChangeEvent, Tab, Tabs } from '@mui/material';

import { useSupabaseClient } from '@supabase/auth-helpers-react'

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

let USDollar = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
});

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),

}));

function getWeekOfMonth(date: Date) {
    let adjustedDate = date.getDate()+ date.getDay();
    let prefixes = ['0', '1', '2', '3', '4', '5'];
    return (parseInt(prefixes[0 | adjustedDate / 7])+1);
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
    
    const supabaseClient = useSupabaseClient()
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [data, setData]: React.SetStateAction<any> = React.useState([])

    React.useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('transaction').select('created_at, kategori (name, type), deskripsi, total').order('created_at', { ascending: true })
            setData(data)
        }
        // Only run query once user is logged in.
        loadData()
    }, [])

    if (data == null) return <></>

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Transaction
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" variant="temporary" open={open} onClose={toggleDrawer}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <MainListItem />
                    <Divider />
                        <SecondaryListItems />
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <List>
                            <ListSubheader
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[100]
                                            : theme.palette.grey[900],
                                }}
                            >
                                Transaction List
                            </ListSubheader>
                            {
                                data.map((transaction: any)=> (
                                    <>
                                        <ListItem secondaryAction={<Typography color={transaction.kategori.type == 'Pemasukan' ? 'green' : 'red' }>{USDollar.format(transaction.total)}</Typography>}>
                                            <ListItemText 
                                                primary={moment(transaction.created_at).format('DD/MM/YYYY, h:mm:ss a')} 
                                                secondary={
                                                    <>
                                                        <p>{`${transaction.deskripsi} (${transaction.kategori.name})`}</p>
                                                    </>
                                                } />
                                        </ListItem>
                                        <Divider />
                                    </>
                                ))
                            }
                        </List>
                        <Box sx={{ '& > :not(style)': { m: 1 } }}>
                            <Fab onClick={() => setOpenDialog(true)} color='primary' style={{ margin: 0, top: 'auto', right: '1.5rem', bottom: '2.5rem', left: 'auto', position: 'fixed', }} variant="extended">
                                <EditIcon sx={{ mr: 1 }} />
                                Make Transaction
                            </Fab>
                        </Box>
                    </Container>
                </Box>
            </Box>
            <FormDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </ThemeProvider>
    );
}

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import moment from 'moment';

export function FormDialog({ openDialog, setOpenDialog }: any) {
    const [age, setAge] = React.useState('');
    const handleClose = () => {
        setOpenDialog(false);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };
    return (
        <div>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>New Transaction</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ my: 1 }}>
                        <InputLabel id="demo-simple-select-label">Tipe</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Tipe"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 1 }}>
                        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Kategori"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 1 }}>
                        <TextField
                            autoFocus
                            id="description"
                            label="Description"
                            type="description"
                            fullWidth
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}