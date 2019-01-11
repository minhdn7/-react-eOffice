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