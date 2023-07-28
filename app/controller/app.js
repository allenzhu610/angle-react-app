const Controller = require("egg").Controller;

class AppController extends Controller {
  async index(ctx) {
    const locals = {
      title: 'ENOW-MathEditor',
      chunks: ["mathEditor"],
    };
    await this.ctx.render("index.html", locals);
  }
}

module.exports = AppController;
