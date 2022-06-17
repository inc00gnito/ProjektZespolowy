import Filter from "components/Filter/Filter";
import React, { useEffect, useState } from "react";
import styles from "./Filters.module.scss";
import { BiSearch } from "react-icons/bi";
import { Genre, SortBy } from "app/model/Track";
import { useTrackStore } from "app/provider/Provider";
import FilterMultiple from "components/Filter/FilterMultiple";

const Filters = () => {
  const { loadTracks } = useTrackStore();
  const [filters, setFiltres] = useState<string[]>([]);
  const [sort, setSort] = useState<number>();

  const handleGenreChange = (values: string[]) => {
    setFiltres(values);
    loadTracks({ filters: values, sort });
  };

  const handleSortByChange = (value: string) => {
    setSort(SortBy[value]);
    loadTracks({ filters, sort: SortBy[value] });
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.filter} data-testid="tracks__filter">
          <FilterMultiple
            list={[
              "Rock",
              "pop",
              "Pop Rock",
              "Punk Rock",
              "Hip Hop",
              "RnB",
              "Electronic",
            ]}
            defaultValue="All genres"
            onChange={handleGenreChange}
          />
        </div>
        <div className={styles.filter} data-testid="tracks__sort">
          <Filter
            list={[
              "price lowest",
              "price highest",
              "times sold",
              "discounted lowest",
              "discounted highest",
            ]}
            defaultValue="sort by"
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
