import React, { Component } from "react";
import CarService from "../services/service.js";

import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";

class UpdateCar extends Component {
    constructor(props) {
        super(props);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.updateCars = this.updateCars.bind(this);

        this.state = {
            currentValue: {
                company: "",
                model: ""
            },
            message: ""
        };
    }

    onChangeCompany(e) {
        const company = e.target.value;

        this.setState((prevState) => {
            return {
                currentValue: {
                    ...prevState.currentValue,
                    company: company
                }
            };
        });
    }

    onChangeModel(e) {
        const model = e.target.value;

        this.setState(prevState => ({
            currentValue: {
                ...prevState.currentValue,
                model: model
            }
        }));
    }

    updateCars() {
        let id = this.props.match.params.id;
        CarService.update(id, this.state.currentValue)
            .then(response => {
                console.log(response)
                this.setState({
                    message: response.data.message
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentValue } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.form}>
                        <h2>Cars</h2>
                        <form>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="company"
                                    name="company"
                                    value={currentValue.company}
                                    onChange={this.onChangeCompany}
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.textField}
                                    label="model"
                                    name="model"
                                    value={currentValue.model}
                                    onChange={this.onChangeModel}
                                />
                            </div>
                        </form>
                        <div className={classes.buttonWrapper}>
                            <Button
                                type="submit"
                                className={`${classes.update} ${classes.button}`}
                                onClick={this.updateCars}
                            >Update</Button>
                        </div>
                        <p>{this.state.message}</p>
                    </div>
            </div>
        );
    }
}

export default withStyles(styles)(UpdateCar)