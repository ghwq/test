<template>
  <div id="app">
   <el-container>
     <el-header class="head">
      <el-col :span="20"><el-input v-model="input" placeholder="搜索优惠券"></el-input>
      </el-col>
      <el-col :span="4"><el-button :span="4" size="mini" type="warning" icon="el-icon-search" @click="gosearch">搜索</el-button></el-col>
     </el-header>

     <el-main>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="今日精选" name="hwq">
          <swipe class="my-swipe" >
            <swipe-item v-for="(pics,index) in banners" :key="index" :style="{'background-image':'url('+pics.pic+')'}"></swipe-item>
          </swipe>
          <el-row>
            <el-col :span="8" class="middle-item">
              <a href="" class="item">
                <div class="text">
                  <p class="title">9块9包邮</p>
                  <p class="subTitle">每日白菜</p>
                </div>
                <div class="m-pic"><img src="http://ms1.sqkb.com/dist/image/index/index-k9-woman-382f38e256.jpg" alt=""></div>
              </a>
            </el-col>
            <el-col :span="8" class="middle-item">
              <a href="" class="item">
                <div class="text">
                  <p class="title">品牌优选</p>
                  <p class="subTitle">小钱买到大牌货</p>
                </div>
                <div class="m-pic"><img src="http://ms1.sqkb.com/dist/image/index/index-brand-abec78e019.jpg" alt=""></div>
              </a>
            </el-col>
            <el-col :span="8" class="middle-item">
              <a href="" class="item">
                <div class="text">
                  <p class="title">排行榜</p>
                  <p class="subTitle">每日白菜</p>
                </div>
                <div class="m-pic"><img src="http://ms1.sqkb.com/dist/image/index/index-rank-woman-60bf2a734c.jpg" alt=""></div>
              </a>
            </el-col>
          </el-row>
          <el-row>
           
          <a :href="'http://mobile.sqkb.com/coupon/'+list.coupon_info.coupon_id" v-for="list in lists">
            <div class="rank-shop">
              <div class="shop-left">
              <img :src="list.coupon_info.thumbnail_pic" alt="">
              <p class="shop-count" v-if="list.item_count>1">共{{list.item_count}}件</p>
              </div>
              <div class="shop-right">
                <p class="title" >{{list.coupon_info.title}}</p>
                <p class="detail">{{list.coupon_info.description}}</p>
                <div class="m-price">
                  <span>原价¥{{list.coupon_info.raw_price}}</span><span class="sold">月销{{list.coupon_info.month_sales}}</span>
                </div>
                <div class="b-price">
                  <span class="quan-hou-icon"></span>
                  <span class="price">¥{{list.coupon_info.zk_price}}</span>
                  <span class="quan" v-if="list.coupon_info.ticket">{{list.coupon_info.ticket.coupon_price}}元券</span>
                  <span class="quan" v-else>{{list.coupon_info.discount}}折</span>
                </div>
              </div>
            </div>
          </a>
          </el-row>
          <el-col :span="24" v-loading="loading"></el-col>
          
        </el-tab-pane>
        <el-tab-pane :label="tab.name" :name="String(tab.cate_collection_id)" v-for="(tab,index) in tabs" :key="index" @click="handleClick">
          <Sub></Sub>
        </el-tab-pane>
        <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOutDown">
            <search v-show="searchshow" @close="closesearch"></search>
          </transition>
    </el-tabs>
      
     </el-main>
     <el-button type="primary" icon="el-icon-arrow-up" circle @click="backtop"></el-button>
   </el-container>
  </div>
</template>

<script type="text/ecmascript-6">
import Sub from '@/components/Sub'
import search from '@/components/search'
import { mapState,mapMutations,mapGetters,mapActions } from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      input: '',
      activeName:'hwq',
      searchshow:false
    }
  },
  components:{
    Sub,
    search
  },
  computed:{
    ...mapState({
      tabs:state=>state.home.tabs,
      banners:state=>state.home.bannerpic,
      lists:state=>state.home.homelist,
      tabId:state=>state.sub.tabId,
      busy:state=>state.home.busy,
      loading:state=>state.home.loading
    })
  },
  created(){
    let url = 'https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/tab'
    this.axioss();
  },
  mounted:function(){
    this.$nextTick(function () {
      this.TabsContentHeight();
      this.homeloads();
    })
    
  },
  methods: {
      ...mapMutations(['axioss','subaxios','tabid','homeload','search']),
      handleClick(tab, event) {
          document.querySelector('.el-tabs__content').scrollTop = 0;
          this.tabid(this.activeName);
          if(this.activeName == "hwq"){
            return false; 
          }else{
            this.subaxios(this.activeName);

          }
      },
      TabsContentHeight(){
        let winH = window.innerHeight || document.documentElement.clientHeight;
        let Con = this.$el.querySelector(".el-tabs__content");
        let HeaderH = this.$el.querySelector(".el-header").offsetHeight;
        let TabsH = this.$el.querySelector(".el-tabs__header").offsetHeight;
        Con.style.height = winH - TabsH - HeaderH +"px";
      },
      homeloads(){
        this.$el.querySelector(".el-tabs__content").addEventListener("scroll",function(){
          let content=document.querySelector('.el-tabs__content')
          if(content.scrollTop>content.scrollHeight-640){
            if(!this.busy){
              this.homeload();
            }else{
              return false;
            }
          }
        }.bind(this))
      },
      gosearch(){
        this.searchshow = true;
        this.search(this.input);
      },
      backtop(){
        let wins = document.querySelector('.el-tabs__content');
        var gotoTop= function(){
          var currentPosition = wins.scrollTop;
          currentPosition -= 10;
          if (currentPosition > 0) {
            wins.scrollTop-=currentPosition/15;
          }
          else {
            wins.scrollTop=0;
            clearInterval(timer);
          }
        }
        var timer=setInterval(gotoTop,1);
      },
      closesearch:function(data){
        this.searchshow = data;
      }
    }
  }
