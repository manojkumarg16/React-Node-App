import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { styles } from "./css-common"

import AddCar from "./components/create-cars";
import UpdateCars from "./components/update-cars";
import CarList from "./components/list-cars";

import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';

class App extends Component {
  render() {
    const { classes } = this.props

    return (
      <div>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <Link to={"/"} className={classes.link}>
              <Typography variant="body2">
                Cars
              </Typography>
            </Link>
            <Link to={"/add"} className={classes.link}>
              <Typography variant="body2">
                Add
            </Typography>
            </Link>
          </Toolbar>
        </AppBar>

          <Switch>
            <Route exact path="/" component={CarList} />
            <Route exact path="/add" component={AddCar} />
            <Route path="/cars/:id" component={UpdateCars} />
          </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);