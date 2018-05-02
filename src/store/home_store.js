import axios from 'axios'
export default {
    state:{
        tabs:[],
        homelist:[],
        topic_list:[],
        homebanner:[],
        bannerpic:[],
        searchdata:[],
        page:'',
        busy:false,
        loading:false
    },
    mutations:{
        axioss(state){
            state.page ++;
                axios.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/tab').then(res=>{
                    state.tabs = res.data.data.tab_element;

                }).catch(function(error) 
                    {
                        console.log("请求错误！tabs");
                    });

                axios.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/operateElement?moduleKey=zhekou_index_banner,zhekou_index_timeline,zhekou_index_fixed_ad,zhekou_cate_banner,zhekou_cate_minipic,zhekou_cate_timeline&page=0&pageSize=50&cateId=0').then(res=>{
                    state.homebanner = res.data;
                    state.bannerpic = res.data.data.zhekou_index_banner
                }).catch(function(error) 
                    {
                        console.log("请求错误！banner");
                    });

                axios.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/topic?sortType=7&page='+state.page+'&pageSize=20').then(res=>{
                    state.topic_list = res.data.data.topic_list;
                    for(var i=0;i<state.topic_list.length;i++){
                        if(state.topic_list[i].coupon_info){
                            state.homelist.push(state.topic_list[i]);
                        }
                    }

                    console.log(state.homelist);
                }).catch(function(error) 
                    {
                        console.log("请求错误！homelist");
                    });
            },
            homeload(state){
                state.page ++;
                state.busy = true;
                state.loading = true;
                axios.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/topic?sortType=7&page='+state.page+'&pageSize=20').then(res=>{
                    state.topic_list = res.data.data.topic_list;
                    for(var i=0;i<state.topic_list.length;i++){
                        if(state.topic_list[i].coupon_info){
                            state.homelist.push(state.topic_list[i]);
                        }
                    }
                    state.busy = false;
                    state.loading = false;
                }).catch(function(error) 
                    {
                        console.log("请求错误！homelist");
                    });
            },
            search(state,input){
                // window.location='http://mobile.sqkb.com/search/?q='+this.input //跳转搜索页面
                axios.get('https://bird.ioliu.cn/v1/?url=http://mobile.sqkb.com/search/searchResultData?sortType=7&word='+input+'&page=0&pageSize=20').then(res=>{
                    state.searchdata = res.data.data.coupon_list;
                    console.log("search");
                }).catch(function(error) 
                            {
                                console.log("请求错误！搜索");
                            });
              }
        },
    actions:{
    	
    }
}