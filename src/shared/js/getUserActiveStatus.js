import { getUserData } from "./userCredential";

export const getUserActiveStatus = () => {
    return getUserData()?.status;
};
