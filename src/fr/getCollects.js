import axios from "axios";
import cheerio from "cheerio";
import getDivElement from "../utils/getDivElement";
import getElement from "../utils/getElement";
import Formatter from "../utils/Formatter";

const url = 'https://dondesang.efs.sante.fr/trouver-une-collecte';

const typeCollect = (container) => {
  let img = getElement(container.children, 'tag', 'img', 'picto').attribs.src;

  return img.indexOf('collecte-fixe') >= 0;
};
const addrCollect = (container) => {
  let addr = getElement(container.children, 'tag', 'div', 'address').children[0].data;

  addr = addr.split('\n');
  addr = addr.map(str => Formatter.removeSpace(str));
  addr = addr.filter(str => str!=='');

  addr = addr.join(', ');

  return addr;
};
const dateCollect = (container) => {
  let date = getElement(container.children, 'tag', 'div', 'dates').children[0].data;

  date = date.split('\n');
  date = date.map(str => Formatter.removeSpace(str));
  date = date.filter(str => str!=='');

  date = date.join(', ');

  return date;
};
const samplesCollect = (container) => {
  let samples = {
    blood: false,
    plasma: false,
    platelet: false,
  };

  let info = getDivElement(container.children, 'collect-item-middle');
  info = getDivElement(info.children, 'collect-item-middle-right');
  if (info) {
    samples.blood = getElement(info.children, 'tag', 'span', 'Sang')!==null;
    samples.plasma = getElement(info.children, 'tag', 'span', 'Plasma')!==null;
    samples.platelet = getElement(info.children, 'tag', 'span', 'Plaquettes')!==null;
  }
  return samples

};
const infoCollect = (container) => {
  let info = getDivElement(container.children, 'collect-item-middle');
  try {

    info = getDivElement(info.children, 'collect-item-middle-left  border-right ');
    info = getDivElement(info.children, 'more-infos');
    info = info.children[3];
  } catch (e) {
    // console.log(e);
    info = null;
  }
  let data = '';

  if (info) {
    data = info.data;
    data = data.split('\n');
    data = data.map(str => Formatter.removeSpace(str));
    data = data.map(str => Formatter.stripHtmlTag(str));
    data = data.map(str => Formatter.convertHtmlHEntities(str));
    data = data.filter(str => str!=='');
    data = data.join('\n');
  }

  return data;
};

const getCollects = async () => {
  const res = await axios.get(url);
  let collects = [];

  const $ = cheerio.load(res.data);
  const items = $('div.collectes-list div.collect-item');

  for (let i = 0; i<items.length; ++i) {
    let item = items[i];
    if (item && item.children) {

      let containerTop = getDivElement(item.children, 'collect-item-top');
      containerTop = getDivElement(containerTop.children, 'collect-item-top-middle');
      let infos = {
        name: getElement(containerTop.children, 'tag', 'h3', 'title').children[0].data,
        fixLocation: typeCollect(containerTop),
        addr: addrCollect(containerTop),
        dates: dateCollect(containerTop),
        sample: samplesCollect(item),
        info: infoCollect(item)
      };
      collects.push(infos);
    }
  }
  // console.log(collects)

  return collects;
};

export default getCollects;