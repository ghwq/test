<template>
	<div>
		<el-col :span="12" v-for="(recommend,index) in subSales.topic_list" :key="index">
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
		<el-col :span="12" v-for="(recommend2,index) in subSales.coupon_list" :key="index+subSales.topic_list.length">
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
	    		subSales:state=>state.sub.subSales,
	    		loading:state=>state.sub.loading
	    	})
		}
		
	}
</script>
