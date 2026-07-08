import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { LoginPresenter } from "../../../../src/presenter/LoginPresenter";
import { instance, mock, verify } from "@typestrong/ts-mockito";

library.add(fab);

const alias = "@Name";
const password = "MyPassword";

describe("Login Component", () => {
  it("starts with the sign-in button disabled", () => {
    const { signInButton } = renderLoginAndGetElements("/");
    expect(signInButton).toBeDisabled();
  });

  it("enables the sign in button if both alias and password fields have text", async () => {
    await enableButton("/");
  });

  it("disables the sign in button if either the alias or the password field is cleared", async () => {
    const { signInButton, aliasField, passwordField, user } =
      await enableButton("/");

    await user.clear(aliasField);
    expect(signInButton).toBeDisabled();

    await user.type(aliasField, "a");
    expect(signInButton).toBeEnabled();

    await user.clear(passwordField);
    expect(signInButton).toBeDisabled();
  });

  it("call's the presenter's login method with correct parameters when the sign in button is pressed", async () => {
    const mockPresenter = mock<LoginPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const originalUrl = "http://somewhere.com";

    const { signInButton, user } = await enableButton(
      originalUrl,
      mockPresenterInstance,
    );

    await user.click(signInButton);

    verify(mockPresenter.doAuthentication(alias, password)).once();
  });
});

function renderLogin(originalUrl: string, presenter?: LoginPresenter) {
  return render(
    <MemoryRouter>
      {!!presenter ? (
        <Login originalUrl={originalUrl} presenter={presenter}></Login>
      ) : (
        <Login originalUrl={originalUrl}></Login>
      )}
    </MemoryRouter>,
  );
}

function renderLoginAndGetElements(
  originalUrl: string,
  presenter?: LoginPresenter,
) {
  const user = userEvent.setup();

  renderLogin(originalUrl, presenter);

  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const aliasField = screen.getByLabelText("alias");
  const passwordField = screen.getByLabelText("password");

  return { user, signInButton, aliasField, passwordField };
}

async function enableButton(originalUrl: string, presenter?: LoginPresenter) {
  const { signInButton, aliasField, passwordField, user } =
    renderLoginAndGetElements(originalUrl, presenter);

  await user.type(aliasField, alias);
  await user.type(passwordField, password);

  expect(signInButton).toBeEnabled();

  return { signInButton, aliasField, passwordField, user };
}
