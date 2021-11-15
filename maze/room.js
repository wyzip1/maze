const template = document.createElement('template');

template.innerHTML = `
  <style>
    .room {
      width: 10px;
      height: 10px;
      background-color: #5e5e5e;
      position: absolute;
      left: 0;
      top: 0;
      border: 1px solid #000;
    }
    .active.room {
      background: #fff;
    }
    .active.room.back {
      background: #eee;
    }
    .active.room.back.check {
      background: #3b85f5;
    }
  </style>

  <div class="room"></div>
`;

class Room extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['x', 'y', 'active', 'back', 'left', 'top', 'down', 'right', 'check']
  }

  left_wall = true;
  top_wall = true;
  right_wall = true;
  down_wall = true;

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'x') {
      this.shadowRoot.querySelector('.room').style.left = newValue * 10 + 'px';
    } else if (name === 'y') {
      this.shadowRoot.querySelector('.room').style.top = newValue * 10 + 'px';
    } else if (name === 'active' && Number(newValue)) {
      this.shadowRoot.querySelector('.room').classList.add('active');
    } else if (name === 'back' && Number(newValue)) {
      this.shadowRoot.querySelector('.room').classList.add('back');
    } else if (name === 'left') {
      this.shadowRoot.querySelector('.room').style.borderLeftColor = 'transparent';
      this.left_wall = false;
    } else if (name === 'top') {
      this.shadowRoot.querySelector('.room').style.borderTopColor = 'transparent';
      this.top_wall = false;
    } else if (name === 'down') {
      this.shadowRoot.querySelector('.room').style.borderDownColor = 'transparent';
      this.down_wall = false;
    } else if (name === 'right') {
      this.shadowRoot.querySelector('.room').style.borderRightColor = 'transparent';
      this.right_wall = false;
    } else if (name === 'check'){
      this.shadowRoot.querySelector('.room').classList.add('check');
    }
  }
}

customElements.define('ro-om', Room);