import React from 'react';
import {FormattedMessage} from 'react-intl';

import musicImage from './music.png';
import penImage from './pen.png';
import videoImage from './video-sensing.png';
import translateImage from './translate.png';
import microbitImage from './microbit.png';
import ev3Image from './ev3.png';
import wedoImage from './wedo.png';

import microbitDeviceImage from './device-connection/microbit/microbit-illustration.svg';
import microbitMenuImage from './device-connection/microbit/microbit-small.svg';
import ev3DeviceImage from './device-connection/ev3/ev3-hub-illustration.svg';
import ev3MenuImage from './device-connection/ev3/ev3-small.svg';

export default [
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        iconURL: musicImage,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums演奏乐器和鼓."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen笔"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        iconURL: penImage,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites用你的画笔."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: 'videoSensing',
        iconURL: videoImage,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Google Translate"
                description="Name for the 'Google Translate' extension. Do not translate 'Google'."
                id="gui.extension.googletranslate.name"
            />
        ),
        extensionId: 'translate',
        iconURL: translateImage,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages翻译."
                description="Description for the 'Google Translate' extension"
                id="gui.extension.googletranslate.description"
            />
        ),
        featured: true
    },
    {
        name: 'micro:bit',
        extensionId: 'microbit',
        iconURL: microbitImage,
        description: (
            <FormattedMessage
                defaultMessage="Connect your projects with the world.把设备与世界链接"
                description="Description for the 'micro:bit' extension"
                id="gui.extension.microbit.description"
            />
        ),
        featured: true,
        disabled: false,
        launchDeviceConnectionFlow: true,
        deviceImage: microbitDeviceImage,
        smallDeviceImage: microbitMenuImage,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their micro:bit."
                id="gui.extension.microbit.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/microbit'
    },
    {
        name: 'LEGO MINDSTORMS EV3',
        extensionId: 'ev3',
        iconURL: ev3Image,
        description: (
            <FormattedMessage
                defaultMessage="Build interactive robots and more."
                description="Description for the 'LEGO MINDSTORMS EV3' extension"
                id="gui.extension.ev3.description"
            />
        ),
        featured: true,
        disabled: false,
        launchDeviceConnectionFlow: true,
        deviceImage: ev3DeviceImage,
        smallDeviceImage: ev3MenuImage,
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
                description="Message to help people connect to their EV3. Must note the PIN should be 1234."
                id="gui.extension.ev3.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/ev3'
    },
    {
        name: 'LEGO WeDo 2.0',
        extensionId: 'wedo2',
        iconURL: wedoImage,
        description: (
            <FormattedMessage
                defaultMessage="Build with motors and sensors."
                description="Description for the 'LEGO WeDo 2.0' extension"
                id="gui.extension.wedo2.description"
            />
        ),
        featured: true,
        disabled: true
    }
];