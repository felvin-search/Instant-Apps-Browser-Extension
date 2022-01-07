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
                document.querySelector("#injected-app")
            );
            return;
            }
        } catch (error) {
            console.log(`${error} in ${app}`);
        }
    }
}

const injectedApp = document.createElement("div");
injectedApp.id = "injected-app";
injectedApp.style.marginBottom = "1rem";
injectedApp.style.border = "1px solid grey";

const query = new URLSearchParams(window.location.search).get("q");

const felvinPrompt = document.createElement("a");
felvinPrompt.id = "felvin-prompt";
felvinPrompt.innerText = "Search on Felvin instead";
felvinPrompt.href = `https://felvin.com/search?q=${query}`;
felvinPrompt.style.display = "block";
felvinPrompt.style.marginBottom = "1rem";

const parentDiv = document.querySelector("#rso");
parentDiv.insertBefore(felvinPrompt, parentDiv.firstChild);
parentDiv.insertBefore(injectedApp, felvinPrompt.nextSibling);

renderApp(query);