import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import {  Link } from "react-router-dom";
import blue from '@material-ui/core/colors/blue';

const GrayTextTypography = withStyles({
    root: {
        color: "#D5D5D5"
    }
})(Typography);

const BlueLinkButton = withStyles({
    root: {
        color: blue[400],
        borderColor: blue[400],
        borderWidth: "2px",
        backgroundColor: "#FFFFFC",
        width: "120px"
    }
})(Button);

export default class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <GrayTextTypography component="h2" variant="h2">
                        Ciphers
                    </GrayTextTypography>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="outlined" color="primary">
                        <BlueLinkButton color="primary" to="/ciphers/caesar" component={ Link }>
                            Caesar
                        </BlueLinkButton>
                        <BlueLinkButton color="secondary" to="/ciphers/rot13" component={ Link }>
                            ROT13
                        </BlueLinkButton>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}> 
                        Back
                    </Button>
                </Grid>
            </Grid>

        );
    }
}