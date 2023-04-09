import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ThemeProvider, Typography, createTheme } from '@mui/material';


export default function BasicTable(props){
    const {rows, headers} = props
    const darkTheme = createTheme({palette: {mode: 'dark'}});
    const msg = `abc${10}`
    return (
        <ThemeProvider theme={darkTheme}>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {
                            headers.map((header) => (
                                <TableCell key={header} align='center'><Typography variant='h6' fontFamily='monospace'>{header}</Typography></TableCell>
                            ))
                        }
                    {/* <TableCell align='center'><Typography variant='h6' fontFamily='monospace'>File Name</Typography></TableCell>
                    <TableCell align='center'><Typography variant='h6' fontFamily='monospace'>File Type</Typography></TableCell>
                    <TableCell align='center'><Typography variant='h6' fontFamily='monospace'>File Size</Typography></TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody key={"tab_bdy"} >
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell key={`Name_${row.name}_name`} align='center'><Typography fontFamily='monospace'>{row.name}</Typography></TableCell>
                        <TableCell key={`Type_${row.name}_type`} align='center'><Typography fontFamily='monospace'>{row.type}</Typography></TableCell>
                        <TableCell key={`Size_${row.name}_size`} align='center'><Typography fontFamily='monospace'>{(row.size/1000000) >> 0}MB</Typography></TableCell>
                        {row.status && <TableCell key={row.name} align='center'><Typography fontFamily='monospace'>{row.status}</Typography></TableCell>}
                        </TableRow>
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </ThemeProvider>
        
    )
} 