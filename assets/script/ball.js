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
        baseSpeed:800,
        speedPercent: 1,
        baseArea: 30,
        areaPercent: 1,
        attack: 1,
        ballNum: 3
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.baffle = cc.find("UI_ROOT/baffle");
        this.gameMain = cc.find("UI_ROOT").getComponent("gameMain");
        this.waiting = cc.find("UI_ROOT/waiting");
        // 发球倒计时
        this.msg = cc.find("UI_ROOT/msg")
        this.timeout = cc.find("UI_ROOT/msg/timeout").getComponent(cc.Label)
        this.msg.active = false;
        // 球数显示
        this.userInfo = cc.find("UI_ROOT/userInfo")
        this.ballNumLabel = cc.find("UI_ROOT/userInfo/ballNum").getComponent(cc.Label)
        // 砖块列表
        this.levelBlockNode = cc.find("UI_ROOT/levelBlock");



        this.RigidBody = this.getComponent(cc.RigidBody);

        this.setArea(this.areaPercent);


    },

    setSpeed(speedPercent) {
        // var velocity = this.RigidBody.linearVelocity;
        //
        // velocity.x = 500 * speedPercent;
        // velocity.y = 500 * speedPercent;

        this.RigidBody.linearVelocity = cc.p(this.baseSpeed * speedPercent, this.baseSpeed * speedPercent);

    },
    setArea(areaPercent) {

        // 图形大小
        this.node.width = this.baseArea * areaPercent;
        this.node.height = this.baseArea * areaPercent;

        // 刚体大小
        var physicsCircle = this.getComponent(cc.PhysicsCircleCollider);
        physicsCircle.radius = this.baseArea / 2  * areaPercent;

        physicsCircle.apply();

    },

    resetPosition() {
        // 展示球数
        this.ballNumLabel.string = 'x  '+ this.ballNum;

        this.ballRun = false;
        // 清除速度
        this.setSpeed(0);

        // 板的位置
        var _x = this.baffle.x;

        var _y = this.node.width / 2 - 460;

        this.node.setPosition(cc.v2(_x, _y));

        this.timeout.string = '3'
        var num = 2;
        this.msg.active = true;
        this.schedule(function () {
            this.timeout.string = '' + num;
            num -= 1;
        }.bind(this), 1, 3)
        //3秒后发球
        this.scheduleOnce(function () {
            this.ballRun = true;
            this.setSpeed(this.speedPercent);
            this.msg.active = false;
        }.bind(this), 3)
    },
    // 获取剩下砖块数
    getBlockNum(){
        var surplusBlock = this.levelBlockNode.childrenCount;
        if(this.levelBlockNode.childrenCount == 0){
            // 通关
            this.gameMain.passLevel()
        }
        
    },
    start() {

    },

    update(dt) {
        if (this.node.y < -640) {
            this.ballNum -= 1;

            if (this.ballNum >= 0) {
                this.resetPosition();
            } else {
                // 球用完 游戏结束
                this.node.active = false;
                this.gameMain.gameOver()
            }
        }
    },

    // 刚体碰撞
    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact: function (contact, selfCollider, otherCollider) {

    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.groupIndex === 3) {
            if(this.attack >= otherCollider.node.getComponent("block").defense){
                otherCollider.node.destroy();
                this.scheduleOnce(function () {
                    this.getBlockNum()
                }.bind(this),0.2)
            }else {
                otherCollider.node.getComponent("block").defense -= this.attack;
            }
        }
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve: function (contact, selfCollider, otherCollider) {
    },

    //碰撞
    onCollisionStay: function (other, self) {
        if (this.attack === 1) {
            return;
        }
        if (other.node.groupIndex === 3) {
            if (this.attack > other.node.getComponent("block").defense) {
                other.node.destroy();
            }
        }
    },


    //************** 能力强化  球 ***********

    attackGrow(num) {
        this.attach += num;
    },
    speedGrow(percent) {
        this.speedPercent += percent;
        // this.setSpeed(this.speedPercent);
    },
    areaGrow(percent) {
        this.areaPercent += percent;
        this.setArea(this.areaPercent);
    }

});
