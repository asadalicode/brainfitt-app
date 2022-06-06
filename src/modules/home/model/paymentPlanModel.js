export class PaymentPlanModel {
  constructor() {
    this.id = 0;
    this.title = "";
    this.titleTagline = "";
    this.description = "";
    this.price = 0;
    this.isTrial = 0;
    this.trialDays = 0;
    this.interval = "";
    this.stripePriceId = "";
    this.isFamilyPlan = "";
    this.currentPackage = false;
    this.allowUser = 0;
    this.isSubscribed=false;
  }
}
