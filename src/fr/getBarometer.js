import axios from "axios";
import cheerio from "cheerio";

const mappingBarometer = {
  "completed": 5,
  "c": 4,
  "half": 3,
  "q": 2,
  "near_zero": 1
};
const urlBarometer = 'https://dondesang.efs.sante.fr/barometre';

const getBarometer = async () => {
  const className = 'image-sanguins';
  const res = await axios.get(urlBarometer);
  let barometers = {};

  const $ = cheerio.load(res.data);
  const items = $('div.blood-group-items div.group-item');

  for (let j = 0; j < items.length; ++j) {

    const item = items[j];

    for (let i = 0; i<item.children.length; ++i) {

      let child = item.children[i];
      if (child.type==='tag' && child.attribs.class===className) {

        let level = child.children[1].children[0].attribs.src.split('/');
        level = (level[level.length-1]).replace('.png', '');
        barometers[child.children[1].attribs.title.toUpperCase()] = mappingBarometer[level];
      }
    }
  }

  return barometers;
};

export default getBarometer;