import {
  anything,
  instance,
  mock,
  spy,
  verify,
  when,
  capture,
} from "@typestrong/ts-mockito";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../src/presenter/PostStatusPresenter";
import { AuthToken, User } from "tweeter-shared";
import { StatusService } from "../../src/model.service/StatusService";

const post = "Hello world!";
const user: User = new User(
  "Bob",
  "Billby",
  "@Bob-Billbly",
  "image-url-not-found",
);
const authToken: AuthToken = new AuthToken("token", Date.now());
const messageId = "messageId1234";

describe("PostStatusPresenter", () => {
  let mockPostStatusPresenterView: PostStatusView;
  let postStatusPresenter: PostStatusPresenter;
  let mockService: StatusService;

  beforeEach(() => {
    mockPostStatusPresenterView = mock<PostStatusView>();
    const mockPostPresenterViewInstance = instance(mockPostStatusPresenterView);
    when(
      mockPostStatusPresenterView.displayInfoMessage(anything(), 0),
    ).thenReturn(messageId);

    const postStatusPresenterSpy = spy(
      new PostStatusPresenter(mockPostPresenterViewInstance),
    );
    postStatusPresenter = instance(postStatusPresenterSpy);

    mockService = mock<StatusService>();
    Object.defineProperty(postStatusPresenter, "service", {
      get: () => instance(mockService),
    });
  });

  it("tells the view to display a posting status message.", async () => {
    await postStatusPresenter.submitPost(user, authToken, post);

    verify(
      mockPostStatusPresenterView.displayInfoMessage("Posting status...", 0),
    ).once();
  });

  it("calls postStatus on the post status service with the correct status string and auth token.", async () => {
    await postStatusPresenter.submitPost(user, authToken, post);

    verify(mockService.postStatus(authToken, anything())).once();
    let [, status] = capture(mockService.postStatus).last();
    expect(status.post).toEqual(post);
  });

  it("tells the view to clear the info message that was displayed previously, clear the post, and display a status posted message when successfull", async () => {
    await postStatusPresenter.submitPost(user, authToken, post);

    verify(mockPostStatusPresenterView.deleteMessage(messageId)).once();
    verify(mockPostStatusPresenterView.setPost("")).once();
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000),
    ).once();

    verify(
      mockPostStatusPresenterView.displayErrorMessage(
        "Failed to post the status because of exception: An error occurred",
      ),
    ).never();
  });

  it("tells the view to clear the info message and display an error message but does not tell it to clear the post or display a status posted message when unsuccessful", async () => {
    when(mockService.postStatus(anything(), anything())).thenThrow(
      new Error("An error occurred"),
    );

    await postStatusPresenter.submitPost(user, authToken, post);

    verify(mockPostStatusPresenterView.deleteMessage(messageId)).once();
    verify(
      mockPostStatusPresenterView.displayErrorMessage(
        "Failed to post the status because of exception: An error occurred",
      ),
    ).once();

    verify(mockPostStatusPresenterView.setPost("")).never();
    verify(
      mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000),
    ).never();
  });
});
