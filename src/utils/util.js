export const filterQuery = obj => {
    let arr = [];
    for (let x in obj) {
        if (obj[x]) {
            arr.push(`${x}=${obj[x]}`);
        }
    }
    return '?' + arr.join('&');
};