import React from "react";
import { render } from "react-dom";
import apps from "@felvin-search/apps";
import styled from "styled-components";

const Div = styled.div`
    border: 2px solid grey;
    padding: 1rem;
    width: 100%;
    margin-bottom: 1rem;
`

const Heading = styled.h2`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const Logo = styled.img`
    height: 48px;
    width: 48px;
`

const DemoVideo = styled.video`
    margin: 0.5rem auto;
    width: 90%;
    display: block;
`

function Welcome() {
    return (
        <Div>
            <Heading><Logo src={chrome.runtime.getURL("assets/logo_48x48.png")} alt={"felvin logo"}/> Welcome to Felvin!</Heading>            
            <DemoVideo src="https://github.com/felvin-search/extension-demo/blob/master/demo.mp4?raw=true" controls loop></DemoVideo>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur natus perspiciatis quas mollitia iusto quos accusantium at repellendus similique commodi alias suscipit, libero, ipsum eveniet voluptatum animi fuga. Pariatur, asperiores!</p>
        </Div>
    )
}

function renderOnboarding() {
    const welcome = document.createElement("div");
    welcome.id = "felvin-apps-extension-welcome";
    const parentDiv = document.querySelector("#rso");
    parentDiv.insertBefore(welcome, parentDiv.firstChild);
    render(
        <Welcome />,
        document.querySelector("#felvin-apps-extension-welcome")
    );
}

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
    const welcome = document.querySelector("#felvin-apps-extension-welcome")
    if(welcome) parentDiv.insertBefore(felvinPrompt, welcome.nextSibling)
    else parentDiv.insertBefore(felvinPrompt, parentDiv.firstChild);
    parentDiv.insertBefore(injectedApp, felvinPrompt.nextSibling);
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
            console.log(`${error} in ${app.name}`);
        }
    }
}

if(!localStorage.getItem("searchedSinceInstall")) {
    // localStorage.setItem("searchedSinceInstall", "true") <-- uncomment when testing is done
    renderOnboarding()
}

// this attribute reacts to automatic spelling corrections in searched query by google
// url parameter may not be the query that google actually uses for results
const query = decodeURIComponent(document.querySelector("#rso").getAttribute("data-async-context").substring(6));

// counter the search button shift
const searchBarArea = document.querySelector("#tsf");
const searchButton = searchBarArea.querySelector(".Tg7LZd")
searchButton.style.margin = 0;

// checking if Google already has an app
// (The "ULSxyf" class is for results(divs) which aren't links to websites, like apps,
// videos, images, "People Also Ask" and "Related searches" sections. Since apps are
// always the first result, if the first div has this class, it means it's an app.)
const googleHasApp = document.querySelector("#rso > div:first-of-type").classList.contains("ULSxyf");

if(!googleHasApp)
renderApp(query);
