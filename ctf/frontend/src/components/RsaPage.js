import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Grid, Typography, TextField, FormHelperText} from "@material-ui/core";
import { Link } from "react-router-dom";
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import * as bigintCryptoUtils from 'bigint-crypto-utils'

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

const WideBlueLinkButton = withStyles({
    root: {
        color: blue[400],
        borderColor: blue[400],
        borderWidth: "2px",
        backgroundColor: "#FFFFFC",
        width: "240px"
    }
})(Button);

export default class RsaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            p: "",
            q: "",
            n: "",
            e: "",
            d: "",
            plaintext: "",
            ciphertext: "",
        };
        this.handlePChange = this.handlePChange.bind(this);
        this.handleQChange = this.handleQChange.bind(this);
        this.handleNChange = this.handleNChange.bind(this);
        this.handleEChange = this.handleEChange.bind(this);
        this.handleDChange = this.handleDChange.bind(this);
        this.handlePlaintextChange = this.handlePlaintextChange.bind(this);
        this.handleCiphertextChange = this.handleCiphertextChange.bind(this);
        this.getP = this.getP.bind(this);
        this.getQ = this.getQ.bind(this);
        this.getN = this.getN.bind(this);
        this.getE = this.getE.bind(this);
        this.getD = this.getD.bind(this);
        this.getPlaintext = this.getPlaintext.bind(this);
        this.getCiphertext = this.getCiphertext.bind(this);
    }

    getN() {
        this.setState({
            n: (BigInt(this.state.p) * BigInt(this.state.q)).toString()
        })
    }

    getP() {
        this.setState({
            p: (BigInt(this.state.n) / BigInt(this.state.q)).toString()
        })
    }

    getQ() {
        this.setState({
            q: (BigInt(this.state.n) / BigInt(this.state.p)).toString()
        })
    }

    getE() {
        this.setState({
            e: bigintCryptoUtils.modInv(BigInt(this.state.d), ((BigInt(this.state.p) - 1n) * (BigInt(this.state.q) - 1n))).toString()
        })
    }

    getD() {
        this.setState({
            d: bigintCryptoUtils.modInv(BigInt(this.state.e), ((BigInt(this.state.p) - 1n) * (BigInt(this.state.q) - 1n))).toString()
        })
    }

    getCiphertext () {
        this.setState({
            ciphertext: bigintCryptoUtils.modPow(this.state.plaintext, this.state.e, this.state.n).toString()
        });
    }

    getPlaintext () {
        this.setState({
            plaintext: bigintCryptoUtils.modPow(this.state.ciphertext, this.state.d, this.state.n).toString()
        });
    }

    handlePChange(event) {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value)) {
            this.setState({
                p: event.target.value,
            });
        }
        else if (event.target.value === '') {
            this.setState({
                p: '',
            });
        }
    }

    handleQChange(event) {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value)) {
            this.setState({
                q: event.target.value,
            });
        }
        else if (event.target.value === '') {
            this.setState({
                q: '',
            });
        }
    }

    handleNChange(event) {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value)) {
            this.setState({
                n: event.target.value,
            });
        }
        else if (event.target.value === '') {
            this.setState({
                n: '',
            });
        }
    }

    handleEChange(event) {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value)) {
            this.setState({
                e: event.target.value,
            });
        }
        else if (event.target.value === '') {
            this.setState({
                e: '',
            });
        }
    }

    handleDChange(event) {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value)) {
            this.setState({
                d: event.target.value,
            });
        }
        else if (event.target.value === '') {
            this.setState({
                d: '',
            });
        }
    }
    handlePlaintextChange(event) {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value)) {
            this.setState({
                plaintext: event.target.value,
            });
        }
        else if (event.target.value === '') {
            this.setState({
                plaintext: '',
            });
        }
    }
    handleCiphertextChange(event) {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value)) {
            this.setState({
                ciphertext: event.target.value,
            });
        }
        else if (event.target.value === '') {
            this.setState({
                ciphertext: '',
            });
        }
    }

    render () {
        return(
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <GrayTextTypography component="h2" variant="h2">
                        RSA Tools
                    </GrayTextTypography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            P
                        </div>
                    </FormHelperText>
                    <TextField
                        multiline
                        fullWidth
                        id="inputField"
                        rows="4"
                        variant="outlined"
                        placeholder="60413" 
                        onChange={this.handlePChange}
                        value={this.state.p}/>
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            Q
                        </div>
                    </FormHelperText>
                    <TextField
                        multiline
                        fullWidth
                        id="inputField"
                        rows="4"
                        variant="outlined"
                        placeholder="76753" 
                        onChange={this.handleQChange}
                        value={this.state.q}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            N
                        </div>
                    </FormHelperText>
                    <TextField
                    multiline
                    fullWidth
                    id="inputField"
                    rows="3"
                    variant="outlined"
                    placeholder="4636878989"
                    onChange={this.handleNChange}
                    value={this.state.n}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="outlined">
                        <BlueLinkButton onClick={this.getN}>
                            Get N (P, Q)
                        </BlueLinkButton>
                        <BlueLinkButton onClick={this.getQ}>
                            Get Q (N, P)
                        </BlueLinkButton>
                        <BlueLinkButton onClick={this.getP}>
                            Get P (N, Q)
                        </BlueLinkButton>
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            E
                        </div>
                    </FormHelperText>
                    <TextField
                        multiline
                        fullWidth
                        id="inputField"
                        rows="3"
                        variant="outlined"
                        placeholder="65537"
                        onChange={this.handleEChange}
                        value={this.state.e}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            D
                        </div>
                    </FormHelperText>
                    <TextField
                        multiline
                        fullWidth
                        id="inputField"
                        rows="3"
                        variant="outlined"
                        placeholder="65537"
                        onChange={this.handleDChange}
                        value={this.state.d}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            Plaintext
                        </div>
                    </FormHelperText>
                    <TextField
                        multiline
                        fullWidth
                        id="inputField"
                        rows="3"
                        variant="outlined"
                        placeholder="6357294171489311547190987615544575133581967886499484091352661406414044440475205342882841236357665973431462491355089413710392273380203038793241564304774271529108729717"
                        onChange={this.handlePlaintextChange}
                        value={this.state.plaintext}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            Ciphertext
                        </div>
                    </FormHelperText>
                    <TextField
                        multiline
                        fullWidth
                        id="inputField"
                        rows="3"
                        variant="outlined"
                        placeholder="65537"
                        onChange={this.handleCiphertextChange}
                        value={this.state.ciphertext}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="outlined">
                        <WideBlueLinkButton onClick={this.getPlaintext}>
                            Get Plaintext (Ciphertext, D, N)
                        </WideBlueLinkButton>
                        <WideBlueLinkButton onClick={this.getCiphertext}>
                            Get Ciphertext (Plaintext, E, N)
                        </WideBlueLinkButton>
                        <BlueLinkButton onClick={this.getE}>
                            Get E (P, Q, D)
                        </BlueLinkButton>
                        <BlueLinkButton onClick={this.getD}>
                            Get D (P, Q, E)
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