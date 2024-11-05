import { render, screen, act } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import LoginForm from "../LoginForm";
import { faker } from "@faker-js/faker";
import userFixtures from "../../../helpers/fixtures/user";

const userData = userFixtures();

test("renders Login form", async () => {
    const user = userEvent.setup();

    // Wrapping in `act` to ensure updates are handled properly
    await act(async () => {
        render(<LoginForm />);
    });

    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();

    const emailField = screen.getByTestId("email-field");
    expect(emailField).toBeInTheDocument();

    const passwordField = screen.getByTestId("password-field");
    expect(passwordField).toBeInTheDocument();

    const password = faker.lorem.slug(2);

    await act(async () => {
        await user.type(passwordField, password);
        await user.type(emailField, userData.email);
    });

    expect(emailField.value).toBe(userData.email);
    expect(passwordField.value).toBe(password);
});
