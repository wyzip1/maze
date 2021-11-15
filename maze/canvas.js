class Scene {
  domEl = document.createElement('canvas');
  ctx = this.domEl.getContext('2d');
  children = [];

  constructor(options = {}) {
    const { width = 500, height = 500 } = options
    this.width = width;
    this.height = height;
    this.domEl.width = this.width;
    this.domEl.height = this.height;
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.children.forEach(obj => {
      this.createModel[obj.type](obj.props);
      if (obj.type === this.registerType.SQUERE) obj.lines.forEach(line => {
        this.createModel.Line(line.props);
      })
    });
  }

  add(...rest) {
    this.children.push(...rest);
  }

  registerType = {
    SQUERE: 'Squere',
    LINE: 'Line',
    CIRCLE: 'circle'
  }

  createModel = {
    [this.registerType.SQUERE]: ({ x, y, width, height, bgColor, active, activeColor, back, backColor }) => {
      this.ctx.beginPath();
      this.ctx.fillStyle = back ? backColor : active ? activeColor : bgColor;
      this.ctx.fillRect(x, y, width, height);
      this.ctx.closePath();
      this.ctx.stroke();
    },
    [this.registerType.LINE]: ({ start, end, color, lineWidth }) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.lineWidth = lineWidth
      this.ctx.moveTo(start[0], start[1]);
      this.ctx.lineTo(end[0], end[1]);
      this.ctx.closePath();
      this.ctx.stroke();
    },
    [this.registerType.CIRCLE]: ({ x, y, r, color }) => {
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#fff'
      this.ctx.fillStyle = color;
      this.ctx.arc(x, y, r, Math.PI * 2, 0, true);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    }
  }
}

class Room {
  type = 'Squere'
  lines = [];
  hasWall = ['left', 'right', 'down', 'top'];
  left = undefined;
  top = undefined;
  right = undefined;
  down = undefined;
  props = {};
  each = false;

  constructor(options = {}) {
    const { x, y, size = 10, bgColor = '#5e5e5e', active = false, activeColor = '#fff', back = false, backColor = '#eee' } = options;
    this.props.x = x;
    this.props.y = y;
    this.props.width = size;
    this.props.height = size;
    this.props.bgColor = bgColor;
    this.props.active = active;
    this.props.activeColor = activeColor;
    this.props.back = back;
    this.props.backColor = backColor;
    Object.freeze(this.type);
    this.createWall();
  }
  createWall() {
    this.lines = [];
    if (this.hasWall.includes('left')) this.lines.push(new Line({ start: [this.props.x, this.props.y], end: [this.props.x, this.props.y + this.props.height] }));
    if (this.hasWall.includes('right')) this.lines.push(new Line({ start: [this.props.x + this.props.width, this.props.y], end: [this.props.x + this.props.width, this.props.y + this.props.height] }));
    if (this.hasWall.includes('down')) this.lines.push(new Line({ start: [this.props.x, this.props.y + this.props.height], end: [this.props.x + this.props.width, this.props.y + this.props.height] }));
    if (this.hasWall.includes('top')) this.lines.push(new Line({ start: [this.props.x, this.props.y], end: [this.props.x + this.props.height, this.props.y] }));
  }

  clearWall(key) {
    const index = this.hasWall.indexOf(key);
    index !== -1 && this.hasWall.splice(index, 1);
    this.createWall();
  };

  active() {
    this.props.active = true;
  }

  back() {
    this.props.back = true;
  }
}


class Line {
  type = 'Line';
  props = {};

  constructor(options = {}) {
    const { start, end, color = '#000', lineWidth = 1 } = options;
    this.props.start = start;
    this.props.end = end;
    this.props.color = color;
    this.props.lineWidth = lineWidth;
  }
}

class Role {
  type = 'circle';
  props = {};
  constructor(options) {
    const { x, y, r, color = '#766bef' } = options;
    this.props.x = x;
    this.props.y = y;
    this.props.r = r;
    this.props.color = color;
  }

  setPos(x, y) {
    this.props.x = x;
    this.props.y = y;
  }
}

export { Room, Scene, Role }