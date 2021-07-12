import * as dataHelper from "../dataHelper";

test("test adding an element", () => {
    const arr: any[] = ["abc", 123, 4.5, undefined, true, null];
    const newElement = {
        a: "45",
        b: true,
        c: false
    };

    const newArr = dataHelper.addElement(arr, newElement);

    expect(newArr.length).toBe(arr.length + 1);
    expect(newArr).toContain(newElement)
    
    for(const elem of arr) expect(newArr).toContain(elem);
});

test("test deleting an element", () => {
    const arr: any[] = [
        {id: "19"}, 
        {id: 45, text: "def"}, 
        {id: "131", float: 1.81}, 
        {id: "4441", boolVal: false}, 
        {id: "111919", cool: true},
        {id: "191", amazing: true, cool: false}
    ];
    const removeId = "111919";
    
    const newArr = dataHelper.deleteElement(arr, removeId);

    expect(newArr.length).toBe(arr.length - 1);
    expect(newArr).not.toContainEqual({id: "111919", cool: true});

    for(const elem of arr)
        if(elem.id !== removeId)
            expect(newArr).toContain(elem);
});

test("test editing an element", () => {
    const arr: any[] = [
        {id: "19", username: "AmazingV12"}, 
        {id: "451", username: "strike_fighter", password: "universal44", 
            status: 2000, pass: true}, 
        {id: "131", float: 1.81, over: "done"}, 
        {id: "4441", boolVal: false, status: "done-done"}, 
        {id: "111919", cool: true}
    ];

    const editId = "451";
    const editValue = {username: "forgotten_warrior", status: 2011};

    const newArr = dataHelper.editElement(arr, editId, editValue);

    expect(newArr.length).toBe(arr.length);

    expect(newArr).not.toContainEqual({id: "451", username: "strike_fighter", 
        password: "universal44", status: 2000, pass: true});

    expect(newArr).toContainEqual({id: "451", username: "forgotten_warrior", 
        password: "universal44", status: 2011, pass: true});

    for(const elem of arr)
        if(elem.id !== editId)
            expect(newArr).toContain(elem);
});

test("test adding an inner element", () => {
    const arr = [
        {
            id: "300", value: "1000",
            attack: 40, defense: 100, health: 400,
            innerArr: [
                {value: 400},
                false,
                undefined,
                true
            ]
        },
        {id: "1231", value: 100, innerArr: [{value: 400}]},
        {id: "991", cool: false, innerArr: [false, undefined]}
    ];

    const id = "300";
    const newInnerValue = {a: 45, id: "1000", bool: false};
    const newArr = dataHelper.addInnerElement(
        arr, id, "innerArr", newInnerValue
    );

    expect(newArr.length).toBe(arr.length);

    for(const elem of arr)
        if(elem.id !== id)
            expect(newArr).toContain(elem);

    const innerArr = newArr.find(elem => elem.id === id)?.innerArr;
    expect(innerArr?.length).toBe(arr[0].innerArr.length + 1);

    for(const innerElem of arr[0].innerArr)
        expect(innerArr).toContain(innerElem);

    expect(innerArr).toContainEqual(newInnerValue);
});

test("test deleting an inner element", () => {
    const arr = [
        {
            id: "300",
            innerArr: [
                {id: "123", value: 400},
                {id: "3", value: 1400},
                {id: "4", value: 41100},
                {id: "5", value: 10}
            ]
        },
        {id: "1231", innerArr: [{id: "444", value: 400}]},
        {id: "991", innerArr: [{id: "500", value: 400}]}
    ];

    const id = "300";
    const innerId = "4";
    const newArr = dataHelper.deleteInnerElement(
        arr, id, "innerArr", innerId
    );

    expect(newArr.length).toBe(arr.length);

    for(const elem of arr)
        if(elem.id !== id)
            expect(newArr).toContain(elem);

    const innerArr = newArr.find(elem => elem.id === id)?.innerArr;
    expect(innerArr?.length).toBe(arr[0].innerArr.length - 1);

    for(const innerElem of arr[0].innerArr)
        if(innerElem.id !== innerId)
            expect(innerArr).toContain(innerElem);

    expect(innerArr).not.toContainEqual({id: "4", value: 41100});
});

test("test editing an inner element", () => {
    const arr = [
        {
            id: "300",
            innerArr: [
                {id: "123", value: 400, a: 5},
                {id: "3", value: 1400, a: 10},
                {id: "4", value: 41100, a: 300},
                {id: "5", value: 10, a: 400}
            ]
        },
        {id: "1231", innerArr: [{id: "444", value: 400}]},
        {id: "991", innerArr: [{id: "500", value: 400}]}
    ];

    const id = "300";
    const innerId = "4";
    const newInnerValue = {value: 500};

    const newArr = dataHelper.editInnerElement(
        arr, id, "innerArr", innerId, newInnerValue
    );

    expect(newArr.length).toBe(arr.length);

    for(const elem of arr)
        if(elem.id !== id)
            expect(newArr).toContain(elem);

    const innerArr = newArr.find(elem => elem.id === id)?.innerArr;
    expect(innerArr?.length).toBe(arr[0].innerArr.length);

    for(const innerElem of arr[0].innerArr)
        if(innerElem.id !== innerId)
            expect(innerArr).toContain(innerElem);

    expect(innerArr).toContainEqual({id: "4", value: 500, a: 300});
});