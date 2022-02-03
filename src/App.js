import React, {useState} from "react";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default function App() {
  const pageSize = 5;
  const apikey = "0364ec79379147979eadfdc8ef0f5b59";


  const [progress, setprogress] = useState(10)

  const setProgress = (progress) => {
    setprogress(progress)
  };


  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={progress}
          height={3}
        // onLoaderFinished={() => setProgress(0)}
        />
        <Switch>
          <Route exact path="/">
            {" "}
            <News
              apikey={apikey}
              setProgress={setProgress}
              key="general"
              pageSize={pageSize}
              country="in"
              category="general"
            />{" "}
          </Route>
          <Route exact path="/business">
            {" "}
            <News
              apikey={apikey}
              setProgress={setProgress}
              key="Business"
              pageSize={pageSize}
              country="in"
              category="Business"
            />{" "}
          </Route>
          <Route exact path="/entertainment">
            {" "}
            <News
              apikey={apikey}
              setProgress={setProgress}
              key="Entertainment"
              pageSize={pageSize}
              country="in"
              category="Entertainment"
            />{" "}
          </Route>
          <Route exact path="/health">
            {" "}
            <News
              apikey={apikey}
              setProgress={setProgress}
              key="Health"
              pageSize={pageSize}
              country="in"
              category="Health"
            />{" "}
          </Route>
          <Route exact path="/science">
            {" "}
            <News
              apikey={apikey}
              setProgress={setProgress}
              key="Science"
              pageSize={pageSize}
              country="in"
              category="Science"
            />{" "}
          </Route>
          <Route exact path="/sports">
            {" "}
            <News
              apikey={apikey}
              setProgress={setProgress}
              key="Sports"
              pageSize={pageSize}
              country="in"
              category="Sports"
            />{" "}
          </Route>
          <Route exact path="/technology">
            {" "}
            <News
              apikey={apikey}
              setProgress={setProgress}
              key="Technology"
              pageSize={pageSize}
              country="in"
              category="Technology"
            />{" "}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
