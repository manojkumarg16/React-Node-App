import React, { Component } from "react";
import CarService from "../services/service.js";
import { Link } from "react-router-dom";

import { styles } from "../css-common"
import { Grid, ListItem, withStyles } from "@material-ui/core";

class Carslist extends Component {
    constructor(props) {
        super(props);
        this.retrieveCars = this.retrieveCars.bind(this);
        this.setActiveCar = this.setActiveCar.bind(this);
        this.state = {
            carsList: [],
            currentValue: null,
            currentIndex: -1
        };
    }

    componentDidMount() {
        this.retrieveCars();
    }

    retrieveCars() {
        CarService.getAll()
        .then(response => {
          console.log("cars list",response)
            this.setState({
                carsList: response.data
            });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    setActiveCar(car, index) {
      console.log("inside setActiveCar", car, index)
        this.setState({
            currentValue: car,
            currentIndex: index
        });
    }

  render() {
    const { classes } = this.props
    const { carsList, currentValue, currentIndex } = this.state;

    return (
      <div className={classes.form}>
        <Grid container>
          <Grid item md={4}>
              <h2>Cars List</h2>

            <div className="list-group">
              {carsList &&
                carsList.map((car, index) => (
                  <ListItem
                    selected={index === currentIndex}
                    onClick={() => this.setActiveCar(car, index)}
                    button
                    key={index}>
                    {car.company}
                  </ListItem>
                ))}
            </div>
          </Grid>
          <Grid item md={8}>
            {currentValue ? (
              <div className={classes.cars}>
                <h4>Car</h4>
                <div className={classes.detail}>
                  <label>
                    <strong>Company:</strong>
                  </label>{" "}
                  {currentValue.company}
                </div>
                <div className={classes.detail}>
                  <label>
                    <strong>Model:</strong>
                  </label>{" "}
                  {currentValue.model}
                </div>

                <Link
                  to={"/cars/" + currentValue.id}
                  className={classes.edit}
                >
                  Edit
              </Link>
              </div>
            ) : (
                <div>
                </div>
              )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Carslist)