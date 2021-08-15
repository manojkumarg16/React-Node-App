import React, { Component } from "react";
import CarService from "../services/service.js";

import { TextField, Button, withStyles } from "@material-ui/core"
import { styles } from "../css-common"

class AddCar extends Component {
    constructor(props) {
        super(props);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.saveCar = this.saveCar.bind(this);
        this.newCar = this.newCar.bind(this);

        this.state = {
            id: null,
            company: "",
            model: "",
            submitted: false
        };
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        });
    }

    onChangeModel(e) {
        this.setState({
            model: e.target.value
        });
    }

    saveCar() {
        var data = {
            model: this.state.model,
            company: this.state.company
        };

        CarService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    company: response.data.company,
                    model: response.data.model,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newCar() {
        this.setState({
            company: "",
            model: "",
            submitted: false
        });
    }

    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newCar}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Company"
                                    name="company"
                                    value={this.state.company}
                                    onChange={this.onChangeCompany}
                                    required
                                />
                            </div>

                            <div className={classes.textField}>
                                <TextField
                                    label="model"
                                    name="model"
                                    value={this.state.model}
                                    onChange={this.onChangeModel}
                                    required
                                />
                            </div>

                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveCar}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(AddCar)