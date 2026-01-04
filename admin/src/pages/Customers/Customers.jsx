import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Table, { TableActions } from "../../components/Table";
import Loader from "../../components/Loader";

import customersData from "../../data/customers.json";
import DefaultAvatar from "../../assets/images/users/avatar-1.jpg";

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

  const renderRow = useCallback((customer) => {
    return (
      <tr key={customer._id}>
        <td>
          <input type="checkbox" className="form-check-input" />
        </td>

        <td className="ps-0">
          <div className="d-flex align-items-center gap-2">
            <img
              src={DefaultAvatar}
            //   src={customer.avatar || DefaultAvatar}
              alt={customer.name}
              className="thumb-md rounded-circle"
            />
            <span className="fw-medium">{customer.name}</span>
          </div>
        </td>

        <td>
          <a href={`mailto:${customer.email}`} className="text-body">
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

        <td>{customer.stats?.totalOrders}</td>
        <td>${customer.stats?.totalCost}</td>

        <TableActions>
            <Link
                to={`/customer-details/${customer._id}`}
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

            <button
                className="dropdown-item text-danger"
                onClick={() => console.log("Delete", customer._id)}
            >
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
        <div className="card">
          <div className="card-body pt-0">
            <Table
              columns={[
                { label: "Customer", className: "ps-0" },
                { label: "Email" },
                { label: "Phone" },
                { label: "Status" },
                { label: "Orders" },
                { label: "Spent" },
                { label: "Action", className: "text-end" }
              ]}
              data={customers}
              renderRow={renderRow}
              selectable
            />
          </div>
        </div>
      </div>
    </>
  );
}
