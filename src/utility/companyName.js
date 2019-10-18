export function getVendor(id, vendors){
    const vendor = vendors.filter(x => x._id == id)
return (vendor[0])? vendor[0].general_info.company_name : ""
}

