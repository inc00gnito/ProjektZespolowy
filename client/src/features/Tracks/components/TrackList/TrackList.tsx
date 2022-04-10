import React from "react";
import WhatIsLove from "assets/whatislove.webp";
import Flaming from "assets/flaming.jpg";
import styles from "./styles/TrackList.module.scss";
import { AiFillShopping, AiOutlineDownload } from "react-icons/ai";
import { Dropdown } from "react-bootstrap";

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
    time: 3.2,
    hashtag: ["#lubie", "#cycki"],
  },
];

const TrackList = () => {
  return (
    <>
      <h1 className={styles.shopAll}>SHOP ALL</h1>
      <div style={{display:"flex",margin:"auto auto 100px 60%"}}>
      <Dropdown >
        <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown">
          All genres
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown">
          <Dropdown.Item href="#/action-1">Hip hop</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Pop</Dropdown.Item>
          <Dropdown.Item href="#/action-3">R&B</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Electronic</Dropdown.Item>
          <Dropdown.Item href="#/action-5">Reggae</Dropdown.Item>
          <Dropdown.Item href="#/action-6">Rock</Dropdown.Item>
          <Dropdown.Item href="#/action-7">HyperPop</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown">
          Sort by
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown">
          <Dropdown.Item href="#/action-1">Lowest price</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Highest price</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
      <input
        type="text"
        className={styles.search}
        placeholder="What type of track are you looking for?"
      />
      <div className={styles.cointaner}>
        <div className={styles.line}>
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;Time{" "}
        </div>
        <ul>
          {mp3List.map((e) => (
            <li style={{ display: "block" }}>
              <div style={{ display: "flex" ,margin:"0px",padding:"0"}} className={styles.line}>
                <img
                  src={e.picture}
                  alt=""
                  style={{ width: "80px", height: "80px", margin: "20px" }}
                />
                <div style={{ margin: "20px", width: "100px" }}>{e.name}</div>
                <div
                  style={{ margin: "20px", width: "90px", textAlign: "center" }}
                >
                  {e.time}
                </div>
                <div style={{ margin: "20px" }} className={styles.hashtag}>
                  {e.hashtag[0]}
                </div>
                <div style={{ margin: "20px" }} className={styles.hashtag}>
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
