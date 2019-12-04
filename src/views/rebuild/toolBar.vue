<template>
  <div id="pfresult">
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
export default {
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
      msgtimer: "",
      activeindex: 0,
      showresults: []
    };
  },
  methods: {
    startAstop() {
      this.showid = 4;
      if (this.timer1 == null) {
        this.maxtime = 60 * 10;
        this.msgtimer = "10:00";
        this.timer1 = setInterval(this.CountDown, 1000);
      } else {
        clearInterval(this.timer1);
        this.timer1 = null;
      }
    },
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
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        this.isFullscreen = false;
      }
    },
    setting() {
      window.open("https://talatan.com/pingfen/#/control");
    },
    buttonfensu(index) {
      this.activeindex = index;
      if (index == 0) {
        for (let index = 0; index < this.cs.length; index++) {
          this.cs[index].total = (this.cs[index].avgrecord - 0) * 0.5 + this.cs[index].datifen * 0.5 - 0;
        }
      } else if (index == 1) {
        for (let index = 0; index < this.cs.length; index++) {
          this.cs[index].total = this.cs[index].datifen - 0;
        }
      } else if (index == 2) {
        for (let index = 0; index < this.cs.length; index++) {
          this.cs[index].total = this.cs[index].avgrecord - 0;
        }
      }
      let showresults = JSON.parse(JSON.stringify(this.cs)).sort(function(a, b) {
        return b.total - a.total;
      });
      //第一名和第二名换位置
      let sencond = showresults[1];
      showresults.splice(1, 1);
      showresults.unshift(sencond);
      this.showresults = showresults;
    },
    showqt() {
      this.showQT = !this.showQT;
    },
    bottomliclick(index) {
      this.showid = index;
      if (index == 5) {
        this.buttonfensu(this.activeindex);
      }
    }
  }
};
</script>

<style></style>
