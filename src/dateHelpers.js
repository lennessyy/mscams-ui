const validateDate = (date) => {
    const match = date.match(/^(0?[1-9]|1[0-2])[/](0?[1-9]|[12]\d|3[01])[/](19|20)\d{2}$/g)

    if (match && match.length !== 0) {
        return true
    } else {
        return false
    }
}


export { validateDate }