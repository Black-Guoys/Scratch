// 角色
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';


import Box from '../box/box.jsx';
import SpriteInfo from '../../containers/sprite-info.jsx';
import SpriteList from './sprite-list.jsx';
import ActionMenu from '../action-menu/action-menu.jsx';//选择角色
import {STAGE_DISPLAY_SIZES} from '../../lib/layout-constants';

import styles from './sprite-selector.css';

import fileUploadIcon from '../action-menu/icon--file-upload.svg';
import paintIcon from '../action-menu/icon--paint.svg';
import spriteIcon from '../action-menu/icon--sprite.svg';
import surpriseIcon from '../action-menu/icon--surprise.svg';
import searchIcon from '../action-menu/icon--search.svg';

const messages = defineMessages({
    addSpriteFromLibrary: {
        id: 'gui.spriteSelector.addSpriteFromLibrary',
        description: 'Button to add a sprite in the target pane from library',
        defaultMessage: 'Choose a Sprite'
    },
    addSpriteFromPaint: {
        id: 'gui.spriteSelector.addSpriteFromPaint',
        description: 'Button to add a sprite in the target pane from paint',
        defaultMessage: 'Paint'
    },
    addSpriteFromSurprise: {
        id: 'gui.spriteSelector.addSpriteFromSurprise',
        description: 'Button to add a random sprite in the target pane',
        defaultMessage: 'Surprise'
    },
    addSpriteFromFile: {
        id: 'gui.spriteSelector.addSpriteFromFile',
        description: 'Button to add a sprite in the target pane from file',
        defaultMessage: 'Upload Sprite'
    }
});

const SpriteSelectorComponent = function (props) {
    const {
        editingTarget,
        hoveredTarget,
        onDrop,
        onDeleteSprite,
        onDuplicateSprite,
        onExportSprite,
        onNewSpriteClickk,
        onSelectSprite,
        raised,
        selectedId,
        sprites,
    } = props;
    let selectedSprite = sprites[selectedId];
    let spriteInfoDisabled = false;
    let userMessage;
    if (typeof selectedSprite === 'undefined') {
        selectedSprite = {};
        spriteInfoDisabled = true;
    }
    // 判断选择的机器设备
    if(1==1){
        userMessage = (
        <div className={styles.tabEquipmentRight}>
          <div className={styles.tabEquipmentRight1}>
              <div className={styles.operationtop}>
                <div className={styles.operationtop1}><button className={styles.operationtopone} title="连接设备">qq</button><button title="连接设备" className={styles.operationtoptwo}>ww</button></div>
              </div>
              
              <div className={styles.operationNav}>
                  <div className={styles.operationNav1}>
                      <div className={styles.operationNavone}>
                        <span>坐标</span>
                        <div>速度&nbsp;</div>
                      </div>
                      <div className={styles.operationNavtwo}>
                          <div className={styles.operationNavtwoLeft}>
                              <div><span>X</span><input value="0"/></div>
                              <div><span>Y</span><input value="0"/></div>
                              <div><span>Z</span><input value="0"/></div>
                              <div><span>R</span><input value="0"/></div>
                          </div>
                          
                          <div className={styles.operationNavtwoRight}>
                            <div className={styles.operationNavtwoRightbutton}>
                              <div className={styles.top}>上</div><div className={styles.bottom}>下</div><div className={styles.left}>左</div><div className={styles.right}>又</div>
                            </div>
                          </div>
                      </div>
                      <div className={styles.operationNavthree}>
                          <div className={styles.operationNavthree1}>
                              <div className={styles.operationNavthreeLeft1}><span className={styles.operationNavthreeLeft}></span><span className={styles.operationNavthreeLeft2}>滑轨</span></div>
                              <div className={styles.operationNavthreeRight}><input className={styles.operationNavthreeRightInput} value="L+"/><input className={styles.operationNavthreeRightInput1} value="L-"/></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className={styles.operationBottom}>
                  <div className={styles.operationBottomRight}>吸取  释放</div>
              </div>
          </div>
        </div>
        )
      }else{
        userMessage = (
        <div className={styles.tabEquipmentRight}>
          B类型
        </div>
        )
      }
    return (
        <Box
            className={styles.spriteSelector}
            
        >           
                {/* 角色里的小图 */}
            <Box className={styles.scrollWrapper}>
                <SpriteList
                    editingTarget={editingTarget}
                    hoveredTarget={hoveredTarget}
                    items={Object.keys(sprites).map(id => sprites[id])}
                    raised={raised}
                    selectedId={selectedId} 
                    onDeleteSprite={onDeleteSprite}
                    onDrop={onDrop}
                    onDuplicateSprite={onDuplicateSprite}
                    onExportSprite={onExportSprite}
                    onSelectSprite={onSelectSprite} 
                />
            </Box>
            {userMessage}
            {/* 角色里的选择一个角色 */}
            <ActionMenu
                className={styles.addButton}
                img={spriteIcon}  
                title={"选择一个设备"}
                onClick={onNewSpriteClickk}
            />
        </Box>
    );
};

SpriteSelectorComponent.propTypes = {
    editingTarget: PropTypes.string,
    hoveredTarget: PropTypes.shape({
        hoveredSprite: PropTypes.string,
        receivedBlocks: PropTypes.bool
    }),
    intl: intlShape.isRequired,
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
    onSelectSprite: PropTypes.func,
    onSpriteUpload: PropTypes.func,
    onSurpriseSpriteClick: PropTypes.func,
    raised: PropTypes.bool,
    selectedId: PropTypes.string,
    spriteFileInput: PropTypes.func,
    sprites: PropTypes.shape({
        id: PropTypes.shape({
            costume: PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string.isRequired,
                bitmapResolution: PropTypes.number.isRequired,
                rotationCenterX: PropTypes.number.isRequired,
                rotationCenterY: PropTypes.number.isRequired
            }),
            name: PropTypes.string.isRequired,
            order: PropTypes.number.isRequired
        })
    }),
    stageSize: PropTypes.oneOf(Object.keys(STAGE_DISPLAY_SIZES)).isRequired
};

export default injectIntl(SpriteSelectorComponent);
