import React from "react";
import { render } from "react-dom";

const injectedDiv = document.createElement("div");
console.log(new URLSearchParams(window.location.search).get("q"));
injectedDiv.id = "injected";
const parentDiv = document.querySelector("#rso");
parentDiv.insertBefore(injectedDiv, parentDiv.firstChild);

render(<p>Hii I'm a react component</p>, document.querySelector("#injected"));
