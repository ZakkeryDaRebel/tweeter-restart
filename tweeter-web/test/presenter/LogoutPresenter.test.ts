import {
  anything,
  instance,
  mock,
  spy,
  verify,
  when,
} from "@typestrong/ts-mockito";
import {
  LogoutPresenter,
  LogoutView,
} from "../../src/presenter/LogoutPresenter";
import { AuthToken } from "tweeter-shared";
import { UserService } from "../../src/model.service/UserService";

describe("AppNavbarPresenter / LogoutPresenter", () => {
  let mockLogoutPresenterView: LogoutView;
  let logoutPresenter: LogoutPresenter;
  let mockService: UserService;

  const authToken = new AuthToken("token", Date.now());
  const messageId = "messageId123";

  beforeEach(() => {
    mockLogoutPresenterView = mock<LogoutView>();
    const mockLogoutPresenterViewInstance = instance(mockLogoutPresenterView);
    when(mockLogoutPresenterView.displayInfoMessage(anything(), 0)).thenReturn(
      messageId,
    );

    const logoutPresenterSpy = spy(
      new LogoutPresenter(mockLogoutPresenterViewInstance),
    );
    logoutPresenter = instance(logoutPresenterSpy);

    mockService = mock<UserService>();
    //when(logoutPresenter.userService).thenReturn(instance(mockService));
    Object.defineProperty(logoutPresenter, "userService", {
      get: () => instance(mockService),
    });
  });

  it("tells the view to display a logging out message", async () => {
    await logoutPresenter.logOut(authToken);

    verify(mockLogoutPresenterView.displayInfoMessage("Logging Out...", 0))
      .once;
  });

  it("calls logout on the user service with the correct auth token", async () => {
    await logoutPresenter.logOut(authToken);
    verify(mockService.logout(authToken)).once();

    // let [capturedAuthToken] = capture(mockService.logout).last();
    // expect(capturedAuthToken).toEqual(authToken);
  });

  it("tells the view to clear the info message that was displayed previously, clear the user info, and navigate to the login page when successful", async () => {
    await logoutPresenter.logOut(authToken);

    verify(mockLogoutPresenterView.deleteMessage(messageId)).once();
    verify(mockLogoutPresenterView.clearUserInfo()).once();
    verify(mockLogoutPresenterView.navigate("/login")).once();

    verify(mockLogoutPresenterView.displayErrorMessage(anything())).never();
  });

  it("tells the view to display an error message and does not tell it to clear the info message, clear the user info or navigate to the login page when unsuccessful", async () => {
    let error = new Error("An error occurred");

    when(mockService.logout(anything())).thenThrow(error);

    await logoutPresenter.logOut(authToken);

    verify(
      mockLogoutPresenterView.displayErrorMessage(
        "Failed to log user out because of exception: An error occurred",
      ),
    ).once();

    verify(mockLogoutPresenterView.deleteMessage(anything())).never();
    verify(mockLogoutPresenterView.clearUserInfo()).never();
    verify(mockLogoutPresenterView.navigate("/login")).never();
  });
});
