export const getYoutubeVideoId = (url) => {
    let _id = '';
    let _url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (_url[2] !== undefined) {
        _id = _url[2].split(/[^0-9a-z_\-]/i);
        _id = _id[0];
    }
    else {
        _id = _url;
    }
    return _id;
}