export default function(obj,request) : {  status: boolean, message: string } {
    let leftProp = request.filter(req => !Object.keys(obj).find(prop => req === prop))
    if (leftProp.length > 0) {
        return { status: false, message: `props Are missing: ${leftProp.join(', ')}`}
    } else {
        return { status: true, message: ''}
    }
}