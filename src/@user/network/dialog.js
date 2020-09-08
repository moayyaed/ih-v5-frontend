import core from 'core';

function preparationData(data) {
  let count = 0;
  let step = 0;

  const itemsX = {};
  const itemsY = {};
  const delta = document.body.clientHeight - data.settings.h.value;

  Object
    .keys(data.elements)
    .forEach(id => {
      const item = data.elements[id];
      if (itemsY[item.y.value] === undefined) {
        itemsY[item.y.value] = [];
      }
      if (item.type === 'expand') {
        itemsY[item.y.value].push(item.type);
        count++;
      } else {
        itemsY[item.y.value].push(id);
      }
    });

    Object
    .keys(itemsY)
    .forEach(id => {
      if (itemsY[id].includes('expand')) {
        step++;
      }
      if (step) {
        itemsY[id].forEach(id => {
          if (id !== 'expand') {
            const offset = delta * (step / count)
            data.elements[id].y.value = data.elements[id].y.value + offset;
          }
        })
      }
    })

  const dialogPosition = data.settings.position.value.id;

  if (dialogPosition === 'right' || dialogPosition === 'left') {
    data.settings.fitH.value = true;
    data.settings.fitW.value = false;

    data.settings.alignW.value.id = 'center';
    data.settings.alignH.value.id = 'flex-start'

    data.settings.scrollY.value = true;
  }

  if (dialogPosition === 'top' || dialogPosition === 'bottom') {
    data.settings.fitH.value = false;
    data.settings.fitW.value = true;

    data.settings.alignW.value.id = 'flex-start';
    data.settings.alignH.value.id = 'center'

    data.settings.scrollX.value = true;
  }

  return data;
}

core.network.request('applayout_dialog', (send, context) => {
  send({ api: 'dialog', id: context.params.id },);
})


core.network.response('applayout_dialog', (answer, res, context) => {
  answer(preparationData(res.data));
})