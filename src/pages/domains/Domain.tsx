import { AppBar, Box, Button, Checkbox, Container, CssBaseline, Dialog, DialogContent, DialogTitle, FormControlLabel, IconButton, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateDomain, GetAllDomains, GetDomainbycode, RemoveDomain, UpdateDomain } from "./DomainActions";
import { connect, useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close"
import { OpenPopup } from "../../redux/Action";

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from "react-router-dom";

 export interface Domain{
    id:     string;
    key:    string;
    name:   string;
    type:   string;
}

export interface DomainState {
    isloading: Boolean;
    errormessage:string;
    domainlist: Domain[];
    domainobj:Domain;
};

interface DomainProps {
    domainstate:DomainState;
    loaddomain:() => void;
};

const Domain  = (props:DomainProps) => {

    const fixedAppBarHeight = 68;

    const columns = [
        { id: 'id', name: 'Id' },
        { id: 'name', name: 'Name' },
        { id: 'key', name: 'Key' },
        { id: 'type', name: 'Domain Type' },
        { id: 'action', name: 'Action' }
    ]

    const dispatch:any = useDispatch();

    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [key, setKey] = useState<string>('');
    const [type, setType] = useState<string>('private');
    const [open, setOpen] = useState<boolean>(false);
    // const [agreeterm, agreetermchange] = useState<Boolean>(true);

    const [rowperpage, rowperpagechange] = useState<number>(5);
    const [page, pagechange] = useState<number>(0);

    const [isedit, iseditchange] = useState<boolean>(false);
    const [title, titlechange] = useState<string>('Create domain');

    const editobj = useSelector((state: { domain: DomainState }) => state.domain.domainobj);

    useEffect(() => {
        if (Object.keys(editobj).length > 0) {
            setId(editobj.id);
            setName(editobj.name);
            setKey(editobj.key);
            setType(editobj.type);
        } else {
            clearstate();
        }

    }, [editobj])

    const handlepagechange = (event:React.MouseEvent<HTMLButtonElement>| null, newpage:number) => {
        pagechange(newpage);
    }

    const handlerowperpagechange = (event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        rowperpagechange(+event.target.value);
        pagechange(0);
    }

    const functionadd = () => {
        iseditchange(false);
        titlechange('Create domain');
        openpopup();
    }
    const closepopup = () => {
        setOpen(false);
    }
    const openpopup = ():any => {
        setOpen(true);
        clearstate();
        dispatch(OpenPopup())
    }
    const handlesubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _obj = { id, name, key, type };
        if (isedit) {
            dispatch(UpdateDomain(_obj));
        } else {
            dispatch(CreateDomain(_obj));
        }
        closepopup();
    }

    const handleEdit = (code:string) => {
        iseditchange(true);
        titlechange('Update domain');
        setOpen(true);
        dispatch(GetDomainbycode(code))
    }

    const handleRemove = (code:string) => {
        if (window.confirm('Do you want to remove?')) {
            dispatch(RemoveDomain(code));
        }
    }

    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
      console.log(path)
      navigate('/Builder/'+path);
      //handleCloseNavMenu();
    };


    const clearstate = () => {
        setId('');
        setName('');
        setKey('');
        setType('private');
    }
    useEffect(() => {
        props.loaddomain();
    }, [])
    return (

        <>
        <CssBaseline />

        <AppBar position="static" style={{ marginTop: fixedAppBarHeight }}>
          <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
            <Typography variant="subtitle1" noWrap component="div">
              Builder - Domains
            </Typography>
            <Box>
                <Button
                  variant="outlined"
                  sx={{
                    //backgroundColor: '#1769aa', // Set the button's background color to black
                    color: 'white', // Set the text color to white for contrast
                    '&:hover': {
                      backgroundColor: '#2196f3', // Optional: Change on hover
                    },
                  }}
                  startIcon={<MenuIcon />} // Use startIcon for leading icon, endIcon for trailing icon
                  onClick={() => handleNavigate("")}
                >
                  Go to Entities
                </Button>
                <Button
                variant="outlined"
                sx={{
                    //backgroundColor: '#1769aa', // Set the button's background color to black
                    color: 'white', // Set the text color to white for contrast
                    '&:hover': {
                    backgroundColor: '#2196f3', // Optional: Change on hover
                    },
                }}
                startIcon={<AddIcon />} // Use startIcon for leading icon, endIcon for trailing icon
                onClick={functionadd}
                >
                New domain
                </Button>
            </Box>
          </Toolbar>
        </AppBar>
{
        props.domainstate.isloading ? <div><h2>Loading.....</h2></div> :
        props.domainstate.errormessage ? <div><h2>{props.domainstate.errormessage}</h2></div> :
        <Container maxWidth="xl" sx={{ mt: '20px' }}>

                
                    <div>
                        <Paper sx={{ margin: '1%' }}>
                            {/* <div style={{ margin: '1%' }}>
                                <Button onClick={functionadd} variant="contained">Add New (+)</Button>
                            </div> */}
                            <div style={{ margin: '1%' }}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow style={{ backgroundColor: 'midnightblue' }}>
                                                {columns.map((column) =>
                                                    <TableCell key={column.id} style={{ color: 'white' }}>{column.name}</TableCell>
                                                )}
                                    </TableRow>

                                        </TableHead>
                                        <TableBody>
                                        {props.domainstate.domainlist &&
                                                props.domainstate.domainlist
                                                    .slice(page * rowperpage, page * rowperpage + rowperpage)
                                                    .map((row, i) => {
                                                        //console.log(typeof row.id, row.id);
                                                        return (
                                                            <TableRow key={i}>
                                                                <TableCell>{row.id}</TableCell>
                                                                <TableCell>{row.name}</TableCell>
                                                                <TableCell>{row.key}</TableCell>
                                                                <TableCell>{row.type}</TableCell>
                                                                <TableCell>
                                                                    <Button onClick={e => { handleEdit(row.id) }} variant="contained" color="primary">Edit</Button>
                                                                    <Button onClick={e => { handleRemove(row.id) }} variant="contained" color="error">Delete</Button>

                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    })
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[2, 5, 10, 20]}
                                    rowsPerPage={rowperpage}
                                    page={page}
                                    count={props.domainstate.domainlist.length}
                                    component={'div'}
                                    onPageChange={handlepagechange}
                                    onRowsPerPageChange={handlerowperpagechange}
                                >

                                </TablePagination>
                            </div>
                        </Paper>

                        <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm" PaperProps={{ style: { zIndex: 1300 } }}>
                            <DialogTitle>
                                <span>{title}</span>
                                <IconButton style={{ float: 'right' }} onClick={closepopup}><CloseIcon color="primary"></CloseIcon></IconButton>
                            </DialogTitle>
                            <DialogContent>
                                <form onSubmit={handlesubmit}>
                                    <Stack spacing={2} margin={2}>
                                        <TextField required error={name.length === 0} value={name} onChange={e => { setName(e.target.value) }} variant="outlined" label="Name"></TextField>
                                        <TextField required error={key.length === 0} value={key} onChange={e => { setKey(e.target.value) }} variant="outlined" label="Key"></TextField>
                                        <RadioGroup value={type} onChange={e => { setType(e.target.value) }} row>
                                            <FormControlLabel value="public" control={<Radio color="success"></Radio>} label="Public"></FormControlLabel>
                                            <FormControlLabel value="private" control={<Radio></Radio>} label="Private"></FormControlLabel>
                                        </RadioGroup>
                                        <Button variant="contained" type="submit">Submit</Button>
                                    </Stack>
                                </form>
                            </DialogContent>
                        </Dialog>

                    </div>
            </Container> }
            </>
    );
}

const mapStatetoProps = (state:{domain:DomainState}) => {
    return {
        domainstate: state.domain
    }
}

const mapDispatchtoProps = (dispatch:any) => {
    return {
        loaddomain: () => dispatch(GetAllDomains())
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Domain);