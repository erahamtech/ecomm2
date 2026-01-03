import TagsData from '../data/tags.json'

export default () => {
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

                        <div className="card-body">
                            <div className="d-flex flex-wrap gap-2">
                                {
                                    TagsData.map(tag => 
                                        <button type="button" className="btn btn-primary btn-sm">
                                            { tag.name } <span className="badge bg-light text-dark">{ tag.usageCount }</span>
                                        </button>
                                    )
                                }
                                
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}