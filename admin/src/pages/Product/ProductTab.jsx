import Selectr from "mobius1-selectr";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form'
import { Text, Textarea } from '../../components/Inputs'

export default () => {
    
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            attributes: []
        }
    });

    const [ isSaleSchedule, setIsSaleSchedule ] = useState(false)
    const selectedCategory = watch("category");


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
                placeholder: "Attribute Templates",
                data: [
                    { text: "Payjama", value: "value1" },
                    { text: "Bata", value: "value2" },
                ],
                defaultSelected: false
            });

            new Selectr("#category", {
                placeholder: "Categories",
                data: [
                    { text: "Electronics", value: "electronics" },
                    { text: "Appliances", value: "appliances" },
                    { text: "Men Fashion", value: "menfashion" },
                    { text: "Women Fashion", value: "womenfashion" },
                    { text: "Baby Fashion", value: "womenfashion" },
                ],
                defaultSelected: 0,
            });

            new Selectr("#subcategory", {
                placeholder: "Sub Categories",           
                data: [
                    { text: "Mobile Phones", value: "mobile_phones", parent: "electronics" },
                    { text: "Mobile Accessories", value: "mobile_accessories", parent: "electronics" },
                    { text: "Laptops", value: "laptops", parent: "electronics" },
                    { text: "PCs", value: "laptops", parent: "electronics" },
                    { text: "Gaming PCs", value: "laptops", parent: "electronics" },
                    { text: "Laptop Accessories", value: "laptop_accessories", parent: "electronics" },
                    { text: "Desktop Accessories", value: "desktop_accessories", parent: "electronics" },
                ],
                defaultSelected: 0,
                multiple: !0,

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

            new Selectr("#tags", {
                taggable: !0,
                tagSeperators: [",", "|"],
                
                data: [
                    { text: "S", value: "s" },
                ],
                selectedValue: []
            });
        }

    }, [  ])


    const onSubmit = (data) => {
        const payload = {
            ...data,
            tags: data.tags?.map(t => t.value),
            attributes: data.attributes.map(a => ({
                name: a.name,
                values: a.values.split(",").map(v => v.trim())
            }))
        };

        console.log("FINAL PAYLOAD", payload);
    };


    return (
        <form className="tab-pane active show mt-3" onSubmit={handleSubmit(onSubmit)}>

            <Text 
                placeholder="Product Name"
                errors={errors}
                register={register('name', { required: "Product name required" } )}
            />

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Brand Name
                </label>
                <div className="col-sm-10">
                    <select id="mySelect" />
                    <p className="text-primary text-decoration-underline mb-0 mt-2 cursor-pointer me-3">Add Brand</p>
                </div>
                
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Category
                </label>
                <div className="col-sm-10 ">
                    <select id="category" />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Sub Category
                </label>
                <div className="col-sm-10">
                    <select id="subcategory" />
                    <p className="text-primary text-decoration-underline mb-0 mt-2 cursor-pointer me-3">Manage Categories & Sub Categories</p>
                </div>
            </div>

            
            <Textarea
                placeholder="Highlights"
                rows={5}
                errors={errors}
                register={register('highlights', { required: "Hightlights required."})}
            />

            <div className="mb-3 row" >
                <label className="col-sm-2 col-form-label text-end" >
                    Description
                </label>
                <div className="col-sm-10 h-100" >
                    <div id="editor" className="w-100 h-100"></div>
                </div>
            </div>


            <Text 
            type="number"
                placeholder="Regular Price"
                errors={errors}
                register={register('regularPrice', { required: "Regular price required." } )}
            />

            <Text 
                type="number"
                placeholder="Sale Price"
                errors={errors}
                register={register('salePrice', { required: "Sale price required." } )}
                infoLine={<p className="text-primary text-decoration-underline mt-2 cursor-pointer me-3 mb-0 d-inline" onClick={() => setIsSaleSchedule(!isSaleSchedule)}>Schedule Sale</p>}
            />
            
            {
                isSaleSchedule && <>
                    <Text 
                        type="datetime-local"
                        labelName="Start Sale"
                        errors={errors}
                        register={register('startSale', { required: "Start Date required." } )}
                    />

                    <Text 
                        type="datetime-local"
                        labelName="End Sale"
                        errors={errors}
                        register={register('endSale', { required: "End Date required." } )}
                    />
            </>}


            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Tags
                </label>
                <div className="col-sm-10 ">
                    <select id="tags" />
                </div>
            </div>


            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Attributes
                </label>

                <div className="col-sm-10">
                    
                    <div className="col-sm-12 mb-0">
                        <select id="mySelect1" />
                    </div>

                    <p className="text-primary text-decoration-underline mt-2 cursor-pointer me-3 mb-3">Add Attribute Template</p>

                    <div className="col-12 row ">
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
                        <div className="col-sm-1 ">
                            <button type="button" className="btn btn-danger">
                                x
                            </button>
                        </div>
                    </div>

                    <div className="col-12 row mt-2">
                        <div className="col-sm-11 row m-0 p-0">
                            <div className="col-sm-4">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Attribute Name"
                                />
                            </div>
                            <div className="col-sm-8">
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="Attribute Value"
                                />   
                            </div>
                        </div>
                        <div className="col-sm-1">
                            <button type="button" className="btn btn-danger">
                                x
                            </button>
                        </div>
                    </div>

                    <div className="d-flex align-items-center">
                        <p className="text-primary text-decoration-underline mt-2 cursor-pointer me-3">Add Attributes</p>
                        <p className="text-primary text-decoration-underline mt-2 cursor-pointer">Add Multi Value Attributes</p>
                    </div>

                </div>
            </div>

            <div className="d-flex justify-content-end">
                <div className="col-auto">
                    <button className="btn btn-primary" type="submit">
                        <i className="fa-solid fa-plus me-1" /> Create Product
                    </button>
                </div>

            </div>
        </form>
    )
}