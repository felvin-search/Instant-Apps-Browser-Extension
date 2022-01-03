import React from "react";
import { render } from "react-dom";
import apps from "@felvin-search/apps";

async function renderApp(query) {
    for (const app of apps) {
      // Question: Not all apps need to return data.
      // TODO: Clearly define what is success and what is failure criteria for these apps somewhere.
        try {
            const data = await app.queryToData({ query });
            // TODO: This will always render the first app
            if (!!data) {
            render(
                <app.Component data={data} />,
                document.querySelector("#injected")
            );
            return;
            }
        } catch (error) {
            console.log(`${error} in ${app}`);
        }
    }
}

const injectedDiv = document.createElement("div");
injectedDiv.id = "injected";
const query = new URLSearchParams(window.location.search).get("q");
console.log(query);
const parentDiv = document.querySelector("#rso");
parentDiv.insertBefore(injectedDiv, parentDiv.firstChild);

renderApp(query);