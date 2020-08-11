
export class Canvas {
  constructor(parent = document.body) {
    this.canvas = document.createElement('canvas');
    const viewport = this.getViewport();

    this.canvas.width = viewport[0];
    this.canvas.height = viewport[1]
    parent.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  getViewport() {

    let viewPortWidth;
    let viewPortHeight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
     viewPortWidth = window.innerWidth,
     viewPortHeight = window.innerHeight
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined'
    && typeof document.documentElement.clientWidth !=
    'undefined' && document.documentElement.clientWidth != 0) {
      viewPortWidth = document.documentElement.clientWidth,
      viewPortHeight = document.documentElement.clientHeight
    }

    // older versions of IE
    else {
     viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
     viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
    }
    return [viewPortWidth, viewPortHeight];
  }

  drawCircle(actor) {
    this.ctx.beginPath();
    this.ctx.arc(actor.position.x, actor.position.y, actor.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = actor.color;
    this.ctx.fill();
  }

  sync(state) {
    this.clearDisplay();
    this.drawActors(state.actors);
  }

  clearDisplay() {

    /**
     * If the rgba opacity is set to 1, there
     * will be no trail. The lower the opacity,
     * the longer the trail.
     **/
    this.ctx.fillStyle = 'rgba(255, 255, 255, .4)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawActors(actors) {
    for (let actor of actors) {
      if (actor.type === 'circle') {
        this.drawCircle(actor);
      }
    }
  }

}