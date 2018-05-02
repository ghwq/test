import axios from 'axios'
export default {
    state:{
        subSpecies:[],
        subRecommend:[],
        subNewest:[],
        subSales:[],
        tabId:'',
        loading:false,
        page:'0'
    },
    mutations:{
    	subaxios(state,cateId){
    		axios.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/operateElement?moduleKey=zhekou_index_banner,zhekou_index_timeline,zhekou_index_fixed_ad,zhekou_cate_banner,zhekou_cate_minipic,zhekou_cate_timeline&page=0&pageSize=50&cateId='+cateId).then(res=>{
                    state.subSpecies = res.data.data.zhekou_cate_minipic;
                }).catch(function(error) 
                    {
                        console.log("请求错误！subSpecies");
                    });
            axios.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/topicByCate?sortType=7&page=0&pageSize=20&cateCollectionId='+cateId+'&couponPage=0').then(res=>{
            		state.subRecommend = res.data.data;
            	}).catch(function(error)
                    {
                        console.log("请求错误！subRecommend");
                    });
        	},
        threeaxios(state,sortid){
        	state.page = 0;
            axios.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/topicByCate?sortType='+sortid+'&page=0&pageSize=20&cateCollectionId='+state.tabId+'&couponPage='+state.page).then(res=>{
                    if(sortid==7){
                    	state.subRecommend = res.data.data;
                    }else if(sortid==6){
                    	state.subNewest = res.data.data;
                    }else if(sortid==1){
                    	state.subSales = res.data.data;
                    }
                }).catch(function(error) 
                    {
                        console.log("请求错误！subRecommend");
                    });
        	},
        	tabid(state,tabid){
            	state.tabId = tabid;
        	},
        	loading(state,sortid){
                state.loading = true;state.page ++;
                axios.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/topicByCate?sortType='+sortid+'&page=0&pageSize=20&cateCollectionId='+state.tabId+'&couponPage='+state.page).then(res=>{
                    	if(sortid==7){
                    		state.subRecommend.push(res.data.data);
	                    }else if(sortid==6){
	                    	state.subNewest.push(res.data.data);
	                    }else if(sortid==1){
	                    	state.subSales.push(res.data.data);
	                    }
                }).catch(function(error) 
                    {
                        console.log("请求错误！subRecommend");
                    });
            }
    	},
    	
}