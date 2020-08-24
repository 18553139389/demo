Vue.component('search',{
    template:'<div class="search">'+
			 '<div class="select" @click.stop="hide">'+
			 '<span>{{selectTitle}}</span>'+
			 '<img src="Resource/image/xiala.png" alt="" />'+
			 '<ul class="select-list" v-show="show">'+
			 '<li :class="{add:selectIndex == k}" v-for="(v,k) in searchData"'+
			 '@mouseenter="change(k)"'+
			 '@click="set(k,v.title,v.type)"'+
			 '>{{v.title}}'+
			 '</li>'+
			 '</ul>'+
			 '</div>'+
			 '<input class="content" type="text" v-model="pro_id" placeholder="输入服务商关键字搜索" :value="proVal" />'+
			 '<div class="search_btn" @click="search">'+
			 '<img src="Resource/image/search.png" alt="" />'+
			 '</div>'+
			 '</div>',
	props:{
		searchData:{
			type:Array,
			default:[]
		},
		selectIndex:{
			type:Number,
			default:0
		},
		selectTitle:{
			type:String,
			default:''
		},
		proId:{
			type:String,
			default:''
		},
		show:{
			type:Boolean,
			default:false
		}
	},
	data:function(){
		return {
			pro_id:''
		}
	},
	computed:{
		getProvince:function(){
			return this.proId
		},
		proVal:function(){
			this.pro_id = this.getProvince
			return this.proId
		}
	},
	watch:{
		pro_id:function(Nval,Oval){
			this.$emit('protext',Nval)
			console.log(Nval)
			console.log(Oval)
		}
	},
	methods:{
		change:function(item){
			this.$emit('change',item)
		},
		set:function(item,text,type){
			this.$emit('set',item,text,type)
		},
		hide:function(){
			this.$emit('hide')
		},
		search:function(){
			this.$emit('search')
		}
	}
});