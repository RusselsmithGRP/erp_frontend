import React, { Component } from "react";
const style = {
    fontSize:"9px"
}

export const CURRENCIES = [
    { value: "0", label: "₦", code: "NGN"},
    { value: "1", label: "$", code:"USD" },
    { value: "2", label: "£", code: "GBP" },
    { value: "3", label: "€", code: "EUR" }
]

export function getCurrency(value){
    if(!value) return;
    const currency = CURRENCIES.filter((k)=>k.value==value);
    return currency[0].label;
}

export function getCurrencyCode(value){
    if(!value) return;
    const currency = CURRENCIES.filter((k)=>k.value==value);
    return <span style={style} dangerouslySetInnerHTML={{__html: currency[0].code}} /> 
}