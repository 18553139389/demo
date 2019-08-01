<template>
  <div class="dialogs" v-if="showDialog">
    <ul>
      <li>
        <img src="../../../static/img/lingjuan-chengg.png" alt>
      </li>
      <li>
        <span @click="cancels">{{data1}}</span>
      </li>
      <li>
        <span style="font-size: 12px;color: #999;">{{data3}}</span>
      </li>
      <li v-if="data2">
        <div @click="hide">{{data2}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data1: {
      type: String,
      default: ""
    },
    data2: {
      type: String,
      default: ""
    },
    data3: {
      type: String,
      default: ""
    },
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {
    hide() {
      this.$emit("hide");
    },
    cancels() {
      this.$emit("cancels");
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.dialogs {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99999;

  ul {
    width: 80%;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    background: #fff;
    padding: 0.3rem 0;

    li {
      width: 100%;
      padding: 0.3rem;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 1.7rem;
        height: 1.5rem;
        margin-left: 0.4rem;
      }

      span {
        font-size: 15px;
        color: #333;
      }

      div {
        padding: 0.3rem 1rem;
        background: #73d242;
        border-radius: 6px;
        font-size: 14px;
        color: #fff;
      }
    }
  }
}
</style>