</script>

<style lang="scss">
*{margin: 0;padding: 0;font-size: 0.3rem;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif ,yahei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;position:relative;
}
ol,ul,li{list-style: none;}a{text-decoration:none;color:#000;}
.el-button--mini, .el-button--mini.is-round{
  height:40px;padding:0 3px!important;border-color:#fff!important;background-color: #ff4040!important;
  &:hover{
    background: #ff2a2a;
    border-color: #ff0303;
  }
}
.my-swipe {
  width: 100%;
  height: 2.4rem;
  color: #fff;
  font-size: 30px;
  text-align: center; 
  .mint-swipe-items-wrap {
    width: 100%;
    height: 100%;
    .mint-swipe-item {
      width: 100%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
}
.el-loading-spinner{
      margin-top:21px;
      svg.circular{
        width:1rem;height:1rem;
        .path{  stroke-width: 4;}
      }
    }
.head{  background-image: -webkit-linear-gradient(to right,#ff7438,#ff1f1f);
    background-image: linear-gradient(to right,#ff7438,#ff1f1f);
  padding:10px!important;
}
.el-main{
  padding: 0!important;
  .el-tabs__header{
    margin:0;box-shadow: 0 0.04rem 0.06rem rgba(0,0,0,.1);
  }
  .el-tabs__content{
    overflow:scroll;
    #pane-hwq{
      margin-bottom:150px
    }
  }
  .middle-item{
    border-bottom:4px solid #f8f8f8;
    .item{
      height:3rem;display:block;
      .text{
        height:1.2rem;
        .title{
          padding-top:.3rem;font-size:.36rem;color:#ff4900;
        }
        .subTitle{font-size:.24rem;color:#402933}
      }
      .m-pic{height:1.8rem;
        img{
        background: center no-repeat;
        background-size: cover;width:80%;height:100%;}
      }
    }
  }
  .rank-shop{
    height:2rem;border-bottom:2px solid #f8f8f8;position: relative;padding-bottom: .1rem;
    .shop-left{
      width:33.3%;height:100%;float:left;
      img{background:center no-repeat;background-size:cover;width:100%;height:100%;}
      .shop-count{    position: absolute;bottom: 0.1rem;font-size: .23rem;
        color: #fff;height: .3rem;background: #000;width: 33.3%;}
    }
    .shop-right{
      width:66.6%;height:100%;float:left;
      .title{
        margin-top:.2rem;font-weight:700;font-size:.2rem;
        }
      .detail{
        color:red;font-size:.22rem;
      }
      .m-price {
        color:#999;margin:10px 0;
        span{font-size:.22rem;}
      }
      .b-price{
        .quan-hou-icon{    background: url(http://ms1.sqkb.com/dist/image/before/small_quan_hou-928357dceb.png) center no-repeat;
          width: 0.8rem;height: 0.3rem;float: left;background-size:.7rem .3rem;}
        .price{color:#ff4e02;font-size:.4rem;font-weight:900;}
        .quan{float: right;font-size: .24rem;height:.44rem;line-height:.44rem;background: url(http://ms1.sqkb.com/dist/image/before/quan_bg-1748afdb99.png) center no-repeat;background-size:1.3rem .4rem;width: 1.4rem;
          color: #fff;text-align: center;}
      }
    }
  }
  .search{
    height:auto;width:100%;background:#fff;z-index:10;position: absolute;top: 0;
  }
}
::-webkit-scrollbar{
  display:none;
}
.el-tabs__nav-scroll{overflow: auto!important;.el-tabs__item{font-size:.2rem;}
.el-tabs__active-bar{background-color: #f17e08;}.el-tabs__item.is-active {
    color: #f75509;
}}
button.el-button.el-button--primary.is-circle{
  position: absolute;right: 5%;bottom: 10%;z-index:11
}


@media screen and (min-width:1024px){
  body{max-width:1024px;margin:0 auto;}
}
</style>