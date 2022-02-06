import React, { useState, useEffect } from "react";
import {
  DialogActions,
  DialogContent,
  TextField,
  Button,
  Chip,
  Checkbox,
  Select,
  Grid,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import FormInputLabel from "../FormInputLabel";
import { useStyles, MenuProps } from "./styles";
import DialogBase from "../DialogBase";

const specialFeatures = [
  "Trailers",
  "Commentaries",
  "Deleted Scenes",
  "Behind the Scenes",
];
const rating = ["G", "R", "PG", "PG-13", "NC-17"];
const languages = [
  "English",
  "Italian",
  "Japanese",
  "Mandarin",
  "French",
  "German",
  "Mongolian",
];

const FormDialog = ({ data, ...props }) => {

  const classes = useStyles();
  
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const handleChange = (event) => {
    const value = event.target.value;

    setFormData({
      ...formData,
      specialFeatures: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    props.onSubmit(formData);
    props.handleClose();
  };

  return (
    <DialogBase {...props} title={props.title}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <FormInputLabel title="Title" required />
            <TextField
              variant="outlined"
              fullWidth
              required
              autoFocus
              onChange={(event) =>
                setFormData({ ...formData, title: event.target.value })
              }
              value={formData.title}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputLabel title="Release Year" />
            <TextField
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setFormData({ ...formData, releaseYear: event.target.value })
              }
              value={formData.releaseYear}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputLabel title="Special Features" />
            <Select
              fullWidth
              variant="outlined"
              multiple
              value={formData.specialFeatures}
              renderValue={() =>
                formData.specialFeatures.map((item, index) => (
                  <Chip label={item} key={index} className={classes.chip} />
                ))
              }
              onChange={handleChange}
              MenuProps={MenuProps}
            >
              {specialFeatures.map((item, index) => (
                <MenuItem value={item} key={index}>
                  <ListItemIcon>
                    <Checkbox checked={formData.specialFeatures.indexOf(item) > -1}/>
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputLabel title="Rating" />
            <Select
              variant="outlined"
              fullWidth
              MenuProps={MenuProps}
              value={formData.rating}
              onChange={(event) =>
                setFormData({ ...formData, rating: event.target.value })
              }
            >
              {rating.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputLabel title="Language" required />
            <Select
              variant="outlined"
              fullWidth
              MenuProps={MenuProps}
              required
              value={formData.languageId}
              onChange={(event) =>
                setFormData({ ...formData, languageId: event.target.value })
              }
            >
              {languages.map((item, index) => (
                <MenuItem key={index} value={index + 1}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
            <FormInputLabel title="Description" />
            <TextField
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(event) =>
                setFormData({ ...formData, description: event.target.value })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid
          container
          spacing={2}
          justifyContent="flex-end"
          style={{ padding: "1rem" }}
        >
          <Grid item>
            <Button
              variant="contained"
              className={classes.actionButton}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              className={classes.actionButton}
              onClick={props.handleClose}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </DialogBase>
  );
};

export default FormDialog;
