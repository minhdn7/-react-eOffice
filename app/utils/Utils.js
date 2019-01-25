export const convertJsonToTreeMap = array => {
    var map = {};
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        if (!(obj.id in map)) {
            map[obj.id] = obj;
            map[obj.id].children = [];
            //map[obj.id].name = obj.Name;
            map[obj.id].isCheckPH = false;
            map[obj.id].isCheckXem = false;
            map[obj.id].isCheckXLC = false;
        }

        // if (typeof map[obj.id].userName == 'undefined') {
        //     map[obj.id].id = obj.id
        //     map[obj.id].userName = obj.userName
        //     map[obj.id].name = obj.userName
        //     map[obj.id].parentId = obj.parentId
        // }

        var parent = obj.parentId || "-";
        if (!(parent in map)) {
            map[parent] = obj;

            map[parent].children = [];
        } else {
            map[parent].children.push(map[obj.id]);
        }


    }
    return map["-"];
};

export const convertJsonToTreeMapCustom = array => {
    var map = {};
    var treeData = [];
    var lstId = [];
    for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        if (!(obj.id in map)) {
            map[obj.id] = obj;
            map[obj.id].key = obj.id + "_" + obj.parentId;
            map[obj.id].children = [];
            //map[obj.id].name = obj.Name;
            map[obj.id].isCheckPH = false;
            map[obj.id].isCheckXem = false;
            map[obj.id].isCheckXLC = false;
        }

        // if (typeof map[obj.id].userName == 'undefined') {
        //     map[obj.id].id = obj.id
        //     map[obj.id].userName = obj.userName
        //     map[obj.id].name = obj.userName
        //     map[obj.id].parentId = obj.parentId
        // }

        if (obj.parentId) {
            var parent = obj.parentId;
            if (!(parent in map)) {
                map[parent] = obj;

                map[parent].children = [];
            } else {
                map[parent].children.push(map[obj.id]);
            }
        } else {
            lstId.push(obj.id);
        }
    }
    if (lstId && lstId.length) {
        for (let i = 0; i < lstId.length; i++) {
            treeData.push(map[lstId[i]]);
        }
    }
    return treeData;
};

export const getIdByUnitAndUser = (id, type) => {
    let idNew;
    if (id) {
        switch (type) {
            case 1:
                idNew = "U" + id.split("|")[1];
                break;
            case 2:
                idNew = id.split("@")[0];
                break;
        }
    }
    return idNew;
}

export const shortText = (text, length) => {
    const words = text.split(' ');
    if (words.length > length) {
        let newText = "";
        for (let i = 0; i < length; i++) {
            newText += words[i] + " ";
        }
        return newText + "...";
    }

    return text;
}

export const findByIdAndSwap = (data, item, type) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == getIdByUnitAndUser(item.id, type)) {
            data[i].isCheckXLC = item.isCheckXLC;
            data[i].isCheckPH = item.isCheckPH;
            data[i].isCheckXem = item.isCheckXem;
            //this.addItemToListDataSelect(data[i]);
            return;
        } else if (data[i].children && data[i].children.length) {
            findByIdAndSwap(data[i].children, item, type);
        }
    }
}

export const resetCheckXLC = (data) => {
    if (data && data.length) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].isCheckXLC === true) {
                data[i].isCheckXLC = false;
                return;
            }

            if (data[i].children)
                resetCheckXLC(data[i].children);
        }
    }
}

export const getItemSelect = (data, lstData) => {
    if(data && data.length){
        for (var i = 0; i < data.length; i++) {
            if (data[i].isCheckXLC || data[i].isCheckPH || data[i].isCheckXem) {
                lstData.push(data[i]);
            }
            if (data[i].children)
            getItemSelect(data[i].children, lstData);
        }
    }
}

export const isEmpty = (obj) => {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}