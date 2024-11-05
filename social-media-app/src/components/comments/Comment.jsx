import React, { useContext } from "react";
import { format } from "timeago.js";
import { LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Image, Card, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdateComment from "./UpdateComment";
import MoreToggleIcon from "../MoreToggleIcon"
import { Context } from "../Layout";


function Comment (props) {
    const { postId, comment, refresh } = props;

    const {setToaster} = useContext(Context);

    const user = getUser();

    const handleLikeClick = (action) => {
        axiosService
            .post(`/post/${postId}/comment/${comment.id}/${action}/`)
            .then(() => {
                refresh();
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        axiosService
            .delete(`/post/${postId}/comment/${comment.id}/`)
            .then(() => {
                setToaster({
                    type: "danger",
                    message: "Comment deleted",
                    show: true,
                    title: "Comment Deleted!",
                });
                refresh();
            })
            .catch(() => {
                setToaster({
                    type: "danger",
                    message: "Comment Deleted",
                    show: true,
                    title: "Comment Deleted",
                });
            });
    };

    return (
            <Card className="rounded-3 my-2" data-testid="comment-test">
                
                <Card.Body>
                
                    <Card.Title className="d-flex-row justify-content-between">
                        <div className="d-flex flex-row">
                
                            <Image 
                                src={comment.author.avatar}
                                roundedCircle
                                width={48}
                                height={48}
                                className="me-2 border border-primary border-2"
                            />

                            <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                                <p className="fs-6 m-0">{comment.author.first_name} {comment.author.first_name || comment.author.username}</p>
                                <p className="fs-6 fw-lighter"><small>{format(comment.created)}</small></p>
                            </div>
                        </div>

                        {user.username === comment.author.username && (
                            <div>
                                <Dropdown align="end">
                                    <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <UpdateComment 
                                            comment={comment}
                                            postId={postId}
                                            refresh={refresh}
                                        />
                                        <Dropdown.Item onClick={handleDelete} className="text-danger">Delete</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )}
                    </Card.Title>
                    
                    <Card.Text>{comment.body}</Card.Text>

                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-row">
                            <LikeFilled
                                style={{
                                    color: "#fff",
                                    backgroundColor: "#0D6EFD",
                                    borderRadius: "50%",
                                    width: "18px",
                                    height: "18px",
                                    fontSize: "75%",
                                    padding: "2px",
                                    margin: "3px",
                                }} />
                            <p className="ms-1 fs-6">
                                <small>{comment.likes_count} like</small>
                            </p>
                        </div>
                    </div>
                </Card.Body>
                
                
                <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
                    <div className="d-flex flex-row">
                        <LikeOutlined 
                            style={{
                                width: "24px",
                                height: "24px",
                                padding: "2px",
                                fontSize: "20px",
                                color: comment.liked ? "#0D6EFD" : "#C4C4C4",
                            }}
                            onClick={() => {
                                if (comment.liked) {
                                    handleLikeClick("unlike");
                                } else {
                                    handleLikeClick("like");
                                }
                            }}
                        />
                        <p className="ms-1">
                            <small>Like</small>
                        </p>
                    </div>
                </Card.Footer>
            </Card>
    );
}

export default Comment;