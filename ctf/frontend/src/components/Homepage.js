import React, {Component} from 'react';
import ConversionPage from './ConversionPage';
import CiphersPage from './CiphersPage';
import Rot13Page from './Rot13Page';
import CaesarPage from './CaesarPage';
import RsaPage from './RsaPage';
import { withStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
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

export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null
        }
    }

    /*renderHomePage(){
        return(

        );
    }*/
    
    render() {
        return (
            <div style={{backgroundColor: "#303030"}}>
                    <Router>
                        <Switch>
                            <Route exact path='/'>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} align="center">
                                        <GrayTextTypography component="h2" variant="h2">
                                            CTF Tools
                                        </GrayTextTypography>
                                        <GrayTextTypography component="h6" variant="h6">
                                            by Luke Knight
                                        </GrayTextTypography>
                                    </Grid>
                                    <Grid item xs={12} align="center">
                                        <ButtonGroup disableElevation variant="outlined">
                                            <BlueLinkButton borde to="/ciphers" component={ Link }>
                                                Ciphers
                                            </BlueLinkButton>
                                            <BlueLinkButton to="/conversion" component={ Link }>
                                                Conversion
                                            </BlueLinkButton>
                                            <BlueLinkButton to="/rsa" component={ Link }>
                                                RSA
                                            </BlueLinkButton>
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Route>
                            <Route path='/conversion' component={ConversionPage}/>
                            <Route exact path='/ciphers/rot13' component={Rot13Page}/>
                            <Route exact path='/ciphers/caesar' component={CaesarPage}/>
                            <Route exact path='/ciphers' component={CiphersPage}/>
                            <Route exact path='/rsa' component={RsaPage}/>
                        </Switch>
                    </Router>
                
            </div>
        );
    }
}