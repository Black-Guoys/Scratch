import PropTypes from 'prop-types';
import React from 'react';

import VM from 'scratch-vm';

import SpriteLibrary from '../../containers/sprite-library.jsx';
import EquipmentLibrary from '../../containers/equipment-library.jsx';
import SpriteSelectorComponent from '../sprite-selector/sprite-selector.jsx';//角色 equipmentLibraryContent
import StageSelector from '../../containers/stage-selector.jsx';//舞台
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants';

import styles from './target-pane.css';

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
const TargetPane = ({
    editingTarget,
    fileInputRef,
    hoveredTarget,
    spriteLibraryVisible,
    equipmentLibraryVisible,
    onChangeSpriteDirection,
    onChangeSpriteName,
    onChangeSpriteSize,
    onChangeSpriteVisibility,
    onChangeSpriteX,
    onChangeSpriteY,
    onDeleteSprite,
    onDrop,
    onDuplicateSprite,
    onExportSprite,
    onFileUploadClick,
    onNewSpriteClick,
    onPaintSpriteClick,
    onRequestCloseSpriteLibrary,
    onSelectSprite,
    onSpriteUpload,
    onSurpriseSpriteClick,
    raiseSprites,
    stage,
    stageSize,
    sprites,
    vm,
    ...componentProps
}) => (
    <div
        className={styles.targetPane}
        {...componentProps}
    >
         {/* <div className={styles.button}><span className={styles.buttonone}>设备</span><span className={styles.buttontwo}>角色</span></div> */}
         <div className={styles.targetPane1}>
             {/* 角色 */}
            <SpriteSelectorComponent
                editingTarget={editingTarget}
                hoveredTarget={hoveredTarget}
                raised={raiseSprites}
                selectedId={editingTarget}
                spriteFileInput={fileInputRef}
                sprites={sprites}
                stageSize={stageSize}
                onChangeSpriteDirection={onChangeSpriteDirection}
                onChangeSpriteName={onChangeSpriteName}
                onChangeSpriteSize={onChangeSpriteSize}
                onChangeSpriteVisibility={onChangeSpriteVisibility}
                onChangeSpriteX={onChangeSpriteX}
                onChangeSpriteY={onChangeSpriteY}
                onDeleteSprite={onDeleteSprite}
                onDrop={onDrop}
                onDuplicateSprite={onDuplicateSprite}
                onExportSprite={onExportSprite}
                onFileUploadClick={onFileUploadClick} // 上传
                onNewSpriteClick={onNewSpriteClick} // 选择角色
                onPaintSpriteClick={onPaintSpriteClick}// 绘制
                onSelectSprite={onSelectSprite} 
                onSpriteUpload={onSpriteUpload}
                onSurpriseSpriteClick={onSurpriseSpriteClick}
            />
            <div className={styles.stageSelectorWrapper}>
                {/* 舞台 */} 
                {stage.id && <StageSelector
                    assetId={ 
                        stage.costume &&
                        stage.costume.assetId
                    }
                    backdropCount={stage.costumeCount}
                    id={stage.id}
                    selected={stage.id === editingTarget}
                    onSelect={onSelectSprite}
                />}
                {/* 角色的选择一个角色库 */}
                <div>
                    {spriteLibraryVisible ? ( 
                        <SpriteLibrary 
                            vm={vm}
                            onRequestClose={onRequestCloseSpriteLibrary}
                        />
                    ) :  null}
                    {/* { equipmentLibraryVisible ?(
                        <EquipmentLibrary
                            vm={vm}
                            onRequestClose={onRequestCloseSpriteLibrary}
                        />
                    ) :  null
                    } */}
                </div>
            </div>
        </div>
    </div>
);

const spriteShape = PropTypes.shape({
    costume: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        // The following are optional because costumes uploaded from disk
        // will not have these properties available
        bitmapResolution: PropTypes.number,
        rotationCenterX: PropTypes.number,
        rotationCenterY: PropTypes.number
    }),
    direction: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    size: PropTypes.number,
    visibility: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
});

TargetPane.propTypes = {
    editingTarget: PropTypes.string,
    extensionLibraryVisible: PropTypes.bool,
    fileInputRef: PropTypes.func,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    onChangeSpriteDirection: PropTypes.func,
    onChangeSpriteName: PropTypes.func,
    onChangeSpriteSize: PropTypes.func,
    onChangeSpriteVisibility: PropTypes.func,
    onChangeSpriteX: PropTypes.func,
    onChangeSpriteY: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onDrop: PropTypes.func,
    onDuplicateSprite: PropTypes.func,
    onExportSprite: PropTypes.func,
    onFileUploadClick: PropTypes.func,
    onNewSpriteClickk: PropTypes.func,
    onPaintSpriteClick: PropTypes.func,
    onRequestCloseExtensionLibrary: PropTypes.func,
    onRequestCloseSpriteLibrary: PropTypes.func,
    onSelectSprite: PropTypes.func,
    onSpriteUpload: PropTypes.func,
    onSurpriseSpriteClick: PropTypes.func,
    raiseSprites: PropTypes.bool,
    spriteLibraryVisible: PropTypes.bool,
    sprites: PropTypes.objectOf(spriteShape),
    stage: spriteShape,
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired,
    vm: PropTypes.instanceOf(VM)
};

export default TargetPane;
