import queryString from "query-string";

interface FixProperty<T, K extends keyof T> {
  number?: K[];
  string?: K[];
  stringArray?: K[];
  numberArray?: K[];
  boolean?: K[];
  booleanArray?: K[];
}

type Query = "string" | "number" | "string[]" | "number[]";

export function convertURLSearchParam2object<T>(
  searchParams: string = window.location.search,
  fixProperty?: FixProperty<T, keyof T>,
) {
  const types = new URLSearchParams(searchParams).keys().reduce(
    (previousValue, key) => {
      let type: Query = "string";

      if (fixProperty?.number?.includes(key as keyof T)) {
        type = "number";
      } else if (fixProperty?.string?.includes(key as keyof T)) {
        type = "string";
      } else if (fixProperty?.numberArray?.includes(key as keyof T)) {
        type = "number[]";
      } else if (fixProperty?.stringArray?.includes(key as keyof T)) {
        type = "string[]";
      }
      previousValue[key as keyof T] = type;

      return previousValue;
    },
    {} as Record<keyof T, Query>,
  );

  return queryString.parse(searchParams, {
    types,
  }) as T;
}
