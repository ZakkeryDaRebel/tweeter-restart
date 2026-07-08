import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useUserInfo } from "../../../src/components/userInfo/UserInfoHooks";
import { AuthToken, User } from "tweeter-shared";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { PostStatusPresenter } from "../../../src/presenter/PostStatusPresenter";

const post: string = "Hello world!";
const currentUser: User = new User(
  "firstName",
  "lastName",
  "@FakeAlias",
  "image-url",
);
const authToken: AuthToken = new AuthToken("token", Date.now());

jest.mock("../../../src/components/userInfo/UserInfoHooks", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHooks"),
  __esModule: true,
  useUserInfo: jest.fn(),
}));

describe("PostStatus Component", () => {
  beforeAll(() => {
    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: currentUser,
      authToken: authToken,
    });
  });

  it("starts with the post status and clear buttons disabled", async () => {
    const { postStatusButton, clearButton } = renderPostStatusAndGetElements();

    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("enables both buttons when the text field has text", async () => {
    await createPost();
  });

  it("enables both buttons to be disabled when text is cleared", async () => {
    const { postStatusButton, clearButton, user, textField } =
      await createPost();

    await user.click(clearButton);

    expect(textField).toBeEmptyDOMElement;
    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("calls the presenter's postStatus method with correct parameters when the Post Status button is pressed", async () => {
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const { postStatusButton, user } = await createPost(mockPresenterInstance);

    await user.click(postStatusButton);

    verify(mockPresenter.submitPost(currentUser, authToken, post)).once();
  });
});

function renderPostStatus(presenter?: PostStatusPresenter) {
  return render(
    <MemoryRouter>
      {!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}
    </MemoryRouter>,
  );
}

function renderPostStatusAndGetElements(presenter?: PostStatusPresenter) {
  const user = userEvent.setup();

  renderPostStatus(presenter);

  const textField = screen.getByLabelText("text");
  const postStatusButton = screen.getByRole("button", { name: /Post Status/ });
  const clearButton = screen.getByRole("button", { name: /Clear/ });

  return { user, textField, postStatusButton, clearButton };
}

async function createPost(presenter?: PostStatusPresenter) {
  const { postStatusButton, clearButton, user, textField } =
    renderPostStatusAndGetElements(presenter);

  await user.type(textField, post);

  expect(postStatusButton).toBeEnabled();
  expect(clearButton).toBeEnabled();

  return { postStatusButton, clearButton, user, textField };
}
