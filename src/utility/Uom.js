export const List = [
    {slug: "each", name: "Each"},
    {slug: "perkg", name: "per Kg"},
    {slug: "peruser", name: "per User"}
]

export function getUom(uom){
    let u = List.filter(m=>{
        if(m.slug == uom){
            return m.name;
        } 
    });
    return (u['0'] != undefined)? u['0'] : {};
}