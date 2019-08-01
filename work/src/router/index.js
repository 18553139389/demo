import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Register from '@/components/register'
import Forget from '@/components/forget'
import Result from '@/components/result'
import First from '@/components/first'
import Message from '@/components/message'
import BusinessOne from '@/components/business_one'
import BusinessTwo from '@/components/business_two'
import BusinessThree from '@/components/business_three'
import Type from '@/components/type'
import MapPath from '@/components/map_path'
import Cargo from '@/components/cargo'
import PersonOne from '@/components/person_one'
import PersonTwo from '@/components/person_two'
import PersonThree from '@/components/person_three'
import Management from '@/components/management'
import DetailOne from '@/components/detail_one'
import DetailTwo from '@/components/detail_two'
import DetailThree from '@/components/detail_three'
import DetailFour from '@/components/detail_four'
import Center from '@/components/center'
import Set from '@/components/set'
import NewPassword from '@/components/new_password'
import Suggest from '@/components/suggest'
import Agree from '@/components/agree'
import Link from '@/components/link'
import BindPhone from '@/components/bind_phone'
import Map from '@/components/map'
import Login from '@/components/login'
import Police from '@/components/police'
import List from '@/components/list'
import PoliceLogin from '@/components/police_login'
import PoliceForget from '@/components/police_forget'
import SearchDetail from '@/components/search_detail'
import PersonPath from '@/components/person_path'
import PersonMap from '@/components/person_map'
import AgreeDetail from '@/components/agreeDetail'
import MessageDetail from '@/components/messageDetail'
import ChangeRoute from '@/components/changeRoute'
import ChangePath from '@/components/change_path'
import ChangeMap from '@/components/change_map'
import Read from '@/components/read'
import Test from '@/components/test'
import MapSection from '@/components/map_section'
import PersonSection from '@/components/person_section'
import ChangeSection from '@/components/change_section'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			redirect: '/login'
		},
		{
			path: '/index',
			component: Index
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/forget',
			component: Forget
		},
		{
			path: '/result',
			component: Result
		},
		{
			path: '/first',
			name: 'first',
			component: First
		},
		{
			path: '/message',
			component: Message
		},
		{
			path: '/business_one',
			name: 'business_one',
			component: BusinessOne,
		},
		{
			path: '/business_two',
			name: 'business_two',
			component: BusinessTwo
		},
		{
			path: '/business_three',
			component: BusinessThree
		},
		{
			path: '/type',
			component: Type
		},
		{
			path: '/map_path',
			name: 'map_path',
			component: MapPath
		},
		{
			path: '/cargo',
			component: Cargo
		},
		{
			path: '/person_one',
			name: 'person_one',
			component: PersonOne
		},
		{
			path: '/person_two',
			name: 'person_two',
			component: PersonTwo
		},
		{
			path: '/person_three',
			name: 'person_three',
			component: PersonThree
		},
		{
			path: '/management',
			component: Management
		},
		{
			path: '/detail_one',
			name: 'detail_one',
			name: 'detail_one',
			component: DetailOne
		},
		{
			path: '/detail_two',
			name: 'detail_two',
			component: DetailTwo
		},
		{
			path: '/detail_three',
			name: 'detail_three',
			component: DetailThree
		},
		{
			path: '/detail_four',
			name: 'detail_four',
			component: DetailFour
		},
		{
			path: '/center',
			component: Center
		},
		{
			path: '/set',
			component: Set
		},
		{
			path: '/new_password',
			component: NewPassword
		},
		{
			path: '/suggest',
			component: Suggest
		},
		{
			path: '/agree',
			component: Agree
		},
		{
			path: '/link',
			component: Link
		},
		{
			path: '/bind_phone',
			component: BindPhone
		},
		{
			path: '/map',
			name: 'map',
			component: Map
		},
		{
			path: '/police',
			component: Police
		},
		{
			path: '/list',
			component: List
		},
		{
			path: '/police_login',
			name: 'police_login',
			component: PoliceLogin
		},
		{
			path: '/search_detail',
			name: 'search_detail',
			component: SearchDetail
		},
		{
			path: '/police_forget',
			component: PoliceForget
		},
		{
			path: '/person_path',
			name: 'person_path',
			component: PersonPath
		},
		{
			path: '/person_map',
			name: 'person_map',
			component: PersonMap
		},
		{
			path: '/agreeDetail',
			name: 'agreeDetail',
			component: AgreeDetail
		},
		{
			path: '/messageDetail',
			name: 'messageDetail',
			component: MessageDetail
		},
		{
			path: '/changeRoute',
			name: 'changeRoute',
			component: ChangeRoute
		},
		{
			path: '/change_path',
			name: 'change_path',
			component: ChangePath
		},
		{
			path: '/change_map',
			name: 'change_map',
			component: ChangeMap
		},
		{
			path: '/read',
			name: 'read',
			component: Read
		},
		{
			path: '/test',
			name: 'test',
			component: Test
		},
		{
			path: '/map_section',
			name: 'map_section',
			component: MapSection
		},
		{
			path: '/person_section',
			name: 'person_section',
			component: PersonSection
		},
		{
			path: '/change_section',
			name: 'change_section',
			component: ChangeSection
		}
	]
})
