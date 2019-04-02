const getElement = (list, type, tag, className) => {
  let element = null;

  for (let i = 0; i<list.length; ++i) {
    let item = list[i];
    if (item.type===type&& item.name===tag && item.attribs.class===className) {
      element = item;
      break;
    }
  }

  return element;
};

export default getElement;