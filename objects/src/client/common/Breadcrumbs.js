import React from 'react'
import { useLocation, Link, useParams } from 'react-router-dom';
import ModalLoading from './ModalLoading';

const Breadcrumbs = ({ socket }) => {
    const { name } = useParams()
    const location = useLocation()

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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handLoadingPage = (second, link) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
            window.location.href = link;
        }, second * 1000)
    }

    return (
        <div className="breadcrumbs__container">
            <ModalLoading />
            <div className="grid wide">
                <div className="breadcrumbs">
                    <a className="crumb__home" onClick={e => { handLoadingPage(1.5, "/home") }}>
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