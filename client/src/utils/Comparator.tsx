export default function compare<T>(a: T, b: T, orderBy: keyof T, order: "asc" | "desc") {
  if (b[orderBy] < a[orderBy]) {
    return order === "desc" ? -1 : 1;
  } 
  if (a[orderBy] < b[orderBy]) {
    return order === "desc" ? 1 : -1;
  }
  return 0;
};