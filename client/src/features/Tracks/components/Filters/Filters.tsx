import Filter from "components/Filter/Filter";
import React, { useEffect, useState } from "react";
import styles from "./Filters.module.scss";
import { BiSearch } from "react-icons/bi";
import { Genre, SortBy } from "app/utils/Filters";
import { useTrackStore } from "app/provider/Provider";

const Filters = () => {
  const { loadFilteredTracks, loadTracks, loadSortedByTracks } =
    useTrackStore();

  const handleGenreChange = (value: string) => {
    const filterEnum = Genre[value];
    if (filterEnum === undefined || filterEnum === -1) loadTracks();
    else loadFilteredTracks(filterEnum);
  };

  const handleSortByChange = (value: string) => {
    const filterEnum = SortBy[value];
    if (filterEnum === undefined || filterEnum === -1) loadTracks();
    else loadSortedByTracks(filterEnum);
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.filter}>
          <Filter
            list={[
              "All genres",
              "Rock",
              "pop",
              "Pop Rock",
              "Punk Rock",
              "Hip Hop",
              "RnB",
              "Electronic",
            ]}
            onChange={handleGenreChange}
          />
        </div>
        <div className={styles.filter}>
          <Filter
            list={[
              "sort by",
              "price lowest",
              "price highest",
              "times sold",
              "discounted lowest",
              "discounted highest",
            ]}
            onChange={handleSortByChange}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.search}>
          <input
            type="text"
            className={styles.input}
            placeholder="What type of track are you looking for?"
          />
          <button className={styles.iconContainer}>
            <BiSearch className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
