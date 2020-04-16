const groupBy = (object, property) => {
  return object.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const filterBy = (item, selected) => {
  return item.filter(i => i.type === selected);
};

const sum = qtys => {
  return qtys.reduce((acc, curr) => acc + curr, 0);
};

export { groupBy, filterBy, sum };
