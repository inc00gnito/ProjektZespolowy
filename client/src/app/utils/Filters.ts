import {
  ITrackFilters,
  ITrackOptions,
  ITrackSearch,
  ITrackSort,
} from "app/model/Track";

export const convertTrackOptionsToParams = (options?: ITrackOptions) => {
  if (!options) return "";
  const { filters, sort, search } = options;
  const filtersParams = convertTrackFilterToParams(filters);
  const sortParams = convertTrackSortToParams(sort);
  const searchParams = convertTrackSearchToParams(search);

  const params = joinParams(filtersParams, sortParams, searchParams);
  return params;
};

export const convertTrackFilterToParams = (filters?: ITrackFilters) => {
  if (!filters || filters.length === 0) return "";
  return "filter=" + filters.join(",");
};

export const convertTrackSortToParams = (sort?: ITrackSort) => {
  if (sort === undefined) return "";
  return "sort=" + sort;
};

export const convertTrackSearchToParams = (search?: ITrackSearch) => {
  if (!search) return "";
  return "search=" + search;
};

export const joinParams = (...params: string[]) => {
  const nonEmptyParams = params.filter((n) => n);
  if (nonEmptyParams.length === 0) return "";
  return "?" + nonEmptyParams.join("&");
};
