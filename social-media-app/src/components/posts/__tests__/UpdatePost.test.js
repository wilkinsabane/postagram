import { render, screen, act, fireEvent } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import UpdatePost from "../UpdatePost";
import userFixtures from "../../../helpers/fixtures/user";
import postFixtures from "../../../helpers/fixtures/post";
import { faker } from "@faker-js/faker";

const userData = userFixtures();
const postData = postFixtures(true, false,userData);

test("render UpdatePost component", async () => {
    const user = userEvent.setup();
    render(<UpdatePost post={postData} />);

    const showDropDownItem = screen.getByTestId("show-dropdown-item");
    expect(showDropDownItem).toBeInTheDocument();
    // clicking to show dropdown
    fireEvent.click(showDropDownItem);

    const showModalForm = screen.getByTestId("show-modal-form");
    expect(showModalForm).toBeInTheDocument();
    // clicking to show modal 
    fireEvent.click(showModalForm);

    const updatePostElement = screen.getByTestId("update-post-form");
    expect(updatePostElement).toBeInTheDocument();

    const postBodyField = screen.getByTestId("post-body-field")
    expect(postBodyField).toBeInTheDocument();

    const submitButton = screen.getByTestId("update-post-submit");
    expect(submitButton).toBeInTheDocument();

    const postBody = faker.lorem.sentence(10);
    await act(async () => {
        await user.type(postBodyField, postBody);

        // Checking if field has the text and button is not disabled
        expect(postBodyField.value).toBe(postData.body + postBody);
    });
});