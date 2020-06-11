//左下角设备切换页
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import React, { Component } from 'react';
import {
  openSpriteLibrary,
  closeSpriteLibrary,
  openEquipmentLibrary,//设备
  openExtensionLibrary//扩展
} from '../../reducers/modals';
import ActionMenu from '../action-menu/action-menu.jsx';//选择角色
// import Selector from '../asset-panel/selector.jsx';
 
import {activateTab, COSTUMES_TAB_INDEX} from '../../reducers/editor-tab';
import {setReceivedBlocks} from '../../reducers/hovered-target';
import DragConstants from '../../lib/drag-constants';
import TargetPaneComponent from '../../components/target-pane/target-pane.jsx';
import TargetPaneComponents from '../../components/targets-pane/target-pane.jsx';//自己
 import equipmentLibraryContent from '../../lib/libraries/equipment.json';
import spriteLibraryContent from '../../lib/libraries/sprites.json';//所有角色库
import {handleFileUpload, spriteUpload} from '../../lib/file-uploader.js';
import spriteIcon from '../action-menu/icon--sprite.svg';
import searchIcon from '../action-menu/icon--search.svg';

import s from './app.css'

class Equipment extends Component {
  constructor(props) {
    super(props)
    bindAll(this, [
      'handleBlockDragEnd',
      'handleChangeSpriteDirection',
      'handleChangeSpriteName',
      'handleChangeSpriteSize',
      'handleChangeSpriteVisibility',
      'handleChangeSpriteX', 
      'handleChangeSpriteY',
      'handleDeleteSprite',
      'handleDrop',
      'handleDuplicateSprite',
      'handleExportSprite',
      'handleNewSprite',
      'handleSelectSprite',
      'handleSurpriseSpriteClick',
      'handlePaintSpriteClick',
      // 'handleSurpriseSpriteClicks',
      // 'handlePaintSpriteClicks', 
      'handleFileUploadClick',
      'handleSpriteUpload',
      'setFileInput',
      
  ]);
    this.state = {
      tabs:[
        {tabName:"设备",id:1},
        {tabName:"角色",id:2},
    ],
    currentIndex:1,
    }
    // this.tabChoiced = this.tabChoiced.bind(this);   //把组件中的this绑定到tabChoiced方法中，这样就会保持this一致 
    
  }
  componentDidMount () {
    this.props.vm.addListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
}
componentWillUnmount () {
    this.props.vm.removeListener('BLOCK_DRAG_END', this.handleBlockDragEnd);
}
handleChangeSpriteDirection (direction) {
    this.props.vm.postSpriteInfo({direction});
}
handleChangeSpriteName (name) {
    this.props.vm.renameSprite(this.props.editingTarget, name);
}
handleChangeSpriteSize (size) {
    this.props.vm.postSpriteInfo({size});
}
handleChangeSpriteVisibility (visible) {
    this.props.vm.postSpriteInfo({visible});
}
handleChangeSpriteX (x) {
    this.props.vm.postSpriteInfo({x});
}
handleChangeSpriteY (y) {
    this.props.vm.postSpriteInfo({y});
}
handleDeleteSprite (id) {
    this.props.vm.deleteSprite(id);
}
handleDuplicateSprite (id) {
    this.props.vm.duplicateSprite(id);
}
handleExportSprite (id) {
    const spriteName = this.props.vm.runtime.getTargetById(id).getName();
    const saveLink = document.createElement('a');
    document.body.appendChild(saveLink);

    this.props.vm.exportSprite(id).then(content => {
        const filename = `${spriteName}.sprite3`;

        // Use special ms version if available to get it working on Edge.
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(content, filename);
            return;
        }

        const url = window.URL.createObjectURL(content);
        saveLink.href = url;
        saveLink.download = filename;
        saveLink.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(saveLink); 
    }); 
}
handleSelectSprite (id) {
    this.props.vm.setEditingTarget(id); 
}
handleSurpriseSpriteClick () {
    const item = spriteLibraryContent[Math.floor(Math.random() * spriteLibraryContent.length)];
    this.props.vm.addSprite(JSON.stringify(item.json));
}

