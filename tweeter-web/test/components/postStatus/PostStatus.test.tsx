import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import userEvent from "@testing-library/user-event";

describe("PostStatus Component", () => {
  it("starts with the post status and clear buttons disabled", async () => {});
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

  const textField = screen.getByLabelText("text-field");
  const postStatusButton = screen.getByRole("button", { name: /Post Status/ });
  const clearButton = screen.getByRole("button", { name: /Clear/ });

  return { user, textField, postStatusButton, clearButton };
}
