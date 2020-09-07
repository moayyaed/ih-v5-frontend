import core from 'core';

function preparationData(data) {
  let count = 0;
  const expands = [];
  const itemsX = {};
  const itemsY = {};

  Object
    .keys(data.elements)
    .forEach(id => {
      const item = data.elements[id];
      if (item.type === 'expand') {
        expands.push({ x: item.x.value, y: item.y.value, w: item.w.value, h: item.h.value });
      } else {
        if (itemsX[item.x.value] === undefined) {
          itemsX[item.x.value] = [];
        }
        itemsX[item.x.value].push(id);

        if (itemsY[item.y.value] === undefined) {
          itemsY[item.y.value] = [];
        }
        itemsY[item.y.value].push(id);
      }
    });
    if (expands.length) {
      expands.reverse();
      let bottom1 = data.settings.h.value;
      let bottom2 = document.body.clientHeight

      expands.forEach(i => {
        const y = i.y + i.h;
        const items = [];

        Object
          .keys(itemsY)
          .forEach(id => {
            if (Number(id) >= y) {
              itemsY[id].forEach(i => items.push(i))
            }
          });
        if (items.length) {
          const offset =  bottom2 - bottom1;
          items.forEach(id => {
            data.elements[id].y.value = data.elements[id].y.value + offset;
          });
          bottom1 = 0;
          bottom2 = 0;
        }
      });
    }
  return data;
}

core.network.request('applayout_dialog', (send, context) => {
  send({ api: 'dialog', id: context.params.id },);
})


core.network.response('applayout_dialog', (answer, res, context) => {
  answer(preparationData(res.data));
})