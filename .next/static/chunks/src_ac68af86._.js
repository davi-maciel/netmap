(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/page.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "page-module___8aEwW__container",
  "mapContainer": "page-module___8aEwW__mapContainer",
  "marker": "page-module___8aEwW__marker",
  "markerDimmed": "page-module___8aEwW__markerDimmed",
  "markerHighlighted": "page-module___8aEwW__markerHighlighted",
  "searchBarOverlay": "page-module___8aEwW__searchBarOverlay",
});
}),
"[project]/src/data/mockData.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Mock data for network map
 * This simulates what will eventually come from Supabase
 *
 * Database schema:
 * - people: id, first_name, last_name, profile_picture, bio
 * - locations: id, person_id, label, latitude, longitude
 */ // People table mock data
__turbopack_context__.s([
    "getLocationsWithPeople",
    ()=>getLocationsWithPeople,
    "getPeopleWithLocations",
    ()=>getPeopleWithLocations,
    "getPersonById",
    ()=>getPersonById,
    "locations",
    ()=>locations,
    "people",
    ()=>people
]);
const people = [
    {
        id: 1,
        first_name: "Lucas",
        last_name: "Silva",
        profile_picture: "https://i.pravatar.cc/200?img=12",
        bio: "Software engineer passionate about web development and open source"
    },
    {
        id: 2,
        first_name: "Kaio",
        last_name: "Santos",
        profile_picture: "https://i.pravatar.cc/200?img=33",
        bio: "Data scientist exploring machine learning and AI applications"
    },
    {
        id: 3,
        first_name: "Maya",
        last_name: "Patel",
        profile_picture: "https://i.pravatar.cc/200?img=45",
        bio: "Electrical engineer working on hardware-software integration"
    },
    {
        id: 4,
        first_name: "James",
        last_name: "Chen",
        profile_picture: "https://i.pravatar.cc/200?img=68",
        bio: "AI researcher focused on natural language processing"
    },
    {
        id: 5,
        first_name: "Sofia",
        last_name: "Rodriguez",
        profile_picture: "https://i.pravatar.cc/200?img=47",
        bio: "Entrepreneur building sustainable tech solutions"
    },
    {
        id: 6,
        first_name: "Ahmed",
        last_name: "Hassan",
        profile_picture: "https://i.pravatar.cc/200?img=59",
        bio: "Mechanical engineer developing renewable energy systems"
    },
    {
        id: 7,
        first_name: "Emma",
        last_name: "Johnson",
        profile_picture: "https://i.pravatar.cc/200?img=25",
        bio: "UX designer creating accessible and inclusive products"
    },
    {
        id: 8,
        first_name: "Yuki",
        last_name: "Tanaka",
        profile_picture: "https://i.pravatar.cc/200?img=52",
        bio: "Robotics engineer building autonomous systems"
    },
    {
        id: 9,
        first_name: "Pedro",
        last_name: "Madureira",
        profile_picture: "https://i.pravatar.cc/200?img=22",
        bio: "Improv + chemistry"
    },
    {
        id: 10,
        first_name: "Helio",
        last_name: "Nitrogen",
        profile_picture: "https://i.pravatar.cc/200?img=24",
        bio: "coffee addict, ironman, cs teacher"
    }
];
const locations = [
    // Lucas's locations
    {
        id: 1,
        person_id: 1,
        label: "Northwestern University",
        latitude: 42.050703,
        longitude: -87.678376
    },
    {
        id: 2,
        person_id: 1,
        label: "São Paulo, Brazil",
        latitude: -23.579313,
        longitude: -46.639187
    },
    // Kaio's locations
    {
        id: 3,
        person_id: 2,
        label: "Northwestern University",
        latitude: 42.050703,
        longitude: -87.678376
    },
    {
        id: 4,
        person_id: 2,
        label: "Belo Horizonte, Brazil",
        latitude: -19.927092,
        longitude: -43.953965
    },
    // Maya's locations
    {
        id: 5,
        person_id: 3,
        label: "Stanford University",
        latitude: 37.429464,
        longitude: -122.169719
    },
    {
        id: 6,
        person_id: 3,
        label: "Mumbai, India",
        latitude: 19.075983,
        longitude: 72.877426
    },
    {
        id: 7,
        person_id: 3,
        label: "Mountain View, CA",
        latitude: 37.422,
        longitude: -122.084
    },
    // James's locations
    {
        id: 8,
        person_id: 4,
        label: "MIT",
        latitude: 42.360253,
        longitude: -71.092003
    },
    {
        id: 9,
        person_id: 4,
        label: "Hong Kong",
        latitude: 22.396428,
        longitude: 114.109497
    },
    // Sofia's locations
    {
        id: 10,
        person_id: 5,
        label: "UC Berkeley",
        latitude: 37.871899,
        longitude: -122.258515
    },
    {
        id: 11,
        person_id: 5,
        label: "Mexico City, Mexico",
        latitude: 19.432608,
        longitude: -99.133209
    },
    // Ahmed's locations
    {
        id: 12,
        person_id: 6,
        label: "Northwestern University",
        latitude: 42.050703,
        longitude: -87.678376
    },
    {
        id: 13,
        person_id: 6,
        label: "Cairo, Egypt",
        latitude: 30.04442,
        longitude: 31.235712
    },
    // Emma's locations
    {
        id: 14,
        person_id: 7,
        label: "Stanford University",
        latitude: 37.429464,
        longitude: -122.169719
    },
    {
        id: 15,
        person_id: 7,
        label: "London, UK",
        latitude: 51.507351,
        longitude: -0.127758
    },
    // Yuki's locations
    {
        id: 16,
        person_id: 8,
        label: "MIT",
        latitude: 42.360253,
        longitude: -71.092003
    },
    {
        id: 17,
        person_id: 8,
        label: "Tokyo, Japan",
        latitude: 35.689487,
        longitude: 139.691706
    },
    {
        id: 18,
        person_id: 8,
        label: "MIT Research Lab",
        latitude: 42.361145,
        longitude: -71.089264
    },
    {
        id: 19,
        person_id: 9,
        label: "Ari de Sá Cavalcante",
        latitude: -3.745609541860808,
        longitude: -38.49246048706968
    },
    {
        id: 20,
        person_id: 10,
        label: "Home",
        latitude: 31.2555372007631,
        longitude: 121.44630961706912
    }
];
const getPeopleWithLocations = ()=>{
    return people.map((person)=>({
            ...person,
            locations: locations.filter((loc)=>loc.person_id === person.id)
        }));
};
const getPersonById = (personId)=>{
    const person = people.find((p)=>p.id === personId);
    if (!person) return null;
    return {
        ...person,
        locations: locations.filter((loc)=>loc.person_id === personId)
    };
};
const getLocationsWithPeople = ()=>{
    return locations.map((location)=>{
        const person = people.find((p)=>p.id === location.person_id);
        return {
            ...location,
            person
        };
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/SearchBar.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const SearchBar = (param)=>{
    let { people, onSelectPerson } = param;
    _s();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showResults, setShowResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Filter people based on search query
    const filteredPeople = searchQuery.trim() ? people.filter((person)=>{
        const fullName = "".concat(person.first_name, " ").concat(person.last_name).toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    }) : [];
    const handleInputChange = (e)=>{
        setSearchQuery(e.target.value);
        setShowResults(true);
    };
    const handleSelectPerson = (person)=>{
        setSearchQuery("".concat(person.first_name, " ").concat(person.last_name));
        setShowResults(false);
        if (onSelectPerson) {
            onSelectPerson(person);
        }
    };
    const handleClearSearch = ()=>{
        setSearchQuery("");
        setShowResults(false);
        if (onSelectPerson) {
            onSelectPerson(null);
        }
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (filteredPeople.length > 0) {
            handleSelectPerson(filteredPeople[0]);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            className: "max-w-md mx-auto",
            onSubmit: handleSubmit,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    htmlFor: "default-search",
                    className: "mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white",
                    children: "Search"
                }, void 0, false, {
                    fileName: "[project]/src/app/SearchBar.jsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-4 h-4 text-gray-500 dark:text-gray-400",
                                "aria-hidden": "true",
                                xmlns: "http://www.w3.org/2000/svg",
                                fill: "none",
                                viewBox: "0 0 20 20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    stroke: "currentColor",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: "2",
                                    d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/SearchBar.jsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/app/SearchBar.jsx",
                                lineNumber: 56,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/app/SearchBar.jsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "search",
                            id: "default-search",
                            className: "block w-full p-4 ps-10 pr-24 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                            placeholder: "Search for people...",
                            value: searchQuery,
                            onChange: handleInputChange,
                            onFocus: ()=>setShowResults(true),
                            onBlur: ()=>setTimeout(()=>setShowResults(false), 200)
                        }, void 0, false, {
                            fileName: "[project]/src/app/SearchBar.jsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleClearSearch,
                            className: "text-gray-500 absolute end-24 bottom-2.5 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-medium rounded-lg text-sm px-2 py-2",
                            children: "✕"
                        }, void 0, false, {
                            fileName: "[project]/src/app/SearchBar.jsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            className: "text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                            children: "Search"
                        }, void 0, false, {
                            fileName: "[project]/src/app/SearchBar.jsx",
                            lineNumber: 91,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/SearchBar.jsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                showResults && filteredPeople.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-600 max-h-96 overflow-y-auto",
                    children: filteredPeople.map((person)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0",
                            onClick: ()=>handleSelectPerson(person),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: person.profile_picture,
                                    alt: "".concat(person.first_name, " ").concat(person.last_name),
                                    className: "w-10 h-10 rounded-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/SearchBar.jsx",
                                    lineNumber: 108,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-medium text-gray-900 dark:text-white",
                                            children: [
                                                person.first_name,
                                                " ",
                                                person.last_name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/SearchBar.jsx",
                                            lineNumber: 114,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm text-gray-500 dark:text-gray-400 truncate",
                                            children: person.bio
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/SearchBar.jsx",
                                            lineNumber: 117,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/SearchBar.jsx",
                                    lineNumber: 113,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, person.id, true, {
                            fileName: "[project]/src/app/SearchBar.jsx",
                            lineNumber: 103,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/app/SearchBar.jsx",
                    lineNumber: 101,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/SearchBar.jsx",
            lineNumber: 47,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/app/SearchBar.jsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(SearchBar, "22dKwvSM9LJlG+m/8iMSpIP+3qU=");
_c = SearchBar;
const __TURBOPACK__default__export__ = SearchBar;
var _c;
__turbopack_context__.k.register(_c, "SearchBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/maplibre-gl/dist/maplibre-gl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/page.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/mockData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$SearchBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/SearchBar.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Home() {
    _s();
    const mapContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mapRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const markersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const markerElementsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    const [selectedPerson, setSelectedPerson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const locationsWithPeople = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocationsWithPeople"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (!mapContainerRef.current) return;
            const map = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Map({
                container: mapContainerRef.current,
                style: "https://demotiles.maplibre.org/style.json",
                center: [
                    0,
                    20
                ],
                zoom: 2,
                attributionControl: false
            });
            mapRef.current = map;
            // Add navigation controls on the right side instead
            map.addControl(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].NavigationControl(), 'top-right');
            // Clear selection when clicking on the map
            map.on('click', {
                "Home.useEffect": ()=>{
                    setSelectedPerson(null);
                }
            }["Home.useEffect"]);
            // Add markers for each location
            locationsWithPeople.forEach({
                "Home.useEffect": (location)=>{
                    const { person } = location;
                    const lngLat = [
                        location.longitude,
                        location.latitude
                    ];
                    // Create custom marker element
                    const el = document.createElement("div");
                    el.className = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].marker;
                    el.style.backgroundImage = "url(".concat(person.profile_picture, ")");
                    el.style.width = "70px";
                    el.style.height = "70px";
                    el.dataset.personId = person.id;
                    // Create popup with person info
                    const popup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].Popup({
                        offset: 25
                    }).setHTML('\n        <div style="padding: 10px; min-width: 200px;">\n          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">\n            '.concat(person.first_name, " ").concat(person.last_name, '\n          </h3>\n          <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">\n            📍 ').concat(location.label, '\n          </p>\n          <p style="margin: 0; font-size: 13px; color: #888; line-height: 1.4;">\n            ').concat(person.bio, "\n          </p>\n        </div>\n      "));
                    // Add marker to map with popup
                    const marker = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"]({
                        element: el
                    }).setLngLat(lngLat).setPopup(popup).addTo(map);
                    // Store marker and element references by person and location
                    const key = "".concat(person.id, "-").concat(location.id);
                    markersRef.current[key] = marker;
                    markerElementsRef.current[key] = el;
                }
            }["Home.useEffect"]);
            return ({
                "Home.useEffect": ()=>{
                    map.remove();
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    // Handle person selection from search
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            // Reset all markers to default state
            Object.values(markerElementsRef.current).forEach({
                "Home.useEffect": (el)=>{
                    el.classList.remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].markerHighlighted);
                    el.classList.remove(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].markerDimmed);
                }
            }["Home.useEffect"]);
            if (!selectedPerson || !mapRef.current) return;
            // Find all locations for the selected person
            const personLocations = locationsWithPeople.filter({
                "Home.useEffect.personLocations": (loc)=>loc.person.id === selectedPerson.id
            }["Home.useEffect.personLocations"]);
            if (personLocations.length === 0) return;
            // Highlight selected person's markers and dim others
            Object.entries(markerElementsRef.current).forEach({
                "Home.useEffect": (param)=>{
                    let [key, el] = param;
                    const personId = parseInt(el.dataset.personId);
                    if (personId === selectedPerson.id) {
                        el.classList.add(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].markerHighlighted);
                    } else {
                        el.classList.add(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].markerDimmed);
                    }
                }
            }["Home.useEffect"]);
            // If person has only one location, fly to it
            if (personLocations.length === 1) {
                const location = personLocations[0];
                mapRef.current.flyTo({
                    center: [
                        location.longitude,
                        location.latitude
                    ],
                    zoom: 12,
                    duration: 2000
                });
                // Open the popup for this marker
                const key = "".concat(selectedPerson.id, "-").concat(location.id);
                const marker = markersRef.current[key];
                if (marker) {
                    marker.togglePopup();
                }
            } else {
                // If person has multiple locations, fit bounds to show all
                const bounds = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].LngLatBounds();
                personLocations.forEach({
                    "Home.useEffect": (loc)=>{
                        bounds.extend([
                            loc.longitude,
                            loc.latitude
                        ]);
                    }
                }["Home.useEffect"]);
                mapRef.current.fitBounds(bounds, {
                    padding: 100,
                    duration: 2000
                });
            }
        }
    }["Home.useEffect"], [
        selectedPerson
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: mapContainerRef,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mapContainer
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchBarOverlay,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$SearchBar$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    people: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$mockData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["people"],
                    onSelectPerson: setSelectedPerson
                }, void 0, false, {
                    fileName: "[project]/src/app/page.js",
                    lineNumber: 141,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.js",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.js",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_s(Home, "RIxlf317BOGWKAGOVGMVn/o9yPw=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_ac68af86._.js.map