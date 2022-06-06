export class SessionsModel {
  constructor() {
    this.id = null;
    this.label = "";
    this.title = "";
    this.session = "";
    this.isComplete = false;
    this.nextInterval = "";
    this.nextStep = "";
    this.price = 0;
    this.isPaid = false;
    this.selected = false;
    this.status = "";
    this.isMaintenance = false;
  }
}
