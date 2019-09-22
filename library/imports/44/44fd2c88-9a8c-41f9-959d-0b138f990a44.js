"use strict";
cc._RF.push(module, '44fd2yImoxB+ZWdCxOPmQpE', 'select');
// script/select.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        title: '',
        icon: {
            default: null,
            type: cc.SpriteFrame
        },
        digest: ''
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        // 设置图标
        this.iconImage = this.node.children[0].getComponent(cc.Sprite);
        this.iconImage.spriteFrame = this.icon;

        // 设置标题
        this.titleLabel = this.node.children[1].getComponent(cc.Label);
        this.titleLabel.string = this.title;

        // 设置简介
        this.digestLabel = this.node.children[2].getComponent(cc.Label);
        this.digestLabel.string = this.digest;
    },
    start: function start() {},
    selectClick: function selectClick() {}
}

// update (dt) {},
);

cc._RF.pop();