import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import Table, { TableActions } from "../components/Table";

import categoryData from "../data/category.json";
import DefaultAvatar from "../assets/images/users/avatar-1.jpg";

export default () => {
    const [categories, setCategory] = useState(categoryData);


    /* =========================
       TABLE ROW
    ========================= */
    const renderRow = useCallback((category, index) => {
        return (
            <tr key={category.id}>
                <td>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={`customer-${index}`}
                    />
                </td>

                <td className="ps-0">
                     <img
                        src={DefaultAvatar || category.image }
                        alt=""
                        height={40}
                        className="rounded me-1"
                    />
                    <p className="d-inline-block align-middle mb-0">
                        <span className="product-name fw-semibold">
                            { category.name }
                        </span>
                        <br />
                        <span className="text-muted font-13">
                            {category.slug || "—"}
                        </span>
                    </p>
                </td>
                <td>{ category.parentId || "—" }</td>

                <td>
                    {category.description}
                </td>

                <td>
                    <span className={`badge bg-primary-subtle text-primary`}>
                        { category.counts }
                    </span>
                </td>

                <TableActions>
                    <Link
                        to={`/customer/${category._id}`}
                        className="dropdown-item"
                    >
                        View Details
                    </Link>

                    <Link
                        to={`/edit-customer/${category._id}`}
                        className="dropdown-item"
                    >
                        Edit
                    </Link>

                    <button className="dropdown-item text-danger">
                        Delete
                    </button>
                </TableActions>
            </tr>
        );
    }, []);

    return (
        <>
            {/* <Loader loading={0} /> */}

            <div className="container-fluid">
                <div className="row page-title-box">
                    <div className="col-12">
                        <div className="card">

                            {/* HEADER */}
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h4 className="card-title fs-4">
                                            Category
                                        </h4>
                                    </div>

                                    <div className="col-auto">
                                        <form className="row g-2">

                                            <div className="col-auto">
                                                <input
                                                    type="search"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                />
                                            </div>

                                            <div className="col-auto">
                                                <a
                                                    className="btn bg-primary-subtle text-primary dropdown-toggle d-flex align-items-center arrow-none"
                                                    data-bs-toggle="dropdown"
                                                    href="#"
                                                >
                                                    <i className="iconoir-filter-alt me-1" />
                                                    Filter
                                                </a>

                                                <div className="dropdown-menu dropdown-menu-start">
                                                    <div className="p-2">
                                                        {[
                                                            "All",
                                                            "New",
                                                            "VIP",
                                                            "Repeat",
                                                            "Referral",
                                                            "Inactive",
                                                            "Loyal"
                                                        ].map((item) => (
                                                            <div
                                                                className="form-check mb-2"
                                                                key={item}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    defaultChecked
                                                                />
                                                                <label className="form-check-label">
                                                                    {item}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* TABLE */}
                            <div className="card-body pt-0">
                                <Table
                                    columns={[
                                        { label: "Category", className: "ps-0" },
                                        { label: "Parent Category", className: "ps-0" },
                                        { label: "Description" },
                                        { label: "counts" },
                                        {
                                            label: "Action",
                                            className: "text-end"
                                        }
                                    ]}
                                    data={categories}
                                    renderRow={renderRow}
                                    selectable
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
