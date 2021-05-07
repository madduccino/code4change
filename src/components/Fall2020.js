import React, { Component } from "react";
import { Link } from "react-router-dom";
import Firebase from "firebase";
import config from "../config";
import "../App.css";
import Popup from "./Popup";

let totalPoints = [];

class Fall2020 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
      showPopup: false,
    };
    let totalPoints = [];
    this.getUserData = this.getUserData.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    let ref = Firebase.database().ref("/submissions");
    ref.on("value", (snapshot) => {
      let allSubmissions = [];
      snapshot.forEach((snap) => {
        allSubmissions.push(snap.val());
      });
      this.setState({ submissions: allSubmissions });
    });
  };

  loadVoteCount() {
    let votes;
    this.state.submissions.map((submission) => {
      if ("votes/" + submission.uid in localStorage) {
        votes = localStorage.getItem("voted/" + submission.uid);
      } else {
        votes = submission.votes;
      }
      this.setState({});
    });
  }

  resetGongs(id, state) {
    localStorage.removeItem(id);
  }

  handleEvent = (id, selected, buttonClass, votedId) => {
    const updatedList = this.state.submissions.map((submission) => {
      if (submission.uid === id) {
        let totalPoints = "totalPoints";

        if (selected) {
          var audio = new Audio("gong.mp3");

          audio.play();

          localStorage.setItem(
            "voted/" + submission.uid,
            localStorage.getItem("votes/" + submission.uid) + 1
          );

          if (totalPoints in localStorage) {
            if (localStorage.getItem(totalPoints) == 4) {
              this.state.showPopup = true;
              localStorage.removeItem(id);
            } else {
              let count = parseInt(localStorage.getItem(totalPoints));
              localStorage.setItem(totalPoints, count + 1);
            }
          } else {
            localStorage.setItem(totalPoints, 1);
            let count = parseInt(localStorage.getItem(totalPoints));
          }
          let votedId = "voted/" + submission.uid;

          return Object.assign({}, submission, {});
        } else {
          let count = parseInt(localStorage.getItem(totalPoints));
          localStorage.setItem(totalPoints, count - 1);
          var x = localStorage.setItem("voted/" + submission.uid, -1);

          return Object.assign({}, submission, {});
        }
      } else {
        return submission;
      }
    });

    this.setState(
      {
        submissions: updatedList,
      },
      this.updateStorage
    );
  };

  updateStorage(votez) {
    this.state.submissions.map((submission) => {});
  }

  updateVotes = () => {
    this.state.submissions.map((submission) => {
      localStorage.clear();
      let votedId = "voted/" + submission.uid;
      const db = Firebase.database();
      db.ref("/submissions")
        .orderByChild("uid")
        .equalTo(submission.uid)
        .once("value", function (snapshot) {
          snapshot.forEach((child) => {
            db.ref("/submissions/" + child.key).update({
              votes: submission.votes,
            });
          });
        });
    });
  };

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
    window.location.reload(false);
    localStorage.clear();
  }

  clear() {
    localStorage.clear();
  }

  render() {
    return (
      <>
        <div className="header">
          <h1>Time to Vote</h1>
          Click the gong to vote for your favorite projects. You can vote for up
          to 5. One vote per person!
          {/* <h3> Drawing on the <a target="_blank" href="https://www.un.org/sustainabledevelopment/sustainable-development-goals/">UN's 17 Sustainable Development Goals</a>, coders were invited to use their innovation, creativity, and resourcefulness to address a global issue. Here's what they created.</h3>  */}
        </div>

        <div className="grid">
          {this.state.showPopup ? (
            <Popup
              submitVote={this.updateVotes}
              text="You've reached 5 votes! Click the button below to submit."
              closePopup={this.togglePopup.bind(this)}
            />
          ) : null}

          {this.state.submissions.map((submission) => (
            <div key={submission.uid}>
              <div className="card">
                <Link
                  to={{
                    pathname: submission.uid,
                    firstName: submission.firstName,
                  }}
                >
                  <img src={submission.thumbnail} />
                </Link>

                <div className="card-content">
                  <h2>{submission.projName}</h2>
                  <Link
                    to={{
                      pathname: submission.uid,
                      firstName: submission.firstName,
                    }}
                  >
                    View Project
                  </Link>
                </div>
                <Buttons
                  id={submission.uid}
                  votes={submission.votes}
                  onVote={this.handleEvent}
                />
              </div>
            </div>
          ))}
        </div>
      </>
    );

    // <>
    //   <div className="header">
    //   <h3>The Fall 2020 Code 4 Change Challenge is coming soon! Visit The Coding Space <a href="https://thecodingspace.com/code4change">website</a> to find out how to participate. Here's a look at previous contests:</h3>
    //   <a href="/spring2020">Spring 2020</a>
    //  </div>
    // </>
  }
}

