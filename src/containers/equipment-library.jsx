// 仿照背景
// import bindAll from 'lodash.bindall';
// import PropTypes from 'prop-types';
// import React from 'react';
// import {defineMessages, injectIntl, intlShape} from 'react-intl';
// import {connect} from 'react-redux';
// import VM from 'scratch-vm';

// import {
//     activateTab,
//     COSTUMES_TAB_INDEX
// } from '../reducers/editor-tab';

// import analytics from '../lib/analytics';
// import backdropLibraryContent from '../lib/libraries/equipment.json';
// // import backdropLibraryContent from '../lib/libraries/equipment/index.jsx';
// import backdropTags from '../lib/libraries/backdrop-tags';
// import LibraryComponent from '../components/librargys/library.jsx';

// const messages = defineMessages({
//     libraryTitle: {
//         defaultMessage: 'Choose a Backdrop',
//         description: 'Heading for the backdrop library',
//         id: 'gui.menuBar.uploadFromComputer'
//     }
// });


// class BackdropLibrary extends React.Component {
//     constructor (props) {
//         super(props);
//         bindAll(this, [
//             'handleItemSelect'
//         ]);
//     }
//     handleItemSelect (item) {
//         const vmBackdrop = {
//             name: item.name,
//             rotationCenterX: item.info[0] && item.info[0] / 2,
//             rotationCenterY: item.info[1] && item.info[1] / 2,
//             bitmapResolution: item.info.length > 2 ? item.info[2] : 1,
//             skinId: null
//         };
//         this.props.vm.setEditingTarget(this.props.stageID);
//         this.props.onActivateTab(COSTUMES_TAB_INDEX);
//         this.props.vm.addBackdrop(item.md5, vmBackdrop);
//         analytics.event({
//             category: 'library',
//             action: 'Select Backdrop',
//             label: item.name
//         });
//     }
//     render () {
//         return (
//             <LibraryComponent
//                 data={backdropLibraryContent}
//                 id="backdropLibrary"
//                 tags={backdropTags}
//                 title={this.props.intl.formatMessage(messages.libraryTitle)}
//                 onItemMouseEnter={this.handleMouseEnter}
//             onItemMouseLeave={this.handleMouseLeave}
//             onItemSelected={this.handleItemSelect}//选中
//             onRequestClose={this.props.onRequestClose}
//             />
//         );
//     }
// }

// BackdropLibrary.propTypes = {
//     intl: intlShape.isRequired,
//     onActivateTab: PropTypes.func.isRequired,
//     onRequestClose: PropTypes.func,
//     stageID: PropTypes.string.isRequired,
//     vm: PropTypes.instanceOf(VM).isRequired
// };

// const mapStateToProps = state => ({
//     stageID: state.scratchGui.targets.stage.id
// });

// const mapDispatchToProps = dispatch => ({
//     onActivateTab: tab => dispatch(activateTab(tab))
// });

// export default injectIntl(connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(BackdropLibrary));



// 仿照角色
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl, intlShape, defineMessages} from 'react-intl';
import VM from 'scratch-vm';

import analytics from '../lib/analytics';
import spriteLibraryContent from '../lib/libraries/equipment.json';
import spriteTags from '../lib/libraries/sprite-tags';

import LibraryComponent from '../components/librargys/library.jsx';

const messages = defineMessages({
    libraryTitle: {
        defaultMessage: 'Choose a Sprite',
        description: 'Heading for the sprite library',
        id: 'gui.loader.headline'//选择设备
    }
});

class SpriteLibrary extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleItemSelect',
            'handleMouseEnter',
            'handleMouseLeave',
            'rotateCostume',
            'startRotatingCostumes',  
            'stopRotatingCostumes'
        ]);
        this.state = {
            activeSprite: null,
            costumeIndex: 0, 
            sprites: spriteLibraryContent 
        };
    }
    componentWillUnmount () {
        clearInterval(this.intervalId);
    }
    handleItemSelect (item) {
        this.props.vm.addSprite(JSON.stringify(item.json));
        analytics.event({
            category: 'library',
            action: 'Select Sprite',
            label: item.name
        });
    }
    handleMouseEnter (item) {
        this.stopRotatingCostumes();
        this.setState({activeSprite: item}, this.startRotatingCostumes);
    }
    handleMouseLeave () {
        this.stopRotatingCostumes();
    }
    startRotatingCostumes () {
        if (!this.state.activeSprite) return;
        this.rotateCostume();
        this.intervalId = setInterval(this.rotateCostume, 300);
    }
    stopRotatingCostumes () {
        this.intervalId = clearInterval(this.intervalId);
    }
    rotateCostume () {
        const costumes = this.state.activeSprite.json.costumes;
        const nextCostumeIndex = (this.state.costumeIndex + 1) % costumes.length;
        this.setState({
            costumeIndex: nextCostumeIndex,
            sprites: this.state.sprites.map(sprite => {
                if (sprite.name === this.state.activeSprite.name) {
                    return {
                        ...sprite,
                        md5: sprite.json.costumes[nextCostumeIndex].baseLayerMD5
                    };
                }
                return sprite;
            })
        });
    }
    render () {
        return (
            <LibraryComponent
                data={this.state.sprites}
                id="spriteLibrary"
                tags={spriteTags}
                title={this.props.intl.formatMessage(messages.libraryTitle)}
                onItemMouseEnter={this.handleMouseEnter}
                onItemMouseLeave={this.handleMouseLeave}
                onItemSelected={this.handleItemSelect}//选中
                onRequestClose={this.props.onRequestClose}
            />
        );
    }
}

SpriteLibrary.propTypes = {
    intl: intlShape.isRequired,
    onRequestClose: PropTypes.func,
    vm: PropTypes.instanceOf(VM).isRequired
};

export default injectIntl(SpriteLibrary);
