import { useParams, Link } from "react-router-dom";
import customers from "../../data/customers.json";
import DefaultAvatar from "../../assets/images/users/avatar-1.jpg";

export default function CustomerDetails() {
  const { id } = useParams();

  // 🔍 FIND CUSTOMER BY ID
  const customer = customers.find((c) => c._id === id);

  if (!customer) {
    return (
      <div className="container-fluid">
        <h4>Customer not found</h4>
        <Link to="/customers" className="btn btn-primary mt-2">
          Back to Customers
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">

        {/* ================= LEFT PROFILE ================= */}
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <img
                src={DefaultAvatar}
                // src={customer.avatar || DefaultAvatar}
                alt={customer.name}
                className="rounded-circle mb-3"
                style={{ width: 120 }}
              />

              <h4 className="fw-bold">{customer.name}</h4>
              <p className="text-muted">{customer.username}</p>

              <div className="text-start mt-3">
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Alt Phone:</strong> {customer.altPhone}</p>
                <p><strong>Status:</strong> {customer.status}</p>
                <p><strong>Address:</strong> {customer.address}</p>
                <p><strong>Alt Address:</strong> {customer.altAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="col-md-8">

          {/* PERFORMANCE */}
          <div className="bg-primary-subtle p-2 rounded mb-3">
            🎉 <strong>{customer.name}</strong> performance (last 365 days)
          </div>

          {/* STATS */}
          <div className="row g-3 mb-4">
            <Stat
              title="Total Cost"
              value={`$${customer.stats.totalCost}`}
              sub="365 Days"
              icon="iconoir-dollar-circle text-info"
            />
            <Stat
              title="Total Orders"
              value={customer.stats.totalOrders}
              sub="365 Days"
              icon="iconoir-cart text-primary"
            />
            <Stat
              title="Completed"
              value={customer.stats.completed}
              sub="365 Days"
              icon="iconoir-thumbs-up text-success"
            />
            <Stat
              title="Canceled"
              value={customer.stats.canceled}
              sub="365 Days"
              icon="iconoir-xmark-circle text-danger"
            />
          </div>

          {/* ORDERS TABLE */}
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h4 className="card-title">Orders</h4>
              <Link to="/orders" className="btn btn-primary btn-sm">
                View All
              </Link>
            </div>

            <div className="card-body pt-0">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Product</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customer.orders.map((order) => (
                      <OrderRow
                        key={order.id}
                        id={order.id}
                        product={order.product}
                        date={order.date}
                        payment={order.payment}
                        status={order.status}
                        price={`$${order.price}`}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ title, value, sub, icon }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <i className={`${icon} fs-24 me-2`} />
            <div>
              <p className="mb-0 fw-semibold fs-13">{title}</p>
              <h5 className="fw-bold mb-0">{value}</h5>
              <small className="text-muted">{sub}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderRow({ id, product, date, payment, status, price }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{product}</td>
      <td>{date}</td>
      <td>{payment}</td>
      <td>
        <span
          className={`badge ${
            status === "Completed"
              ? "bg-success-subtle text-success"
              : "bg-danger-subtle text-danger"
          }`}
        >
          {status}
        </span>
      </td>
      <td>{price}</td>
    </tr>
  );
}
