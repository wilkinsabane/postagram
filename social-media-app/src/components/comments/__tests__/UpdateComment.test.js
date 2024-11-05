import { render, screen, act, fireEvent } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import UpdateCommment from "../UpdateComment";
import userFixtures from "../../../helpers/fixtures/user";
import commentFixtures from "../../../helpers/fixtures/comment";
import { faker } from "@faker-js/faker";
import { v4 as uuid4 } from "uuid";

const userData = userFixtures();
const commentData = commentFixtures(true, false,userData);

test("render UpdateComment component", async () => {
    const user = userEvent.setup();
    render(<UpdateCommment postId={uuid4()} comment={commentData} />);

    const showDropDownItem = screen.getByTestId("show-dropdown-item");
    expect(showDropDownItem).toBeInTheDocument();
    // clicking to show dropdown
    fireEvent.click(showDropDownItem);

    const showModalForm = screen.getByTestId("show-modal-form");
    expect(showModalForm).toBeInTheDocument();
    // clicking to show modal 
    fireEvent.click(showModalForm);

    const updateCommentElement = screen.getByTestId("update-comment-form");
    expect(updateCommentElement).toBeInTheDocument();

    const commentBodyField = screen.getByTestId("comment-body-field")
    expect(commentBodyField).toBeInTheDocument();

    const submitButton = screen.getByTestId("update-comment-submit");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.disabled).toBeFalsy();

    const commentBody = faker.lorem.sentence(10);
    await act(async () => {
        await user.type(commentBodyField, commentBody);

        // Checking if field has the text and button is not disabled
        expect(commentBodyField.value).toBe(commentData.body + commentBody);
        expect(submitButton.disabled).toBeFalsy();
    });
});