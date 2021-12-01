import React from 'react'
import FormControl from '@material-ui/core/FormControl';
import { Input, InputLabel, makeStyles, MenuItem, Select, useTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

export default function CustomDropdown(props) {
    const classes = useStyles();
    const theme = useTheme();
    const data = props.datalist;

    const [item, setItem] = React.useState([]);

    const handleChange = (event) => {
        setItem(event.target.value);
    };


    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label"> { props.title } </InputLabel>
                <Select
                    variant='contained'
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple={props.multiple}
                    value={props.selectedItem}
                    onChange={props.handleChange}
                    input={<Input />}
                >
                    { data.length > 0 ? data.map((name) => (
                        <MenuItem key={name} value={name}>
                            {name}
                        </MenuItem> 
                    )): <></>}
                </Select>
            </FormControl>
        </div>
    )
}
