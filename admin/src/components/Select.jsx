import Selectr from "mobius1-selectr";
import { useEffect } from "react";

export default ({ ...props }) => {
    useEffect(() => {
        // if (!document.querySelector(`#${ props.id }`)) 
            new Selectr(`#${ props.id }`, {
                ...props
            });
    }, [props.id])

    return (<select id={props.id} />)
}