<template>
  <div>
    <div class="gundong">
      <div class="gundongBox">
        <div class="gundongList">
          <span>LED scroller app which can be remotely controlled. </span>

          <span>LED scroller app which can be remotely controlled. </span>
        </div>
      </div>
    </div>

    <!-- <toolbar /> -->
  </div>
</template>

<script>
// import toolbar from "./toolBar";
export default {
  components: {
    // toolbar
  }
};
</script>

<style>
.gundongBox {
  font-size: 260px;
  width: 600px;
  height: 1.4em;
  /* margin: 5px auto; */
  position: relative;
  overflow: hidden;
  background: pink;
}

.gundongList {
  position: absolute;
  animation: geiwogun 22s linear infinite;
  -webkit-animation: geiwogun 18s linear infinite; /*Safari and Chrome*/
  white-space: nowrap;
}

.gundongList span {
  font-size: 1em;
  color: #000;
  padding: 5px 10px;
}

@keyframes geiwogun {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-50%, 0);
  }
}

@-webkit-keyframes geiwogun /*Safari and Chrome*/ {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-50%, 0);
  }
}
</style>
