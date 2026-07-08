import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fab);

describe("Login Component", () => {
  it("starts with the sign-in button disabled", () => {
    const { signInButton } = renderLoginAndGetElements("/");
    expect(signInButton).toBeDisabled();
  });

  it("enables the sign in button if both alias and password fields have text", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElements("/");

    await user.type(aliasField, "a");
    await user.type(passwordField, "b");

    expect(signInButton).toBeEnabled();
  });
});

function renderLogin(originalUrl: string) {
  return render(
    <MemoryRouter>
      <Login originalUrl={originalUrl}></Login>
    </MemoryRouter>,
  );
}

function renderLoginAndGetElements(originalUrl: string) {
  const user = userEvent.setup();

  renderLogin(originalUrl);

  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const aliasField = screen.getByLabelText("alias");
  const passwordField = screen.getByLabelText("password");

  return { user, signInButton, aliasField, passwordField };
}
