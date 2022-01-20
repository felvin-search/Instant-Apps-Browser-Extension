import React from "react";
import { render } from "react-dom";
import apps from "@felvin-search/apps";

function preparePageForApp() {
    const injectedApp = document.createElement("div");
    injectedApp.id = "injected-app";
    injectedApp.style.marginBottom = "1rem";
    injectedApp.style.border = "1px solid grey";
    injectedApp.style.overflow = "auto";

    const felvinPrompt = document.createElement("a");
    felvinPrompt.id = "felvin-prompt";
    felvinPrompt.innerText = "Search on Felvin instead";
    felvinPrompt.href = `https://felvin.com/search?q=${query}`;
    felvinPrompt.style.display = "inline-block";
    felvinPrompt.style.marginBottom = "1rem";

    const parentDiv = document.querySelector("#rso");
    parentDiv.insertBefore(felvinPrompt, parentDiv.firstChild);
    parentDiv.insertBefore(injectedApp, felvinPrompt.nextSibling);
    
    // counter the search button shift
    const searchBarArea = document.querySelector("#tsf");
    const searchButton = searchBarArea.querySelector(".Tg7LZd")
    searchButton.style.margin = 0;
}

async function renderApp(query) {
    for (const app of apps) {
      // Question: Not all apps need to return data.
      // TODO: Clearly define what is success and what is failure criteria for these apps somewhere.
        try {
            const data = await app.queryToData({ query });
            // TODO: This will always render the first app
            if (!!data) {
                preparePageForApp();
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

const query = new URLSearchParams(window.location.search).get("q");

renderApp(query);