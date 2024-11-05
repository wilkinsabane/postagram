import { render, screen } from "../../../helpers/test-utils";
import TestRenderer from "react-test-renderer";
import ProfileCard from "../ProfileCard";
import { BrowserRouter } from "react-router-dom";

const userData = {
    id: "0590cd67-eacd-4299-8413-605bd547ea17",
    first_name: "James",
    last_name: "Moriati",
    name: "James Moriati",
    post_count: 3,
    email: "jamesmoriati@email.com",
    bio: "Je suis diabliquement geniale.",
    username: "jamesmoriati@email.com",
    avatar: null,
    created: "2024-11-03T17:31:03.310Z",
    updated: "2024-11-04T07:38:47.631Z",
};

test("Profile Card snapshot", () => {
    const profileCardDomTree = TestRenderer.create(
        <BrowserRouter>
            <ProfileCard user={userData} />
        </BrowserRouter>
    ).toJSON();
    expect(profileCardDomTree).toMatchSnapshot();
});