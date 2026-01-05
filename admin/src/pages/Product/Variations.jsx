import Selectr from "mobius1-selectr";
import { useEffect, useState } from "react";
import DefaultImg from '../../assets/images/products/01.png'
import DefaultImg1 from '../../assets/images/products/02.png'
import { Text, Textarea, TextareaUpLabel, TextUpLabel } from "../../components/Inputs";

export default () => {
    const [ isOpenVariation, setIsOpenVariation] = useState({ open: false })
    const [ isSaleSchedule, setIsSaleSchedule ] = useState(false)


    useEffect(() => {
        if (!document.querySelector(".selectr-container")) {
            if( document.getElementById("mySelect1")){
                new Selectr('#mySelect1', {
                    placeholder: "Colors",
                    data: [
                        { text: "Black", value: "value1" },
                        { text: "White", value: "value2" },
                        { text: "Red", value: "value2" },
                        { text: "Yellow", value: "value2" },
                    ],
                    defaultSelected: false
                });
            }

            if( document.getElementById("mySelect2")){
            new Selectr('#mySelect2', {
                placeholder: "Size",
                data: [
                    { text: "Small", value: "value1" },
                    { text: "Medium", value: "value2" },
                    { text: "Large", value: "value2" },
                    { text: "XLarge", value: "value2" },
                ],
                defaultSelected: false
            });
        }
        }
    }, [ isOpenVariation.open ])
    return(
        <section>
            <div className="d-flex justify-content-end my-2">
                <div className="col-auto">
                    <button className="btn btn-primary" type="submit">
                        <i className="fa-solid fa-plus me-1" /> Add Variation
                    </button>
                </div>
            </div>

            <div className="row">
                {Array(3).fill(0).map((vartn, i ) => <div className="col-12 variation card  w-100  p-2 mb-1">
                    <div className=" d-flex justify-content-between align-items-center">
                        <div>
                            <h4 className="mb-0">Variation {i+1}</h4>
                            <small className="text-secondary">Colour: <b>Black</b> | Size: <b>L</b></small>
                        </div>
                        <div onClick={() => setIsOpenVariation( !isOpenVariation.open ? { open: true, in: i } : { open: false })}>
                            <i className="fa-solid fa-angle-down me-1 cursor-pointer"></i>
                        </div>
                    </div>

                    {isOpenVariation.open && isOpenVariation?.in == i &&
                        <div className="border-top bg-light p-2 mt-2">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <p className=" fs-5 mb-0">Attributes</p>
                                <div className="d-flex">
                                    <p className=" me-3 mb-0">Status:&nbsp; <b>Active</b> <i className="fa-solid fa-pencil me-1 cursor-pointer"></i></p>
                                    <p className=" text-primary text-decoration-underline cursor-pointer me-3 mb-0">Duplicate</p>
                                    <p className=" text-danger text-decoration-underline cursor-pointer mb-0">Remove</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <div className="mb-0">
                                        <select id="mySelect1" />
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="mb-0">
                                        <select id="mySelect2" />
                                    </div>
                                </div>

                            </div>
                            <hr className="my-2" />

                            <div className="row">
                                <div className="col-4">
                                    <div className="rounded border" style={{ height: "200px", minWidth: "150px", width: "100%", maxWidth: "200px", padding: "2px" }}>
                                        <img src={DefaultImg} className="w-100 h-100" />
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                        <div className="rounded border mt-1" style={{ height: "50px", minWidth: "50px", padding: "2px" }}>
                                            <img src={DefaultImg1} className="w-100 h-100" />
                                        </div>
                                        <div className="rounded border mt-1" style={{ height: "50px", minWidth: "50px", padding: "2px" }}>
                                            <img src={DefaultImg1} className="w-100 h-100" />
                                        </div>
                                        <div className="rounded border mt-1" style={{ height: "50px", minWidth: "50px", padding: "2px" }}>
                                            <img src={DefaultImg1} className="w-100 h-100" />
                                        </div>
                                        <div className="h-100" style={{ width: "20px", height: "20px" }}>
                                            <button type="button" className="btn btn-primary" >
                                                +
                                            </button>
                                        </div>


                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="col-12">
                                            <TextUpLabel
                                                placeholder="Product Name"
                                                defaultValue={"Men Solid Round Neck Polyester Brown T-Shirt"}
                                                errors={{}}
                                                register={{}}
                                            />
                                        </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <TextUpLabel
                                                type="number"
                                                placeholder="Regular Price"
                                                defaultValue={120}
                                                min={0}
                                                errors={{}}
                                                register={{}}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <TextUpLabel
                                                type="number"
                                                placeholder="Sale Price"
                                                defaultValue={90}
                                                min={0}
                                                errors={{}}
                                                register={{}}
                                                infoLine={<p className="text-primary text-decoration-underline mt-2 cursor-pointer me-3 mb-0 d-inline" onClick={() => setIsSaleSchedule(!isSaleSchedule)}>Schedule Sale</p>}
                                            />
                                        </div>

                                    </div>
                                    {
                                        isSaleSchedule && <div className="row">
                                            <div className="col-6">
                                                <TextUpLabel
                                                    type="datetime-local"
                                                    labelName="Start Sale"
                                                    errors={{}}
                                                    register={{}}
                                                />

                                            </div>
                                            <div className="col-6">
                                                <TextUpLabel
                                                    type="datetime-local"
                                                    labelName="End Sale"
                                                    errors={{}}
                                                    register={{}}
                                                />
                                            </div>

                                        </div>}
                                    <div className="row">
                                        <div className="col-6">
                                            <TextUpLabel
                                                placeholder="SKU"
                                                defaultValue={"PKA-145"}
                                                min={0}
                                                errors={{}}
                                                register={{}}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <TextUpLabel
                                                placeholder="GSTIN"
                                                defaultValue={"1244JDG34H"}
                                                min={0}
                                                errors={{}}
                                                register={{}}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <hr className="my-2" />
                            <div className="row mt-3">
                                <div className="col-3">
                                    <TextUpLabel
                                        type="number"
                                        placeholder="Weight"
                                        defaultValue={120}
                                        min={0}
                                        errors={{}}
                                        register={{}}
                                    />
                                </div>
                                <div className="col-3">
                                    <TextUpLabel
                                        type="number"
                                        placeholder="Length"
                                        defaultValue={90}
                                        min={0}
                                        errors={{}}
                                        register={{}}
                                    />
                                </div>
                                <div className="col-3">
                                    <TextUpLabel
                                        type="number"
                                        placeholder="Width"
                                        defaultValue={90}
                                        min={0}
                                        errors={{}}
                                        register={{}}
                                    />
                                </div>
                                <div className="col-3">
                                    <TextUpLabel
                                        type="number"
                                        placeholder="Height"
                                        defaultValue={90}
                                        min={0}
                                        errors={{}}
                                        register={{}}
                                    />
                                </div>

                            </div>
                            <div className="row">
                                <TextareaUpLabel
                                    placeholder="Description (optional)"
                                    rows={5}
                                    errors={{}}
                                    register={{}}
                                />
                            </div>
                        </div>
                    }
                </div>)}

                <div className="d-flex justify-content-end my-2">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">
                            Save Variations
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}