// handleSurpriseSpriteClicks () {
//   const item = equipmentLibraryContent[Math.floor(Math.random() * equipmentLibraryContent.length)];
//   this.props.vm.addSprite(JSON.stringify(item.json));
// } 
// handlePaintSpriteClicks () {
//   // @todo this is brittle, will need to be refactored for localized libraries
//   const emptyItem = equipmentLibraryContent.find(item => item.name === 'Empty');
//   if (emptyItem) {
//       this.props.vm.addSprite(JSON.stringify(emptyItem.json)).then(() => {
//           setTimeout(() => { // Wait for targets update to propagate before tab switching
//               this.props.onActivateTab(COSTUMES_TAB_INDEX);
//           });
//       });
//   }
// }

handlePaintSpriteClick () {
    // @todo this is brittle, will need to be refactored for localized libraries
    const emptyItem = spriteLibraryContent.find(item => item.name === 'Empty');
    if (emptyItem) {
        this.props.vm.addSprite(JSON.stringify(emptyItem.json)).then(() => {
            setTimeout(() => { // Wait for targets update to propagate before tab switching
                this.props.onActivateTab(COSTUMES_TAB_INDEX);
            });
        });
    }
}
handleNewSprite (spriteJSONString) {
    this.props.vm.addSprite(spriteJSONString);
}
handleFileUploadClick () {
    this.fileInput.click();
}
handleSpriteUpload (e) {
    const storage = this.props.vm.runtime.storage;
    handleFileUpload(e.target, (buffer, fileType, fileName) => {
        spriteUpload(buffer, fileType, fileName, storage, this.handleNewSprite);
    });
}
setFileInput (input) {
    this.fileInput = input;
}
handleBlockDragEnd (blocks) {
    if (this.props.hoveredTarget.sprite && this.props.hoveredTarget.sprite !== this.props.editingTarget) {
        this.props.vm.shareBlocksToTarget(blocks, this.props.hoveredTarget.sprite, this.props.editingTarget);
        this.props.onReceivedBlocks(true);
    }
}
handleDrop (dragInfo) {
    const {sprite: targetId} = this.props.hoveredTarget;
    if (dragInfo.dragType === DragConstants.SPRITE) {
        // Add one to both new and target index because we are not counting/moving the stage
        this.props.vm.reorderTarget(dragInfo.index + 1, dragInfo.newIndex + 1);
    } else if (dragInfo.dragType === DragConstants.BACKPACK_SPRITE) {
        // TODO storage does not have a way of loading zips right now, and may never need it.
        // So for now just grab the zip manually.
        fetch(dragInfo.payload.bodyUrl)
            .then(response => response.arrayBuffer())
            .then(sprite3Zip => this.props.vm.addSprite(sprite3Zip));
    } else if (targetId) {
        // Something is being dragged over one of the sprite tiles or the backdrop.
        // Dropping assets like sounds and costumes duplicate the asset on the
        // hovered target. Shared costumes also become the current costume on that target.
        // However, dropping does not switch the editing target or activate that editor tab.
        // This is based on 2.0 behavior, but seems like it keeps confusing switching to a minimum.
        // it allows the user to share multiple things without switching back and forth.
        if (dragInfo.dragType === DragConstants.COSTUME) {
            this.props.vm.shareCostumeToTarget(dragInfo.index, targetId);
        } else if (targetId && dragInfo.dragType === DragConstants.SOUND) {
            this.props.vm.shareSoundToTarget(dragInfo.index, targetId);
        }
    }
};

  tabChoiced(id){
    // console.log(this.props.parent.tabChoiced.bind(this, this.state.id))
    // this.props.tabChoiced(this.state.currentIndex)
      // tab切换的方法
      this.setState({
          currentIndex:id
      });  
      // alert(id)
      // this.props.parent.tabChoiced(this, this.state.msg)
  }

  render() {
    let userMessage;  
    const {
      // onNewSpriteClickk,//点击选择设备
      onActivateTab, // eslint-disable-line no-unused-vars
      onReceivedBlocks, // eslint-disable-line no-unused-vars
      ...componentProps,
    } = this.props;
    var isBox1Show=this.state.currentIndex==1 ? 'block' : 'none';
    var isbox2Show=this.state.currentIndex==2 ? 'block' : 'none';
    var tabList= this.state.tabs.map(function(res,index) {
        return    <li key={index} 
                      onClick={this.tabChoiced.bind(this,res.id)} 
                      className={res.id==this.state.currentIndex ? s.active : ''}
                      >
                        {res.tabName}
                        {/* {this.state.currentIndex} */}
                  </li>
    }.bind(this));
    // // 判断选择的机器设备
    // if(1==1){
    //   userMessage = (
    //   <div className={s.tabEquipmentRight}>
    //     <div className={s.tabEquipmentRight1}>
    //         <div className={s.operationtop}>
    //           <div className={s.operationtop1}><button className={s.operationtopone} title="连接设备">qq</button><button title="连接设备" className={s.operationtoptwo}>ww</button></div>
    //         </div>
            
    //         <div className={s.operationNav}>
    //             <div className={s.operationNav1}>
    //                 <div className={s.operationNavone}>
    //                   <span>坐标</span>
    //                   <div>速度&nbsp;</div>
    //                 </div>
    //                 <div className={s.operationNavtwo}>
    //                     <div className={s.operationNavtwoLeft}>
    //                         <div><span>X</span><input value="0"/></div>
    //                         <div><span>Y</span><input value="0"/></div>
    //                         <div><span>Z</span><input value="0"/></div>
    //                         <div><span>R</span><input value="0"/></div>
    //                     </div>
                        
    //                     <div className={s.operationNavtwoRight}>
    //                       <div className={s.operationNavtwoRightbutton}>
    //                         <div className={s.top}>上</div><div className={s.bottom}>下</div><div className={s.left}>左</div><div className={s.right}>又</div>
    //                       </div>
    //                     </div>
    //                 </div>
    //                 <div className={s.operationNavthree}>
    //                     <div className={s.operationNavthree1}>
    //                         <div className={s.operationNavthreeLeft1}><span className={s.operationNavthreeLeft}></span><span className={s.operationNavthreeLeft2}>滑轨</span></div>
    //                         <div className={s.operationNavthreeRight}><input className={s.operationNavthreeRightInput} value="L+"/><input className={s.operationNavthreeRightInput1} value="L-"/></div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className={s.operationBottom}>
    //             <div className={s.operationBottomRight}>吸取  释放</div>
    //         </div>
    //     </div>
    //   </div>
    //   )
    // }else{
    //   userMessage = (
    //   <div className={s.tabEquipmentRight}>
    //     B类型
    //   </div>
    //   )
    // }
    return (
      <div className={s.tabchangeBox}>
        <div title={'Tabchange'} />
        <ul>
          {tabList}
        </ul>
        {/* 设备 */}
        <div style={{"display":isBox1Show}} className={s.tabEquipment1}>
          
          <TargetPaneComponents
                  {...componentProps} 
                  fileInputRef={this.setFileInput}
                  onChangeSpriteDirection={this.handleChangeSpriteDirection}
                  onChangeSpriteName={this.handleChangeSpriteName}
                  onChangeSpriteSize={this.handleChangeSpriteSize}
                  onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                  onChangeSpriteX={this.handleChangeSpriteX}
                  onChangeSpriteY={this.handleChangeSpriteY}
                  onDeleteSprite={this.handleDeleteSprite}
                  onDrop={this.handleDrop}
                  onDuplicateSprite={this.handleDuplicateSprite}
                  onExportSprite={this.handleExportSprite}
                  onFileUploadClick={this.handleFileUploadClick}//角色上传
                  onPaintSpriteClick={this.handlePaintSpriteClick}// 角色绘制
                  onSelectSprite={this.handleSelectSprite}
                  onSpriteUpload={this.handleSpriteUpload}//上传 
                  onSurpriseSpriteClick={this.handleSurpriseSpriteClick}//角色随机
              >
              {/* {userMessage} */}
            </TargetPaneComponents>
        </div>
        {/* 角色 */}
        <div style={{"display":isbox2Show}} className={s.tabEquipment1} >
        <TargetPaneComponent
                {...componentProps} 
                fileInputRef={this.setFileInput}
                onChangeSpriteDirection={this.handleChangeSpriteDirection}
                onChangeSpriteName={this.handleChangeSpriteName}
                onChangeSpriteSize={this.handleChangeSpriteSize}
                onChangeSpriteVisibility={this.handleChangeSpriteVisibility}
                onChangeSpriteX={this.handleChangeSpriteX}
                onChangeSpriteY={this.handleChangeSpriteY}
                onDeleteSprite={this.handleDeleteSprite}
                onDrop={this.handleDrop}
                onDuplicateSprite={this.handleDuplicateSprite}
                onExportSprite={this.handleExportSprite}
                onFileUploadClick={this.handleFileUploadClick}//角色上传
                onPaintSpriteClick={this.handlePaintSpriteClick}// 角色绘制
                onSelectSprite={this.handleSelectSprite}
                onSpriteUpload={this.handleSpriteUpload}//上传 
                onSurpriseSpriteClick={this.handleSurpriseSpriteClick}//角色随机
            />
        </div>
      </div>
    )
  }
  
}
// const mapStateToProps = state => ({
//   // This is the button's mode, as opposed to the actual current state 这是按钮的模式，与实际的当前状态相反
//   stageSizeMode: state.scratchGui.stageSize.stageSize
// });
// export default Equipment;
const {
  onSelectSprite, // eslint-disable-line no-unused-vars
  ...targetPaneProps
} = TargetPaneComponent.propTypes;

