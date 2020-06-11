const ACTIVATE_TAB = 'scratch-gui/navigation/ACTIVATE_TAB';

// Constants use numbers to make it easier to work with react-tabs

const BLOCKS_TAB_INDEX = 0;
const COSTUMES_TAB_INDEX = 1;//造型
const SOUNDS_TAB_INDEX = 2;//声音

const initialState = {
    activeTabIndex: BLOCKS_TAB_INDEX
};
    
const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case ACTIVATE_TAB:
        return Object.assign({}, state, {
            activeTabIndex: action.activeTabIndex
        });
    default:
        return state;
    }
};

const activateTab = function (tab) {
    return {
        type: ACTIVATE_TAB,
        activeTabIndex: tab
    };
};

export {
    reducer as default,
    initialState as editorTabInitialState,
    activateTab,//切换
    BLOCKS_TAB_INDEX,//语言
    COSTUMES_TAB_INDEX,//造型
    SOUNDS_TAB_INDEX//声音
};
