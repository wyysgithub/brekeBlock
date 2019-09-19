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
        level:1,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.gameOverPage = cc.find("UI_ROOT/gameOver");
        this.waiting = cc.find("UI_ROOT/waiting");

        this.ballNode = cc.find("UI_ROOT/ball");
        this.ballScript = this.ballNode.getComponent("ball");

        this.baffleNode = cc.find("UI_ROOT/baffle");
        this.baffleScript = this.baffleNode.getComponent("baffle");
    },
    restart(){
        //重玩 在开始游戏的基础上，清空所有buff、关卡、球数
        this.gameStart()
        // 关卡置空
        this.level = 1;
        //球数
        this.ballScript.ballNum = 3;
    }
    gameStart(){
        this.gameOverPage.active = false;
        this.waiting.active = false;

        this.ballNode.active = true;
        //球和板的位置
        this.baffleNode.x = 0

        this.ballScript.resetPosition()
    },
    gameOver(){

        this.gameOverPage.active = true;
    },

    start () {

    },

    // update (dt) {},
});
