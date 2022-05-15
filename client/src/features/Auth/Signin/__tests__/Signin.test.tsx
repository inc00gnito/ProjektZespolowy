import Signin from "../Signin";
import {
  render,
  fireEvent,
  act,
  cleanup,
  screen,
  waitFor,
} from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { createContext, useContext } from "react";
import { ICreds } from "app/model/authentication";

class AuthenticationStore {
  signIn = async (creds: ICreds) => {};
}

const stores = {
  authenticationStore: new AuthenticationStore(),
};
const Context = createContext(stores);

export const useStore = () => {
  const appContext = useContext(Context);
  return appContext;
};

jest.mock("app/provider/Provider", () => ({
  useAuthenticationStore() {
    const { authenticationStore } = useStore();
    return authenticationStore;
  },
}));

describe("form tests", () => {
  let emailInput: HTMLElement, passwordInput: HTMLElement, button: HTMLElement;
  beforeEach(() => {
    render(<Signin />);
    emailInput = screen.getByLabelText(/e-mail or username*/i);
    passwordInput = screen.getByLabelText(/password/i);
    button = screen.getByTestId("submit_button");
  });

  it("empty form, expect login, password field errors", async () => {
    const fakeData = {
      login: "",
      password: "",
    };

    fireEvent.change(emailInput, { target: { value: fakeData.login } });
    fireEvent.change(passwordInput, { target: { value: fakeData.password } });
    fireEvent.click(button);

    await waitFor(() => {
      new Promise((r) => setTimeout(r, 100));
    });
    const error = screen.getAllByTestId("error");

    expect(error[0].textContent).toBe("This field is required");
    expect(error[1].textContent).toBe("This field is required");
  });

  it("password shorter than 6 characters, expect password field error", async () => {
    const fakeData = {
      login: faker.internet.email(),
      password: "fds",
    };

    fireEvent.change(emailInput, { target: { value: fakeData.login } });
    fireEvent.change(passwordInput, { target: { value: fakeData.password } });
    fireEvent.click(button);

    await waitFor(() => {
      new Promise((r) => setTimeout(r, 100));
    });
    const error = screen.getByTestId("error");

    expect(error.textContent).toBe(
      "Password should contains at least 6 characters"
    );
  });

  it("password longer than 20 characters, expect password field error", async () => {
    const fakeData = {
      login: faker.internet.email(),
      password: "fdfdssssrfr432432fsdfsdr3424fsdfs",
    };

    fireEvent.change(emailInput, { target: { value: fakeData.login } });
    fireEvent.change(passwordInput, { target: { value: fakeData.password } });
    fireEvent.click(button);

    await waitFor(() => {
      new Promise((r) => setTimeout(r, 100));
    });
    const error = screen.getByTestId("error");

    expect(error.textContent).toBe(
      "Password cannot be longer than 20 characters"
    );
  });

  it("correct data, no errors", async () => {
    fireEvent.change(emailInput, { target: { value: faker.internet.email() } });
    fireEvent.change(passwordInput, {
      target: { value: faker.internet.password() },
    });
    fireEvent.click(button);

    await waitFor(() => {
      new Promise((r) => setTimeout(r, 100));
    });

    expect(screen.queryByTestId("error")).toBeNull();
  });
});
