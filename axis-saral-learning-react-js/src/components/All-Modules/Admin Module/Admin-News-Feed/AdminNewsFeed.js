import React, { useEffect, useState } from "react";
import AdminNavigation from "../AdminNavigation";
import axios from "axios";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBIcon,
  MDBRipple,
  MDBTextArea,
} from "mdb-react-ui-kit";
import Button from "@mui/material/Button";
import "./AdminNewsFeed.css";
import { useNavigate } from "react-router-dom";
import { margin } from "@mui/system";

const AdminNewsFeed = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [sh, setsh] = useState(false);
  const [shows, setshows] = useState("Comments");
  const setCommentData = (e) => {
    setCommentInput(e.target.value);
  };

  let newsEmpData1 = localStorage.getItem("LoginData");
  let newsEmpData2 = JSON.parse(newsEmpData1);
  console.log(newsEmpData2);
  const show1 = () => {
    setsh(sh == false ? true : false);
    setshows(shows == "Comments" ? "Close Comments" : "Comments");
  };
  const addComment = (ele) => {
    console.log(ele);
    if (commentInput == "") {
      alert("Please enter comment");
    } else {
      let data = {
        message: commentInput,
        name: newsEmpData2.employeeName,
      };
      axios
        .post(`http://localhost:8088/news/${ele.newsFeedId}/comment/add`, data)
        .then((response) => response);

      document.getElementById("form1").value = "";
      axios.get("http://localhost:8088/news").then((response) => {
        setNewsData(response.data);
      });

      alert("Comment is Added Successfully.", window.location.reload());
    }
  };

  const deleteComment = (ele1) => {
    console.log(ele1);
    // if (ele1.commentId == data.commentId) {
    //   console.log("Hello");
    // }
    // alert("Comment is deleted.", window.location.reload());
    axios.delete(`http://localhost:8088/comment/delete/${ele1.commentId}`);

    alert("Comment delete", window.location.reload());
  };

  useEffect(() => {
    axios.get("http://localhost:8088/news").then((response) => {
      setNewsData(response.data);
    });
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="newsBackgro">
        <button
          className="managebtn"
          onClick={() => {
            navigate("/admin-news-add");
          }}
          style={{
            backgroundColor: "#ae275f",
            borderRadius: "2px",
            padding: "10px",
            color: "white",
            border: "solid gray 1px",
            marginLeft: "45%",
          }}
        >
          Manage NewsFeeds
        </button>
        <div className="employeefeed">
          {newsData.map((ele) => {
            return (
              <>
                <div>
                  <MDBContainer className="py-5">
                    <MDBCard style={{ maxWidth: "42rem" }}>
                      <MDBCardBody>
                        <div className="d-flex mb-3">
                          <a>
                            <img
                              src="https://mir-s3-cdn-cf.behance.net/projects/404/5979167.546a2078ea298.jpg"
                              className="border rounded-circle me-2"
                              alt="Avatar"
                              style={{ height: "40px" }}
                            />
                          </a>
                          <div>
                            <a className="text-dark mb-0">
                              <strong>Axis Saral</strong>
                            </a>
                          </div>
                        </div>
                        <div>
                          <p>{ele.newsDescription}</p>
                        </div>
                      </MDBCardBody>
                      <MDBRipple
                        className="bg-image hover-overlay ripple rounded-0"
                        rippleTag="div"
                        rippleColor="light"
                      >
                        <img src={ele.newsImageUrl} className="w-100" />
                        <a>
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </MDBRipple>
                      <hr class="my-0" />

                      <MDBCardBody>
                        <hr class="my-0" />
                        <p onClick={show1}>{shows}</p>

                        <div style={{ display: sh ? "block" : "none" }}>
                          {ele.comments?.map((ele1) => {
                            console.log(ele1);
                            return (
                              <>
                                <div className="d-flex mb-3">
                                  <a>
                                    <img
                                      src="https://storage.needpix.com/thumbs/blank-profile-picture-973460_1280.png"
                                      className="border rounded-circle me-2"
                                      alt="Avatar"
                                      style={{ height: "40px" }}
                                    />
                                  </a>
                                  <div>
                                    <div className="bg-light rounded-3 px-3 py-1">
                                      <a className="text-dark mb-0">
                                        <strong>{ele1.name}</strong>
                                      </a>
                                      <a className="text-muted d-block">
                                        <small>{ele1.message}</small>
                                      </a>
                                      <a className="text-muted d-block">
                                        <strong
                                          style={{ cursor: "pointer" }}
                                          onClick={() => deleteComment(ele1)}
                                        >
                                          DELETE
                                        </strong>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBContainer>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AdminNewsFeed;
