import {AllHtmlEntities} from 'html-entities';

const Formatter = {
    removeSpace: (str) => (str.replace(/ +(?= )/g,'')).trimStart().trimEnd(),
    stripHtmlTag: (str) => (str.replace(/<[^>]*>/g, '')),
    convertHtmlHEntities: (str) => {
      const entities = new AllHtmlEntities();
      return entities.decode(str);
    }
};

export default Formatter;