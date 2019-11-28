<template>
  <div id="pfresult">
    <div class="bg">
      <div></div>
      <img src="https://res.wmnetwork.cc/res/screen/img/logo_top.png" alt="微媒网络" class="wm-logo" v-show="false">
    </div>
    <div class="mark">
      <div class="mark">
        <div class="mark-container" style="zoom: 100%;" v-show="this.showid == 0">
          <div style="position: relative;">
            <div style=" position: absolute; z-index: -1; top: 0px; left: 0px; bottom: 0px; right: 0px; filter: blur(30px); background-size: 100% 100%; background-repeat: no-repeat;">
            </div>
            <div  class="mark-title" style="margin-top: 25%;">
              <div class="left-title" style="margin: 0 auto;    margin-top: -10%;">{{title}}</div>
              <div class="pr"></div>
            </div>
             <div  class="mark-title" style="margin-top: 5%;font-size: 30px;">
              <div class="left-title" style="margin: 0 auto;">主办单位：{{zhuban}}</div>
              <div class="pr"></div>
            </div>
          </div>
        </div>
        <div class="mark-container" style="zoom: 100%;" v-show="showid == 1">
          <div style="position: relative;">
            <div
              style=" position: absolute; z-index: -1; top: 0px; left: 0px; bottom: 0px; right: 0px; filter: blur(30px); background-size: 100% 100%; background-repeat: no-repeat;">
            </div>
            <div  class="mark-title">
              <div class="left-title" style="width: 100%;">{{title}}-答题结果</div>
              <div class="pr"></div>
            </div>
            <div  id="markScreen" class="mark-list one">
              <div  id="markScreenBox" class="mark-list-box">
                <el-scrollbar style="height: 100%;">
                <div  class="mark-item-container one" v-for="(item,index) in cs" :key="index" @click="pingfen(item)">
                  <div  class="list-item">
                    <div  class="left">
                      <img  :src="getavatar(item)" class="avatar">
                      <div  class="info">
                        <div  class="title outterbox 15522">
                          <div  class="评分对象1" style="display: inline-block;">{{item.name}}</div>
                        </div>
                        <div  class="description">{{item.description}}</div>
                      </div>
                    </div>
                    <div  class="right">
                      <div  class="marks-container">
                        <div  class="score-mark">{{get_dati_score(item)}}</div>
                        <div  class="type">分</div>
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
            <div  class="mark-title">
              <div class="left-title" style="width: 100%;">{{title}}-答题结果</div>
              <div class="pr"></div>
            </div>
            <div  id="markScreen" class="mark-list one">
              <div  id="markScreenBox" class="mark-list-box">
                <el-scrollbar style="height: 100%;">
                <div  class="mark-item-container one" v-for="(item,index) in cs" :key="index" @click="pingfen(item)">
                  <div  class="list-item">
                    <div  class="left">
                      <img  :src="getavatar(item)" class="avatar">
                      <div  class="info">
                        <div  class="title outterbox 15522">
                          <div  class="评分对象1" style="display: inline-block;">{{item.name}}</div>
                        </div>
                        <div  class="description">{{item.description}}</div>
                      </div>
                    </div>
                    <div  class="right">
                      <div  class="marks-container">
                        <div  class="score-mark">{{item.score==-1?"...":item.score}}</div>
                        <div  class="type">{{item.score==-1?"待评分":"均分"}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                </el-scrollbar>
              </div>
            </div>
            <div data-v-5e163b0b="" class="opt">
              <div data-v-5e163b0b=""><input data-v-5e163b0b="" type="checkbox" name="real" id="real"
                  value="true"><label data-v-5e163b0b="" for="real">结果展示</label> <a data-v-5e163b0b=""
                  href="#/mark/result?mid=wfp3c2ht" class="result"><img data-v-5e163b0b=""
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAzCAYAAADYfStTAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAHNJREFUaIHt2MENgCAQAEE19N8CpWoHPgyJE7Lzh9zmXnDOOY+F7o/nzlUDXKsuUhSkK0hXkK4gXUG6gnTbBY2/B3jx6Smy3YYK0hWkK0g3DuDraaXtNlSQriBdQbqCdAXpCtIVpCtIV5CuIF1BuoJ0BekeTt4FRrBJtQEAAAAASUVORK5CYII="
                    alt="查看结果"></a></div>
            </div>
          </div>
        </div>
        <div class="markJury" style="zoom: 80%;" v-if="showid == 3">
          <div id="markJurybg"></div>
          <div class="top">
            <div class="mark-title">
              <div class="left-title">
                <div class="title-logo-container">
                  <img :src="getavatar(markObejct)">
                  <div class="outterbox">
                    <div class="inner_box">{{markObejct.name}}</div>
                  </div>
                </div>
              </div>
              <div class="pr">
                <div class="info">
                  <div class="marked">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAiCAYAAAA3WXuFAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAghJREFUWIXN18+LTXEYx/HXvTPjYjExTIwVMguzk5rRTPEHGCmzkdTsRHaYYiGzkJ21ZKusTjYsiPJrI2UxE2WS2ChZSMQYGRbPvZoR+n7Pdc391HdxO5/79D7fp/P8qExPTyupXdiHYfRiHm9xFwUepgQpimLR784SIBtwEaO/ebYJg5jAZRzBx5zg1UyYATz+A8yvOlj39rUKqBv3sS7jP/0ihZVWAF1AT4a/oX6cSzWnAvXjQAmYhiawJsWYCrS/PAvowN4UYyrQ9vIsPzWYYkoFWtsESEO9KaZUoLkmQLJipAK9agKkoRcpplSgG02AZMVIBbqKd+VZPMO9FGMq0BccLY3D4VRjTqW+gkv5LM7iTqo5t7kewvkM/+n6SVYuEJzAHjz4i+cWdorbyVKZeQiu1c8ARsQEMI/XAvR5ybilgRp6Wj//TGVS1lK1HVAzKVslpsgaluErZvFBE0U0BagH27ADm7EV6+tAK9Elbvq7aKCf8B5vMCN62CM8wcuyQH3i0x4Va07KtFcRt1XDamzE0ILn38RqdFO0oqkUoC04jnGsSIDIUYd4uWFM4raY0xctZpUFi+IkToo3/J+6jmNFUcwQue8WRe7MEsDAbkyNjY2NEDd0Ssaa0kLNYqgqvpp20HKMV0X9aBd1VUVTbBfNtV3rqIrctYtqnaLUE5V0KdWBzz8AEbJb8TD58fwAAAAASUVORK5CYII="><span
                      style="width: 142px; display: inline-block;">已评{{markObejct.marked}}位</span></div>
                  <div class="score-container" style="margin-top: 5px; padding-top: 10px;">
                    <div class="score" style="display: inline-block; font-size: 40px;">{{markObejct.score}}</div>
                    <div class="type" style="display: inline-block; font-size: 25px;">均分</div>
                  </div>
                  <div class="type-link">
                    <!---->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <!---->
            <!---->
            <div style="position: relative;">
              <div class="left" tabindex="3" style="overflow: hidden; outline: none;">
                <div class="jury-list" style="transition: transform 0ms ease-out 0s; transform: translate3d(0px, 0px, 0px);height: 100%;">
                  <el-scrollbar style="height: 100%;">
                    <div class="jury-item-container" v-for="(item,index) in pw" :key="index">
                      <div class="jury-item toMark">
                        <div class="jury-avatar">
                          <img :src="getavatar(item)" alt="3">
                          <div :class="[item.score==-1?'':'marked','mark']">{{item.score==-1?"未评分":item.score}}</div>
                        </div>
                        <p class="jury-name">{{item.name}}</p>
                        <p class="jury-desc">{{item.work}}</p>
                      </div>
                    </div>
                  </el-scrollbar>
                </div>
              </div>
            </div>
            <div class="right">
              <el-scrollbar style="height: 100%;">
                <div class="remark-container" style="margin-top: 0px;" v-for="(item,index) in jb" :key="index">
                  <div class="jury-remark-container">
                    <div class="left-left">
                      <img :src="getavatar(item)" alt="1" class="jury-remark-avatar">
                    </div>
                    <div class="right-right">
                      <div class="top">
                        <div class="name-container">
                          <div class="jury">嘉宾</div>
                          <div class="name">{{item.name}}</div>
                        </div>
                        <div class="mark">{{item.score==-1?"未评分":"评分："+item.score+"分"}}</div>
                      </div>
                      <!---->
                    </div>
                  </div>
                </div>
              </el-scrollbar>
              
            </div>
            <div class="remark-animation">
              <!---->
              <!---->
            </div>
            <div class="link"><a href="#/mark/list?mid=wfp3c2ht" class="result"><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAtCAYAAADoSujCAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+LUNEtwAAAxBJREFUaIHt2V+IlFUYx/HPnp3tQlOLkLyM9GqDwAJDQxOLogvRkmApKhMCL+pmb0SoIFEUwRvppqA2EIxUDKQyLPsHESEI3ViRkHohURRu2Aqtq12ceWFWfM+cnTmzg7BfWGZ2n+c8+3veOXPOeZ4zMDY2pslirMGi5u/XMY4vcUkey/AAFuBa5phcBpqvl1o1NZp/XI33ce9NBp7BZpxq8w9exm7c1Z3OLM7geZxu4D6cxFCN8zC+xj34s8bnUbxTVGKaYXyD+4P45OrEV8zDSML+SiFhM+F2bA7i3M9hScI2G9PmZtwdMJnpfDVhy41RmsmAwUznlF9ujNIMBukn28p/CdtUATGdMBlwLNP544QtN0ZpjgV8hD1tHN/E6YR9v3SCveANnKw2su34AU+IK8o1BPyB4/ikTbDrWI+X8DAW6s20GhT3ok8rTQMtR4lbktBvAd0yl0C/mUug3zRa3g9jHe4Qd+cG/sIX+DUz3ko8hPl6s4w28Dc+rzRVCWzBuzWDpsTi4YM2wfdhtHuNWUzhWRwKYhlZJ564eRzE0oTPiNkTT9T0IZYHMZMcNiVsL3YtqTNGgljZ5LAoYZtXQEwnLJzJcTrllxujNFeD6StRipRfbozSNAIuZzqPJ2wTBcR0wj8BBzKdDyds7xUQ0wkHA77DC+rn8QSewW+JQIext6y2JBN4Gj9Wc/cAvsdjYjFSMS4WNBcygm7DEawQV7bSrUVie3GaptYv39nmTzec0r4FWZRb/jA3l0C/mUug37SuQk/icdxpekFzXCxqcngOq8TDXS/OR0M3aqoS2IHXawaN4jXsahP8KJ7qXmMWo2Izbk/ARvXiK3ZiecL+qtkTX7Eb6wI2ZA5Yn7Bt7F5PR2yYyXH6toStX/cDQ0F+9yDl16/7gamg/QVfReqTyo1RmqGqhZ7DxYSt7vq11/wexPvddmv2FRxK2N8qJimfyxgL+Em8qD5X4/gzHpF+yl9hq3TZWZJfsBbnq3n9rbjOrxXbgsRbl3/FNl5Ozfs2PsOD4k7ci4JGU8uJStP/OumUshQc1/AAAAAASUVORK5CYII="></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="s_bottom" >
      <div class="s_bottom_link" >  
        <ul class="clearfix s_bottom_box ">
          <span class="bottom_radius bottom_radius_left"></span>
          <li class="li-home" @click="bottomliclick(0)">
            <a href="javascript:void(0);" class="s_b_icon home" tabindex="-1" id="bottom_home" title="主画面"></a> /#/socket
            <span class="li_span">主画面</span>
            <a href="javascript:void(0);" class="menu-name" tabindex="-1" title="主画面"></a>
          </li>
          <li class="li-home" @click="bottomliclick(1)">
            <a href="javascript:void(0);" class="s_b_icon home" tabindex="-1" id="bottom_home" title="答题阶段"></a>
            <span class="li_span">答题结果</span>
            <a href="javascript:void(0);" class="menu-name" tabindex="-1" title="答题阶段"></a>
          </li>
          <li class="li-mark" @click="bottomliclick(3)">
            <a tabindex="-1" title="评委评分" href="javascript:void(0);" id="bottom_mark" class="s_b_icon mark"></a>
            <span class="li_span">评委评分 <i></i></span> 
            <a tabindex="-1" href="javascript:void(0);" class="menu-name"></a>
          </li>


          <li class="li-home" @click="bottomliclick(2)">
            <a href="javascript:void(0);" class="s_b_icon home" tabindex="-1" id="bottom_home" title="比赛环节"></a>
            <span class="li_span">比赛环节</span>
            <a href="javascript:void(0);" class="menu-name" tabindex="-1" title="比赛环节"></a>
          </li>
          <!---->
          <!---->
          <li class="right li-setting">
            <a tabindex="-1" href="javascript:void(0);" class="s_b_icon setting"></a> 
            <span class="li_span">设置</span>
            <a tabindex="-1" href="javascript:void(0);" class="menu-name">设置</a>
          </li>
          <li class="right li-fullscreen">
            <a tabindex="-1" href="javascript:void(0);" class="s_b_icon fullscreen"></a> 
            <span class="li_span">全屏，快捷键'F11'<i></i></span> 
            <a tabindex="-1" href="javascript:void(0);" class="menu-name">全屏</a>
          </li>
          
        </ul>
      </div>
      <div id="keycode_hint" class="keycode_hint"><img src="//img2.wmnetwork.cc/static/screen/images/keycode_hint.jpg"
          alt="">
        <p style="">dx0rd3</p>
      </div>
    </div>
  </div>

</template>
<script>
import getArrObjNameFromId from "../utils/tools";
export default {
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    getMsg: function(value) {
      console.log(value);
    },
    pingfenResult(value) {
      this.msg = value;
      if (
        value.cansaiId == this.cansai.id &&
        value.huanjieId == this.huanjie.id
      ) {
        //评委id不在result中
        let exist = this.results.some(res => {
          return res.pingweiId == value.pingweiId;
        });
        debugger;
        if (!exist) {
          this.results.push({
            pingweiId: value.pingweiId,
            pingweiName: getArrObjNameFromId(this.member.pw, value.pingweiId),
            fenshu: value.fenshu
          });
        } else {
          this.results.forEach(element => {
            if (element.pingweiId == value.pingweiId) {
              element.fenshu = value.fenshu;
            }
          });
        }
      }
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
  },
  data() {
    return {
      title:'2019年第一次啊党委比赛ADAS',
      zhuban:'内蒙古自治区测绘地理信息局',
      msg: {},
      huanjie: { name: "", id: "" },
      cansai: { name: "", id: "" },
      member: {},
      cs:[],//参赛选手
      pw:[],//评委
      jb:[],//嘉宾
      adminid:'',
      ditifen:[],
      markObejct:{},
      showid:0,
      csshow:{},
      results: [],


    };
  },
  methods: {
    getavatar(item){
      if(item.avatar){
        return `${this.$imgServer}${item.avatar}`
      }
      else{
        return ''
      }
      
    },
    bottomliclick(index){
      this.showid=index
    },
    showThePage(){
      // if(showid==0){

      // }
    },
    get_dati_score(item){
      let fenshu=this.ditifen.filter(ditione=>{
        return ditione.cansaiId==item._id
      })
      if(fenshu.length>0){
        return fenshu[0].fenshu
      }
      else{
        return 0
      }
    },
    getMemberData() {
      this.$axios.get("/noauth/pingfen/all").then(res => {
        console.log(res.data.data);
        let data = res.data.data;
        if (res.status == 200 && res.data.status == 1) {
           this.cs = data.cs;
           this.pw =data.pw.filter(pwone=>{
             return pwone.pwtype=="评委" && pwone.username !="0"
           })
            this.jb =data.pw.filter(pwone=>{
             return pwone.pwtype=="嘉宾"
           })
           this.adminid =data.pw.filter(pwone=>{
             return pwone.pwtype=="评委" && pwone.username =="0"
           })[0]._id
           this.ditifen =data.record.filter(recordne=>{
             return recordne.pingweiId==this.adminid 
           })
           this.flowid=data.flow[0].cansaiId

           this.markObejct=this.cs.filter(pwone=>{
             return pwone._id==this.flowid
           })[0]





        } else {
          this.$message.error("保存出现问题，请重试");
        }
      });
    },
    sendData() {
      // this.$socket.emit("pingfen", { fenshu: 5 });
    }
  }
};
</script>
<style src="./css/pfresult.css">
</style>