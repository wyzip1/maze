import { Scene, Room, Role } from './canvas.js'


const size = 5;
const proportion = 1;
const mapW = 100;

const role = new Role({ x: size / 2, y: size / 2, r: size / 2 });
const scene = new Scene({ width: size * mapW, height: size * mapW * proportion });
document.body.appendChild(scene.domEl);
const roomList = [];
window.roomList = roomList;
window.scene = scene
window.Room = Room;
window.role = role;
createRooms();
scene.render();
scene.add(role);

function createRooms() {
  const _roomList = [];
  for (let y = 0; y < scene.height / size; y++) {
    const list = [];
    for (let x = 0; x < scene.width / size; x++) {
      let room = new Room({ x: x * size, y: y * size, size });
      if (list.length) list[list.length - 1].right = room;
      room.left = list[list.length - 1];
      list.push(room);
    }
    if (_roomList.length) _roomList[y - 1].forEach((room, index) => {
      room.down = list[index];
      list[index].top = room;
    });
    _roomList.push(list);
  }
  _roomList.forEach(list => roomList.push(...list));
  scene.add(...roomList);
}

const map = {
  top: 'down',
  left: 'right',
  right: 'left',
  down: 'top'
}
moveEachAnimation(roomList[Math.floor(Math.random() * roomList.length)]);

function moveEachAnimation(room) {
  const direction = ['top', 'left', 'right', 'down'];
  room.active();
  room.each = true;


  if (!room.left || room.left.each) direction.splice(direction.indexOf('left'), 1);
  if (!room.right || room.right.each) direction.splice(direction.indexOf('right'), 1);
  if (!room.top || room.top.each) direction.splice(direction.indexOf('top'), 1);
  if (!room.down || room.down.each) direction.splice(direction.indexOf('down'), 1);

  if (direction.length) {
    const randomIndex = Math.floor(Math.random() * direction.length);
    room.next = room[direction[randomIndex]];
    room.clearWall(direction[randomIndex]);
    scene.createModel[scene.registerType.SQUERE](room.props);
    room.lines.forEach(line => scene.createModel[scene.registerType.LINE](line.props));
    room.next.active();
    room.next.clearWall(map[direction[randomIndex]]);
    room.next.prev = room;
    room = room.next;
    scene.createModel[scene.registerType.SQUERE](room.props);
    room.lines.forEach(line => scene.createModel[scene.registerType.LINE](line.props));
  } else {
    room.back();
    scene.createModel[scene.registerType.SQUERE](room.props);
    room.lines.forEach(line => scene.createModel[scene.registerType.LINE](line.props));
    if (!room.prev) {
      role.setPos(room.props.x + size / 2, room.props.y + size / 2);
      scene.createModel[scene.registerType.CIRCLE](role.props);
      return;
    };
    room = room.prev;
    room.back();
    scene.createModel[scene.registerType.SQUERE](room.props);
    room.lines.forEach(line => scene.createModel[scene.registerType.LINE](line.props));
  }
  role.setPos(room.props.x + size / 2, room.props.y + size / 2);
  scene.createModel[scene.registerType.CIRCLE](role.props);
  setTimeout(() => {
    moveEachAnimation(room);
  }, 10);
}
// moveEach(roomList[0]);
function moveEach(room) {
  const direction = ['top', 'left', 'right', 'down'];
  room.active();
  room.each = true;

  if (!room.left || room.left.each) direction.splice(direction.indexOf('left'), 1);
  if (!room.right || room.right.each) direction.splice(direction.indexOf('right'), 1);
  if (!room.top || room.top.each) direction.splice(direction.indexOf('top'), 1);
  if (!room.down || room.down.each) direction.splice(direction.indexOf('down'), 1);

  if (direction.length) {
    const randomIndex = Math.floor(Math.random() * direction.length);
    room.next = room[direction[randomIndex]];
    room.clearWall(direction[randomIndex]);
    room.next.active();
    room.next.clearWall(map[direction[randomIndex]]);
    room.next.prev = room;
    room = room.next;
  } else {
    room.back();
    room = room.prev;
    if (!room) return scene.render();
    room.back();
  }
  setTimeout(() => {
    moveEach(room);
  }, 10);
}