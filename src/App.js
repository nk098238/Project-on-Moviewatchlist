import React,{useState} from "react";
import { CssBaseline } from "@material-ui/core";
import { Navbar, AdvancedSearch, Details } from "./components";


const App = () => {

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
  const [searchflag, setSearchflag] = useState(false);
  const [resetflag, setresetflag] = useState(false);
  
  return (
    <>
      <CssBaseline />
      <Navbar />
      <AdvancedSearch  prop1={selectedItem}  prop2={setSelectedItem} flag2={setSearchflag} reset1={setresetflag} />
      <Details prop1={selectedItem} flag1={searchflag} flag2={setSearchflag} reset={resetflag} reset123={setresetflag}/> 
    </>
  );
};

export default App;
