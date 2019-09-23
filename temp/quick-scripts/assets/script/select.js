(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/select.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '44fd2yImoxB+ZWdCxOPmQpE', 'select', __filename);
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
var iconList = cc.Class({
    name: 'iconList',
    properties: {
        icon: {
            default: null,
            type: cc.SpriteFrame
        }
    }
});
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
        iconList: {
            default: [],
            type: iconList
        },
        digest: ''
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.gameMainScript = cc.find("UI_ROOT").getComponent("gameMain");

        this.waitingPage = cc.find("UI_ROOT/waiting");

        this.successPage = cc.find("UI_ROOT/successPage");

        this.ballNode = cc.find("UI_ROOT/ball");
        this.ballScript = this.ballNode.getComponent("ball");

        // 设置图标
        this.iconImage = this.node.children[0].getComponent(cc.Sprite);
        this.iconImage.spriteFrame = this.iconList[0].icon;

        // 设置标题
        this.titleLabel = this.node.children[1].getComponent(cc.Label);
        this.titleLabel.string = this.title;

        // 设置简介
        this.digestLabel = this.node.children[2].getComponent(cc.Label);
        this.digestLabel.string = this.digest;

        // var info = {index:1,title:'黄色闪光',digest:'球的速度增加500%',icon:1,ballspeed:0,ballArea:5,ballAttach:0}
        // this.loadSelect(info);
    },
    start: function start() {},
    loadSelect: function loadSelect(info) {
        this.titleLabel.string = info.title;
        this.digestLabel.string = info.digest;
        this.iconImage.spriteFrame = this.iconList[info.icon].icon;

        this.buffInfo = info;
    },
    selectClick: function selectClick() {
        // 将当前buff的index值添加到buff列表里
        this.gameMainScript.buffList.push(this.buffInfo.index);
        if (this.buffInfo.ballspeed) {
            this.ballScript.speedGrow(this.buffInfo.ballspeed);
        }
        if (this.buffInfo.ballArea) {
            this.ballScript.areaGrow(this.buffInfo.ballArea);
        }
        if (this.buffInfo.ballAttach) {
            this.ballScript.attackGrow(this.buffInfo.ballAttach);
        }

        // 关闭选择页
        this.successPage.active = false;
        // 开始游戏界面
        this.waitingPage.active = true;
    }
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=select.js.map
        