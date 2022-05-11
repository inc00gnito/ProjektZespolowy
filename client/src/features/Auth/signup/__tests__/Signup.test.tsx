import Signup from "../Signup";
import { render, screen, fireEvent } from "@testing-library/react";
import { ISignup } from "app/model/authentication";
import { createContext, useContext } from "react";

const dbUser = {
  username: "test",
  email: "test@gmail.com",
  password: "Test123!",
};

class AuthenticationStore {
  signup = async (creds: ISignup) => {};
}

const stores = {
  authenticationStore: new AuthenticationStore(),
};

const Context = createContext(stores);

const useStore = () => {
  const appContext = useContext(Context);
  return appContext;
};

jest.mock("app/provider/Provider", () => ({
  useAuthenticationStore() {
    const { authenticationStore } = useStore();
    return authenticationStore;
  },
}));

describe("form test", () => {
  let emailInput: HTMLElement,
    usernameInput: HTMLElement,
    passwordInput: HTMLElement,
    confirmPasswordInput: HTMLElement,
    button: HTMLElement;

  beforeEach(() => {
    render(<Signup />);
    emailInput = screen.getByLabelText("E-mail*");
    usernameInput = screen.getByLabelText("Username*");
    passwordInput = screen.getByLabelText("Password*");
    confirmPasswordInput = screen.getByLabelText("Confirm Password*");
    button = screen.getByTestId("submitButton");
  });

  it("empty form, expect email, username, password field errors", async () => {
    const emptyUser = { email: "", username: "", password: "" };
    fireEvent.change(emailInput, emptyUser.email);
    fireEvent.change(usernameInput, emptyUser.username);
    fireEvent.change(passwordInput, emptyUser.password);
    fireEvent.change(confirmPasswordInput, emptyUser.password);

    fireEvent.click(button);

    await new Promise((r) => setTimeout(r, 100));
    const errors = screen.getAllByLabelText("error");

    expect(errors).toHaveLength(3);
    errors.map((error) =>
      expect(error.textContent).toBe("This field is required")
    );
  });
});
