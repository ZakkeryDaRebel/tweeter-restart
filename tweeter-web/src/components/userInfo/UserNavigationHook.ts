import { AuthToken, User, FakeData } from "tweeter-shared";
import { useMessageActions } from "../toaster/MessageHooks";
import { useUserInfo, useUserInfoActions } from "./UserInfoHooks";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  UserNavigationPresenter,
  UserNavigationView,
} from "../../presenter/UserNavigationPresenter";

export const useUserNavigation = () => {
  const { displayErrorMessage } = useMessageActions();
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();

  const navigate = useNavigate();

  const listener: UserNavigationView = {
    setDisplayedUser: setDisplayedUser,
    navigate: navigate,
    displayErrorMessage: displayErrorMessage,
  };

  const presenterRef = useRef<UserNavigationPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = new UserNavigationPresenter(listener);
  }

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    presenterRef.current!.navigateToUser(
      event.target.toString(),
      authToken!,
      displayedUser!,
    );
  };

  return {
    navigateToUser,
  };
};
