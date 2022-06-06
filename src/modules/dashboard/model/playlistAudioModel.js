export class PlaylistAudioModel {
  constructor() {
    this.id = null;
    this.title = "";
    this.image = "";
    this.music = "";
    this.isLock = "";
    this.isPlay = false;
    this.status = "";
    this.myPlayerIndex = null; // myPlayIndex value indicate which player category currenty play in bottom audio play , its value come from playListCategoryEnum which define in enums file.
  }
}
