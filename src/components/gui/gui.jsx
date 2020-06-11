import classNames from 'classnames';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {connect} from 'react-redux';
import MediaQuery from 'react-responsive';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';
import VM from 'scratch-vm';
import Renderer from 'scratch-render';

import Blocks from '../../containers/blocks.jsx';
import CostumeTab from '../../containers/costume-tab.jsx';
// import TargetPane from '../../containers/target-pane.jsx';
import TargetPane from '../Equipment/Equipment';
import SoundTab from '../../containers/sound-tab.jsx';
import StageWrapper from '../../containers/stage-wrapper.jsx';
import Loader from '../loader/loader.jsx';
import Box from '../box/box.jsx';
import MenuBar from '../menu-bar/menu-bar.jsx';
import CostumeLibrary from '../../containers/costume-library.jsx';
import BackdropLibrary from '../../containers/backdrop-library.jsx';//背景库
import EquipmentLibrary from '../../containers/equipment-library.jsx';//设备库

import Backpack from '../../containers/backpack.jsx';
import PreviewModal from '../../containers/preview-modal.jsx';
import ImportModal from '../../containers/import-modal.jsx';
import WebGlModal from '../../containers/webgl-modal.jsx';
import TipsLibrary from '../../containers/tips-library.jsx';
import Cards from '../../containers/cards.jsx';
import DragLayer from '../../containers/drag-layer.jsx';

import layout, {STAGE_SIZE_MODES} from '../../lib/layout-constants';
import {resolveStageSize} from '../../lib/screen-utils';

import styles from './gui.css';
import addExtensionIcon from './icon--extensions.svg';
import codeIcon from './icon--code.svg';
import costumesIcon from './icon--costumes.svg';
import soundsIcon from './icon--sounds.svg';

const messages = defineMessages({
    addExtension: {
        id: 'gui.gui.addExtension',
        description: 'Button to add an extension in the target pane',
        defaultMessage: 'Add Extension'
    }
});
// let tabChoiced
// tabChoiced = ( msg) => {
//     // console.log(result, msg)
//     // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
//     // this.setState({
//     //     currentIndex: msg
//     // })
//     alert(msg)
// }
// Cache this value to only retrieve it once the first time.
// Assume that it doesn't change for a session.
let isRendererSupported = null;

