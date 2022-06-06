export class SessionTaskModel {
  constructor() {
    this.id = null;
    this.title = "";
    this.description = "";
    this.audioUrl = "";
    this.pdfUrl = "";
    this.isPdfUrl = false;
    this.googleFormLink = "";
    this.googleFormId = null;
    this.preInterval = 0;
    this.nextStep = null;
    this.taskValue = null;
    this.previousReq = null;
    this.isPaid = 0;
    this.postAssessmentForm = null;
    this.isComplete = false;
    this.isLock = false;
    this.status = "";
    this.lessonPdf = "";
    this.month = 0;
    this.isShow = false;
    this.isLessonPdf = false;
    this.notificationPreviousReq = null;
  }
}
