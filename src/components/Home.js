import "../App.css";
import { EditorView } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import React, { useEffect, useRef } from "react";
import { basicSetup } from "@codemirror/basic-setup";

import { javascript } from "@codemirror/lang-javascript";
import Footer from "./Footer";
import Nav from "./Nav";
const jsonlint = require("jsonlint-mod");
const beautify = require("js-beautify");

let myTheme = EditorView.theme(
  {
    "&": {
      height: "400px",
      border: "2px solid #dddddd",
    },
    "&.cm-focused": { outline: "2px solid red" },
    ".cm-scroller": { overflow: "auto" },
  },
  { dark: false }
);


function Editor() {
  const editor = useRef();

  useEffect(() => {
    let myView = new EditorView({
      state: EditorState.create({
        extensions: [basicSetup, javascript(), myTheme],
      }),
      parent: document.querySelector("#editor"),
    });

    document.getElementById("clear").addEventListener("click", () => {
      let transaction = myView.state.update({
        changes: [{ from: 0, to: myView.state.doc.length, insert: "" }],
      });
      document.getElementById("result").style = "display: none;";
      myView.dispatch(transaction);
    });

    document.getElementById("copy").addEventListener("click", () => {
      navigator.clipboard.writeText("");
      let jsonstring = myView.state.doc.toJSON().join("\n");
      navigator.clipboard.writeText(jsonstring);
    });

    document.getElementById("submit").addEventListener("click", () => {
      let json = myView.state.doc.toJSON().join("\n");
      try {
        let parsedJson = jsonlint.parse(json);
        let jsonstring = JSON.stringify(parsedJson);

        let transaction = myView.state.update({
          changes: [
            {
              from: 0,
              to: myView.state.doc.length,
              insert: beautify(jsonstring),
            },
          ],
        });

        // At this point the view still shows the old state.
        myView.dispatch(transaction);

        let html = `<h2>Valid Json</h2>`;
        document.getElementById("result").style =
          "background-color: #27ae60; display: block;";
        document.getElementById("result").innerHTML = html;
      } catch (error) {
        let html = `<h2>Invalid Json</h2><pre>${error.message}</pre>`;
        document.getElementById("result").style =
          "background-color: rgba(255,0,0,0.3); display: block; color: red; font-weight: bold";
        document.getElementById("result").innerHTML = html;
      }
    });
    return () => {
      myView.destroy();
    };
  }, []);

  return (
    <div>
      <div className="Editor" ref={editor}></div>
    </div>
  );
}


function Home() {
  return (
    <div className="App">

        <Nav />


      <div className="Container">
        <div className="Ad-top"></div>
        <div className="row">
          <div className="card-2"></div>
          <div className="card-1">
            <div id="editor">
              <Editor />
            </div>
            <button type="submit" className="button-2" id="submit">
              Validate
            </button>
            <button type="submit" className="button-2" id="copy">
              Copy
            </button>
            <button type="submit" className="button-2" id="clear">
              Clear
            </button>
          </div>
          <div className="card-2"></div>
        </div>
        <div class="row">
          <div className="card-2"></div>
          <div className="result" id="result"></div>
          <div className="card-2"></div>
        </div>
     
        <div class="row" id="about">
            <div className="card-2"></div>
            <div  class="result">
                <h2>About JsonValidator</h2>
                <p>JsonValidator.io is a json validator and a json formatter, by pasting in the json into the editor the editor will validate it and format it in case of the json is valid.</p>
                <p>The app has 3 main functionalitie: <ol><li>Validate: Validates the json and format it if valid</li><li>Copy: Copy the editor's text to the clipboard</li><li>Clear: Clears the editor</li></ol></p>
                <h2>Why use json validator</h2>
                <p>Debbugin huge json objects can be stresfful and time consuming sometimes</p>
                <p>The aim of the application is to help developers that are tryinig to debug json objects, they can get really complictaed when they are huge, so using the jsonvalidator.io will make the process of debugging much simpler and faster. Also the applacation can be sued to format json objects.</p>
                <h2>What you should you expect in case of an invalid json</h2>
                <p>In case of an invalid json a red box will show up right bellow the aditor saying the json is invalid and where the error is located so you can modify it</p>
                <img src="./invalid.png" alt="invalid json result" />
                <h2>What you should you expect in case of a valid json</h2>
                <p>In case of a valid json a green box will show up right bellow the editor saying that the json is valid.</p>
                <img src="./valid.png" alt="valid json result" />
                <h2>What is Json</h2>
                <p>JSON - javascript object notation, is a text-based data format that follows Javascript object syntas. Although it was primamrely developemed for javascript it is programming languange indepenedent, it is very usefull to transmit data accross the network. Almost all the moderm API make use of json data in an way.</p>
            </div>
            <div className="card-2"></div>
        </div>

        <div class="row" id="contact">
            <div className="card-2"></div>
            <div className="result">
                <h2>Contct Us</h2>
                <p>Feel free to contact us via email anytyme: <a href="mailto:jsonvalidator@gmail.com">jsonvalidator@gmail.com</a></p>
            </div>
            <div className="card-2"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
