
import { useCallback, useEffect, useState } from 'react';
import { deleteProduct, getAllProducts, updateProduct } from '../api/ProductApi'
import useDebounce from '../hooks/useDebounce';
import Loader from '../components/Loader';
import ProductImg from '../assets/images/products/02.png'
import Table, { TableActions } from '../components/Table';
import { Link } from 'react-router-dom';


export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const [fetchProducts, loading] = useDebounce(async () => {
        try {
            const response = await getAllProducts();
            setProducts(response?.items);
        } catch (err) {
            alert(`${err.statusCode}: ${err.message}`);
        }
    })

    /* =========================
       TOGGLE STATUS
    ========================= */
    const toggleStatus = async (product) => {
        try {
            await updateProduct(product._id, {
                isActive: !product.isActive,
            });
            fetchProducts();
        } catch (err) {
            alert(err.message);
        }
    };

    /* =========================
       DELETE PRODUCT
    ========================= */
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;

        try {
            await deleteProduct(id);
            fetchProducts();
        } catch (err) {
            alert(err.message);
        }
    };


    const renderRow = useCallback((product) => {
        return (
            <tr key={product._id}>
                <td>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        defaultChecked=""
                        id="filter-all"
                    />
                </td>

                <td className="ps-0">
                    <img
                        src={ProductImg || product.images?.[0]}
                        alt=""
                        height={40}
                        className="rounded me-1"
                    />
                    <p className="d-inline-block align-middle mb-0">
                        <span className="product-name fw-semibold">
                            {product.title}
                        </span>
                        <br />
                        <span className="text-muted font-13">
                            {product.brand || "—"}
                        </span>
                    </p>
                </td>


                <td>{product.category?.name || "—"}</td>
                <td>{product.subcategory?.name || "—"}</td>

                <td>{product.totalStock}</td>


                <td>₹{product.price || 0}</td>

                <td>
                    <span
                        className={`badge ${product.isActive
                            ? "bg-success-subtle text-success"
                            : "bg-danger-subtle text-danger"
                            }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleStatus(product)}
                    >
                        {product.isActive ? "Published" : "Unpublished"}
                    </span>
                </td>


                <td>
                    {new Date(product.createdAt).toLocaleString()}
                </td>


                <TableActions>
                    <Link to={`/product/${ product._id }`} className="dropdown-item" > Product Details </Link>
                    <a className="dropdown-item">  Edit Product </a>
                    <a className="dropdown-item">  Delete Product </a>
                </TableActions>

            </tr>
        )
    }, [products])


    return (
        <>  
            {/* <Loader loading={loading} /> */}
            <div className="container-fluid">
 

                <div className="row page-title-box">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <h4 className="card-title fs-4">Products</h4>
                                    </div>
                                    <div className="col-auto">
                                        <form className="row g-2">
                                            <div className="col-auto">
                                                <input
                                                    className="form-control"
                                                    type="search"
                                                    placeholder='Search..'
                                                />
                                            </div>
                                            <div className="col-auto">
                                                
                                                <a
                                                    className="btn bg-primary-subtle text-primary dropdown-toggle d-flex align-items-center arrow-none"
                                                    data-bs-toggle="dropdown"
                                                    href="#"
                                                    role="button"
                                                    aria-haspopup="false"
                                                    aria-expanded="false"
                                                    data-bs-auto-close="outside"
                                                >
                                                    <i class="fa-regular fa-file-excel me-1"></i> Export
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-start">
                                                    <div className="p-2">
                                                        <p className="cursor-pointer" >
                                                            <i className="far fa-file-alt me-1 fs-5 text-muted" />
                                                            Export To PDF
                                                        </p>
                                                        <p className="cursor-pointer mb-0" >
                                                            <i className="far fa-file-pdf me-1 fs-5 text-muted" />
                                                            Export To CSV
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                
                                                <a
                                                    className="btn bg-primary-subtle text-primary dropdown-toggle d-flex align-items-center arrow-none"
                                                    data-bs-toggle="dropdown"
                                                    href="#"
                                                    role="button"
                                                    aria-haspopup="false"
                                                    aria-expanded="false"
                                                    data-bs-auto-close="outside"
                                                >
                                                    <i className="iconoir-filter-alt me-1" /> Filter
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-start">
                                                    <div className="p-2">
                                                        <div className="form-check mb-2">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                defaultChecked=""
                                                                id="filter-all"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="filter-all"
                                                            >
                                                                All
                                                            </label>
                                                        </div>
                                                        <div className="form-check mb-2">
                                                            <input
                                                                type="checkbox"
                                                                className="form-check-input"
                                                                defaultChecked=""
                                                                id="filter-one"
                                                            />
                                                            <label
                                                                className="form-check-label"
                                                                htmlFor="filter-one"
                                                            >
                                                                Fashion
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto">
                                                <Link
                                                    to={'/new-product'}
                                                    className="btn btn-primary"
                                                >
                                                    <i className="fa-solid fa-plus me-1" /> Add Product
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="card-body pt-0">
                                <Table
                                    columns={[
                                        { label: "Product Name", className: "ps-0" },
                                        { label: "Category" },
                                        { label: "Sub Category" },
                                        { label: "Stocks" },
                                        { label: "Price" },
                                        { label: "Status" },
                                        { label: "Created At" },
                                        { label: "Action", className: "text-end" }
                                    ]}
                                    data={products}
                                    renderRow={renderRow}
                                    selectable
                                />
                            </div>
                        </div>
                    </div>{" "}
                </div>{" "}
            </div>
        </>
    )
}

