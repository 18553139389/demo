Vue.component('bottom',{
    template:'<div class="bottom">'+
			 '<div class="bottom_box">'+
			 '<div class="know">'+
			 '<div class="know_btn">马上订阅</div>'+
			 '<p class="know_eng">BE THE FIRST TO KNOW</p>'+
			 '<p class="know_ch">第一时间获得最新资讯</p>'+
			 '<div class="wx">'+
		     '<img src="Resource/image/weixin.png" alt="" />'+
			 '</div>'+
			 '</div>'+
			 '<div class="know_m">'+
			 '<h3>关注公众号（河南华悦科技）</h3>'+
			 '<div class="saoma">'+
			 '<img src="Resource/image/share.png" alt="" />'+
			 '</div>'+
			 '</div>'+
			 '<div class="know_net">'+
			 '<div class="know__net_btn">网络咨询</div>'+
			 '<h3>0371-63320603</h3>'+
			 '<p>服务时间：8:30-18:00（周一至周六）</p>'+
			 '</div>'+
			 '<div class="back-top" @click="back">'+
			 '<img src="Resource/image/back.png" alt="" />'+
			 '</div>'+
		     '</div>'+
			 '<h3 class="own">Copyright 2018－2025 thekingbull.com 版权所有 网站备案号 豫ICP备18039770号-1 </h3>'+
			 '</div>',
	methods:{
		back:function(){
			this.$emit('back')
		}
	}
});

Vue.component('bottomList',{
    template:'<div class="bottom_list">'+
			 '<div class="bottom_box">'+
			 '<div class="know">'+
			 '<div class="know_btn">马上订阅</div>'+
			 '<p class="know_eng">BE THE FIRST TO KNOW</p>'+
			 '<p class="know_ch">第一时间获得最新资讯</p>'+
			 '<div class="wx">'+
		     '<img src="Resource/image/weixin.png" alt="" />'+
			 '</div>'+
			 '</div>'+
			 '<div class="know_m">'+
			 '<h3>关注公众号（河南华悦科技）</h3>'+
			 '<div class="saoma">'+
			 '<img src="Resource/image/share.png" alt="" />'+
			 '</div>'+
			 '</div>'+
			 '<div class="know_net">'+
			 '<div class="know__net_btn">网络咨询</div>'+
			 '<h3>0371-63320603</h3>'+
			 '<p>服务时间：8:30-18:00（周一至周六）</p>'+
			 '</div>'+
		     '</div>'+
			 '<h3 class="own">Copyright 2018－2025 thekingbull.com 版权所有 网站备案号 豫ICP备18039770号-1 </h3>'+
			 '</div>',
});