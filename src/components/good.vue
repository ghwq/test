<template>
	<div>
		<el-col :span="12" v-for="(recommend,index) in subRecommend.topic_list" :key="index">
			<a href="">
				<div class="good">
					<img :src="recommend.coupon_info.thumbnail_pic" alt="">
					<div class="good-info">
						<div class="good-info-title">
							<p class="free-shipping"></p>
							<p class="title">{{recommend.coupon_info.title}}</p>
						</div>
						<div class="good-info-price">
							<span>原价¥{{recommend.coupon_info.raw_price}}</span>
							<span>月销{{recommend.coupon_info.month_sales}}</span>
						</div>
						<div class="good-info-coupon">
							<p class="coupon-price">券后¥<em class="sell-price">{{recommend.coupon_info.zk_price}}</em></p>
							<span class="quan" v-if="recommend.coupon_info.ticket">{{recommend.coupon_info.ticket.coupon_price}}元券</span>
							<span class="quan" v-else>{{recommend.coupon_info.discount}}折</span>
						</div>
					</div>
				</div>

			</a>
		</el-col>
		<el-col :span="12" v-for="(recommend2,index) in subRecommend.coupon_list" :key="index+subRecommend.topic_list.length">
			<a href="">
				<div class="good">
					<img :src="recommend2.thumbnail_pic" alt="">
					<div class="good-info">
						<div class="good-info-title">
							<p class="free-shipping"></p>
							<p class="title">{{recommend2.title}}</p>
						</div>
						<div class="good-info-price">
							<span>原价¥{{recommend2.raw_price}}</span>
							<span>月销{{recommend2.month_sales}}</span>
						</div>
						<div class="good-info-coupon">
							<p class="coupon-price">券后¥<em class="sell-price">{{recommend2.zk_price}}</em></p>
							<span class="quan" v-if="recommend2.ticket">{{recommend2.ticket.coupon_price}}元券</span>
							<span class="quan" v-else>{{recommend2.discount}}折</span>
						</div>
					</div>
				</div>

			</a>
		</el-col>
		<el-col	:span="24" v-loading="loading"></el-col>


	</div>
</template>
<script type="ecmascript-6">
	import { mapState,mapMutations,mapGetters,mapActions } from 'vuex';
	export default{
		computed:{
			...mapState({
	    		subSpecies:state=>state.sub.subSpecies,
	    		subRecommend:state=>state.sub.subRecommend,
      			loading:state=>state.sub.loading
	    	})
		}
		
	}
</script>
<style lang="scss">
	.good{
		width:100%;height:5rem;border-bottom:4px solid #e2e2e2;
		img{
			background:center no-repeat;background-size:cover;width:90%;height:3.2rem;
		}
		.good-info{
			height:1.8rem;padding:0 .15rem;
			.good-info-title{
				.free-shipping{
					background:url(http://ms1.sqkb.com/dist/image/before/free-icon2-80ce515b49.png) center no-repeat;float:left;
					height:.3rem;width:.5rem;background-size:100% auto;
				}
				.title{
					padding:0px 5px;font-size:.26rem;text-align:left;color:#000;display:-webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;
				}
			}
			.good-info-price{
				color:#999;margin: 5px 0;height: .28rem;
				span:nth-child(1){
					font-size:.22rem;float:left;
				}
				span:nth-child(2){
					font-size:.22rem;float:right;
				}
			}
			.good-info-coupon{
				.coupon-price{
					color:#fb0505;float:left;font-size:.2rem;
					em{font-weight:800;font-size:.4rem;margin-left:.1rem;}
				}
				.quan{
					float: right;font-size: .24rem;height:.44rem;line-height:.44rem;background: url(http://ms1.sqkb.com/dist/image/before/quan_bg-1748afdb99.png) center no-repeat;background-size:1.3rem .4rem;width: 1.4rem;
          				color: #fff;text-align: center;
				}
			}
		}
	}
</style>