class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let buttonId = this.props.id;
    let totalPoints = "totalpoints";
    let votedId = "votes/" + this.props.id;

    if (votedId in localStorage) {
      this.setState(
        {
          votedId: localStorage.getItem(votedId),
        },
        this.updatedStateComplete
      );
    } else {
      this.setState(
        {
          votedId: 0,
        },
        this.updatedStateComplete
      );
    }
    if (buttonId in localStorage) {
      if (localStorage.getItem(buttonId) === "true") {
        this.setState(
          {
            voted: true,
          },
          this.updatedStateComplete
        );
      } else {
        this.setState(
          {
            voted: false,
          },
          this.updatedStateComplete
        );
      }
    } else {
      this.setState(
        {
          voted: false,
          votes: 0,
          votedId: 0,
        },
        this.updatedStateComplete
      );
    }
  }

  updatedStateComplete() {
    if (this.state.voted) {
      this.setState(
        {
          buttonClass: "gong-pressed",
        },
        this.logVotes
      );
    } else {
      this.setState(
        {
          buttonClass: "gong-unpressed",
        },
        this.logVotes
      );
    }
  }

  logVotes() {
    console.log("votedId", this.state);
  }

  handleClick = () => {
    let buttonId = this.props.id;

    this.setState({ voted: !this.state.voted }, this.updateVote);
  };

  updateVote() {
    let buttonId = this.props.id;
    localStorage.setItem(buttonId, this.state.voted);
    let votedId = "votes/" + this.props.id;

    if (this.state.voted) {
      const db = Firebase.database();
      db.ref("/submissions")
        .orderByChild("uid")
        .equalTo(this.props.id)
        .once("value", function (snapshot) {
          snapshot.forEach((child) => {
            let x = child.val().votes + 1;
            console.log(x);
            db.ref("/submissions/" + child.key).update({ votes: x });
          });
        });

      localStorage.setItem("votes", 1);
      localStorage.setItem(votedId, 1);

      this.setState(
        {
          buttonClass: "gong-pressed",
          votes: 1,
        },
        this.sendVote
      );
    } else {
      const db = Firebase.database();

      db.ref("/submissions")
        .orderByChild("uid")
        .equalTo(this.props.id)
        .once("value", function (snapshot) {
          snapshot.forEach((child) => {
            let x = child.val().votes - 1;
            console.log(x);
            db.ref("/submissions/" + child.key).update({ votes: x });
          });
        });

      localStorage.setItem("votes", 0);
      localStorage.setItem(votedId, 0);

      this.setState(
        {
          buttonClass: "gong-unpressed",
          votes: 0,
        },
        this.sendVote
      );
    }
    //     this.props.onVote(this.props.id,this.state.voted);
  }

  sendVote() {
    let x;
    if ("votes" in localStorage) {
      x = parseInt(localStorage.getItem("votes"));
    } else {
      x = 0;
    }
    this.props.onVote(
      this.props.id,
      this.state.voted,
      this.state.buttonClass,
      this.votedId
    );
  }

  render() {
    return (
      <div onClick={this.handleClick} className={this.state.buttonClass}></div>
      // <img className='gong' onClick={this.handleClick} src={this.state.text}/>
    );
  }

  writeUserData = (id) => {
    let votes = this.state.votes;
    const db = Firebase.database();
    db.ref("/submissions")
      .orderByChild("uid")
      .equalTo(this.props.id)
      .once("value", function (snapshot) {
        snapshot.forEach((child) => {
          if (child.val().votes) {
            db.ref("/submissions/" + child.key).update({ votes: votes });
          }
        });
      });
  };
}

class SDG extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.list,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.list}</div>
      </div>
    );
  }
}

export default Fall2020;
