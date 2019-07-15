export function formatDate(d){
    const formated = (d) => `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
    if (d instanceof Date) {
        return formated(d)
    } else {
        d = new Date(d)
        return formated(d)
    }
}