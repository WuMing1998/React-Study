import { FC } from "react";

import {BrowserRouter} from 'react-router-dom'

import Page from "./pages";

const Route:FC = ()=>{
    return (
        <>
            Route...
            <BrowserRouter>
                <Page></Page>
            </BrowserRouter>
        </>
    )
}

export default Route