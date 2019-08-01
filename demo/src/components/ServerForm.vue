<template>
	<div class="yh-SeverForm">
		<form class="yh-form">
			<span class="title">{{detail}}</span><br />
			<div class="box">
				<div width="150px" style="text-align: center;">
					<label>
						Server Address:
					</label>
				</div>
				<div style="margin-top: 0.8rem;">
					<div class="selected" @click="popup" style="text-align: center;">{{selectItem}}</div>
				</div>
			</div>
			<div style="margin-top: 0.8rem;">
				<button style="height: 30px;width: 100%;line-height: 30px;text-align: center;" @click="confirmServer">Confirm</button>
			</div>
		</form>
		<mp-picker ref="mpPicker" :pickerValueArray="listItem" @onConfirm="sure"></mp-picker>
	</div>
</template>

<script>
	import _ from 'underscore'
	import mpPicker from 'mpvue-weui/src/picker'
	
	export default {
		props: {
			uat: Boolean
		},
		mounted() {
			this.endpointServerAddress = this.$store.getters['server/getEndpoint']
			console.log(this.serverList,'服务器')
			console.log(this.listItem,'服务器')
		},
		computed: {
			serverAddress() {
				this.endpointServerAddress = this.$store.getters['server/getEndpoint']
				return this.endpointServerAddress
			},
			serverList() {
				let self = this
				let data = _.map(this.$store.getters['env/getEnvList'], (val, key) => {
					return {
						...val,
						name: key
					}
				})
				return _.filter(data, (item, key) => {
					return self.uat || item.name !== 'uat'
				})
			},
			listItem() {
				let arr = []
				for(let i=0;i<this.serverList.length;i++){
					arr.push({
						label:this.serverList[i].name
					})
				}
				return arr
			}
		},
		data() {
			return {
				titleName: 'General Setting',
				endpointServerAddress: '',
				address: '',
				detail: '',
				selectItem: '请选择'
			}
		},
		components: {
			 mpPicker
		},
		methods: {
			checkSelect(optionValue) {
				console.log('optionValue', optionValue)
				return (optionValue === this.endpointServerAddress)
			},
			updateEnvServerAddress(serverAddress) {
				let self = this
				this.$store.dispatch('server/SET_ENDPOINT', serverAddress).then(() => {
					self.$emit('update')
				})
			},
			confirmServer(e) {
				e.preventDefault()
				if (this.endpointServerAddress !== '') {
					console.log('this.endpointServerAddress', this.endpointServerAddress)
					this.$store.commit('env/COMMIT_SET_ENV', this.address.name)
					this.updateEnvServerAddress(this.address.serverUrl)
				}
			},
			sure(item) {
				this.selectItem = item.label
				for(let i=0;i<this.serverList.length;i++){
					if(this.serverList[i].name == item.label){
						this.address = this.serverList[i]
					}
				}
				this.detail = JSON.stringify(this.address)
				console.log(this.address,'铲砍树锯')
			},
			popup() {
				console.log('1234')
				this.$refs.mpPicker.show();
			}
		}
	}
</script>

<style>
	.yh-form {
		font-size: 15px;
		color: #333;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: space-around;
		width: 100%;
		height: 100%;
	}
	
	.title {
		display: inline-block;
		width: 50%;
	}
	
	.selected {
		font-size: 15px;
		color: #333;
	}
</style>
