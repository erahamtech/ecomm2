import { useCallback, useState } from "react";
import TagsData from '../data/tags.json'
import { Link } from "react-router-dom";

import Table, { TableActions } from "../components/Table";
import DefaultAvatar from "../assets/images/users/avatar-1.jpg";

export default () => {
    const [tags, setTags] = useState(TagsData)

    const renderRow = useCallback((tag, index) => {
        return (
            <tr key={tag.id}>
                <td>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={`customer-${index}`}
                    />
                </td>

                <td className="ps-0">
                    <p className="d-inline-block align-middle mb-0">
                        <span className="product-name fw-semibold">
                            { tag.name }
                        </span>
                        <br />
                        <span className="text-muted font-13">
                            {tag.slug || "—"}
                        </span>
                    </p>
                </td>

                <td>
                    <span className={`badge bg-primary-subtle text-primary`}>
                        { tag.counts }
                    </span>
                </td>

                <TableActions>
                    <Link
                        to={`/customer/${tag._id}`}
                        className="dropdown-item"
                    >
                        View Details
                    </Link>

                    <Link
                        to={`/edit-customer/${tag._id}`}
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
        <div className="container-fluid">
                        <div className="row page-title-box">
                            <div className="col-12">
                                <div className="card">
        
                                    {/* HEADER */}
                                    <div className="card-header">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <h4 className="card-title fs-4">
                                                    Tags
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
                                                { label: "Tag", className: "ps-0" },
                                                { label: "Counts" },
                                                {
                                                    label: "Action",
                                                    className: "text-end"
                                                }
                                            ]}
                                            data={tags}
                                            renderRow={renderRow}
                                            selectable
                                        />
                                    </div>
        
                                </div>
                            </div>
                        </div>
                    </div>
    )
}