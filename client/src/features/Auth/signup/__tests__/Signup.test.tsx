import Signup from "../Signup";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ISignup } from "app/model/authentication";
import { createContext, useContext } from "react";
import { act } from "react-dom/test-utils";
import faker from "@faker-js/faker";

class AuthenticationStore {
  signUp = async (creds: ISignup) => {};
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
    const newUser = { email: "", username: "", password: "" };

    fireEvent.change(emailInput, { target: { value: newUser.email } });
    fireEvent.change(usernameInput, { target: { value: newUser.username } });
    fireEvent.change(passwordInput, { target: { value: newUser.password } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: newUser.password },
    });
    fireEvent.click(button);

    await waitFor(() => {
      new Promise((r) => setTimeout(r, 100));
    });
    const errors = screen.getAllByTestId("error");

    expect(errors).toHaveLength(3);
    errors.map((error) =>
      expect(error.textContent).toBe("This field is required")
    );
  });

  it("username with @ character, invalid email, confirm password, expect email, username, confirm password field errors", async () => {
    const newUser = {
      email: "dsa",
      username: "dfdd@ds",
      password: "Test123!",
      confirmPassword: "dfsfds",
    };

    fireEvent.change(emailInput, { target: { value: newUser.email } });
    fireEvent.change(usernameInput, { target: { value: newUser.username } });
    fireEvent.change(passwordInput, { target: { value: newUser.password } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: newUser.confirmPassword },
    });
    fireEvent.click(button);

    await waitFor(() => {
      new Promise((r) => setTimeout(r, 100));
    });
    const errors = screen.getAllByTestId("error");
    expect(errors).toHaveLength(3);
    const expectedErors = [
      "Email is invalid",
      "Username cannot contains @ char",
      "Passwords don't match",
    ];
    errors.forEach((error, index) =>
      expect(error.textContent).toBe(expectedErors[index])
    );
  });
  it("valid form, expect no error", async () => {
    const newUser = {
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: "Test123!",
    };

    fireEvent.change(emailInput, { target: { value: newUser.email } });
    fireEvent.change(usernameInput, { target: { value: newUser.username } });
    fireEvent.change(passwordInput, { target: { value: newUser.password } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: newUser.password },
    });
    fireEvent.click(button);

    await waitFor(() => {
      new Promise((r) => setTimeout(r, 100));
    });
    let error = screen.queryByTestId("error");
    expect(error).toBeNull();
  });
});
