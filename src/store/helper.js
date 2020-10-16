export function projectDeEncoder(project) {
    let test = Object.entries(project)
    let key = test[0][0]
    let props = test[0][1]
    let newObj = {
        key: key,
        ...props
    }
    return newObj
}