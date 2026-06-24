import { AuthToken, User, FakeData } from "tweeter-shared";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "./UserInfoHooks";
import { useNavigate } from "react-router-dom";

export const useUserNavigation = () => {
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();

  const navigate = useNavigate();

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());
      const featurePath = extractPath(event.target.toString());

      const toUser = await getUser(authToken!, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`${featurePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const extractPath = (value: string): string => {
    const index = value.indexOf("@");
    console.log("Value: ", value);
    const beforeIndex = value.substring(0, index - 1);
    console.log("Before index: ", beforeIndex);
    const slashIndex = beforeIndex.lastIndexOf("/");
    const featurePath = beforeIndex.substring(slashIndex);
    console.log("Feature path: ", featurePath);
    return featurePath;
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string,
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  return {
    navigateToUser,
  };
};
