import analytics from '../lib/analytics';

const OPEN_MODAL = 'scratch-gui/modals/OPEN_MODAL';
const CLOSE_MODAL = 'scratch-gui/modals/CLOSE_MODAL';

const MODAL_BACKDROP_LIBRARY = 'backdropLibrary';//背景库
const MODAL_CAMERA_CAPTURE = 'cameraCapture';//捕捉摄像
const MODAL_COSTUME_LIBRARY = 'costumeLibrary';//造型库
const MODAL_EXTENSION_LIBRARY = 'extensionLibrary';//扩展库
const MODAL_IMPORT_INFO = 'importInfo';//输入
const MODAL_LOADING_PROJECT = 'loadingProject';//加载项目
const MODAL_PREVIEW_INFO = 'previewInfo';//预览信息
const MODAL_SOUND_LIBRARY = 'soundLibrary';//声音库
const MODAL_SPRITE_LIBRARY = 'spriteLibrary';//角色库
const MODAL_SOUND_RECORDER = 'soundRecorder';//录音机
const MODAL_EQUIPMENT_LIBRARY = 'equipmentLibrary';//设备

const MODAL_TIPS_LIBRARY = 'tipsLibrary';


const initialState = {
    
    [MODAL_CAMERA_CAPTURE]: false,
    [MODAL_COSTUME_LIBRARY]: false,
    [MODAL_EXTENSION_LIBRARY]: false,
    [MODAL_IMPORT_INFO]: false,
    [MODAL_LOADING_PROJECT]: false,
    [MODAL_PREVIEW_INFO]: true,
    [MODAL_SOUND_LIBRARY]: false,
    [MODAL_SPRITE_LIBRARY]: false,
    [MODAL_SOUND_RECORDER]: false,
    [MODAL_TIPS_LIBRARY]: false,
    [MODAL_EQUIPMENT_LIBRARY]:false,
};

const reducer = function (state, action) {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
    case OPEN_MODAL:
        return Object.assign({}, state, {
            [action.modal]: true
        });
    case CLOSE_MODAL:
        return Object.assign({}, state, {
            [action.modal]: false
        });
    default:
        return state;
    }
};
const openModal = function (modal) {
    return {
        type: OPEN_MODAL,
        modal: modal
    };
};
const closeModal = function (modal) {
    return {
        type: CLOSE_MODAL,
        modal: modal
    };
};
const openBackdropLibrary = function () {
    analytics.pageview('/libraries/backdrops.json');
    return openModal(MODAL_BACKDROP_LIBRARY);
};
const openCameraCapture = function () {
    analytics.pageview('/modals/camera');
    return openModal(MODAL_CAMERA_CAPTURE);
};
const openCostumeLibrary = function () {
    analytics.pageview('/libraries/costumes');
    return openModal(MODAL_COSTUME_LIBRARY);
};
const openExtensionLibrary = function () {
    analytics.pageview('/libraries/extensions');
    return openModal(MODAL_EXTENSION_LIBRARY);
};
const openImportInfo = function () {
    analytics.pageview('modals/import');
    return openModal(MODAL_IMPORT_INFO);
};
const openLoadingProject = function () {
    analytics.pageview('modals/loading');
    return openModal(MODAL_LOADING_PROJECT);
};
const openPreviewInfo = function () {
    analytics.pageview('/modals/preview');
    return openModal(MODAL_PREVIEW_INFO);
};
const openSoundLibrary = function () {
    analytics.pageview('/libraries/sounds');
    return openModal(MODAL_SOUND_LIBRARY);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////
const openSpriteLibrary = function () {
    analytics.pageview('/libraries/sprites');
    return openModal(MODAL_SPRITE_LIBRARY);
};
////////////////////////////////////////////////////////////
const openSoundRecorder = function () {
    analytics.pageview('/modals/microphone');
    return openModal(MODAL_SOUND_RECORDER);
};
const openTipsLibrary = function () {
    analytics.pageview('/modals/tips');
    return openModal(MODAL_TIPS_LIBRARY);
};
const openEquipmentLibrary = function () {
    analytics.pageview('/libraries/equipment');
　　return openModal(MODAL_EQUIPMENT_LIBRARY);
};
const closeBackdropLibrary = function () {
    return closeModal(MODAL_BACKDROP_LIBRARY);
};
const closeCameraCapture = function () {
    return closeModal(MODAL_CAMERA_CAPTURE);
};
const closeCostumeLibrary = function () {
    return closeModal(MODAL_COSTUME_LIBRARY);
};
const closeExtensionLibrary = function () {
    return closeModal(MODAL_EXTENSION_LIBRARY);
};
const closeImportInfo = function () {
    return closeModal(MODAL_IMPORT_INFO);
};
const closeLoadingProject = function () {
    return closeModal(MODAL_LOADING_PROJECT);
};
const closePreviewInfo = function () {
    return closeModal(MODAL_PREVIEW_INFO);
};
const closeSpriteLibrary = function () {
    return closeModal(MODAL_SPRITE_LIBRARY);
};
const closeSoundLibrary = function () {
    return closeModal(MODAL_SOUND_LIBRARY);
};
const closeSoundRecorder = function () {
    return closeModal(MODAL_SOUND_RECORDER);
};
const closeTipsLibrary = function () {
    return closeModal(MODAL_TIPS_LIBRARY);
};
const closeEquipmentLibrary = function () {
　　return closeModal(MODAL_EQUIPMENT_LIBRARY);
};
export {
    reducer as default,
    initialState as modalsInitialState,
    openBackdropLibrary,
    openCameraCapture,
    openCostumeLibrary,
    openExtensionLibrary,
    openImportInfo,
    openLoadingProject,
    openPreviewInfo,
    openSoundLibrary,
    openSpriteLibrary,
    openSoundRecorder,
    openTipsLibrary,
    closeBackdropLibrary,
    closeCameraCapture,
    closeCostumeLibrary,
    closeExtensionLibrary,
    closeImportInfo,
    closeLoadingProject,
    closePreviewInfo,
    closeSpriteLibrary,
    closeSoundLibrary,
    closeSoundRecorder,
    closeTipsLibrary,
    closeEquipmentLibrary,
    openEquipmentLibrary
};
