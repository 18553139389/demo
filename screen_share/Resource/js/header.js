Vue.component('headerTop',{
    template:'<header>'+
             '<div class="h_contain" @mouseleave="hidemaps">'+
			 '<div class="province_choice" v-if="showmap">'+
			 '<span class="province_name">选择省</span>'+
			 '<ul class="map_city">'+
			 '<li v-for="(v,k) in provinceList" @click="getprovince(k,v.id,v.name)">'+
			 '<span :class="{font:provinceIndex == k}">{{v.name}}</span>'+
			 '</li>'+
			 '</ul>'+
			 '<span class="city_name">选择市</span>'+
			 '<ul class="map_location">'+
			 '<li v-for="(v,k) in marketList" @click="getmarket(k,v.id,v.name)">'+
			 '<span :class="{font:marketIndex == k}">{{v.name}}</span>'+
			 '</li>'+
			 '</ul>'+
			 '<span class="city_name">选择县区</span>'+
			 '<ul class="map_location">'+
			 '<li v-for="(v,k) in townList" @click="gettown(k,v.id,v.name)">'+
			 '<span :class="{font:townIndex == k}">{{v.name}}</span>'+
			 '</li>'+
			 '</ul>'+
			 '</div>'+
			 '<div :class="{mapbg:showmap == true}" class="h_left" @mouseenter="showmaps">请切换城市</div>'+
			 '<a class="h_right" href="http://gongxiang.thekingbull.com/a">'+
			 '<span style="margin-left: 30px;">服务商入口</span>'+
			 '</a>'+
			 '<a class="h_right" href="./pay_center.html?url=1">'+
			 '<img style="margin-left: 30px;" src="Resource/image/fenlei.png" alt="" />'+
			 '<span>我的订单</span>'+
			 '</a>'+
			 '<div class="h_box">'+
			 '<a class="h_right" href="./business_register.html">'+
			 '<span style="margin-left: 30px;">请注册服务商</span>'+
			 '</a>'+
			 '<a class="h_right" href="./register.html">'+
			 '<span style="margin-left: 30px;">请注册用户</span>'+
			 '</a>'+
			 '<a class="h_right" href="./login.html">'+
			 '<span style="margin-left: 30px;">请登录</span>'+
			 '</a>'+
			 '</div>'+
			 '<div class="nav_right" @mouseenter.stop="showBacks" :class="{bg:showBack}" @mouseleave.stop="hideBacks">'+
			 '<span></span>'+
			 '<img src="" />'+
			 '<div class="back" v-if="showBack" @click="goHead">'+
			 '退出登录'+
			 '</div>'+
			 '</div>'+
		     '</div>'+
		     '</header>',
	props: {
		provinceList: {
			type: Array,
			default: []
		},
		provinceIndex: {
			type: Number,
			default: 0
		},
		marketList: {
			type: Array,
			default: []
		},
		marketIndex: {
			type: Number,
			default: 0
		},
		townList: {
			type: Array,
			default: []
		},
		townIndex: {
			type: Number,
			default: 0
		},
		showmap: {
			type: String,
			default: false
		}
	},
	data: function() {
		return {
			showBack: false
		}
	},
	methods: {
		getprovince: function(index,id,name) {
			this.$emit('getprovince',index,id,name)
		},
		getmarket: function(index,id,name) {
			this.$emit('getmarket',index,id,name)
		},
		gettown: function(index,id,name) {
			this.$emit('gettown',index,id,name)
		},
		showmaps: function() {
			this.$emit('showmaps')
		},
		hidemaps: function() {
			this.$emit('hidemaps')
		},
		showBacks: function() {
			this.showBack = true
		},
		hideBacks: function() {
			this.showBack = false
		},
		goHead: function() {
			sessionStorage.clear()
			window.location.href = "./login.html"
		}
	}
});

Vue.component('headerShow',{
    template:'<header>'+
			 '<div class="h_contain">'+
			 '<div class="h_left" style="padding-left: 0;">请切换城市</div>'+
			 '<a class="h_right" href="http://gongxiang.thekingbull.com/a">'+
			 '<span style="margin-left: 30px;">服务商入口</span>'+
			 '</a>'+
			 '<a class="h_right" href="./pay_center.html?url=1">'+
			 '<img style="margin-left: 30px;" src="Resource/image/fenlei.png" alt="" />'+
			 '<span>我的订单</span>'+
			 '</a>'+
			 '<div class="h_box">'+
			 '<a class="h_right" href="./business_register.html">'+
			 '<span style="margin-left: 30px;">请注册服务商</span>'+
			 '</a>'+
			 '<a class="h_right" href="./register.html">'+
			 '<span style="margin-left: 30px;">请注册用户</span>'+
			 '</a>'+
			 '<a class="h_right" href="./login.html">'+
			 '<span style="margin-left: 30px;">请登录</span>'+
			 '</a>'+
			 '</div>'+
			 '<div class="nav_right" @mouseenter.stop="showBacks" :class="{bg:showBack}" @mouseleave.stop="hideBacks">'+
			 '<span></span>'+
			 '<img src="" />'+
			 '<div class="back" v-if="showBack" @click="goHead">'+
			 '退出登录'+
			 '</div>'+
			 '</div>'+
			 '</div>'+
			 '</header>',
	data: function() {
		return {
			showBack: false
		}
	},
	methods: {
		showBacks: function() {
			this.showBack = true
		},
		hideBacks: function() {
			this.showBack = false
		},
		goHead: function() {
			sessionStorage.clear()
			window.location.href = "./login.html"
		}
	}
});



