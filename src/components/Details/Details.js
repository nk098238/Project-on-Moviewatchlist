import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TableFooter,
  TablePagination,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import { Add, Edit, Delete } from "@material-ui/icons";
import { useStyles } from "./styles";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  FormDialog  from "../FormDialog/FormDialog";

const StyledTableDataCell = withStyles(() => ({
    root: {
      borderBottom: "none",
    },
  }))(TableCell);
  const StyledTableHeadCell = withStyles(() => ({
    head: {
      backgroundColor: "#F5F8FA",
      paddingTop: 0,
      paddingBottom: 0,
      border: "1px solid #EDEEEF",
    },
  }))(TableCell);
const Details = ({...props}) => {
  const baseUrl = "http://localhost:8087";
  const [flag, setFlag] = useState(false);
  const [newflag, setnewFlag] = useState(false);

  const [loading, setLoading] = useState(false);
  
  
  useEffect(() => {
    axios
      .get(`${baseUrl}/films?page=${0}&sort=${1}`)
      .then((response) => {
        setLoading(false);
        setData({
          content: [...response.data.content],
          totalElements: response.data.totalElements,
        });
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
      setFlag(false)
  }, [flag]);
  const resetfunct=()=>{
    axios
    .get(`${baseUrl}/films?page=${0}&sort=${1}`)
    .then((response) => {
      setLoading(false);
      setData({
        content: [...response.data.content],
        totalElements: response.data.totalElements,
      });
    })
    .catch((err) => {
      setLoading(false);
      setError(err);
    });
    props.reset123(false);
  }
  props.reset&&(resetfunct())
  console.log(props.reset)
  const deletedmembers = [];
    const rowsPerPage = 5;
    const classes = useStyles();
    const [page , setpage] = useState(0);
    const [open , setOpen] = useState(0);
    const [error, setError] = useState(null);
    const [editDialog, setEditDialog] = useState(false);
    const [data , setData ] = useState({
      content: [],
      totalElements: 0,
    });
    const [selected , setSelected] = useState([]);
    const handlePageChange = (event , element) =>{
      setpage(element)}
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data?.length - page * rowsPerPage);
    const isSelected = (filmId) => selected.indexOf(filmId) !== -1;
    const handleClick = (event, id) =>{
      const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
    }
    const handleDelete =() =>{
      
     for (let filmId of selected){
       axios.delete(`${baseUrl}/films/${filmId}`).then(()=>{
         setFlag(!flag)
       })
       
     }
     toast.success("deleted successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
     });

    }
    const [selectedItem, setSelectedItem] = useState({
      filmId:1 ,
      title: "",
      description: "",
      director: "",
      releaseYear: "",
      languageId: "",
      rating: "",
      specialFeatures: [],
    });
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleEdit = (updatedFormData) => {
      const updatedData = {
        ...updatedFormData,
        specialFeatures: updatedFormData.specialFeatures.join(","),
        filmId: selected[0] ,
      };
     axios
        .put(`${baseUrl}/films/${updatedData.filmId}`, updatedData)
        .then(() => {
          toast.success("Updated successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
  
          let newData = data.content.map((item) => {
            if (item.filmId === updatedData.filmId) {
              return updatedData;
            } else {
              return item;
            }
          });
          setData({
            ...data,
            content: newData,
          });
  
          setSelected([]);
  
          setEditDialog(false);
        })
        .catch((err) =>
          toast.error("Unable to update", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    };
   const setselecteddata =() =>{
     const selectedItem = data.content.filter((item)=>
     item.filmId === selected[0]
        ) 
        console.log(selectedItem)}
    const handleAdd = (formData) => {
      const newFormData = {
        ...formData,
        specialFeatures: formData.specialFeatures.join(),
        filmId: 1,
        };
      axios
        .post(`${baseUrl}/films`, newFormData)
        .then(() =>
          toast.success("Added successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        )
        .then(() => {
          setLoading(true);
          axios
            .get(`${baseUrl}/films?page=${0}`)
            .then((response) => {
              setLoading(false);
  
              setData({
                content: response.data.content,
                totalElements: response.data.totalElements,
              });
            })
            .catch((err) =>
              toast.error("Internal server error", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
            );
        })
        .catch((err) =>
          toast.error("Unable to add", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    };
    const handleClickOpen = () => {
      setSelectedItem({
        filmId: 1,
        title: "",
        description: "",
        director: "",
        releaseYear: "",
        languageId: "",
        rating: "",
        specialFeatures: [],
      });
      setOpen(true);
    };
  
    const demofunct = () =>{
      axios
      .get(`${baseUrl}/films/${props.prop1.title}`)
      .then((response) => {
        setLoading(false);
        setData({
          content: response.data,
          totalElements: 1,
        });
        
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
      props.flag2(false)
      console.log(data)
    }
    props.flag1&&(demofunct())
    const  handleEditDialogOpen =() =>{
      setEditDialog(true);
    }
    const handleEditDialogClose = () => {
      setEditDialog(false);
    };
    
    const toCamelCase = (str) => {
        str = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (match, index) {
          return index === 0 ? match.toUpperCase() : match.toLowerCase();
        });
        return str;
      };

      const setLanguage = (languageId) => {
        switch (languageId) {
          case 1:
            return "English";
          case 2:
            return "Italian";
          case 3:
            return "Japanese";
          case 4:
            return "Mandarin";
          case 5:
            return "French";
          case 6:
            return "German";
          case 7:
            return "Mongolian";
          default:
            return "Not available";
        }
      };
     
    return(
        <>
            <Card className={classes.root}>
      <Typography variant="h5" className={classes.heading}>
        Details
      </Typography>
      <Grid container spacing={5}>
        <Grid item>
          <div className="ResponsiveDialog">
          <Button variant="contained" className={classes.actionButton}
          onClick={handleClickOpen}>
            <Add className={classes.icon} /> Add
          </Button></div>
        </Grid>
        <Grid item>
          <Button variant="contained" className={classes.actionButton}
          onClick={()=>{
            setselecteddata();
            handleEditDialogOpen();
          }}
          disabled = {selected.length>1 || selected.length === 0 }
          >
            <Edit className={classes.icon} /> Edit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            className={classes.actionButton}
            onClick={handleDelete}
          >
            <Delete className={classes.icon} />
            Delete
          </Button>
        </Grid>
      </Grid>
      <FormDialog
        onSubmit={handleAdd}
        open={open}
        handleClose={handleClose}
        title="Add Movie"
        data={selectedItem}
      />
      <FormDialog
        onSubmit={handleEdit}
        open={editDialog}
        handleClose={handleEditDialogClose}
        title="Edit Movie"
        data={selectedItem}
      />
     
      {error ? (
        <Typography variant="h4">Unable to fetch</Typography>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <Paper className={classes.paper} elevation={0}>
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableHeadCell padding="checkbox">
                    <Checkbox  />   
                  </StyledTableHeadCell>
                  <StyledTableHeadCell>Title</StyledTableHeadCell>
                  <StyledTableHeadCell>Description</StyledTableHeadCell>
                  <StyledTableHeadCell>Release Year</StyledTableHeadCell>
                  <StyledTableHeadCell>LanguageId</StyledTableHeadCell>
                  <StyledTableHeadCell>Director</StyledTableHeadCell>
                  <StyledTableHeadCell>Rating</StyledTableHeadCell>
                  <StyledTableHeadCell>Special Features</StyledTableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? data.content.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : data.content
                ).map((row) => {
                  const isItemSelected = isSelected(row.filmId);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      key={row.filmId}
                      tabIndex={-1}
                      onClick={(event) => handleClick(event, row.filmId)}
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                    >
                      <StyledTableDataCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </StyledTableDataCell>
                      <StyledTableDataCell>
                        {row.title ? toCamelCase(row.title) : "Not available"}
                      </StyledTableDataCell>
                      <StyledTableDataCell>
                        {row.description
                          ? row.description.length < 50
                            ? row.description
                            : row.description.slice(0, 50) + " ..."
                          : "Not available"}
                      </StyledTableDataCell>
                      <StyledTableDataCell>
                        {row.releaseYear
                          ? new Date(row.releaseYear).getFullYear()
                          : "Not available"}
                      </StyledTableDataCell>
                      <StyledTableDataCell>
                        {row.languageId
                          ? setLanguage(row.languageId)
                          : "Not available"}
                      </StyledTableDataCell>
                      <StyledTableDataCell>
                        {row.director ? row.director : "Not available"}
                      </StyledTableDataCell>
                      <StyledTableDataCell>
                        {row.rating ? (
                          <Chip
                            label={row.rating}
                            size="small"
                            style={{ backgroundColor: "#E9F6E0" }}
                          />
                        ) : (
                          "Not available"
                        )}
                      </StyledTableDataCell>
                      <StyledTableDataCell className={classes.tableCell}>
                        {row.specialFeatures
                          ? row.specialFeatures
                              .split(",")
                              .map((item, index) => (
                                <Chip
                                  key={index}
                                  size="small"
                                  label={item}
                                  style={{ backgroundColor: "#FCD8D4" }}
                                  className={classes.chip}
                                />
                              ))
                          : "Not available"}
                      </StyledTableDataCell>
                    </TableRow>
                  );
                })
                }  
                {/* /*here8/ */}
                {console.log(emptyRows)}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 50 * emptyRows }}>
                    <TableCell colSpan={8} style={{ borderBottom: "none" }} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    count={data.totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                    style={{ borderBottom: "none" }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <ToastContainer />
    </Card>
     </>
    )

}
export default Details;