const isEmpty = (value: object | string) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0) ||
  (typeof value === "object"
    ? Object.values(value).map(val => {
        return val === "" ? true : false;
      })
    : false);

export default isEmpty;
