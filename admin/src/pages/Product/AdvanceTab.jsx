import { useEffect, useRef } from "react";
import Selectr from 'mobius1-selectr'

export default () => {

    return (
        <div className="tab-pane active show mt-3">
            <div className="row mb-3">
                <label className="col-md-2 my-1 control-label text-end">Status</label>
                <div className="col-md-10">
 
                        <input
                            type="radio"
                            className="btn-check"
                            name="options-outlined"
                            id="success-outlined"
                            defaultChecked
                        />
                        <label
                            className="btn btn-outline-success btn-sm me-3 px-3"
                            htmlFor="success-outlined"
                        >
                            Active
                        </label>
           
 
                        <input
                            type="radio"
                            className="btn-check"
                            name="options-outlined"
                            id="danger-outlined"
                        />
                        <label className="btn btn-outline-danger btn-sm px-3" htmlFor="danger-outlined">
                            Inactive
                        </label>

      
                </div>
            </div>


            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Reviews 
                </label>
                <div className="col-sm-10  align-self-center">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Yes, enable reviews
                        </label>
                    </div>

                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Exchange 
                </label>
                <div className="col-sm-10  align-self-center">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Yes, enable exchange
                        </label>
                    </div>

                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label text-end">
                    Refunds 
                </label>
                <div className="col-sm-10  align-self-center">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked
                            id="flexCheckDefault"
                        />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Yes, enable refunds
                        </label>
                    </div>

                </div>
            </div>
        </div>
    )
}