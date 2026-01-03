

export const Text = ({ labelName, infoLine ="", errors = {}, register, ...props }) => {
    return (
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label text-end">
                { labelName || props?.placeholder }
            </label>
            <div className="col-sm-10">
                <input className="form-control"
                    {...props}
                    {...register}
                />
                {errors[register.name]?.message && <p className="mb-0"><small className="text-danger">{errors[register.name]?.message}</small></p>}
                { infoLine }
            </div>
        </div>
    )
}

export const Textarea = ({ labelName, errors = {}, register, ...props }) => {
    return (
        <div className="mb-3 row">
            <label className="col-sm-2 col-form-label text-end">
                { labelName || props?.placeholder }
            </label>
            <div className="col-sm-10">
                <textarea className="form-control"
                    {...props}
                    {...register}
                />
                {errors[register.name]?.message && <small className="text-danger">{errors[register.name]?.message}</small>}
            </div>
        </div>
    )
}