const GUIComponent = props => {
    const {
        activeTabIndex,
        basePath,
        backdropLibraryVisible,
        equipmentLibraryVisible,
        backpackOptions,
        blocksTabVisible,
        cardsVisible,
        children,
        costumeLibraryVisible,
        costumesTabVisible,
        enableCommunity,
        importInfoVisible,
        intl,
        isPlayerOnly,
        loading,
        onExtensionButtonClick,
        onEquipmentLibrary,
        onActivateCostumesTab,
        onActivateSoundsTab,
        onActivateTab,
        onRequestCloseBackdropLibrary,
        onRequestCloseCostumeLibrary,
        onRequestcloseEquipmentLibrary,
        onSeeCommunity,
        previewInfoVisible,
        targetIsStage,
        soundsTabVisible,
        stageSizeMode,
        tipsLibraryVisible,
        vm,
        ...componentProps
    } = omit(props, 'dispatch');
    // var dispatch = this.props.dispatch=const {dispatch} = this.props=const dispatch = this.props.dispatch;
    if (children) {
        return <Box {...componentProps}>{children}</Box>;
    }
    
    const tabClassNames = {
        tabs: styles.tabs,
        tab: classNames(tabStyles.reactTabsTab, styles.tab),
        tabList: classNames(tabStyles.reactTabsTabList, styles.tabList),
        tabPanel: classNames(tabStyles.reactTabsTabPanel, styles.tabPanel),
        tabPanelSelected: classNames(tabStyles.reactTabsTabPanelSelected, styles.isSelected),
        tabSelected: classNames(tabStyles.reactTabsTabSelected, styles.isSelected)
    };

    var isBox1Show   //代码块3个得  代码 造型 声音
    var isBox2Show    //代码块个  代码 
   
  
   
    if(1==1){
        isBox1Show="none",
        isBox2Show='flex'
    }else{
        isBox1Show="flex",
        isBox2Show='none'
    }

    if (isRendererSupported === null) {
        isRendererSupported = Renderer.isSupported();
    }

    return (
    <MediaQuery minWidth={layout.fullSizeMinWidth}>{isFullSize => {
        const stageSize = resolveStageSize(stageSizeMode, isFullSize);
       
        return isPlayerOnly ? (
            <StageWrapper
                isRendererSupported={isRendererSupported}
                stageSize={stageSize}
                vm={vm}
            />
        ) : (
            <Box
                className={styles.pageWrapper}
                {...componentProps}
            >
                {previewInfoVisible ? (
                    <PreviewModal />
                ) : null}
                {loading ? (
                    <Loader />
                ) : null}
                {importInfoVisible ? (
                    <ImportModal />
                ) : null}
                {isRendererSupported ? null : (
                    <WebGlModal />
                )}
                {tipsLibraryVisible ? (
                    <TipsLibrary />
                ) : null}
                {cardsVisible ? (
                    <Cards />
                ) : null}
                {costumeLibraryVisible ? ( 
                    <CostumeLibrary
                        vm={vm}
                        onRequestClose={onRequestCloseCostumeLibrary}
                    /> 
                ) : null}
                {costumeLibraryVisible ? (
                    <CostumeLibrary
                        vm={vm}
                        onRequestClose={onRequestCloseCostumeLibrary}
                    />
                ) : null} 
                {backdropLibraryVisible ? (
                    <BackdropLibrary
                        vm={vm}
                        onRequestClose={onRequestCloseBackdropLibrary}
                    />
                ) : null}
                {equipmentLibraryVisible ? (
                    <EquipmentLibrary
                        vm={vm}
                        onRequestClose={onRequestcloseEquipmentLibrary}
                    />
                ) : null}
                <MenuBar
                    enableCommunity={enableCommunity}
                    onSeeCommunity={onSeeCommunity}
                />
                <Box className={styles.bodyWrapper}>
                    <Box className={styles.flexWrapper}>
                        {/* 代码块 */}
                        <Box className={styles.editorWrapper} style={{"display":isBox1Show}}>
                            <Tabs
                                forceRenderTabPanel
                                className={tabClassNames.tabs}
                                selectedIndex={activeTabIndex}
                                selectedTabClassName={tabClassNames.tabSelected}
                                selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                                onSelect={onActivateTab}
                            >
                                <TabList className={tabClassNames.tabList}>
                                    {/* 代码 */}
                                    <Tab className={tabClassNames.tab}>
                                        <img
                                            draggable={false}
                                            src={codeIcon}
                                        />
                                        <FormattedMessage
                                            defaultMessage="Code"
                                            description="Button to get to the code panel"
                                            id="gui.gui.codeTab"
                                        />
                                    </Tab>
                                    <Tab
                                        className={tabClassNames.tab}
                                        onClick={onActivateCostumesTab}
                                        >
                                    {/* // >造型 */}
                                        <img
                                            draggable={false}
                                            src={costumesIcon}
                                        />
                                        {targetIsStage ? (
                                            <FormattedMessage
                                                defaultMessage="Backdrops"
                                                description="Button to get to the backdrops panel"
                                                id="gui.gui.backdropsTab"
                                            />
                                        ) : (
                                            <FormattedMessage
                                                defaultMessage="Costumes"
                                                description="Button to get to the costumes panel"
                                                id="gui.gui.costumesTab"
                                            />
                                        )}
                                    </Tab>
                                    {/* 声音 */}
                                    <Tab
                                        className={tabClassNames.tab}
                                        onClick={onActivateSoundsTab}
                                    >
                                        <img
                                            draggable={false}
                                            src={soundsIcon}
                                        />
                                        <FormattedMessage
                                            defaultMessage="Sounds"
                                            description="Button to get to the sounds panel"
                                            id="gui.gui.soundsTab"
                                        />
                                    </Tab>
                                </TabList>
                                {/* 左边tab框代码 造型 声音 */}
                                <TabPanel className={tabClassNames.tabPanel}>
                                    <Box className={styles.blocksWrapper}>
                                        
                                        <Blocks
                                            grow={1}
                                            isVisible={blocksTabVisible}
                                            options={{
                                                media: `${basePath}static/blocks-media/`
                                            }}
                                            stageSize={stageSize}
                                            vm={vm}
                                        />
                                    </Box>
                                    {/* 扩展 */}
                                    <Box className={styles.extensionButtonContainer}>
                                        <button
                                            className={styles.extensionButton}
                                            title={intl.formatMessage(messages.addExtension)}
                                            onClick={onExtensionButtonClick}
                                        >
                                            <img
                                                className={styles.extensionButtonIcon}
                                                draggable={false}
                                                src={addExtensionIcon}
                                            />
                                        </button>
                                    </Box>
                                </TabPanel>
                                {/*  造型内容 */}
                                <TabPanel className={tabClassNames.tabPanel}>
                                    {costumesTabVisible ? <CostumeTab vm={vm} /> : null}
                                </TabPanel>
                                {/* 声音内容 */}
                                <TabPanel className={tabClassNames.tabPanel}>
                                    {soundsTabVisible ? <SoundTab vm={vm} /> : null}
                                </TabPanel>
                            </Tabs>
                            {/* 书包 */}
                            {/* {backpackOptions.visible ? (
                                <Backpack host={backpackOptions.host} />
                            ) : null} */}
                        </Box>
                        <Box className={styles.editorWrapper} style={{"display":isBox2Show}}>
                            <Tabs
                                forceRenderTabPanel
                                className={tabClassNames.tabs}
                                selectedIndex={activeTabIndex}
                                selectedTabClassName={tabClassNames.tabSelected}
                                selectedTabPanelClassName={tabClassNames.tabPanelSelected}
                                onSelect={onActivateTab}
                            >
                                <TabList className={styles.tabbs}>
                                    {/* 代码 */}
                                    <Tab className={tabClassNames.tab}>
                                        <img
                                            draggable={false}
                                            src={codeIcon}
                                        />
                                        <FormattedMessage
                                            defaultMessage="Code"
                                            description="Button to get to the code panel"
                                            id="gui.gui.codeTab"
                                        />
                                    </Tab>
                                </TabList>
                                <TabPanel className={tabClassNames.tabPanel}>
                                    {/* 代码展示区 */}
                                    <Box className={styles.blocksWrapper}>
                                        
                                        <Blocks
                                            grow={1}
                                            isVisible={blocksTabVisible}
                                            options={{
                                                media: `${basePath}static/blocks-media/`
                                            }}
                                            stageSize={stageSize}
                                            vm={vm}
                                        />
                                    </Box>
                                    {/* 扩展 */}
                                    <Box className={styles.extensionButtonContainer}>
                                        <button
                                            className={styles.extensionButton}
                                            title={intl.formatMessage(messages.addExtension)}
                                            onClick={onExtensionButtonClick}
                                        >
                                            <img
                                                className={styles.extensionButtonIcon}
                                                draggable={false}
                                                src={addExtensionIcon}
                                            />
                                        </button>
                                    </Box>
                                </TabPanel>
                            </Tabs>
                            {/* 书包 */}
                            {/* {backpackOptions.visible ? (
                                <Backpack host={backpackOptions.host} />
                            ) : null} */}
                        </Box>
                        <Box className={classNames(styles.stageAndTargetWrapper, styles[stageSize])}>
                            {/* 右上角 */}
                            <StageWrapper
                                isRendererSupported={isRendererSupported}
                                stageSize={stageSize}
                                vm={vm}
                            />
                            {/* 右下角框 角色舞台*/}
                            <div className={styles.targetWrapper}>
                                <TargetPane
                                    stageSize={stageSize}
                                    vm={vm}
                                    // onClick={onEquipmentLibrary}
                                    // parent={ this }
                                    // tabChoiced={this.tabChoiced.bind(this)}
                                    // handleData={this.handleData}
                                />
                            </div>
                        </Box>
                    </Box>
                </Box>
                <DragLayer />
            </Box>
        );
    }}</MediaQuery>);
};
//Component  组成
GUIComponent.propTypes = {
    activeTabIndex: PropTypes.number,
    backdropLibraryVisible: PropTypes.bool,
    equipmentLibraryVisible:PropTypes.bool,
    backpackOptions: PropTypes.shape({
        host: PropTypes.string,
        visible: PropTypes.bool
    }),
    basePath: PropTypes.string,
    blocksTabVisible: PropTypes.bool,
    cardsVisible: PropTypes.bool,
    children: PropTypes.node,
    costumeLibraryVisible: PropTypes.bool,
    costumesTabVisible: PropTypes.bool,
    enableCommunity: PropTypes.bool,
    importInfoVisible: PropTypes.bool,
    intl: intlShape.isRequired,
    isPlayerOnly: PropTypes.bool,
    loading: PropTypes.bool,
    onActivateCostumesTab: PropTypes.func,
    onActivateSoundsTab: PropTypes.func,
    onActivateTab: PropTypes.func,
    onExtensionButtonClick: PropTypes.func,
    onRequestCloseBackdropLibrary: PropTypes.func,
    onRequestcloseEquipmentLibrary: PropTypes.func,
    onRequestCloseCostumeLibrary: PropTypes.func,
    onSeeCommunity: PropTypes.func,
    onTabSelect: PropTypes.func,
    previewInfoVisible: PropTypes.bool,
    soundsTabVisible: PropTypes.bool,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    targetIsStage: PropTypes.bool,
    tipsLibraryVisible: PropTypes.bool,
    vm: PropTypes.instanceOf(VM).isRequired
};
GUIComponent.defaultProps = {
    backpackOptions: {
        host: null,
        visible: false
    },
    basePath: './',
    stageSizeMode: STAGE_SIZE_MODES.large
};

const mapStateToProps = state => ({
    // This is the button's mode, as opposed to the actual current state 这是按钮的模式，与实际的当前状态相反
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    
});

export default injectIntl(connect(
    mapStateToProps
)(GUIComponent));

