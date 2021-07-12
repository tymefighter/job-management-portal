export function addElement<T>(arr: T[], value: T): T[] {
    return arr.concat(value);
}

export function deleteElement<T extends {id: string}>(
    arr: T[],
    id: string
) {
    return arr.filter(value => value.id !== id);
}

/**
 * Edits an element, but does NOT ensure whether
 * the initial order of elements will be preserved
 */
export function editElement<T extends {id: string}>(
    arr: T[],
    id: string,
    editValue: Partial<T>
) {
    const newValue = {
        ...arr.find(value => value.id === id),
        ...editValue
    };

    const rmArr = deleteElement(arr, id);
    return addElement(rmArr, newValue);
}

/**
 * Edits inner element, but does NOT ensure whether
 * the initial order of elements will be preserved
 */
export function addInnerElement<
    T extends {id: string}
>(
    arr: T[], 
    id: string,
    innerProp: string,
    innerValue: any
): T[] {
    const value = arr.find(value => value.id === id);
    const innerArr = value[innerProp];

    if(innerArr instanceof Array) {
        const newInnerArr = innerArr.concat(innerValue);
        const newArr = deleteElement(arr, value.id);

        return addElement(newArr, {...value, [innerProp]: newInnerArr});
    }

    return arr;
}

export function deleteInnerElement<
    T extends {id: string}
>(
    arr: T[], 
    id: string,
    innerProp: string,
    innerId: string
): T[] {
    const value = arr.find(value => value.id === id);
    const innerArr = value[innerProp];

    if(innerArr instanceof Array) {
        const newInnerArr = deleteElement(innerArr, innerId);
        const newArr = deleteElement(arr, value.id);

        return addElement(newArr, {...value, [innerProp]: newInnerArr});
    }

    return arr;
}

export function editInnerElement<
    T extends {id: string}
>(
    arr: T[], 
    id: string,
    innerProp: string,
    innerId: string,
    innerValue: any
): T[] {
    const value = arr.find(value => value.id === id);
    const innerArr = value[innerProp];

    if(innerArr instanceof Array) {
        const newInnerArr = editElement(innerArr, innerId, innerValue);
        const newArr = deleteElement(arr, value.id);

        return addElement(newArr, {...value, [innerProp]: newInnerArr});
    }

    return arr;
}