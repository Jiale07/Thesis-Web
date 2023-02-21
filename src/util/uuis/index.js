// Universal unique identification string
function uuis() {
    return Date.now().toString(36)
}

export {
    uuis,
}
