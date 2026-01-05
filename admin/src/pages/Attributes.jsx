import { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import Table, { TableActions } from "../components/Table";

import brandsData from "../data/brands.json";
import DefaultAvatar from "../assets/images/users/avatar-1.jpg";

export default () => {
    const [attributes, setAttributes] = useState([
        {
            "code": "color",
            "label": "Color",
            "type": "select",
            "values": ["Black", "White", "Red", "Blue", "Green"],
            "is_variant": true,
            "is_required": false,
            "is_filterable": true,
            "is_visible": true
        },
        {
            "code": "size",
            "label": "Size",
            "type": "select",
            "values": ["XS", "S", "M", "L", "XL"],
            "is_variant": true,
            "is_required": false,
            "is_filterable": true,
            "is_visible": true
        },
    ]);





    /* =========================
       TABLE ROW
    ========================= */
    const renderRow = useCallback((attribute, index) => {
        return (
            <tr key={attribute.code}>
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
                            { attribute.label }
                        </span>
                        <br />
                        <span className="text-muted font-13">
                            {attribute.code || "—"}
                        </span>
                    </p>
                </td>

                <td>
                    {attribute.type}
                </td>

                <td>
                    { attribute.values?.join(", ") }
                </td>

                <td>
                    {String(attribute.is_variant)}
                </td>

                <td>
                    {String(attribute.is_required)}
                </td>

                <td>
                    {String(attribute.is_visible)}
                </td>

                <TableActions>
                    <Link
                        className="dropdown-item"
                    >
                        View Details
                    </Link>

                    <Link
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
                                            Attributes
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
                                        { label: "Attribute", className: "ps-0" },
                                        { label: "type" },
                                        { label: "Values" },
                                        { label: "Is Variant" },
                                        { label: "Is Required" },
                                        { label: "Is Visible" },
                                        {
                                            label: "Action",
                                            className: "text-end"
                                        }
                                    ]}
                                    data={attributes}
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
