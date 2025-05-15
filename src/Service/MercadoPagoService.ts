import React from 'react'
import { Pedido } from '../Models/Pedido'
import { PreferenceMP } from '../Models/PreferenceMP';

export default async function createPreferenceMP(pedido?: Pedido){
    const urlServer = "http://localhost:8080/api/v1/pedido/createmp";
    const response = await fetch(urlServer, {
        "method": "POST",
        body: JSON.stringify(pedido),
        "headers" : {
            "Content-Type": 'application/json'
        }
    });
    console.log(response)

    return await response.json() as PreferenceMP;
}
