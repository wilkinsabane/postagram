import React, { useContext,useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from '../../helpers/axios';
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";

function CreatePost(props) {
    const {refresh} = props;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState({});

    const { setToaster } = useContext(Context);

    const user = getUser();

    const handleSubmit = (event) => {
        event.preventDefault();
        const createPostForm = event.currentTarget;

        if (createPostForm.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const data = {
            author: user.id,
            body: form.body,
        };

        axiosService
            .post("/post/", data)
            .then(() => {
                handleClose();
                setToaster({
                    title: "Post Created!",
                    message: "Your post has been created successfully.",
                    type: "success",
                    show: true,
                });
                setForm({});
                refresh();
            })
            .catch(() => {
                setToaster({
                    title: "Post Error",
                    message: "Something went wrong. Please try again.",
                    type: "danger",
                    show: true,
                });
            });
        };

    return(
        <>
            <Form.Group className="my-3 w-75">
                <Form.Control 
                    className="py-2 rounded-pill border-primary text-primary"
                    type="text"
                    placeholder="Write a post"
                    onClick={handleShow}
                    data-testid="show-modal-form"
                />
            </Form.Group>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0">
                    <Form 
                        noValidate 
                        validated={validated} 
                        onSubmit={handleSubmit}
                        data-testid="create-post-form"
                    >
                        <Form.Group className="mb-3" >
                            <Form.Control
                                name="body"
                                value={form.body}
                                onChange={(e) => setForm({ ...form, body: e.target.value})}
                                as="textarea"
                                rows={3}
                                data-testid="post-body-field" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button data-testid="create-post-submit" variant="primary" onClick={handleSubmit} disabled={form.body === undefined}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreatePost;