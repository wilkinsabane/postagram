import React, { useContext,useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import axiosService from '../../helpers/axios';
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";

function CreateComment(props) {
    const {postId, refresh} = props;

    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});

    const { setToaster } = useContext(Context);

    const user = getUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        const createCommentForm = event.currentTarget;

        if (createCommentForm.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const data = {
            author: user.id,
            post: postId,
            body: form.body,
        };

        axiosService
            .post(`/post/${postId}/comment/`, data)
            .then(() => {
                setForm({ ...form, body: "" });
                setToaster({
                    title: "Comment Added!",
                    message: "Your comment has been added successfully.",
                    type: "success",
                    show: true,
                });
                
                refresh();
            })
            .catch(() => {
                setToaster({
                    title: "An error occurred.!",
                    message: "Something went wrong. Please try again.",
                    type: "danger",
                    show: true,
                });
            });
        };

    return(
        <Form
            className="d-flex flex-row justify-content-between"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="create-comment-test"
        >
            <Image 
                src={user.avatar}
                roundedCircle
                width={48}
                height={48}
                className="my-2"
            />
            <Form.Group className="m-3 w-75">
                <Form.Control 
                    className="py-2 rounded-pill border-primary"
                    type="text"
                    placeholder="Write a comment..."
                    value={form.body}
                    name="body"
                    onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                    data-testid="comment-body-field"
                />
            </Form.Group>
            <div className="m-auto">
                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={form.body === undefined}
                    size="small"
                    data-testid="create-comment-submit"
                >
                    Comment
                </Button>
            </div>
        </Form>
    );
}

export default CreateComment;