"use strict";
cc._RF.push(module, '5bd772ZOfNKuYg+HvoQui6f', 'gameMain');
// script/gameMain.js

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
var level1 = [
// [0,0,0,0,0,0],
// [0,0,0,0,0,0],
// [0,0,0,0,0,0],
// [0,0,0,0,0,0],
// [0,0,0,0,0,1]
[1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1]];
var strengthenList = [{ index: 1, title: '黄色闪光', digest: '球的速度增加100%', icon: 0, ballspeed: 1, ballArea: 0, ballAttach: 0 }, { index: 2, title: '肉弹战车', digest: '球的体积增加100%', icon: 1, ballspeed: 0, ballArea: 1, ballAttach: 0 }, { index: 3, title: '无砖能挡', digest: '球的伤害增加100%', icon: 2, ballspeed: 0, ballArea: 0, ballAttach: 1 }, { index: 4, title: '强壮', digest: '球的体积增加50%，伤害增加10%', icon: 3, ballspeed: 0, ballArea: 0.5, ballAttach: 0.1 }, { index: 5, title: '精练', digest: '球的速度增加50%，伤害增加10%', icon: 4, ballspeed: 0.5, ballArea: 0, ballAttach: 0.1 }];
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
        level: 1,
        buffList: [],
        blockPrefab: {
            default: null,
            type: cc.Prefab
        },
        selectPrefab: {
            default: null,
            type: cc.Prefab
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.gameOverPage = cc.find("UI_ROOT/gameOver");
        // 开始游戏界面
        this.waiting = cc.find("UI_ROOT/waiting");
        this.levelBabel = cc.find("UI_ROOT/waiting/level").getComponent(cc.Label);

        // 成功界面
        this.successPage = cc.find("UI_ROOT/successPage");

        this.ballNode = cc.find("UI_ROOT/ball");
        this.ballScript = this.ballNode.getComponent("ball");

        this.levelBlockNode = cc.find("UI_ROOT/levelBlock");

        this.baffleNode = cc.find("UI_ROOT/baffle");
        this.baffleScript = this.baffleNode.getComponent("baffle");
    },

    // 从头开始
    restart: function restart() {

        // 关卡置空
        this.level = 1;
        //球数
        this.ballScript.ballNum = 3;
        // buff
        this.buffList = [];
        //重玩 在开始游戏的基础上，清空所有buff、关卡、球数
        this.gameStart();
    },

    // 继续游戏
    gameStart: function gameStart() {
        this.gameOverPage.active = false;
        this.waiting.active = false;

        this.ballNode.active = true;
        //球和板的位置
        this.baffleNode.x = 0;

        this.ballScript.resetPosition();

        this.loadLevel(this.level);
    },

    // 游戏结束
    gameOver: function gameOver() {

        this.gameOverPage.active = true;
    },

    // 通关函数
    passLevel: function passLevel() {
        var _this = this;
        // 球 停止运动
        this.ballScript.setSpeed(0);
        // 关卡+1
        this.level += 1;
        this.levelBabel.string = '当前关卡：' + this.level;
        // 展示通关提示层
        this.successPage.active = true;
        // 生成随机强化列表 供选择
        this.radomStrengthen(3, function (strengList) {
            _this.createrSelect(-188, -193, strengList[0]);
            _this.createrSelect(0, -193, strengList[1]);
            _this.createrSelect(188, -193, strengList[2]);
        });
    },

    //生成选择卡
    createrSelect: function createrSelect(x, y, info) {
        var newSelect = cc.instantiate(this.selectPrefab);

        // 将新增的节点添加到levelBlock节点下面  方便后续统计
        this.successPage.addChild(newSelect);

        newSelect.getComponent("select").loadSelect(info);
        // 设置位置
        newSelect.setPosition(cc.v2(x, y));
    },

    // 生成随机强化列表
    radomStrengthen: function radomStrengthen(num, callback) {
        var strengList = [];
        var indexList = [];
        for (var i = 0; i < num; i++) {
            var index = Math.floor(Math.random() * strengthenList.length);
            if (indexList.indexOf(index) === -1) {
                indexList.push(index);
                strengList.push(strengthenList[index]);
            } else {
                i--;
            }
        };
        callback(strengList);
    },


    // 加载关卡
    loadLevel: function loadLevel(level) {
        var levelInfo = [];
        var _this = this;
        switch (level) {
            case 1:
                levelInfo = level1;
                break;
            default:
                levelInfo = level1;
                break;
        }
        levelInfo.map(function (value, yIndex) {
            value.map(function (data, xIndex) {
                if (data === 1) {
                    _this.createrBlock(xIndex * 100 - 250, 555 - yIndex * 110);
                }
            });
        });
    },

    //生成砖块（配合加载关卡使用）
    createrBlock: function createrBlock(x, y) {
        var newBlock = cc.instantiate(this.blockPrefab);

        // 将新增的节点添加到levelBlock节点下面  方便后续统计
        this.levelBlockNode.addChild(newBlock);
        // 设置位置
        newBlock.setPosition(cc.v2(x, y));
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();