import Selectr from "mobius1-selectr";
import { useEffect } from "react";
import { data } from "react-router-dom";

export default () => {
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
        if( !document.querySelector(".ql-toolbar") ){
            new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });
        }

        if (!document.querySelector(".selectr-container")) {
            new Selectr('#mySelect', {
                placeholder: "Select Brands",
                data: [
                    { text: "Payjama", value: "value1" },
                    { text: "Bata", value: "value2" },
                ],
                defaultSelected: false
            });
            new Selectr('#mySelect1', {
                placeholder: "Select Brands",
                data: [
                    { text: "Payjama", value: "value1" },
                    { text: "Bata", value: "value2" },
                ],
                defaultSelected: false
            });

            new Selectr("#taggableSelect", {
                taggable: !0,
                tagSeperators: [",", "|"],
                
                data: [
                    { text: "S", value: "s" },
                    { text: "M", value: "m" },
                    { text: "L", value: "l" },
                    { text: "XL", value: "xl" },
                    { text: "XXL", value: "xxl" },
                ],
                selectedValue: ["s", "m"]
            });
        }

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
                <label className="col-sm-2 col-form-label text-end">
                    Brand Name
                </label>
                <div className="col-sm-10 row">
                    <div className="col-sm-11">
                        <select id="mySelect" />
                    </div>
                    <div className="col-sm-1">
                        <button type="button" className="btn btn-primary">
                            +
                        </button>

                    </div>
                </div>
            </div>


            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end" >
                    Highlights
                </label>
                <div className="col-sm-10">
                    <textarea
                        className="form-control"
                        type="text"
                        placeholder="Highlights"
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


            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Attributes
                </label>

                <div className="col-sm-10 row">
                    
                    <div className="col-sm-11 mb-3">
                        <select id="mySelect1" />
                    </div>
                    <div className="col-sm-1">
                        <button type="button" className="btn btn-primary">
                            +
                        </button>
                    </div>


                    <div className="col-sm-11 row m-0 p-0">
                        <div className="col-sm-4">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Attribute Name"
                                defaultValue={"Size"}
                                readOnly
                            />
                        </div>
                        <div className="col-sm-8">
                            <select id="taggableSelect"/>   
                        </div>
                    </div>
                    <div className="col-sm-1">
                        <button type="button" className="btn btn-danger">
                            x
                        </button>
                    </div>
                    <p className="text-primary text-decoration-underline mt-2 cursor-pointer">Add Attributes</p>

                </div>
            </div>
        </div>
    )
}