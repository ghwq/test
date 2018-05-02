<template>
	<div class="search">
           <el-col :span="12" v-for="(sinfo,index) in searchdata" :key="index">
			<a href="">
				<div class="good">
					<img :src="sinfo.thumbnail_pic" alt="">
					<div class="good-info">
						<div class="good-info-title">
							<p class="free-shipping"></p>
							<p class="title">{{sinfo.title}}</p>
						</div>
						<div class="good-info-price">
							<span>原价¥{{sinfo.raw_price}}</span>
							<span>月销{{sinfo.month_sales}}</span>
						</div>
						<div class="good-info-coupon">
							<p class="coupon-price">券后¥<em class="sell-price">{{sinfo.zk_price}}</em></p>
							<span class="quan" v-if="sinfo.ticket">{{sinfo.ticket.coupon_price}}元券</span>
							<span class="quan" v-else>{{sinfo.discount}}折</span>
						</div>
					</div>
				</div>
			</a>
		</el-col>
		<el-col :span="24"> <el-button icon="el-icon-close" circle @click="close"></el-button></el-col>	
    </div>
	
</template>
<script type="ecmascript-6">
import { mapState,mapMutations,mapGetters,mapActions } from 'vuex';
export default {
	computed:{
		...mapState({searchdata:state=>state.home.searchdata})
	},
	methods:{
		close:function(){
			this.$emit("close",false);
		}
	}
}
	
</script>
<style lang="scss">
$o:#ff5300;
.search{
	button.el-button.el-button--default.is-circle{
		color: $o;border-color:$o;padding:7px;margin-top: -1rem;
	}
}
	
</style>