import React, { Component } from "react";

import { connect } from "react-redux";
import { trySignIn, setNavColor } from "../../actions";

class Login extends Component {
  componentDidMount() {
    this.props.setNavColor("opaque");
  }

  componentWillUnmount() {
    this.props.setNavColor(null);
  }

  makeError = async () => {
    fetch("https://interface.meiriyiwen.com/article/today?dev=1", {
      method: "GET"
    }).then((response) => response.json());

    fetch("https://example.com/movies.json").then((response) =>
      response.json()
    );
  };

  makeSomeError = () => {
    const obj = {};
    obj.forEach((v) => {
      console.log(v);
    });
  };
  render() {
    const { trySignIn } = this.props;

    return (
      <section className="Login">
        <main className="Container Login__wrapper">
          <div className="Login__form">
            <div className="Login__header">
              <h1
                onClick={() => this.makeSomeError()}
                className="Heading h1"
                style={{ marginBottom: "2rem" }}
              >
                make some error
              </h1>
            </div>
            <button
              className="Button Button--primary Button--full"
              onClick={() => this.makeError()}
            >
              <i className="fab fa-google" style={{ marginRight: "2rem" }} />
              Make an fetch error
            </button>
          </div>
        </main>
      </section>
    );
  }
}

export default connect(null, { trySignIn, setNavColor })(Login);
