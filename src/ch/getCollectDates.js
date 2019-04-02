import axios from "axios";

const mappingBarometer = {
  "grey": 5,
  "blue": 4,
  "green": 3,
  "yellow": 2,
  "red": 1
};
const urlBarometer = 'https://www.blutspende.ch/api/blood_supplies/gesamt.js';

const getBarometer = async () => {
  const res = await axios.get(urlBarometer);

  let barometers = {};
  Object.entries(res.data.blood_supplies).forEach(([key, value]) => {
    const refactorKey = key.replace('0', 'O').toUpperCase();
    barometers[refactorKey] = mappingBarometer[value]
  });

  return {
    date: res.data.date,
    values: barometers
  };
};

export default getBarometer;