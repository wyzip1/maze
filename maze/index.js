const roomList = [];

function initRooms() {
  const _roomList = [];
  const rooms = document.querySelector('.rooms');
  for (let y = 0; y < 50; y++) {
    let list = [];
    for (let x = 0; x < 50; x++) {
      const room = document.createElement('ro-om');
      room.setAttribute('x', x);
      room.setAttribute('y', y);
      rooms.appendChild(room);
      let obj = { x, y, target: room, right: undefined, left: list[list.length - 1], top: undefined, down: undefined }
      if (list[list.length - 1]) {
        list[list.length - 1].right = obj;
      }
      list.push(obj);
    }
    if (_roomList.length) {
      _roomList[y - 1].forEach((room, i) => {
        room.down = list[i];
        list[i].top = room;
      });
    }
    _roomList.push(list);
  }
  _roomList.forEach(list => roomList.push(...list))
}

initRooms();

const hasList = [];
let target = roomList[0];
const map = {
  top: 'down',
  left: 'right',
  right: 'left',
  down: 'top'
}

window.moveEach = moveEach;
window.hasList = hasList;

moveEach();

function moveEach() {
    const direction = ['top', 'left', 'right', 'down'];
    target.target.setAttribute('active', 1);

    if (hasList.indexOf(target) === -1) hasList.push(target);

    if (!target.top || hasList.indexOf(target.top) !== -1) direction.splice(direction.indexOf('top'), 1);
    if (!target.left || hasList.indexOf(target.left) !== -1) direction.splice(direction.indexOf('left'), 1);
    if (!target.right || hasList.indexOf(target.right) !== -1) direction.splice(direction.indexOf('right'), 1);
    if (!target.down || hasList.indexOf(target.down) !== -1) direction.splice(direction.indexOf('down'), 1);

    if (direction.length) {
      const randomIndex = Math.floor(Math.random() * direction.length);
      target.next = target[direction[randomIndex]];
      target[direction[randomIndex]].prev = target;
      target.target.setAttribute(direction[randomIndex], '1');
      target.next.target.setAttribute(map[direction[randomIndex]], '1')
      target = target[direction[randomIndex]];
    } else {
      target.target.setAttribute('back', '1')
      target = target.prev;
      if (!target) return cb(hasList[0]);
      target.target.setAttribute('back', '1')
    }
    setTimeout(() => {
      moveEach()
    }, 10);
}

