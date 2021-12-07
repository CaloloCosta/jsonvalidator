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
      width: "90vw"
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
            <div className="buttons">
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
            
          </div>
          <div className="card-2"></div>
        </div>
        <div class="row">
          <div className="card-2"></div>
          <div className="result" id="result"></div>
          <div className="card-2"></div>
        </div>
     
        <div class="row" id="about">
            <div  class="content">
                <h2>About JSONverify</h2>                
               <p>JSONverify is a JSON validator and a JSON formatter, pasting the JSON into the editor will validate it and format it in case of a valid JSON.</p>
                <p>The app has 3 main functionalities: <ol><li>Validate: Validates the JSON and format it if valid</li><li>Copy: Copy the editor's text to the clipboard</li><li>Clear: Clears the editor</li></ol></p>
                <h2>Why use json validator</h2>
                <p>Debugging huge JSON objects can be stressful and time-consuming sometimes</p>
                <p>The aim of the application is to help developers that are trying to debug JSON objects, they can get really complicated when they are huge, so using the JSONverify will make the process of debugging much simpler and faster. Also, the application can be sued to format JSON objects.</p>
                <h2>What you should you expect in case of an invalid json</h2>
                <p>In case of an invalid JSON a red box will show up right below the editor saying the JSON is invalid and where the error is located so you can modify it</p>
                <img src="./invalid.png" alt="invalid json result" />
                <h2>What you should you expect in case of a valid json</h2>
                <p>In case of a valid JSON a green box will show up right below the editor saying that the JSON is valid.</p>
                <img src="./valid.png" alt="valid json result" />
                <h2>What is Json</h2>
                <p>JSON - javascript object notation, is a text-based data format that follows Javascript object syntax. Although it was primarily developed for javascript it is a programming language independent, it is very useful to transmit data across the network. Almost all of the modern APIs make use of JSON data in a way.</p>
            </div>
        </div>

        <div class="row" id="contact">
            <div className="content">
                <h2>Contact Us</h2>
                <p>Hi my name is Carlos da Costa, and I am the developer of JSONverify.</p>
                <p>I would like to hear from you, for any enquiry feel free to contact me via email anytime: <a href="mailto:contact.carlosdacosta@gmail.com">contact.carlosdacosta@gmail.com</a></p>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
