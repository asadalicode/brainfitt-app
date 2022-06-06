import { backendCall } from "../../../../shared/backendService/backendCall";


export const getNotificationAPICall = async (limit, offset) => {
    let _response;
    let _url = `user/notifications?limit=${limit}&offset=${offset}`;
    await backendCall(
        _url,
        'GET'
    ).then((data)=>{
        _response = {
            count: data?.data?.count,
            unseen: data?.data?.unseen_count,
            rows: data?.data?.rows,
            success: !data?.error
        }
    });
    return _response
}
export const setUnseenAPICall = async () => {
    let _response;
    let _url = `user/is_seen_all`;
    await backendCall(
        _url,
        'POST'
    ).then((data)=>{
        _response = {
            success: !data?.error
        }
    });
    return _response
}