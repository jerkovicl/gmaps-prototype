JsonVisualize = function (obj, container) {
    if (typeof obj === 'string') {
        obj = JSON.parse(obj);
    }
    this.obj = obj;
    this.title = 'objectVariableName';
    this.depth = 0;
    this.container = container;
    this.elementClass = 'object-content';
    this.startLoop = false;
};

JsonVisualize.prototype = {
    display: function () {
        this.recur(this.obj);
    },

    recur: function (element) {
        if (this.isArray(element)) {
            this.displayArray(element);
        }
        else if (element === null) {
            this.displayItem(element);
        }
        else if (typeof element === 'object') {
            this.displayObject(element);
        }
        else {
            this.displayItem(element);
        }
    },

    displayArray: function (element) {
        this.create('[', 'structure');
        this.br();
        var originalTitle = this.title;
        this.depth++;
        this.elementClass = 'array-content';
        this.startLoop = false;
        for (var x = 0; x < element.length; x++) {
            this.title = originalTitle + '[' + x + ']';
            this.recur(element[x]);
            if (x !== element.length - 1) {
                this.create(',', 'comma');
            }
            this.br();
        }
        this.depth--;
        this.title = originalTitle;
        this.create(']', 'structure');
    },

    displayItem: function (element) {
        this.create(element, this.elementClass, this.title);
    },

    displayObject: function (element) {
        var originalTitle = this.title;
        this.create('{', 'structure');
        this.br();
        this.depth++;
        this.elementClass = 'object-content';
        for (var item in element) {
            if (element.hasOwnProperty(item)) {
                this.title = originalTitle + '.' + item;
                this.startLoop = true;
                this.create('"' + item + '":', 'name');
                this.recur(element[item]);
            }
            this.create(',', 'comma');
            this.br();
            this.startLoop = false;
        }
        this.depth--;
        this.create('}', 'structure');
        this.title = originalTitle;
    },

    create: function (content, className, title) {
        var displayText = document.createTextNode(content);
        var displayNode = document.createElement('div');
        displayNode.appendChild(displayText);
        displayNode.className = className;

        if (typeof title !== 'undefined') {
            displayNode.setAttribute('title', title);
        }
        if (className === 'name' || (className === 'structure' && !this.startLoop) || className === 'array-content') {
            displayNode.style.paddingLeft = (this.depth * 20) + 'px';
        }
        this.container.appendChild(displayNode);

        return displayNode;
    },

    isArray: function (obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        }
        return toString.call(obj) === '[object Array]';
    },

    br: function () {
        this.container.appendChild(document.createElement('br'));
    }
};

var json = {
    "objekti" : [
        {
            "title": "Aberystwyth University",
            "url": "www.aber.ac.uk",
            "phone": "+44 (0)1970 623 111",
            "lat": 52.415524,
            "lng": -4.063066,
            "icon": "images/flag.png",
            "sectors": [
                {
                    "SECTYPE": "Sektor vidljivosti",
                    "COLOR": "white",
                    "ANGLE1": "28",
                    "ANGLE2": "252",
                    "DELTA": "224"
                },
                {
                    "SECTYPE": "Sektor vidljivosti",
                    "COLOR": "red",
                    "ANGLE1": "252",
                    "ANGLE2": "258",
                    "DELTA": "6"
                },
                {
                    "SECTYPE": "Sektor vidljivosti",
                    "COLOR": "white",
                    "ANGLE1": "258",
                    "ANGLE2": "298",
                    "DELTA": "40"
                }
            ],
            "color": "green",
            "angle": "90"
        },
        {
            "title": "Bangor University",
            "url": "www.bangor.ac.uk",
            "phone": "+44 (0)1248 351 151",
            "lat": 53.229520,
            "lng": -4.129987,
            "icon": "images/flag.png",
            "sectors": [
                {
                    "SECTYPE": "Sektor vidljivosti",
                    "COLOR": "white",
                    "ANGLE1": "58",
                    "ANGLE2": "252",
                    "DELTA": "224"
                },
                {
                    "SECTYPE": "Sektor vidljivosti",
                    "COLOR": "red",
                    "ANGLE1": "252",
                    "ANGLE2": "258",
                    "DELTA": "6"
                },
                {
                    "SECTYPE": "Sektor vidljivosti",
                    "COLOR": "yellow",
                    "ANGLE1": "258",
                    "ANGLE2": "298",
                    "DELTA": "40"
                }
            ],
            "color": "red",
            "angle": "90"
        },
        {
            "title": "Cardiff Metropolitan University",
            "url": "www.cardiffmet.ac.uk",
            "phone": "+44 (0)2920 416 138",
            "lat": 51.482708,
            "lng": -3.165881,
            "icon": "images/flag.png",
            "sectors": [
                {
                    "SECTYPE": "Sektor vidljivosti",
                    "COLOR": "white",
                    "ANGLE1": "78",
                    "ANGLE2": "252",
                    "DELTA": "224"
                },
                {
                    "SECTYPE": "Sektor vidljivosti",
                    "COLOR": "red",
                    "ANGLE1": "252",
                    "ANGLE2": "258",
                    "DELTA": "6"
                },
                {
                    "SECTYPE": "Sektor vidljivosti",
                    "COLOR": "blue",
                    "ANGLE1": "258",
                    "ANGLE2": "298",
                    "DELTA": "40"
                }
            ],
            "color": "yellow",
            "angle": "180"
        }
    ]
};


