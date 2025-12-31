export default function Table({
    columns = [],
    data = [],
    renderRow,
    loading = false,
    noDataText = "No data found",
    selectable = false,
}) {
    return (
        <div className="table-responsive">
            <table className="table mb-0 checkbox-all">

                {/* ===== TABLE HEAD ===== */}
                <thead className="table-light">
                    <tr>
                        {selectable && (
                            <th style={{ width: 16 }}>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        defaultChecked=""
                                        id="filter-all"
                                    />
                                </div>
                            </th>
                        )}

                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={col.className || ""}
                                style={col.style || {}}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* ===== TABLE BODY ===== */}
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length + (selectable ? 1 : 0)}>
                                Loading...
                            </td>
                        </tr>
                    ) : data.length > 0 ? (
                        data.map((item, index) => renderRow(item, index))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length + (selectable ? 1 : 0)}
                                className="text-center"
                            >
                                {noDataText}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}


export const TableActions = ({ children }) => {
    return (
        <td className="text-end">
            <div className="dropdown d-inline-block">
                <a
                    className="dropdown-toggle arrow-none"
                    id="dLabel11"
                    data-bs-toggle="dropdown"
                    href="#"
                >
                    <i class="fa-solid fa-ellipsis-vertical fs-14 text-muted"></i>
                </a>
                <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dLabel11"
                >
                    {children}
                </div>
            </div>
        </td>
    )
}
