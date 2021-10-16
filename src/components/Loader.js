import React from "react";
import loading from "./ajax-loader.gif";

export default function Loader () {
    return (
      <div className="text-center">
        <img className="my-3" src={loading} alt="loading" />
      </div>
    );
}
