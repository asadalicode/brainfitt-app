import { backendCall } from "../../../shared/backendService/backendCall";
import { playListCategoryEnum } from "../../../shared/js/enums";
import { CategoryModel } from "../model/categoryModel";
import { PlaylistAudioModel } from "../model/playlistAudioModel";
import { PlaylistModel } from "../model/playlistModel";
import environment from "../../../environment";

export const getYourPlaylistAPICall = async (
  limit = 10,
  offset = 0,
  searchField = ""
) => {
  let _url = `boost/your_playlist?order=desc&limit=${limit}&offset=${offset}`;
  if (searchField) {
    _url += `&text=${searchField}`;
  }
  let _response = {
    isSuccess: false,
    yourPlaylist: [],
    count: 0,
  };

  await backendCall(_url, "GET", {}, false).then(async (response) => {
    let _playlistModel = new PlaylistModel();

    let _yourPlaylist = [];
    if (response?.data?.rows?.length > 0) {
      _yourPlaylist = response?.data?.rows?.map((playlist) => {
        const { title, id, image_url, Audios, can_play } = playlist;
        _playlistModel = {
          id: id,
          title: title,
          imageUrl: Audios?.[0]?.image_url,
          isLock: can_play === 1 ? false : true,
        };
        return _playlistModel;
      });
    }

    _response = {
      playListId: 1,
      isSuccess: !response.error,
      yourPlaylist: _yourPlaylist,
      count: response?.data?.count || 0,
    };
  });

  return _response;
};

export const getYourPlaylistAudioAPICall = async (
  limit = 10,
  offset = 0,
  playlistId,
  searchField = ""
) => {
  let _url = `boost/your_playlist/${playlistId}?order=desc&limit=${limit}&offset=${offset}`;
  if (searchField) {
    _url += `&text=${searchField}`;
  }
  let _response = {
    isSuccess: false,
    audioPlaylist: [],
    count: 0,
  };

  await backendCall(_url, "GET", {}, false).then(async (response) => {
    let _playlistAudioModel = new PlaylistAudioModel();
    let _playListAudioList = [];
    if (response?.data?.rows?.length > 0) {
      _playListAudioList = response.data.rows.map((playlistAudio) => {
        const { title, id, image_url, audio_url, status, can_play } =
          playlistAudio;

        _playlistAudioModel = {
          id: id,
          title: title,
          image: image_url,
          music: `${environment.serverUrl}${audio_url}`,
          status: status,
          isPlay: false,
          myPlayerIndex: playListCategoryEnum.yourPlaylist,
          isLock: can_play === 1 ? false : true,
        };
        return _playlistAudioModel;
      });
    }

    _response = {
      isSuccess: !response.error,
      audioPlaylist: _playListAudioList,
      count: response?.data?.count || 0,
    };
  });

  return _response;
};

export const getAllCategoriesAPICall = async (
  limit = 5,
  offset = 0,
  searchField = ""
) => {
  let _url = `boost/categories?order=desc&limit=${limit}&offset=${offset}`;
  if (searchField) {
    _url += `&text=${searchField}`;
  }
  let _response = {
    isSuccess: false,
    categorylist: [],
    count: 0,
  };

  await backendCall(_url, "GET", {}, false).then(async (response) => {
    let _categoryModel = new CategoryModel();
    let _categorylist = [];
    if (response?.data?.rows?.length > 0) {
      _categorylist = response?.data?.rows?.map((category) => {
        const { name, id, image_url, status, can_play } = category;

        _categoryModel = {
          id: id,
          name: name,
          imageUrl: image_url,
          status: status,
          isLock: can_play === 1 ? false : true,
        };
        return _categoryModel;
      });
    }
    _response = {
      playListId: 4,
      isSuccess: !response.error,
      categorylist: _categorylist,
      count: response?.data?.count || 0,
    };
  });

  return _response;
};

