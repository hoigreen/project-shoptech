import React from 'react'
import { useLocation, Link, useParams } from 'react-router-dom';

import "./breadcrumbs.css"

import { handleLoadingPage } from '../../../Common';

const Breadcrumbs = ({ socket }) => {
    const { name } = useParams()
    const location = useLocation()

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    let currentLink = ''
    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink += `/${crumb}`

            return (
                <div className="crumb" key={crumb}>
                    <Link className="crumb-link" to={currentLink}> {
                        capitalizeFirstLetter(crumb)
                    }</Link>
                </div>
            )
        })

    return (
        <div className="breadcrumbs__container">
            <div className="grid wide">
                <div className="breadcrumbs">
                    <a className="crumb__home" onClick={e => {
                        handleLoadingPage(1);
                        window.location.href = "/home";
                    }}>
                        <i className="crumb__home-icon fa fa-home"></i>
                        Home
                    </a>
                    <span style={{ margin: "0 10px 0 0" }}>//</span>
                    {crumbs}
                    {name}
                </div>
            </div>
        </div>
    )
}

export default Breadcrumbs;