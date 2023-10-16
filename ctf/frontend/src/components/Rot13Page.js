import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import red from '@material-ui/core/colors/red';

const GrayTextTypography = withStyles({
    root: {
        color: "#D5D5D5"
    }
})(Typography);


export default class Rot13Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            output: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        var transform = "";
        for(var char in event.target.value) {
            if (event.target.value[char].match(/[a-z]/i)) {
                if(event.target.value.charCodeAt(char) <= 90) {
                    transform += String.fromCharCode(65 + ((event.target.value.charCodeAt(char) - 52) % 26));
                }
                else {
                    transform += String.fromCharCode(97 + ((event.target.value.charCodeAt(char) - 84) % 26));
                }
            }
            else {
                transform += event.target.value[char];
            }
        }
        this.setState({
            input: event.target.value,
            output: transform
        });
    }

    render () {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <GrayTextTypography component="h2" variant="h2">
                        ROT13
                    </GrayTextTypography>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        multiline
                        fullWidth
                        id="inputField"
                        rows="5"
                        variant="outlined"
                        placeholder="Jul qvq gur puvpxra pebff gur ebnq?" 
                        onChange={this.handleChange}
                        value={this.state.input}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <TextField
                        multiline 
                        rows="5" 
                        placeholder="Why did the chicken cross the road?" 
                        id="inputField"
                        disabled="true"
                        fullWidth="true"
                        variant="outlined"
                        value={this.state.output}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/ciphers" component={Link}> 
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }
}