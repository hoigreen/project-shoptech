import React from 'react'
import { useLocation, Link, useParams } from 'react-router-dom';

const Breadcrumbs = ({ socket }) => {
    const { name, keySearch } = useParams()
    const location = useLocation()

    let currentLink = ''

    const crumbs = location.pathname.split('/')
        .filter(crumb => crumb !== '')
        .map(crumb => {
            currentLink += `/${crumb}`

            return (
                <div className="crumb" key={crumb}>
                    <Link className="crumb-link" to={currentLink}>{
                        capitalizeFirstLetter(crumb)
                    }</Link>
                </div>
            )
        })

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="breadcrumbs__container">
            <div className="grid wide">
                <div className="breadcrumbs">
                    <Link className="crumb__home" to="/home">
                        <i className="crumb__home-icon fa fa-home"></i>
                        Home
                    </Link>
                    <span style={{ margin: "0 10px 0 0" }}>//</span>
                    {crumbs}
                    {name || "Kết quả tìm kiếm cho từ khóa: '" + keySearch + "'"}

                </div>
            </div>
        </div>
    )
}

export default Breadcrumbs;