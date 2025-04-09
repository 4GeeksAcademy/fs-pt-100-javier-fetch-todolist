import React from "react";


export const Card = props => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-4">
            <div className="card">

                <img className="card-img-top" src={props.image} alt={props.name} />
                <h3>
                    {props.name}
                </h3>
                <button>learn more!</button>
            </div>
        </div>
    )
}