import { lazy, Suspense, useState } from "react"
const ProductTab = lazy(() => import('./ProductTab'))
const Gallery = lazy(() => import('./Gallery'))

export default () => {
    const [activeTab, setActiveTab] = useState(1)
    const tabs = [
        { name: "Product Details", selected: true, component: <ProductTab /> },
        { name: "Gallery", index: -1, selected: false, component: <Gallery /> },
        { name: "Stock Management", index: -1, selected: false },
        { name: "Attributes & Taxes", index: -1, selected: false },
        { name: "Variants", index: -1, selected: false },
    ]

    return (
        <div className="container-fluid">
            <div className="row page-title-box">
                <div className="col-12">
                    <div className="col mb-3">
                        <h4 className="card-title fs-4">Add New Product</h4>
                    </div>
                    <div className="col-lg-6 col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <nav>
                                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                        {
                                            tabs?.map(( tab, i ) => 
                                                <a
                                                    className={`nav-link py-2 ${ i == activeTab && "active" }`}
                                                    id={`step${i}-tab`}
                                                    data-bs-toggle="tab"
                                                    href={`#step${i}`}
                                                    aria-selected={tab.selected}
                                                    onClick={() => setActiveTab(i)}
                                                >
                                                    { tab.name }
                                                </a>
                                            )
                                        }
                                    </div>
                                </nav>

                                <Suspense fallback={()=> <p>Loading...</p>}>
                                    { tabs[activeTab].component }
                                </Suspense>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}