import { useEffect, useRef } from "react"

export default () => {
    const quillRef = useRef()

    const toolbarOptions = [
        [{ 'font': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'align': [] }],
        ['link', 'image', 'video', 'formula'],
        ['clean']
    ];

    useEffect(() => {
        new Quill('#editor', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });

    }, [ quillRef.current ])


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
                                        <a
                                            className="nav-link py-2 active"
                                            id="step1-tab"
                                            data-bs-toggle="tab"
                                            href="#step1"
                                            aria-selected="true"
                                            role="tab"
                                        >
                                            Product Details
                                        </a>
                                        <a
                                            className="nav-link py-2"
                                            id="step2-tab"
                                            data-bs-toggle="tab"
                                            href="#step2"
                                            aria-selected="false"
                                            role="tab"
                                            tabIndex={-1}
                                        >
                                            Gallery
                                        </a>
                                        <a
                                            className="nav-link py-2"
                                            id="step3-tab"
                                            data-bs-toggle="tab"
                                            href="#step3"
                                            aria-selected="false"
                                            role="tab"
                                            tabIndex={-1}
                                        >
                                            Stock Management
                                        </a>

                                        <a
                                            className="nav-link py-2"
                                            id="step4-tab"
                                            data-bs-toggle="tab"
                                            href="#step4"
                                            aria-selected="false"
                                            role="tab"
                                            tabIndex={-1}
                                        >
                                            Attributes & Taxes
                                        </a>
                                        <a
                                            className="nav-link py-2"
                                            id="step5-tab"
                                            data-bs-toggle="tab"
                                            href="#step5"
                                            aria-selected="false"
                                            role="tab"
                                            tabIndex={-1}
                                        >
                                            Variants
                                        </a>

                                    </div>
                                </nav>

                                <div
                                    className="tab-pane active show mt-3"
                                    id="step1"
                                    role="tabpanel"
                                    aria-labelledby="step1-tab"
                                >

                                    <div className="mb-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Product Name"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <textarea
                                            className="form-control"
                                            type="text"
                                            placeholder="Short Description"
                                            rows={5}
                                        />
                                    </div>

                                    <div className="pt-0">
                                        <div id="editor" className="w-100" useRef={quillRef}></div>
                                    </div>


                                </div>


                            </div>
                        </div>
                    </div>
                </div>{" "}
            </div>{" "}
        </div>
    )
}