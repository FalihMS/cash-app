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
import { useRouter } from "next/router";
import DialogContentText from "@mui/material/DialogContentText";

export default function ProfilePage() {

    const supabaseClient = useSupabaseClient()
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
            <AddFormDialog supabaseClient={supabaseClient} openDialog={openDialog} setOpenDialog={setOpenDialog} />
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
      const [openEditDialog, setOpenEditDialog] = React.useState(false);
      const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
      React.useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('category').select('*')
            setData(data)

            
        }
        // Only run query once user is logged in.
        loadData()
    }, [])

    const handleOpenEditDialog = (key: any) => {
        const {id, priority, type, name } = data[key]
        setValue({id, priority, type, name,})
        setOpenEditDialog(true)
    }
    const handleOpenDeleteDialog = (key: any) => {
        const {id, priority, type, name } = data[key]
        setValue({id, priority, type, name,})
        setOpenDeleteDialog(true)
    }
    return (
        <Box sx={{ mx: { md: '25px' } }}>
            <List>
                {
                    data.map((item: any, key: any) => (
                        <ListItem>
                            <ListItemText primary={item.name} secondary={`Priority: ${item.priority}`} />
                            <Box sx={{ mr: { sm: '5px', md: '15px' } }}>
                                <IconButton onClick={(e) => handleOpenEditDialog(key)} edge="end" aria-label="delete" sx={{ mr: '5px' }}>
                                    <EditOutlinedIcon />
                                </IconButton>
                                <IconButton onClick={e => handleOpenDeleteDialog(key)} edge="end" aria-label="delete">
                                    <DeleteOutlineOutlinedIcon />
                                </IconButton>
                            </Box>
                        </ListItem>
                    ))

                }
            </List>
            <EditFormDialog supabaseClient={supabaseClient} initialValue={value} openDialog={openEditDialog} setOpenDialog={setOpenEditDialog} />
            <DeleteFormDialog supabaseClient={supabaseClient} openDialog={openDeleteDialog} initialValue={value} setOpenDialog={setOpenDeleteDialog} />

        </Box>
    )
}

export function AddFormDialog({ supabaseClient, openDialog, setOpenDialog }: any) {
    const router = useRouter()
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
            supabaseClient
                .from('category')
                .insert(values)
                .then((res: { error: any; }) =>{
                    if(!res.error)
                    router.reload()
                })
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

export function EditFormDialog({ supabaseClient, initialValue, openDialog, setOpenDialog }: any) {
    const router = useRouter()
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
            supabaseClient
            .from('category')
            .update(values)
            .eq('id', values.id)
            .then((res: { error: any; }) =>{
                if(!res.error)
                router.reload()
            })
        },
      });

    React.useEffect(()=>{
        if(openDialog){
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
export function DeleteFormDialog({ supabaseClient, initialValue, openDialog, setOpenDialog }: any) {
    const router = useRouter()
    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleDelete = () => {
        supabaseClient
        .from('category')
        .delete()
        .eq('id', initialValue.id)
        .then((res: { error: any; }) =>{
            if(!res.error)
            router.reload()
        })
    }
    return (
        <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="xs">
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are You Sure Want to Delete the Item?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
        </Dialog>
    );
}

