Vue.component('navTop',{
    template:'<div class="nav">'+
			 '<div class="nav_contain">'+
			 '<ul class="nav-item">'+
			 '<li v-for="(v,k) in setData" @mouseenter="choice(k)">'+
			 '<a :class="{active:itemIndex == k}" :href="v.url">{{v.title}}</a>'+
			 '</li>'+
			 '</ul>'+
			 '</div>'+
			 '</div>',
	props:{
		setData:{
			type:Array,
			default:[]
		},
		itemIndex:{
			type:Number,
			default:0
		}
	},
	methods:{
		choice:function(item){
			this.$emit('choice',item)
		}
	}
});

Vue.component('navSearch',{
    template:'<div class="nav" style="margin-top:84px;">'+
			 '<div class="nav_contain">'+
			 '<ul class="nav-item">'+
			 '<li v-for="(v,k) in setData" @mouseenter="choice(k)">'+
			 '<a :class="{active:itemIndex == k}" :href="v.url">{{v.title}}</a>'+
			 '</li>'+
			 '</ul>'+
			 '</div>'+
			 '</div>',
	props:{
		setData:{
			type:Array,
			default:[]
		},
		itemIndex:{
			type:Number,
			default:0
		}
	},
	methods:{
		choice:function(item){
			this.$emit('choice',item)
		}
	}
});