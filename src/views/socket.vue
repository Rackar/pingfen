<template>
  <div id="pfresult">
    <div class="bg">
      <div></div>
      <!-- <img src="https://res.wmnetwork.cc/res/screen/img/logo_top.png" alt="微媒网络" class="wm-logo" v-show="false" /> -->
    </div>
    <div class="mark">
      <div class="mark">
        <div class="mark-container" style="zoom: 100%;" v-show="this.showid == 0">
          <div style="position: relative;">
            <div
              style=" position: absolute; z-index: -1; top: 0px; left: 0px; bottom: 0px; right: 0px; filter: blur(30px); background-size: 100% 100%; background-repeat: no-repeat;">
            </div>
            <div class="mark-title" style="margin-top: 25%;">
              <div class="left-title" style="margin: 0 auto;    margin-top: -10%;">
                {{ title }}
              </div>
              <div class="pr"></div>
            </div>
            <div class="mark-title" style="margin-top: 5%;font-size: 30px;">
              <div class="left-title" style="margin: 0 auto;">主办单位：{{ zhuban }}</div>
              <div class="pr"></div>
            </div>
            <div id="qrCode" ref="qrCodeDiv"></div>
          </div>
        </div>
        <div class="mark-container dt" style="zoom: 100%;" v-show="showid == 1">
          <div style="position: relative;">
            <div
              style=" position: absolute; z-index: -1; top: 0px; left: 0px; bottom: 0px; right: 0px; filter: blur(30px); background-size: 100% 100%; background-repeat: no-repeat;">
            </div>
            <div class="mark-title">
              <div class="left-title" style="width: 100%;">{{ title }}-答题结果</div>
              <div class="pr"></div>
            </div>
            <div id="markScreen" class="mark-list one">
              <div id="markScreenBox" class="mark-list-box">
                <el-scrollbar style="height: 100%;">
                  <div class="mark-item-container one" v-for="(item, index) in csd" :key="index">
                    <div class="list-item">
                      <div class="left">
                        <img :src="getavatar(item)" class="avatar" />
                        <div class="info">
                          <div class="title outterbox 15522">
                            <div class="评分对象1" style="display: inline-block;">
                              {{ item.name }}
                            </div>
                          </div>
                          <div class="description">{{ item.description }}</div>
                        </div>
                      </div>
                      <div class="right">
                        <div class="marks-container">
                          <div class="score-mark">
                            {{ item.datifen }}
                          </div>
                          <div class="type">分</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </div>
        <div class="mark-container" style="zoom: 100%;" v-show="showid == 2">
          <div style="position: relative;">
            <div
              style=" position: absolute; z-index: -1; top: 0px; left: 0px; bottom: 0px; right: 0px; filter: blur(30px); background-size: 100% 100%; background-repeat: no-repeat;">
            </div>
            <div class="mark-title">
              <div class="left-title" style="width: 100%;">{{ title }}-现场比赛</div>
              <div class="pr"></div>
            </div>
            <div id="markScreen" class="mark-list one">
              <div id="markScreenBox" class="mark-list-box">
                <el-scrollbar style="height: 100%;">
                  <div :class="[item._id == actid ? 'act' : '', 'mark-item-container', 'one']" v-for="(item, index) in cs" :key="index+200" @click="pingfen(item, index)">
                    <!-- cs -->
                    <div class="list-item">
                      <div class="left">
                        <img :src="getavatar(item)" class="avatar" />
                        <div class="info">
                          <div class="title outterbox 15522">
                            <div class="评分对象1" style="display: inline-block;">{{ item.name }}</div>
                          </div>
                          <div class="description">{{ item.description }}</div>
                        </div>
                      </div>
                      <div class="right" style="float: right;" @click="pingfenshow(item, index)">
                        <div class="marks-container">
                          <div class="score-mark">{{ gethasPingd_avg(item) }}</div>
                          <div class="type">{{item.avgrecord >0?"均分":"待评分"}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-scrollbar>
              </div>
            </div>
            <div  class="opt">
              <div >
                <input type="checkbox" name="real" id="real" value="true" />
                <label  for="real">结果展示</label>
                <a  href="#/mark/result?mid=wfp3c2ht" class="result">
                  <img 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAzCAYAAADYfStTAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAHNJREFUaIHt2MENgCAQAEE19N8CpWoHPgyJE7Lzh9zmXnDOOY+F7o/nzlUDXKsuUhSkK0hXkK4gXUG6gnTbBY2/B3jx6Smy3YYK0hWkK0g3DuDraaXtNlSQriBdQbqCdAXpCtIVpCtIV5CuIF1BuoJ0BekeTt4FRrBJtQEAAAAASUVORK5CYII="
                    alt="查看结果" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="markJury" style="zoom: 80%;" v-if="showid == 3">
          <div id="markJurybg"></div>
          <div class="top">
            <div class="mark-title">
              <div class="left-title">
                <div class="title-logo-container">
                  <img :src="getavatar(markObejct)" />
                  <div class="outterbox">
                    <div class="inner_box">{{ markObejct.name }}</div>
                  </div>
                </div>
              </div>
              <div class="pr">
                <div class="info">
                  <div class="marked">
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAiCAYAAAA3WXuFAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAghJREFUWIXN18+LTXEYx/HXvTPjYjExTIwVMguzk5rRTPEHGCmzkdTsRHaYYiGzkJ21ZKusTjYsiPJrI2UxE2WS2ChZSMQYGRbPvZoR+n7Pdc391HdxO5/79D7fp/P8qExPTyupXdiHYfRiHm9xFwUepgQpimLR784SIBtwEaO/ebYJg5jAZRzBx5zg1UyYATz+A8yvOlj39rUKqBv3sS7jP/0ihZVWAF1AT4a/oX6cSzWnAvXjQAmYhiawJsWYCrS/PAvowN4UYyrQ9vIsPzWYYkoFWtsESEO9KaZUoLkmQLJipAK9agKkoRcpplSgG02AZMVIBbqKd+VZPMO9FGMq0BccLY3D4VRjTqW+gkv5LM7iTqo5t7kewvkM/+n6SVYuEJzAHjz4i+cWdorbyVKZeQiu1c8ARsQEMI/XAvR5ybilgRp6Wj//TGVS1lK1HVAzKVslpsgaluErZvFBE0U0BagH27ADm7EV6+tAK9Elbvq7aKCf8B5vMCN62CM8wcuyQH3i0x4Va07KtFcRt1XDamzE0ILn38RqdFO0oqkUoC04jnGsSIDIUYd4uWFM4raY0xctZpUFi+IkToo3/J+6jmNFUcwQue8WRe7MEsDAbkyNjY2NEDd0Ssaa0kLNYqgqvpp20HKMV0X9aBd1VUVTbBfNtV3rqIrctYtqnaLUE5V0KdWBzz8AEbJb8TD58fwAAAAASUVORK5CYII=" />
                    <span style="width: 142px; display: inline-block;">已评{{ gethasPingd(markObejct) }}位</span>
                  </div>
                  <div class="score-container" style="margin-top: 5px; padding-top: 10px;">
                    <div class="score" style="display: inline-block; font-size: 40px;">
                      {{ gethasPingd_avg(markObejct) }}
                    </div>
                    <div class="type" style="display: inline-block; font-size: 25px;">
                      均分
                    </div>
                  </div>
                  <div class="type-link">

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">

            <div style="position: relative;">
              <div class="left" tabindex="3" style="overflow: hidden; outline: none;">
                <div class="jury-list"
                  style="transition: transform 0ms ease-out 0s; transform: translate3d(0px, 0px, 0px);height: 100%;">
                  <el-scrollbar style="height: 100%;">
                    <div class="jury-item-container" v-for="(item, index) in pw" :key="index+100">
                      <div class="jury-item toMark">
                        <div class="jury-avatar">
                          <img :src="getavatar(item)" alt="3" />
                          <div :class="pwPinFenedCss(item)">{{ getscore(item) }}</div>
                        </div>
                        <p class="jury-name">{{ item.name }}</p>
                        <p class="jury-desc">{{ item.work }}</p>
                      </div>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </div>
            <div class="right">
              <el-scrollbar style="height: 100%;">
                <div class="remark-container" style="margin-top: 0px;" v-for="(item, index) in markObejct.record_jb"
                  :key="index">
                  <!-- //record_jb -->
                  <div class="jury-remark-container" v-show="item.fenshu > 0">
                    <div class="right-right">
                      <div class="top">
                        <div class="name-container">
                          <div class="jury">嘉宾</div>
                          <div class="name">{{ item.name }}</div>
                        </div>
                        <div class="mark">
                          {{ "评分：" + item.fenshu + "分" }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </div>
            <div class="remark-animation">
            </div>
          </div>
        </div>
        <div class="mark-container" style="zoom: 100%;" v-show="showid == 4">
          <div style="position: relative;">
            <div
              style=" position: absolute; z-index: -1; top: 0px; left: 0px; bottom: 0px; right: 0px; filter: blur(30px); background-size: 100% 100%; background-repeat: no-repeat;">
            </div>
            <div class="mark-title">
              <div class="left-title" style="width: 100%;">{{ title }}-现场比赛</div>
              <div class="pr"></div>
            </div>
            <div class="mark-title" style="margin-top: 5%;font-size: 30px;">
              <div class="left-title" style="margin: 0 auto;">当前：{{ markObejct.name }}</div>
              <div class="pr"></div>
            </div>
            <div class="mark-title" style="margin-top: 5%;font-size: 30px;">
              <div :class="['left-title',maxtime<=30?'warn':(maxtime<=60?'twarn':'')]" style="margin: 0 auto;">
                时间剩余：{{msgtimer}}</div>
              <div class="pr"></div>
            </div>
          </div>
        </div>
        <div class="result-container" style="zoom: 70%;" v-show="showid == 5">
          <div style="background-image: url('https://img2.wmnetwork.cc/res/screen/img/bg/diqiu/22_big.jpg'); position: absolute; z-index: -1; top: 0px; left: 0px; bottom: 0px; right: 0px; filter: blur(30px); background-size: 100% 100%; background-repeat: no-repeat;">
          </div>
          <div class="gray-container" >
            <div class="toggleBtn">
              <div class="btns" style="left: 0px; margin-left: 0px; margin-right: 0px;">
                <button type="button" :class="['btn', activeindex==0?'active':'']" @click="buttonfensu(0)">综合</button>
                <button type="button" :class="['btn', activeindex==1?'active':'']" @click="buttonfensu(1)">笔试成绩</button>
                <button type="button" :class="['btn', activeindex==2?'active':'']" @click="buttonfensu(2)">现场成绩</button></div>
            </div>
            <div  class="result-winner single">
              <div :class="['result-item', `rank${index+1==1?2:(index+1==2?1:index+1)}`]" style="order: 1; opacity: 1;" v-for="(item,index) in showresults" :key="index" v-show="(index+1)<=3">
                <div class="left">
                  <div class="index">{{ index+1 }}</div>
                  <div class="avatar">
                    <img :src="getavatar(item)" alt=""></div>
                  <div class="info">
                    <div class="name">
                      <div class="inner_box 评分对象1" style="display: inline-block;">{{ item.name }}</div>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="marks-container">
                    <div class="type">总分</div>
                    <div class="score-mark">{{ item.total }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div  id="result_list" class="result-list">
              <div  id="result_list_content">
                <div  class="mark-item-container" v-for="(item,index) in showresults" :key="index" v-show="(index+1)>3">
                  <div  class="result-item rank1">
                    <div class="left">
                      <div class="index">{{ index+1 }}</div>
                      <div class="avatar">
                        <img :src="getavatar(item)" alt=""></div>
                      <div class="info">
                        <div class="name">
                          <div class="inner_box 44" style="display: inline-block;">{{ item.name }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="right">
                      <div class="marks-container">
                        <div class="type">总分</div>
                        <div class="score-mark">{{ item.total }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div id="url_code" class="pop-ecode title hover zoom1"
        style="position: fixed; right: 20px; top: 20px; transition: all 0.5s ease 0s;" v-show="showQT == true">
        <span class="ecode-image" ref="ecodeimage"></span>
      </div>
    </div>
    <div class="s_bottom">
      <div class="s_bottom_link">
        <ul class="clearfix s_bottom_box ">
          <span class="bottom_radius bottom_radius_left"></span>
          <li class="li-home" @click="bottomliclick(0)">
            <i class="el-icon-s-home icon_tihuan_bg"></i>
            <span class="li_span">主画面</span>
          </li>
          <li class="li-home" @click="bottomliclick(1)">
            <i class="el-icon-s-marketing icon_tihuan_bg"></i>
            <span class="li_span">答题结果</span>
          </li>
          <li class="li-home" @click="bottomliclick(2)">
            <i class="el-icon-s-platform  icon_tihuan_bg"></i>
            <span class="li_span">现场比赛</span>
          </li>
          <li class="li-home" @click="bottomliclick(5)">
            <i class="el-icon-s-claim  icon_tihuan_bg"></i>
            <span class="li_span">查看总分</span>
          </li>


          <li class="right li-setting" @click="startAstop()">
            <i class="el-icon-caret-right icon_tihuan_bg"></i>
            <span class="li_span">开始现场比赛</span>
          </li>
          <li class="right li-setting" @click="setting()">
            <i class="el-icon-s-tools icon_tihuan_bg"></i>
            <span class="li_span">设置</span>
          </li>
          <li class="right li-fullscreen" @click="toggleFullScreen()">
            <i class="el-icon-rank icon_tihuan_bg"></i>
            <span class="li_span">全屏<i></i></span>
          </li>
          <li class="right li-recode" @click="showqt()">
            <a tabindex="-1" href="javascript:;" class="s_b_icon recode"></a>
            <span class="li_span">二维码</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import getArrObjNameFromId from "../utils/tools";
  import {
    setTimeout
  } from "timers";
  export default {
    sockets: {
      connect: function () {
        console.log("socket connected");
      },
      getMsg: function (value) {
        console.log(value);
      },
      pingfenResult(value) {
        this.updatescore(value)
      },
      huanjieChange(value) {
        this.huanjie.id = value.huanjieId;
        this.cansai.id = value.cansaiId;
        this.huanjie.name = getArrObjNameFromId(this.member.hj, value.huanjieId);
        this.cansai.name = getArrObjNameFromId(this.member.cs, value.cansaiId);
        this.results = [];
      }
    },
    created() {
      this.getMemberData();
      setTimeout(() => {
        new this.$qrCode(this.$refs.ecodeimage, {
          text: "https://talatan.com/pingfen/#/login",
          width: 430,
          height: 430,
          colorDark: "#333333", //二维码颜色
          colorLight: "#ffffff", //二维码背景色
          correctLevel: this.$qrCode.CorrectLevel.L //容错率，L/M/H
        });
      }, 500);
    },
    data() {
      return {
        title: "",
        zhuban: "",
        msg: {},
        huanjie: {
          name: "",
          id: ""
        },
        cansai: {
          name: "",
          id: ""
        },
        member: {},
        cst: [],
        cs: [], //参赛选手
        csd: [], //答题分
        pw: [], //评委
        jb: [], //嘉宾
        adminid: "",
        datifen: [],
        markObejct: {},
        markObejctindex: -1,

        // flowid: "",
        showid: 0,
        csshow: {},
        results: [],
        showQT: false, //显示二维码
        actid: "", //当前正在表演的id
        isFullscreen: false,
        maxtime: 0,
        msgtimer: '',
        activeindex:0,
        showresults:[],
      };
    },
    computed: {

    },
    watch: {
      "datifen": {
        handler() {
          for (let index = 0; index < this.cst.length; index++) {
            let item = this.cst[index];
            let fenshu = this.datifen.filter(ditione => {
              return ditione.cansaiId == item._id;
            });
            if (fenshu.length > 0) {
              this.cst[index].datifen = fenshu[0].fenshu;
            } else {
              this.cst[index].datifen = 0
            }
          }
          this.csd = JSON.parse(JSON.stringify(this.cst)).sort(function (a, b) {
            return b.datifen - a.datifen;
          });
        },
        deep: true
      },
      "cst": {
        handler() {
          this.cs = JSON.parse(JSON.stringify(this.cst))
        },
      },

    },
    methods: {
      toggleFullScreen() {
        let el = document.getElementById("app");
        if (this.isFullscreen == false) {
          if (el.requestFullscreen) {
            el.requestFullscreen();
          } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
          } else if (el.webkitRequestFullscreen) {
            el.webkitRequestFullscreen();
          } else if (el.msRequestFullscreen) {
            el.msRequestFullscreen();
          }
          this.isFullscreen = true;
        } else {
          if (el.CancelFullScreen) {
            el.CancelFullScreen();
          } else if (el.mozRequestFullScreen) {
            el.mozRequestFullScreen();
          } else if (el.webkitCancelFullScreen) {
            el.webkitCancelFullScreen();
          } else if (el.msCancelFullScreen) {
            el.msCancelFullScreen();
          }else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
          this.isFullscreen = false;
        }
      },
      setting() {
        window.open("https://talatan.com/pingfen/#/control");
      },
      buttonfensu(index)
      {
        this.activeindex=index;
        if(index==0){
          for (let index = 0; index < this.cs.length; index++) {
             this.cs[index].total=(this.cs[index].avgrecord-0)*0.5+this.cs[index].datifen*0.5-0
          }
        }
        else if(index==1){
          for (let index = 0; index < this.cs.length; index++) {
             this.cs[index].total=this.cs[index].datifen-0
          }
        }
        else if(index==2){
          for (let index = 0; index < this.cs.length; index++) {
             this.cs[index].total=this.cs[index].avgrecord-0
          }
        }
        let showresults=JSON.parse(JSON.stringify(this.cs)).sort(function (a, b) {
          return b.total - a.total;
        });
        //第一名和第二名换位置
        let sencond=showresults[1]
        showresults.splice(1,1)
        showresults.unshift(sencond)
        this.showresults=showresults;
      },
      showqt() {
        this.showQT = !this.showQT;
      },
      updatescore(value) {
        this.updatescoreA(value, true)
        this.updatescoreA(value, false)
      },
      updatescoreA(value, pwjb) {
        //判断是不是在评委列表中
        let pwjd = [];
        if (pwjb == true) { //pwd
          pwjd = this.pw
        } else {
          pwjd = this.jb
        }
        let exist = pwjd.some((res, index) => {
          if (res._id == value.pingweiId) {
            return true;
          } else {
            return false;
          }
        });
        if (exist) {
          let true2 = false
          let findi = -1; //在记录的那一个

          let records = []
          if (pwjb == true) { //pwd
            records = this.markObejct.record
          } else {
            records = this.markObejct.record_jb
          }
          if(!records){records=[]}
          true2 = records.some((res, index) => {
            if (res.pingweiId == value.pingweiId) {
              findi = index;
              return true;
            } else {
              return false;
            }
          });
          if (true2) {
            records[findi].fenshu = value.fenshu
          } else {
            records.push(value)
          }
          if (pwjb == true) { //pwd
            this.markObejct.record = records;
          } else {
            records = records.sort(function (a, b) {
              return b.fenshu - a.fenshu;
            });
            this.markObejct.record_jb = records;
          }
          this.cs[this.markObejctindex] = this.markObejct;
          this.$forceUpdate()
        }
      },
      getavatar(item) {
        if (item && item.avatar) {
          return `${this.$imgServer}${item.avatar}`;
        } else {
          return "";
        }
      },
      gethasPingd(item) {
        if (item.record) {
          return item.record.length
        } else {
          return 0
        }
      },
      //硬复制一份去除循环更新渲染bug
      gethasPingd_avg(item) {
        let scores = item.record.slice().sort(function (a, b) {
          return a.fenshu - b.fenshu;
        });
        if (scores.length > 3) {
          scores.splice(scores.length - 1, 1).splice(0, 1);
        }
        let all = 0;
        for (let index = 0; index < scores.length; index++) {
          all += scores[index].fenshu;
        }
        let avg = 0
        if (all != 0) {
          avg = (all / scores.length).toFixed(1);
        }
        // 
        item.avgrecord = avg;
        return avg;
      },
      pwPinFenedCss(item) {
        let findpwrecord = this.markObejct.record.filter(pwone => {
          return pwone.pingweiId == item._id;
        });
        if (findpwrecord.length > 0 && findpwrecord[0].fenshu > 0) {
          return ['marked', 'mark']
        } else {
          return ['mark']
        }
      },
      getscore(item) {
        let findpwrecord = this.markObejct.record.filter(pwone => {
          return pwone.pingweiId == item._id;
        });
        if (findpwrecord.length > 0 && findpwrecord[0].fenshu > 0) {
          return findpwrecord[0].fenshu
        } else {
          return "未评分";
        }
      },
      pingfen(item, index) {
        console.log(item);
        this.markObejctindex = index;
        this.markObejct = item
        this.actid = item._id;
        // this.showid = 3
      },
      pingfenshow(item, index) {
        this.showid = 3
      },
      bottomliclick(index) {
        this.showid = index;
        if(index==5){
          this.buttonfensu(this.activeindex)
        }
      },
      getMemberData() {
        this.$axios.get("/noauth/pingfen/all").then(res => {
          // console.log(res.data.data);
          let data = res.data.data;
          if (res.status == 200 && res.data.status == 1) {
            this.member=data;
            if(data.bisai.length > 0){
              let bisA=data.bisai[0]
              this.title=bisA.title
              this.zhuban=bisA.zhuban
            }
            let cs = data.cs;
            let pw = data.pw.filter(pwone => {
              return pwone.pwtype == "评委" && pwone.username != "0";
            });
            let jb = data.pw.filter(pwone => {
              return pwone.pwtype == "嘉宾";
            });
            let adminida = data.pw.filter(pwone => {
              return pwone.pwtype == "评委" && pwone.username == "0";
            });
            if (adminida.length == 1) {
              this.adminid = adminida[0]._id
            }
            let datifen = data.record.filter(recordne => {
              return recordne.pingweiId == this.adminid;
            });
            for (let index = 0; index < cs.length; index++) {
              let csa = cs[index];
              let record_cs = data.record.filter(recordne => {
                return recordne.cansaiId == csa._id;
              });
              //过滤出真实评委的分数
              let true_record_cs = []
              for (let index2 = 0; index2 < pw.length; index2++) {
                let pwa = pw[index2];
                let record_cs_filter = record_cs.filter(recordne => {
                  return recordne.pingweiId == pwa._id;
                });
                if (record_cs_filter.length > 0) {
                  true_record_cs.push(record_cs_filter[0])
                }
              }
              cs[index].record = true_record_cs;
              //过滤出真实嘉宾的分数
              let true_record_cs_jb = []
              for (let index3 = 0; index3 < jb.length; index3++) {
                let pwa_jb = jb[index3];
                let record_cs_filter_jb = record_cs.filter(recordne => {
                  return recordne.pingweiId == pwa_jb._id;
                });
                if (record_cs_filter_jb.length > 0) {
                  true_record_cs_jb.push(record_cs_filter_jb[0])
                }
              }
              true_record_cs_jb = true_record_cs_jb.sort(function (a, b) {
                return b.fenshu - a.fenshu;
              });
              cs[index].record_jb = true_record_cs_jb;
            }
            this.pw = pw
            this.jb = jb

            this.datifen = datifen
            this.cst = cs
            console.log(this.cst)
          } else {
            this.$message.error("保存出现问题，请重试");
          }
        });
      },
      startAstop() {
        this.showid = 4
        if (this.timer1 == null) {
          this.maxtime = 60 * 10;
          this.msgtimer = "10:00"
          this.timer1 = setInterval(this.CountDown, 1000);
        } else {
          clearInterval(this.timer1);
          this.timer1 = null
        }
      },
      CountDown() {
        if (this.maxtime >= 0) {
          let minutes = Math.floor(this.maxtime / 60);
          let seconds = Math.floor(this.maxtime % 60);
          this.msgtimer = "" + this.PrefixZero(minutes, 2) + ":" + this.PrefixZero(seconds, 2);
          --this.maxtime;
        } else {
          clearInterval(this.timer1);
          this.timer1 = null
        }
      },
      PrefixZero(num, n) {
        return (Array(n).join(0) + num).slice(-n);
      }
    }
  }
</script>
<style src="./css/pfresult.css"></style>