export const getSingalCategoryAudiosAPICall = async (
  categoryId,
  offset = 0,
  limit = 10,
  searchField = ""
) => {
  let _url = `boost/categories/${categoryId}?order=desc&limit=${limit}&offset=${offset}`;
  if (searchField) {
    _url += `&text=${searchField}`;
  }
  let _response = {
    isSuccess: false,
    categoryAudiolist: [],
  };

  await backendCall(_url, "GET", {}, false).then(async (response) => {
    let _categoryAudioModel = new PlaylistAudioModel();
    let _categoryAudiolist = [];
    if (response?.data?.rows?.length > 0) {
      _categoryAudiolist = response.data.rows.map((categoryAudio) => {
        const { title, id, image_url, audio_url, status, can_play } =
          categoryAudio;

        _categoryAudioModel = {
          id: id,
          title: title,
          image: image_url,
          music: `${environment.serverUrl}${audio_url}`,
          status: status,
          isPlay: false,
          myPlayerIndex: playListCategoryEnum.categoryAudios,
          isLock: can_play === 1 ? false : true,
        };
        return _categoryAudioModel;
      });
    }

    _response = {
      isSuccess: !response.error,
      categoryAudiolist: _categoryAudiolist,
      count: response?.data?.count,
    };
  });

  return _response;
};

export const getSuggestedPlaylistAudiosAPICall = async (
  limit = 1,
  offset = 0,
  searchField = ""
) => {
  let _url = `boost/suggested_playlist?order=desc&limit=${limit}&offset=${offset}`;

  if (searchField) {
    _url += `&text=${searchField}`;
  }
  let _response = {
    isSuccess: false,
    suggestedPlaylist: [],
    count: 0,
  };

  await backendCall(_url, "GET", {}, false).then(async (response) => {
    let _playlistAudioModel = new PlaylistAudioModel();
    let _yourPlaylist = [];
    if (response?.data?.rows?.length > 0) {
      _yourPlaylist = response?.data?.rows?.map((playlist) => {
        const { title, id, image_url, audio_url, status, can_play } = playlist;

        _playlistAudioModel = {
          id: id,
          title: title,
          image: image_url,
          music: `${environment.serverUrl}${audio_url}`,
          status: status,
          isPlay: false,
          myPlayerIndex: playListCategoryEnum.suggestedPlayList,
          isLock: can_play === 1 ? false : true,
        };
        return _playlistAudioModel;
      });
    }

    _response = {
      playListId: 2,
      isSuccess: !response.error,
      suggestedPlaylist: _yourPlaylist,
      count: response?.data?.count || 0,
    };
  });

  return _response;
};

export const getPopularAudiosAPICall = async (
  limit = 10,
  offset = 0,
  searchField = ""
) => {
  let _url = `boost/popular_audios?limit=-1`;
  if (searchField) {
    _url += `&text=${searchField}`;
  }
  let _response = {
    isSuccess: false,
    popularAudiolist: [],
    count: 0,
  };

  await backendCall(_url, "GET", {}, false).then(async (response) => {
    let _popularAudioModel = new PlaylistAudioModel();
    let _popularAudiolist = [];
    if (response?.data?.rows?.length > 0) {
      _popularAudiolist = response?.data?.rows?.map((popularAudio) => {
        const { title, id, image_url, status, audio_url, can_play } =
          popularAudio;

        _popularAudioModel = {
          id: id,
          title: title,
          image: image_url,
          music: `${environment.serverUrl}${audio_url}`,
          status: status,
          isPlay: false,
          myPlayerIndex: playListCategoryEnum.popularAudios,
          isLock: can_play === 1 ? false : true,
        };
        return _popularAudioModel;
      });
    }

    _response = {
      playListId: 3,
      isSuccess: !response.error,
      popularAudiolist: _popularAudiolist,
      count: response?.data?.count || 0,
    };
  });

  return _response;
};

export const addNewPlaylistAPICall = async (playlistName, audioId) => {
  let _url = "boost/your_playlist";
  let _data = {
    name: playlistName,
    // audio_id: audioId.toString(),
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data, false).then(async (response) => {
    _isSuccess = !response.error;
  });

  return _isSuccess;
};

export const addAudioInPlaylistAPICall = async (playlistId, audioId) => {
  let _url = "boost/add_audio";
  let _data = {
    playlist_id: playlistId,
    audio_id: audioId.toString(),
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data, false).then(async (response) => {
    _isSuccess = !response.error;
  });

  return _isSuccess;
};
