import React, { useState, useEffect } from "react";
import { Card } from "./card.jsx";


export const RickyRicon = () => {
    const [data, setData] = useState([]);

    /*
    CRUD
    Create --> POST
    Read ---> GET ---> metodo por defecto del fetch
    U ---> PUT
    D ---> DELETE
    */
    //fetch por promesas metodo GET
    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(response => {
                console.log(response)
                if (!response.ok) throw new Error(`error code: ${response.status}`)
                return response.json()
            }).then(data => setData(data)).catch(err => console.log(err))
    }, [])

    console.log('esto es data----------------------> ', data)

    return (
        <div className="text-center">

            <div className="bg-danger p-3">
                <h1>FETCH!!!!!</h1>
            </div>
            <div className="row">

                {data.results?.map((el, i) => <Card key={i} image={el.image}
                    name={el.name} />)}
            </div>


        </div>
    );
}