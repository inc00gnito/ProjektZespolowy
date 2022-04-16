import React from "react";
import WhatIsLove from "assets/whatislove.webp";
import Flaming from "assets/flaming.jpg";
import styles from "./styles/TrackList.module.scss";
import { AiFillShopping, AiOutlineDownload } from "react-icons/ai";
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select, SelectChangeEvent } from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import { bgcolor } from "@mui/system";

const mp3List = [
  {
    id: 1,
    name: "What is love",
    author: "PIG",
    mp3: "https://img-9gag-fun.9cache.com/photo/a31GEQN_460svav1.mp4",
    demo: "https://img-9gag-fun.9cache.com/photo/a31GEQN_460svav1.mp4",
    picture: WhatIsLove,
    price: 15,
    time: 3.54,
    hashtag: ["#good", "#borat"],
  },
  {
    id: 1,
    name: "Flamingo dance",
    author: "flaming",
    mp3: "https://img-9gag-fun.9cache.com/photo/a810rbZ_460svav1.mp4",
    demo: "https://img-9gag-fun.9cache.com/photo/a810rbZ_460svav1.mp4",
    picture: Flaming,
    price: 20,
    time: 3.21,
    hashtag: ["#lubie", "#cycki"],
  },
];


const MenuProps = {
  PaperProps: {
    style: {
      width: 120,
      disableScrollLock: true,
      bgcolor: "#d400b8",
      padding: 0,
      margin:0
    },
  },
};

const names = [
  'Hip hop',
  'Pop',
  'R&B',
  'Electronic',
  'Reggae',
  'Rock',
  'HyperPop',
];

const sort = [
  'Price',
  'Time',
];


function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const TrackList = () => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const style = {
    menuList: (base: any) => ({
      ...base,
  
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888"
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555"
      }
    })
  }
 


  return (
    <>
      <h1 className={styles.shopAll}>SHOP ALL</h1>
      <div style={{display:"flex",margin:"auto auto 100px 60%"}}>
      <div className={styles.Select}>
      <FormControl sx={{ m: 1, width: 140 , color: 'white' , textAlign:"center", height: 30, padding:0}} className={styles.forms} >
        <InputLabel className={styles.input}  sx={{fontSize:14, color: 'white', textAlign:"center", paddingBottom:0, height:30,backgroundColor:"#d400b8",padding:0}} id="demo-multiple-name-label">All genres</InputLabel>
        <Select className={styles.styledselect}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" className={styles.input}/>}
          MenuProps={MenuProps}
          sx={{color: "white",backgroundColor:"#d400b8", padding:0}}
          autoWidth={true}
          IconComponent={() => (
            <FiChevronDown className={styles.Icon}/>)}
        >
          {names.map((name) => (
            <MenuItem 
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
              sx={{color: "white",backgroundColor:"#d400b8", fontSize:"15px"}}
            
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 140 , color: 'white' , textAlign:"center", height:30}} className={styles.forms} >
        <InputLabel className={styles.input}  sx={{fontSize:14, color: 'white', textAlign:"center", paddingBottom:0,backgroundColor:"#d400b8"}} id="demo-multiple-name-label">Sort by</InputLabel>
        <Select className={styles.styledselect}
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" className={styles.input}/>}
          MenuProps={MenuProps}
          sx={{color: "white", backgroundColor:"#d400b8", padding:0}}
          IconComponent={() => (
            <FiChevronDown className={styles.Icon}/>)}
        >
          {sort.map((sort) => (
            <MenuItem 
              key={sort}
              value={sort}
              style={getStyles(sort, personName, theme)}
              sx={{color: "white",backgroundColor:"#d400b8"}}
            >
              {sort}
            </MenuItem >
          ))}
        </Select>
      </FormControl>
    </div>
      </div>
      <input
        type="text"
        className={styles.search}
        placeholder="What type of track are you looking for?"
      />
      <div className={styles.cointaner}>
        <div className={styles.line} style={{display:"flex"}}>
          <div style={{margin:"0 145px 0 110px"}} >Title</div><div>Time</div>
        </div>
        <ul className={styles.ulTracks}>
          {mp3List.map((e) => (
            <li style={{ display: "block" }}>
              <div style={{ display: "flex" ,margin:"0px",padding:"0"}} className={styles.line}>
                <img
                  src={e.picture}
                  alt=""
                  style={{ width: "80px", height: "80px", margin: "20px 10px 20px 20px", objectFit:"cover" }}
                />
                <div style={{ margin: "50px 20px 20px 0px", width:"300px"}}>{e.name}</div>
                <div
                  style={{ margin: "50px 250px 20px 20px", width: "90px", textAlign: "right" }}
                >
                  {e.time}
                </div>
                <div style={{ margin: "50px 5px 20px 0" }} className={styles.hashtag}>
                  {e.hashtag[0]}
                </div>
                <div style={{ margin: "50px 20px 20px 0" }} className={styles.hashtag}>
                  {e.hashtag[1]}
                </div>
                <button className={styles.download}>
                  <AiOutlineDownload />
                </button>
                <button className={styles.buy}>
                  ${e.price}
                  <AiFillShopping />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TrackList;
