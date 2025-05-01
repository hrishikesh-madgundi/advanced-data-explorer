export const sortHelpers = {
    byIdAsc: (a, b) => a.id - b.id,
    byIdDesc: (a, b) => b.id - a.id,
    byNameAsc: (a, b) => a.name.localeCompare(b.name),
    byNameDesc: (a, b) => b.name.localeCompare(a.name),
  };