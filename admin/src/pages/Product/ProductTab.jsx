import { useEffect, useRef } from "react";

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
        const quill = new Quill('#editor', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });

        // if( document.querySelectorAll(".ql-toolbar").length > 1 ){
        //     console.log(document.querySelectorAll(".ql-toolbar")[0].remove())
        // }

    }, [  ])


    return (
        <div className="tab-pane active show mt-3">

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Product Name
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Product Name"
                    />
                </div>
            </div>


            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end" >
                    Short Desc.
                </label>
                <div className="col-sm-10">
                    <textarea
                        className="form-control"
                        type="text"
                        placeholder="Short Description"
                        rows={5}
                    />
                </div>
            </div>

            <div className="mb-3 row" >
                <label className="col-sm-2 col-form-label text-end" >
                    Description
                </label>
                <div className="col-sm-10 h-100" >
                    <div id="editor" className="w-100 h-100"></div>
                </div>
            </div>


            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end" >
                    Regular Price
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="$ 0.00"
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end" >
                    Sale Price
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="$ 0.00"
                    />
                    <p className="text-primary text-decoration-underline mt-2 cursor-pointer mb-0">Schedule Sale</p>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end" >
                    Start Sale
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="datetime-local"
                        placeholder="$ 0.00"
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end" >
                    End Sale
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="datetime-local"
                        placeholder="$ 0.00"
                    />
                </div>
            </div>
        </div>
    )
}