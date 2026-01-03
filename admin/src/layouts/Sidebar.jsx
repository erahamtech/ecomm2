import { Link, NavLink } from "react-router-dom"

export default function Sidebar() {
    const sidebarItems = [
        {
            name: 'Navigation',
            isLabel: true
        },
        {
            name: 'Dashboard',
            icon: <i className="iconoir-report-columns menu-icon" />,
            route: '/dashboard',
            isCollapsed: false
        },
        {
            name: 'Products',
            icon: <i className="iconoir-report-columns menu-icon" />,
            route: '/products',
            isCollapsed: false
        },
        {
            name: 'Orders',
            icon: <i className="iconoir-report-columns menu-icon" />,
            route: '/orders',
            isCollapsed: false
        },

        {
            name: 'Category',
            icon: <i className="iconoir-cart-alt menu-icon" />,
            route: '/category',
            isCollapsed: false
        },

        {
            name: 'Category',
            icon: <i className="iconoir-cart-alt menu-icon" />,
            isCollapsed: true,
            nestedItems: [
                {
                    name: 'Category',
                    icon: <i className="iconoir-report-columns menu-icon" />,
                    route: '/category',
                    isCollapsed: false
                },
                {
                    name: 'Sub Category',
                    icon: <i className="iconoir-report-columns menu-icon" />,
                    route: '/sub-category',
                    isCollapsed: false
                },
            ]
        },
        {
            name: 'Customers',
            icon: <i className="iconoir-report-columns menu-icon" />,
            route: '/customers',
            isCollapsed: false
        },
        {
            name: 'Brands',
            icon: <i className="iconoir-report-columns menu-icon" />,
            route: '/brand',
            isCollapsed: false
        },
        {
            name: 'Tags',
            icon: <i className="iconoir-report-columns menu-icon" />,
            route: '/tags',
            isCollapsed: false
        },
        {
            name: 'Attributes',
            icon: <i className="iconoir-report-columns menu-icon" />,
            route: '/attributes',
            isCollapsed: false
        },

    ]


    return (
        <section className="startbar d-print-none">
            {/*start brand*/}
            <div className="brand">
                <a href="index.html" className="logo">
                    <span>
                        <img
                            src="assets/images/logo-sm.png"
                            alt="logo-small"
                            className="logo-sm"
                        />
                    </span>
                    <span className="">
                        <img
                            src="assets/images/logo-light.png"
                            alt="logo-large"
                            className="logo-lg logo-light"
                        />
                        <img
                            src="assets/images/logo-dark.png"
                            alt="logo-large"
                            className="logo-lg logo-dark"
                        />
                    </span>
                </a>
            </div>

            <div className="startbar-menu">
                <div className="startbar-collapse" id="startbarCollapse">
                    <div className="d-flex align-items-start flex-column w-100">

                        {/* Navigation */}
                        <ul className="navbar-nav mb-auto w-100">
                            {
                                sidebarItems.map(item => {
                                    if (item?.isLabel) {
                                        return (
                                            <li className="menu-label mt-2">
                                                <span>{item.name}</span>
                                            </li>
                                        )
                                    } else if (!item?.isCollapsed) {
                                        return (
                                            <NavLink to={item.route} className="nav-item">
                                                <NavLink to={item.route} className="nav-link" >
                                                    {item.icon}
                                                    <span>{item.name}</span>
                                                    {/* <span className="badge text-bg-warning ms-auto">08</span> */}
                                                </NavLink >
                                            </NavLink>
                                        )
                                    } else {
                                        return (
                                            <li className="nav-item">
                                                <a
                                                    className="nav-link"
                                                    href="#sidebarAnalytics"
                                                    data-bs-toggle="collapse"
                                                    role="button"
                                                    aria-expanded="false"
                                                    aria-controls="sidebarAnalytics"
                                                >
                                                    {item?.icon}
                                                    <span>{item?.name}</span>
                                                </a>
                                                <div className="collapse " id="sidebarAnalytics">
                                                    <ul className="nav flex-column">
                                                        {
                                                            item?.nestedItems?.map(nestedItem =>
                                                                <li className="nav-item">
                                                                    <NavLink to={nestedItem?.route} className="nav-link ">
                                                                        {nestedItem?.name}
                                                                    </NavLink>
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        )
                                    }
                                })
                            }
                            {/*End Navigation*/}
                        </ul>

                    </div>
                </div>
            </div>
        </section>
    )
}