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
        try {
            const data = await app.queryToData({ query });
            // Note: This will always render the first app
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

// this attribute reacts to automatic spelling corrections in searched query by google
// url parameter may not be the query that google actually uses for results
const query = decodeURIComponent(document.querySelector("#rso").getAttribute("data-async-context").substring(6));
console.log(query)

renderApp(query);
