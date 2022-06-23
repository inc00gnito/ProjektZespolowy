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
  const [search, setSearch] = useState("");

  const handleGenreChange = (values: string[]) => {
    setFiltres(values);
    loadTracks({ filters: values, sort });
  };

  const handleSortByChange = (value: string) => {
    setSort(SortBy[value]);
    loadTracks({ filters, sort: SortBy[value] });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadTracks({ filters, search });
  };
  let timeout: any = null;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    setSearch(e.target.value);
    timeout = setTimeout(() => {
      loadTracks({ filters, search: e.target.value });
    }, 400);
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.filter} data-testid="tracks__filter">
          <FilterMultiple
            list={[
              "Rock",
              "Pop",
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
        <form onSubmit={handleSearch}>
          <div className={styles.search}>
            <input
              type="text"
              className={styles.input}
              onChange={onSearchChange}
              placeholder="What type of track are you looking for?"
            />
            <button className={styles.iconContainer}>
              <BiSearch className={styles.icon} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filters;
