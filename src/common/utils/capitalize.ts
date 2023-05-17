export const capitalize = (string: string): string=>{
    const cap = string.charAt(0).toUpperCase()
    const rest = string.slice(1,string.length).toLowerCase()
    return cap+rest;
}
