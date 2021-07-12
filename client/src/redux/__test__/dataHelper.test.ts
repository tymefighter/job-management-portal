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
        {id: "19"}, {id: 45, text: "def"}, 
        {id: "131", float: 1.81}, 
        {id: "4441", boolVal: false}, 
        {id: "111919", cool: true}
    ];
    const removeId = "111919";
    
    const newArr = dataHelper.deleteElement(arr, removeId);

    expect(newArr.length).toBe(arr.length - 1);
    expect(newArr).not.toContain({id: "111919", cool: true});

    for(const elem of arr)
        if(elem.id !== removeId)
            expect(newArr).toContain(elem);
});
