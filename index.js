// import collect from "./src/fr/getCollects";
import collect from "./src/ch/getCollects";


const main = async () => {
  // let items = await collect.items();
  let items = await collect();
  console.log(items[0])
};

main();