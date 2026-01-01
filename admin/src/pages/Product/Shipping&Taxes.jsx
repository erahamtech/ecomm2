import { useEffect, useRef } from "react";
import Selectr from 'mobius1-selectr'

export default () => {

    useEffect(() => {
        if( !document.querySelector(".selectr-container")){
            new Selectr('#mySelect', {
                placeholder: "Select Shipping Classes",
                data: [
                    { text: "Value 1", value: "value1" },
                    { text: "Value 2", value: "value2" },
                    { text: "Value 3", value: "value3" },
                ],
                defaultSelected: false
            });

            new Selectr('#mySelect1', {
                placeholder: "Select Shipping Zones",
                multiple: !0,
                data: [
                    { text: "Value 1", value: "value1" },
                    { text: "Value 2", value: "value2" },
                    { text: "Value 3", value: "value3" },
                ],
                defaultSelected: false
            });

            new Selectr('#mySelect2', {
                placeholder: "Select Tax Classes",
                multiple: !0,
                data: [
                    { text: "GST 28%", value: "value1" },
                    { text: "GST 12%", value: "value2" },
                    { text: "Convenience Fee", value: "value3" },
                ],
                defaultSelected: false
            });
        }
    }, [])

    return (
        <div className="tab-pane active show mt-3">
            <div className="row mb-3">
                <label className=" col-sm-2 text-dark fs-5 text-end">
                        Shipping
                </label>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Weight (gm)
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Weight (gm)"
                        min={0}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Size (cm)
                </label>
                <div className="col-sm-10 row m-0 p-0">
                    <div className="col-4">
                        <input
                            className="form-control "
                            type="number"
                            placeholder="Length"
                            min={0}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="form-control "
                            type="number"
                            placeholder="Width"
                            min={0}
                        />
                    </div>
                    <div className="col-4">
                        <input
                            className="form-control "
                            type="number"
                            placeholder="Height"
                            min={0}
                        />
                    </div>

                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Ship. Classes
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
                <label className="col-sm-2 col-form-label text-end">
                    Ship. Zones
                </label>
                <div className="col-sm-10 row">
                    <div className="col-sm-11 ">
                        <select id="mySelect1" />

                    </div>
                    <div className="col-sm-1">
                        <button type="button" className="btn btn-primary">
                            +
                        </button>

                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end ">Ship. Charges</label>
                <div className="col-md-10 align-self-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="shipChages"
                            id="inlineRadio6"
                            defaultChecked
                        />
                        <label className="form-check-label" htmlFor="inlineRadio6">
                            Free Delivery
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="shipChages"
                            id="inlineRadio7"
                            
                        />
                        <label className="form-check-label " htmlFor="inlineRadio7">
                            Charge
                        </label>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <label className=" col-sm-2 text-dark fs-5 text-end">
                        Taxes
                </label>
            </div>

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end ">Price with </label>
                <div className="col-md-10 align-self-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="stockType"
                            id="inlineRadio4"
                            defaultChecked
                        />
                        <label className="form-check-label" htmlFor="inlineRadio4">
                            Included Tax
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="stockType"
                            id="inlineRadio5"
                            
                        />
                        <label className="form-check-label " htmlFor="inlineRadio5">
                            Excluded Tax
                        </label>
                    </div>
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Tax Classes
                </label>
                <div className="col-sm-10 row">
                    <div className="col-sm-11 ">
                        <select id="mySelect2" />

                    </div>
                    <div className="col-sm-1">
                        <button type="button" className="btn btn-primary">
                            +
                        </button>

                    </div>
                </div>
            </div>

        </div>
    )
}