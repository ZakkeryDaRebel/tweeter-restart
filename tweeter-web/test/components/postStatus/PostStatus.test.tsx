import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { useUserInfo } from "../../../src/components/userInfo/UserInfoHooks";
import { AuthToken, User } from "tweeter-shared";

const post: string = "Hello world!";

describe("PostStatus Component", () => {
  it("starts with the post status and clear buttons disabled", async () => {
    const { postStatusButton, clearButton } = renderPostStatusAndGetElements();

    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("enables both buttons when the text field has text", async () => {
    const { postStatusButton, clearButton, user, textField } =
      renderPostStatusAndGetElements();

    await user.type(textField, post);

    expect(postStatusButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
  });
});

function renderPostStatus() {
  return render(
    <MemoryRouter>
      <PostStatus />
    </MemoryRouter>,
  );
}

function renderPostStatusAndGetElements() {
  const user = userEvent.setup();

  renderPostStatus();

  const textField = screen.getByLabelText("text");
  const postStatusButton = screen.getByRole("button", { name: /Post Status/ });
  const clearButton = screen.getByRole("button", { name: /Clear/ });

  return { user, textField, postStatusButton, clearButton };
}
