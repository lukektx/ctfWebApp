import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, FormHelperText, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const GrayTextTypography = withStyles({
    root: {
        color: "#D5D5D5"
    }
})(Typography);

function getAscii(inp) {
    var ascii = '';
    if(typeof(inp) === "string") {
        var mem = '';
        for(var i = 0; i < inp.length; i++) {
            mem += inp[i];
            if(Number(mem) > 25){
                ascii += String.fromCharCode(Number(mem));
                mem = '';
            }
        }
    }
    else {
        for(var code in inp) {
            ascii += String.fromCharCode(inp[code]);
        }
    }
    return ascii;
}

function getDecimal(str) {
    var fullNum = ""
    for(var i = 0; i < str.length; i++) {
        fullNum += str.charCodeAt(i).toString();
    }
    return fullNum;
}

function getByteArray(str, base) {
    var ret = [];
    if(base === 2) {
        if(str.length % 8 != 0) {
            return;
        }
        else {
            for(var i = 0; i < str.length/8; i++) {
                var temp = '';
                for(var j = 0; j < 8; j++) {
                    temp += (str[i * 8 + j]);
                }
                ret.push(parseInt(temp, 2));
            }
        }
    }
    else if(base === 16) {
        if(str.length % 2 != 0) {
            return;
        }
        for(var i = 0; i < str.length/2; i++) {
            var temp = '';
            for(var j = 0; j < 2; j++) {
                temp += (str[i * 2 + j]);
            }
            ret.push(parseInt("0x" + temp));
        }
    }
    else if(base === "ascii") {
        var bin = '';
        var hex = '';
        for(var char in str) {
            bin += str.charCodeAt(char).toString(2);
            hex += str.charCodeAt(char).toString(16);
        }
        ret = [bin, hex];
    }
    return ret;
}

export default class RoomJoinPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            binary: "",
            decimal: "",
            hex: "",
            base64: "",
            ascii: "",
            asciiError: "",
        };
        this.handleBinaryChange = this.handleBinaryChange.bind(this);
        this.handleDecimalChange = this.handleDecimalChange.bind(this);
        this.handleHexChange = this.handleHexChange.bind(this);
        this.handleBase64Change = this.handleBase64Change.bind(this);
        this.handleASCIIChange = this.handleASCIIChange.bind(this);
    }

    handleBinaryChange(event) {
        const re = /^[0-1\b]+$/;
        var noSpace = event.target.value.replace(/\s/g, '');
        if (re.test(noSpace)) {
            this.setState({
                binary: noSpace,
                decimal: BigInt("0b" + noSpace).toString(),
                hex: BigInt("0b" + noSpace).toString(16),
                base64: btoa(getAscii(getByteArray(noSpace, 2))),
                ascii: getAscii(getByteArray(noSpace, 2)),
            })
        }
        else if (event.target.value === '') {
            this.setState({
                binary: '',
                decimal: '',
                hex: '',
                base64: '',
                ascii: '',
            })
        }
    }

    handleDecimalChange(event) {
        const re = /^[0-9\b]+$/;
        if (re.test(event.target.value)) {
            this.setState({
                binary: (BigInt(event.target.value).toString(2)),
                decimal: event.target.value,
                hex: BigInt(event.target.value).toString(16),
                ascii: getAscii(event.target.value),
            })
            try {
                this.setState({
                    base64: btoa(getAscii(event.target.value)),
                });
            }
            catch {}
        }
        else if (event.target.value === '') {
            this.setState({
                binary: '',
                decimal: '',
                hex: '',
                base64: '',
                ascii: '',
            })
        }
    }
    handleHexChange(event) {
        var lower = event.target.value.toLowerCase();
        const re = /^([a-f0-9])+$/;
        if (re.test(lower)) {
            this.setState({
                binary: (BigInt('0x' + event.target.value).toString(2)),
                decimal: (BigInt('0x' + event.target.value).toString()),
                hex: lower,
                base64: btoa(getAscii(getByteArray(event.target.value, 16))),
                ascii: getAscii(getByteArray(event.target.value, 16))
            })
        }
        else if (event.target.value === '') {
            this.setState({
                binary: '',
                decimal: '',
                hex: '',
                base64: '',
                ascii: '',
            })
        }
    }
    handleBase64Change(event) {
        const re = /[A-Za-z0-9+/=]/;
        

        if (re.test(event.target.value)) {
            this.setState({
                binary: '',
                decimal: '',
                hex: '',
                base64: event.target.value,
            });
            try {
                this.setState({
                    ascii: atob(event.target.value),
                });
            }
            catch {
                var a = 0;
            }
        }
        else if (event.target.value === '') {
            this.setState({
                binary: '',
                decimal: '',
                hex: '',
                base64: '',
                ascii: '',
            })
        }
    }

    handleASCIIChange(event) {

        var bin = getByteArray(event.target.value, "ascii")[0];
        var hex = getByteArray(event.target.value, "ascii")[1];

        if (event.target.value === '') {
            this.setState({
                binary: '',
                decimal: '',
                hex: '',
                base64: '',
                ascii: '',
            })
        }
        this.setState({
            binary: bin,
            decimal: getDecimal(event.target.value),
            hex: hex,
            base64: btoa(event.target.value),
            ascii: event.target.value,
        });
    }
    

    render () {
        
        return <div className="top">
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <GrayTextTypography component="h2" variant="h2">
                        Convert Between Binary, Decimal, Hexidecimal, Base 64, and ASCII
                    </GrayTextTypography>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            Binary
                        </div>
                    </FormHelperText>
                    <TextField
                    multiline 
                    rows="3" 
                    placeholder="1001" 
                    type="number" 
                    id="inputField"
                    fullWidth="true"
                    onChange={this.handleBinaryChange} 
                    variant="outlined"
                    value={this.state.binary}
                    error={this.state.binaryError}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            Decimal
                        </div>
                    </FormHelperText>
                    <TextField
                    multiline 
                    rows="3" 
                    id="inputField"
                    fullWidth="true"
                    placeholder="941"
                    onChange={this.handleDecimalChange} 
                    variant="outlined"
                    value={this.state.decimal} />
                </Grid>
                <Grid item xs={12} align="center">
                <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            Hexidecimal
                        </div>
                    </FormHelperText>
                    <TextField
                    multiline 
                    rows="3" 
                    id="inputField"
                    fullWidth="true"
                    placeholder="18a2"
                    onChange={this.handleHexChange} 
                    variant="outlined"
                    value={this.state.hex} />
                </Grid>
                <Grid item xs={12} align="center">
                <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            Base 64
                        </div>
                    </FormHelperText>
                    <TextField
                    multiline 
                    rows="3" 
                    id="inputField"
                    fullWidth="true"
                    placeholder="5jb20="
                    onChange={this.handleBase64Change} 
                    variant="outlined"
                    value={this.state.base64} />
                </Grid>
                <Grid item xs={12} align="center">
                    <FormHelperText id="inputDescription">
                        <div align="center" id="inputDescription">
                            ASCII
                        </div>
                    </FormHelperText>
                    <TextField
                    multiline 
                    rows="2" 
                    id="inputField"
                    fullWidth="true"
                    placeholder="Hello"
                    onChange={this.handleASCIIChange} 
                    variant="outlined"
                    error={this.state.asciiError}
                    value={this.state.ascii} />
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}> 
                        Back
                    </Button>
                </Grid>
            </Grid>
        </div>
    }
}