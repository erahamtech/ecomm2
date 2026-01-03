import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Table, { TableActions } from "../../components/Table";
import Loader from "../../components/Loader";

import customersData from "../../data/customers.json";
import DefaultAvatar from "../assets/images/users/avatar-1.jpg";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setCustomers(customersData);
            setLoading(false);
        }, 300);
    }, []);

    //    STATUS BADGE
    const getStatusBadge = (status) => {
        const map = {
            VIP: "bg-danger-subtle text-danger",
            Loyal: "bg-success-subtle text-success",
            New: "bg-success-subtle text-success",
            Repeat: "bg-primary-subtle text-primary",
            Referral: "bg-success-subtle text-success",
            Inactive: "bg-secondary-subtle text-secondary",
            Potential: "bg-warning-subtle text-warning"
        };

        return (
            <span className={`badge ${map[status] || "bg-light text-dark"}`}>
                {status}
            </span>
        );
    };

    /* =========================
       TABLE ROW
    ========================= */
    const renderRow = useCallback((customer, index) => {
        return (
            <tr key={customer._id}>
                <td>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={`customer-${index}`}
                    />
                </td>

                <td className="ps-0">
                    <div className="d-flex align-items-center gap-2">
                        <img
                            src={ DefaultAvatar}
                            alt={customer.name}
                            className="thumb-md rounded-circle"
                        />
                        <span className="fw-medium">{customer.name}</span>
                    </div>
                </td>

                <td>
                    <a
                        href={`mailto:${customer.email}`}
                        className="text-body"
                    >
                        {customer.email}
                    </a>
                </td>

                <td>
                    <a
                        href={`tel:${customer.phone}`}
                        className="text-body text-decoration-none"
                    >
                        {customer.phone}
                    </a>
                </td>


                <td>{getStatusBadge(customer.status)}</td>

                <td>{customer.orders}</td>

                <td>${customer.spent}</td>

                <TableActions>
                    <Link
                        to={`/customer/${customer._id}`}
                        className="dropdown-item"
                    >
                        View Details
                    </Link>

                    <Link
                        to={`/edit-customer/${customer._id}`}
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
            <Loader loading={loading} />

            <div className="container-fluid">
                <div className="row page-title-box">
                    <div className="col-12">
                        <div className="card">

                            {/* HEADER */}
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h4 className="card-title fs-4">
                                            Customers
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

                                            {/* <div className="col-auto">
                                                <Link
                                                    to="/new-customer"
                                                    className="btn btn-primary"
                                                >
                                                    <i className="fa-solid fa-plus me-1" />
                                                    Add Customer
                                                </Link>
                                            </div> */}
                                        </form>
                                    </div>
                                </div>
                            </div>

                            {/* TABLE */}
                            <div className="card-body pt-0">
                                <Table
                                    columns={[
                                        { label: "Customer", className: "ps-0" },
                                        { label: "Email" },
                                        { label: "Phone" },
                                        { label: "Status" },
                                        { label: "Orders" },
                                        { label: "Spent" },
                                        {
                                            label: "Action",
                                            className: "text-end"
                                        }
                                    ]}
                                    data={customers}
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
