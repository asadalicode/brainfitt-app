import { backendCall } from "../../../shared/backendService/backendCall";
import { playListCategoryEnum } from "../../../shared/js/enums";
import environment from "../../../environment";

export const startDateTimeActivityAPICall = async (start_date) => {
  let _url = "user/entry_date";
  let _data = {
    start_date,
  };
  let _response = false;
  await backendCall(_url, "POST", _data, false, false).then(
    async (response) => {
      _response = {
        success: !response?.error,
        data: response?.data,
      };
    }
  );

  return _response;
};
export const endDateTimeActivityAPICall = async (data) => {
  let _url = "user/leave_date";
  let _data = {
    end_date: data?.endDate,
    entry_id: data?.entryId,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data, false, false).then(
    async (response) => {
      _isSuccess = !response.error;
    }
  );

  return _isSuccess;
};
export const setHappinessScoreAPICall = async (mood) => {
  let _url = "user/happiness_score";
  let _data = {
    mood,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data, false).then(async (response) => {
    _isSuccess = !response.error;
  });

  return _isSuccess;
};
export const setUserActivitiesAPICall = async (audio_id) => {
  let _url = "user/set_activity";
  let _data = {
    audio_id,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data, false).then(async (response) => {
    _isSuccess = !response.error;
  });

  return _isSuccess;
};
export const getHappinessScoreAPICall = async (type) => {
  let _response;
  let _url = `user/happiness_score?filter=${type}`;
  await backendCall(_url, "GET").then((data) => {
    _response = data?.data;
    let _data;
    let finalList = [];

    let dataList = data?.data.map((item, index) => {
      const { date, month_name, day, score } = item;
      _data = {
        date: day || date || month_name,
        score: parseInt(score),
      };
      return _data;
    });
    if (type === "daily" && dataList.length > 3) {
      finalList[0] = dataList[0];
      finalList[1] = dataList[1];
      finalList[2] = dataList[2];
    } else if (type === "monthly" && dataList.length > 6) {
      finalList[0] = dataList[0];
      finalList[1] = dataList[1];
      finalList[2] = dataList[2];
      finalList[3] = dataList[3];
      finalList[4] = dataList[4];
      finalList[5] = dataList[5];
    } else {
      finalList = dataList;
    }
    _response = { data: finalList, success: !data?.error };
  });
  return _response;
};
export const getMyActivityAPICall = async (type) => {
  let _weeklyArray = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let _monthlyArray = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December' 
  ];
  let _response;
  let _url = `user/user_activities?filter=${type}`;
  await backendCall(_url, "GET").then((data) => {
    _response = data?.data;
    let _data;
    let finalList = [];
    let dataList = data?.data.map((item, index) => {
      const { date, day, month_name, total_score } = item;
      _data = {
        date: day || date || month_name,
        total_score: parseInt(total_score),
      };
      return _data;
    });
    if (type === "daily" && dataList.length > 3) {
      finalList[0] = dataList[0];
      finalList[1] = dataList[1];
      finalList[2] = dataList[2];
    } else if (type === "monthly") {
      let TotalMonths = []
      _monthlyArray.map((month, index) => {
        let _value = 0;
        let _month = dataList.find(
          (monthItem) =>
            monthItem.date.toLocaleLowerCase() === month.toLocaleLowerCase()
        );
        if (_month) {
          _value = _month.total_score;
        }
        TotalMonths[index] = { date: month, total_score: _value };
        // finalList[index] = { date: month, total_score: _value };
      })
      const d = new Date();
      let _currentMonth = d.getMonth()
      let _monthCount = 12

      TotalMonths.map((month , index) => {
        if(index < 6){
          if(_currentMonth - index >= 0){
            finalList.unshift(TotalMonths[_currentMonth - index])
          }else{
            finalList.unshift(TotalMonths[((_currentMonth - index) + _monthCount)])
          }
        }
      })

    } else if (type === "weekly") {
      _weeklyArray.map((day, index) => {
        let _value = 0;
        let _weekDay = dataList.find(
          (weekItem) =>
            weekItem.date.toLocaleLowerCase() === day.toLocaleLowerCase()
        );
        if (_weekDay) {
          _value = _weekDay.total_score;
        }
        finalList[index] = { date: day, total_score: _value };
      });
    } else {
      finalList = dataList;
    }

    _response = { data: finalList, success: !data?.error };
  });
  return _response;
};
export const getSummaryStatsAPICall = async (type) => {
  let _response;
  let _url = `user/summary_stats?filter=${type}`;
  await backendCall(_url, "GET").then((data) => {
    _response = {
      success: !data?.error,
      data: data?.data,
    };
  });
  return _response;
};
export const getCheckHappinessScoreStatusAPICall = async () => {
  let _response;
  let _url = `user/check_happiness_score_status`;
  await backendCall(_url, "GET").then((data) => {
    _response = {
      success: !data?.error,
      isSubmited: data?.data?.already_submitted ? false : true,
    };
  });
  return _response;
};
export const getSimulatorImagesAPICall = async () => {
  let _response;
  let _url = `user/simulator_images`;
  await backendCall(_url, "GET").then((data) => {
    let _data;
    let dataList = data?.data.map((item, index) => {
      const { title, image_url } = item;
      _data = {
        title: title,
        imageUrl: image_url,
      };
      return _data;
    });
    _response = { data: dataList, success: !data?.error };
  });
  return _response;
};
