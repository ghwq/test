<template>
	<div id="sub">
		<el-row class="sub-list">
			<el-col :span="6" v-for="(specie,index) in subSpecies" :key="index">
				<a href="javascript:void(0)">
					<div class="species">
						<img :src="specie.pic" alt="">
						<div>{{specie.title}}</div>
					</div>
				</a>
			</el-col>
		</el-row>
		<el-row class="good-list">
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="推荐" name="7">
			    	<good></good>
			    </el-tab-pane>
			    <el-tab-pane label="最新" name="6">
					<good2></good2>
			    </el-tab-pane>
			    <el-tab-pane label="销量" name="1">

			    	<good3></good3>
			    </el-tab-pane>
			  </el-tabs>
			
		</el-row>	
	</div>
</template>
<script type="text/ecmascript-6">
	import { mapState,mapMutations,mapGetters,mapActions } from 'vuex';
	import good from '@/components/good'
	import good2 from '@/components/good2'
	import good3 from '@/components/good3'
	export default{
		data() {
	      return {
	        activeName: '7'
	      };
	    },
	    components:{
			good,
			good2,
			good3
		},
	    computed:{
	    	...mapState({
	    		subSpecies:state=>state.sub.subSpecies,
	    		subNewest:state=>state.sub.subNewest,
	    	})
	    },
	    created(){
		    let url = 'https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/tab'
		    // this.subaxios();
  		},
  		mounted:function(){
  			this.$el.addEventListener('scroll', function(e) {
		    		alert("gigi");
		    	})
  			// this.load();
  		},
	    methods: {
	    	...mapMutations(['threeaxios']),
		    handleClick(tab, event) {
		      	this.threeaxios(this.activeName);
		      },
		    load(){
		    	
		    }
		}
	}
</script>
<style lang="scss">
	.sub-list{
		border-bottom:.1rem solid #f8f8f8;
	}
	.species{
		height:1.6rem;margin:.2rem 0 .4rem;
		img{
			background: center no-repeat;background-size: cover;width:80%;height:1.2rem;
		}
		div{font-size:.2rem;height:.4rem;}
	}
	.good-list{
		.el-tabs__nav{
			width:100%;
			.el-tabs__item{
			font-size:.28rem;padding:0;margin:0;width:33.3%;
			}
		}
	}
</style>