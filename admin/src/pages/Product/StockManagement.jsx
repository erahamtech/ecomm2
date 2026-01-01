import { useEffect, useRef } from "react";

export default () => {

    return (
        <div className="tab-pane active show mt-3">

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    SKU
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="SKU"
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    GSTIN, UID
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="GSTIN, UID"
                    />
                </div>
            </div>

            <div className="row mb-2">
                <label className="col-sm-2 col-form-label text-end ">Stock Status</label>
                <div className="col-md-10 align-self-center">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            defaultChecked
                        />
                        <label className="form-check-label" htmlFor="inlineRadio1">
                            In Stock
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio3"
                            
                        />
                        <label className="form-check-label" htmlFor="inlineRadio3">
                            Preorder
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            defaultValue="option2"
                        />
                        <label className="form-check-label text-danger" htmlFor="inlineRadio2">
                            Out Of Stock
                        </label>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <label className="col-sm-2 col-form-label text-end ">Stock Type</label>
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
                            Limit
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
                            No Limit
                        </label>
                    </div>
                </div>
            </div>


            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Stock
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Stock"
                        min={0}
                    />
                </div>
            </div>

            <div className="mb-3 row ">
                <label className="col-sm-2 col-form-label text-end">
                    Low Stock Th.
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="number"
                        placeholder="Low Stock Threshold"
                        min={0}
                    />
                </div>
            </div>

        </div>
    )
}