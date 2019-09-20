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
        widthPercent: 1,
        springPercent: 1,
        moveSpeedPercent: 1
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.ballNode = cc.find("UI_ROOT/ball")
        this.ballNodeScript = cc.find("UI_ROOT/ball").getComponent('ball')

        this.node.width = 200 * this.widthPercent;

        this.leftMax = this.node.width / 2 - 360;
        this.rightMax = 360 - this.node.width / 2;
    },

    start() {

    },

    // moveLeftStart(){
    //     this.isMoveLeft = true;
    // },
    // moveLeftEnd(){
    //     this.isMoveLeft = false;
    // },
    // moveRightStart(){
    //     this.isMoveRight = true;
    // },
    // moveRightEnd(){
    //     this.isMoveRight = false;
    // },


    update(dt) {
        if (this.isMoveLeft) {
            this.node.x -= this.moveSpeedPercent * 200 * dt;
            if (!this.ballNodeScript.ballRun) {
                this.ballNode.x -= this.moveSpeedPercent * 200 * dt;
            }
        } else if (this.isMoveRight) {
            this.node.x += this.moveSpeedPercent * 200 * dt;
            if (!this.ballNodeScript.ballRun) {
                this.ballNode.x += this.moveSpeedPercent * 200 * dt;
            }
        }

        if (this.node.x <= this.leftMax) {
            this.node.x = this.leftMax;
            if (!this.ballNodeScript.ballRun) {
                this.ballNode.x = this.leftMax;
            }
        } else if (this.node.x >= this.rightMax) {
            this.node.x = this.rightMax;
            if (!this.ballNodeScript.ballRun) {
                this.ballNode.x = this.rightMax;
            }
        }
    },


    // 板子能力强化

    widthGrow(num) {
        this.widthPercent += num;
    },
    speedGrow(percent) {
        this.moveSpeedPercent += percent;
    },
    areaGrow(percent) {
        this.areaPercent += percent;
    }
});
