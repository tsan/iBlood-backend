import axios from "axios";
import cheerio from "cheerio";

const urlCollectDate = 'https://www.blutspende.ch/fr/don_de_sang/dates_de_collecte_de_sang/terminliste?utf8=%E2%9C%93&blood_donation_search%5Bsearch_term%5D=&blood_donation_search%5Bsurrounding_search%5D=0&blood_donation_search%5Bradius%5D=5&blood_donation_search%5Bstart_date_h%5D=&commit=chercher';

const getCollects = async () => {
  const res = await axios.get(urlCollectDate);

  const $ = cheerio.load(res.data);
  const collectsTarget = $('div.termin');
  let collects = [];
  for (let i = 0; i < collectsTarget.length; ++i) {
    collects.push(getInfoCollect(collectsTarget[i]));
  }

  return collects;
};

const getInfoCollect = (element) => {
  let info = {};
  let pp = getPlaceAndPeriod(element);

  info.name = pp[0];
  info.fixLocation = false;
  info.date = getDate(element);
  info.info = pp[2];
  info.addr = `${pp[1]}, ${pp[0]}`;
  info.sample = {blood: true, plasma: true, platelet: true};

  return info;
};
const getDate = (element) => {
  const className = 'termindatum';
  const tag = 'strong';
  let dateContainer = null;
  let date = "";

  for (let i = 0; i < element.children.length; ++i) {
    if (element.children[i].type==='tag' && element.children[i].attribs.class === className) {
      dateContainer = element.children[i];
      break;
    }
  }

  if (dateContainer) {
    for (let i = 0; i < dateContainer.children.length; ++i) {
      if (dateContainer.children[i].type==='tag' && dateContainer.children[i].name === tag) {
        date = dateContainer.children[i].children[0].data;
        break;
      }
    }
  }
  return date;
};
const getPlaceAndPeriod = (element) => {
  const className = 'terminort';
  let placeContainer = null;
  let data = ["","",""];

  for (let i = 0; i < element.children.length; ++i) {
    if (element.children[i].type==='tag' && element.children[i].attribs.class === className) {
      placeContainer = element.children[i];
      break;
    }
  }

  if (placeContainer) {

    data = placeContainer.children.map(i => {
      if (i.type === 'text')
        return i.data.replace(/\n/g, '').replace(/ +(?= )/g,'').trimStart().trimEnd()
      else if (i.children.length>0)
        return i.children[0].data;
    });
    data = data.filter(el => el && el!=='');
  }

  return data;
};

export default getCollects;