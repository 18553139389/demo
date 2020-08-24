Vue.component('list',{
    template:'<div class="list_contain">'+
			 '<div class="list_wrapper">'+
			 '<ul>'+
			 '<li v-for ="v in listData" @click="targeturl(v.shopId)">'+
			 '<a href="javascript:;">'+
			 '<div class="list_img">'+
			 '<img :src="v.shopIcon" />'+
			 '</div>'+
			 '<div class="list_box">'+
			 '<h5 class="list_name">{{v.shopName}}</h5>'+
			 '<div class="list_distance">{{v.distance}}</div>'+
			 '</div>'+
			 '<div class="location_box">'+
			 '<img src="Resource/image/weizhi.png" alt="" />'+
			 '<span>{{v.address}}</span>'+
			 '</div>'+
			 '</a>'+
			 '</li>'+
		     '</ul>'+
			 '</div>'+
			 '</div>',
	props:{
		listData:{
			type:Array,
			default: function () {
        		return []
    		}
		}
	},
	methods:{
		targeturl:function(id){
			this.$emit('targeturl',id)
		}
	}
});

Vue.component('NetList',{
    template:'<div class="list_contain">'+
			 '<div class="list_wrapper">'+
			 '<ul>'+
			 '<li v-for ="v in netData" @click="neturl(v.shopId)">'+
			 '<a href="javascript:;">'+
			 '<div class="list_img">'+
			 '<img :src="v.shopIcon" />'+
			 '</div>'+
			 '<div class="net_box no">'+
			 '{{v.shopName}}'+
			 '</div>'+
			 '<div class="price_box">'+
			 '￥ {{v.price}}'+
			 '</div>'+
			 '</a>'+
			 '</li>'+
		     '</ul>'+
			 '</div>'+
			 '</div>',
	props:{
		netData:{
			type:Array,
			default: function () {
        		return []
    		}
		}
	},
	methods:{
		neturl:function(id){
			this.$emit('neturl',id)
		}
	}
});

Vue.component('SourceList',{
    template:'<div class="list_contain">'+
			 '<div class="list_wrapper">'+
			 '<ul>'+
			 '<li v-for ="v in sourceData" @click="sourceurl(v.shopId)">'+
			 '<a href="javascript:;">'+
			 '<div class="list_img">'+
			 '<img :src="v.shopIcon" />'+
			 '</div>'+
			 '<div class="source_box">'+
			 '<img src="Resource/image/dianpu.png" alt="" />'+
			 '<span class="no">{{v.shopName}}</span>'+
			 '</div>'+
			 '</a>'+
			 '</li>'+
		     '</ul>'+
			 '</div>'+
			 '</div>',
	props:{
		sourceData:{
			type:Array,
			default: function () {
        		return []
    		}
		}
	},
	methods:{
		sourceurl:function(id){
			this.$emit('sourceurl',id)
		}
	}
});

Vue.component('WorkList',{
    template:'<div class="list_contain">'+
			 '<div class="list_work">'+
			 '<ul>'+
			 '<li v-for ="list in netData" @click="workurl(list.shopId)">'+
			 '<a href="javascript:;">'+
			 '<div class="list_img">'+
			 '<img :src="list.shopIcon" />'+
			 '</div>'+
			 '<div class="net_box no">'+
			 '{{list.shopName}}'+
			 '</div>'+
			 '<div class="price_box">'+
			 '￥ {{list.price}}'+
			 '</div>'+
			 '</a>'+
			 '</li>'+
		     '</ul>'+
			 '</div>'+
			 '</div>',
	props:{
		netData:{
			type:Array,
			default: function () {
        		return []
    		}
		}
	},
	methods:{
		workurl:function(id){
			this.$emit('workurl',id)
		}
	}
});



