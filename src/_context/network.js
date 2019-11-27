import vserver from './vserver';


function fetch(data) {
  return new Promise((resolve) => {
    vserver(data, resolve);
  });
}


const network = {
  fetch,
};


export default network;