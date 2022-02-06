import {
    Card,
    Typography,
    Grid,
    Button,
    TextField,
    Select,
    InputLabel,
  } from "@material-ui/core";
  import { Search, Clear } from "@material-ui/icons";
import { useStyles } from './styles';
import React, { useState} from "react";


  const AdvancedSearch = ({...props}) => {
     const classes =  useStyles();
      
    // eslint-disable-next-line react-hooks/exhaustive-deps

      const handleSubmit = () =>{
        props.flag2(true)
      };
      const resetsubmit = () =>{
        props.reset1(true)
      }
      return(
      <Card className={classes.card}>
        <Typography variant="h5" className={classes.heading}>
        Advanced Search
      </Typography>
      <div className={classes.formContainer}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <InputLabel>
          <h3 style={{ display: "inline" }}>
                <b>Movie</b>
              </h3></InputLabel>
        <TextField 
        variant="outlined"
         fullWidth 
         onChange={(event) =>
                props.prop2({ ...props.prop1, title: event.target.value })
              }
              value={props.prop1.title}/>
        </Grid>
        <Grid item xs={12} md={6}>
        <InputLabel>
          <h3 style={{ display: "inline" }}>
                <b>Director</b>
              </h3></InputLabel>
        <TextField variant="outlined" fullWidth 
          onChange={(event) =>
                props.prop2({ ...props.prop1, director: event.target.value })
              }
              value={props.prop1.director}
        />
        </Grid>
        <Grid item xs={12} md={6}>
        <InputLabel>
          <h3 style={{ display: "inline" }}>
                <b>Release Year</b>
              </h3></InputLabel>
        <TextField variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
        <InputLabel>
              <h3 style={{ display: "inline" }}>
                <b>Language</b>
              </h3>
            </InputLabel>
            <Select variant="outlined" native fullWidth>
              {[
                "",
                "English",
                "Italian",
                "Japanese",
                "Mandarin",
                "French",
                "German",
                "Mongolian",
              ].map((language , index) => (
                <option key={index}>{language}</option>
              ))}
            </Select>
        </Grid>
      </Grid>
      </div>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ padding: "1rem" }}
      >
        <Grid item>
          <Button variant="contained" className={classes.actionButton}
          onClick={handleSubmit}>
            <Search className={classes.icon} /> Search
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" className={classes.actionButton}
          onClick={resetsubmit}>
            <Clear className={classes.icon} /> Reset
          </Button>
        </Grid>
      </Grid>
      </Card>
      );
  };


  export default AdvancedSearch;
  