Equipment.propTypes = {
  ...targetPaneProps
};

const mapStateToProps = state => ({
  editingTarget: state.scratchGui.targets.editingTarget,
  hoveredTarget: state.scratchGui.hoveredTarget,
  stageSizeMode: state.scratchGui.stageSize.stageSize,
  sprites: Object.keys(state.scratchGui.targets.sprites).reduce((sprites, k) => {
      let {direction, size, x, y, ...sprite} = state.scratchGui.targets.sprites[k];
      if (typeof direction !== 'undefined') direction = Math.round(direction);
      if (typeof x !== 'undefined') x = Math.round(x);
      if (typeof y !== 'undefined') y = Math.round(y); 
      if (typeof size !== 'undefined') size = Math.round(size);
      sprites[k] = {...sprite, direction, size, x, y};
      return sprites;
  }, {}),
  stage: state.scratchGui.targets.stage,
  raiseSprites: state.scratchGui.blockDrag,
  spriteLibraryVisible: state.scratchGui.modals.spriteLibrary,//角色  equipmentLibraryContent  spriteLibraryContent
  equipmentLibraryVisible: state.scratchGui.modals.equipmentLibrary//设备
});
const mapDispatchToProps = dispatch => ({
  // 点击选择角色
  onNewSpriteClick: e => {
      e.preventDefault();
      dispatch(openSpriteLibrary());
  }, 
  // 点击选择设备
  onNewSpriteClickk: e => {
    e.preventDefault();
    dispatch(openEquipmentLibrary());
  },
  //点击到选择一个角色库里  然后返回
  onRequestCloseSpriteLibrary: () => {
      dispatch(closeSpriteLibrary());
  },
  onActivateTab: tabIndex => {
      dispatch(activateTab(tabIndex));
  },
  onReceivedBlocks: receivedBlocks => {
      dispatch(setReceivedBlocks(receivedBlocks));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Equipment);





