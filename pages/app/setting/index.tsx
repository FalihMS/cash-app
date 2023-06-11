import React from "react";

import AppShell from "../../../components/common/appShell";

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import * as yup from 'yup';
import { useFormik } from 'formik';
import FormHelperText from "@mui/material/FormHelperText";

export default function ProfilePage() {

    const [openDialog, setOpenDialog] = React.useState(false);

    return (
        <AppShell page={'Setting'}>
            <PrimaryListItem />

            <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab onClick={() => setOpenDialog(true)} color='primary' style={{ margin: 0, top: 'auto', right: '1.5rem', bottom: '2.5rem', left: 'auto', position: 'fixed', }} variant="extended">
                    <AddIcon sx={{ mr: 1 }} />
                    Add Category
                </Fab>
            </Box>
            <AddFormDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </AppShell>
    )
}
// Main List Item
function PrimaryListItem({  }: any) {

    const supabaseClient = useSupabaseClient()
    const [data, setData]: React.SetStateAction<any> = React.useState([])
    
    const [value, setValue] = React.useState({
        id: '',
        priority: '',
        type: '',
        name: '',
      });
    const [openDialog, setOpenDialog] = React.useState(false);
    React.useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('category').select('*')
            console.log(data)
            setData(data)
        }
        // Only run query once user is logged in.
        loadData()
    }, [])

    const openEditDialog = (key: any) => {
        const {id, priority, type, name } = data[key]
        setValue({id, priority, type, name,})
        setOpenDialog(true)
    }
    return (
        <Box sx={{ mx: { md: '25px' } }}>
            <List>
                {
                    data.map((item: any, key: any) => (
                        <ListItem>
                            <ListItemText primary={item.name} secondary={`Priority: ${item.priority}`} />
                            <Box sx={{ mr: { sm: '5px', md: '15px' } }}>
                                <IconButton onClick={(e) => openEditDialog(key)} edge="end" aria-label="delete" sx={{ mr: '5px' }}>
                                    <EditOutlinedIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteOutlineOutlinedIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))

                }
            </List>
            <EditFormDialog initialValue={value} openDialog={openDialog} setOpenDialog={setOpenDialog} />

        </Box>
    )
}

export function AddFormDialog({ openDialog, setOpenDialog }: any) {
    const [initVal, setInitVal] = React.useState({
        priority: '',
        type: '',
        name: '',
      })
    const handleClose = () => {
        formik.resetForm()
        setOpenDialog(false);
    };

    const validationSchema = yup.object({
        type: yup
          .string()
          .required('Type cannot be empty'),
        priority: yup
          .string()
          .required('Priority cannot be empty'),
        name: yup
          .string()
          .required('Name cannot be empty'),
      });
    
      const formik = useFormik({
        initialValues: initVal,
        validationSchema: validationSchema, 
        onSubmit: values => {
            console.log('passed')
        },
      });

    return (
        <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="xs">
            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                <DialogTitle>New Category</DialogTitle>
                <DialogContent>
                   <FormControl error={formik.touched.priority && Boolean(formik.errors.priority)} fullWidth sx={{ my: 1 }}>
                        <InputLabel id="demo-simple-select-label">Tipe</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.priority}
                            label="Tipe"
                            onChange={e => formik.setFieldValue('priority', e.target.value)}
                        >
                            <MenuItem value={'1'}>1</MenuItem>
                            <MenuItem value={'2'}>2</MenuItem>
                            <MenuItem value={'3'}>3</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.priority && formik.errors.priority}</FormHelperText>
                    </FormControl>
                    <FormControl error={formik.touched.type && Boolean(formik.errors.type)} fullWidth sx={{ my: 1 }}>
                        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.type}
                            label="Kategori"
                            onChange={e => formik.setFieldValue('type', e.target.value)}
                        >
                            <MenuItem value={'Pemasukan'}>Pemasukan</MenuItem>
                            <MenuItem value={'Pengeluaran'}>Pengeluaran</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 1 }}>
                        <TextField
                            autoFocus
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth                            
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add New</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

export function EditFormDialog({ initialValue, openDialog, setOpenDialog }: any) {
    const [initVal, setInitVal] = React.useState({
        id: '',
        priority: '',
        type: '',
        name: '',
      })
    const handleClose = () => {
        formik.resetForm()
        setOpenDialog(false);
    };

    const validationSchema = yup.object({
        type: yup
          .string()
          .required('Type cannot be empty'),
        priority: yup
          .string()
          .required('Priority cannot be empty'),
        name: yup
          .string()
          .required('Name cannot be empty'),
      });
    
      const formik = useFormik({
        initialValues: initVal,
        validationSchema: validationSchema, 
        onSubmit: values => {
            console.log('passed')
        },
      });

    React.useEffect(()=>{
        if(openDialog){
            console.log(initialValue)
            formik.setValues(initialValue)
        }
    }, [openDialog])
    return (
        <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="xs">
            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent>
                   <FormControl error={formik.touched.priority && Boolean(formik.errors.priority)} fullWidth sx={{ my: 1 }}>
                        <InputLabel id="demo-simple-select-label">Tipe</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.priority}
                            label="Tipe"
                            onChange={e => formik.setFieldValue('priority', e.target.value)}
                        >
                            <MenuItem value={'1'}>1</MenuItem>
                            <MenuItem value={'2'}>2</MenuItem>
                            <MenuItem value={'3'}>3</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.priority && formik.errors.priority}</FormHelperText>
                    </FormControl>
                    <FormControl error={formik.touched.type && Boolean(formik.errors.type)} fullWidth sx={{ my: 1 }}>
                        <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.type}
                            label="Kategori"
                            onChange={e => formik.setFieldValue('type', e.target.value)}
                        >
                            <MenuItem value={'Pemasukan'}>Pemasukan</MenuItem>
                            <MenuItem value={'Pengeluaran'}>Pengeluaran</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.type && formik.errors.type}</FormHelperText>
                    </FormControl>
                    <FormControl fullWidth sx={{ my: 1 }}>
                        <TextField
                            autoFocus
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth                            
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Save</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}

