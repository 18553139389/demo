<template>
	<view class="contain">
		<!-- <view class="fixed">
			<cu-custom :isBack="true" :Color="Color" :backColor="backColor" :isIcon="true" bgColor="bg-shadeTop text-white">
				<block slot="backText"></block>
				<block slot="content">专家</block>
			</cu-custom>
		</view> -->
		<scroll-view scroll-y="true" :style="{height: topHeight}">
			<div
				class="chat"
				id="chat"
				@longpress="handleLongPress"
				@touchmove="handleTouchMove"
				@touchend="handleTouchEnd"
				:style="{ paddingBottom: isIphoneX ? safeBottom + 70 + 'px' : '70px',paddingTop: inputHeight}"
			>
				<div :class="isRecording ? '' : 'modal-display'" class="record-modal">
					<div class="wrapper"><div class="modal-loading"></div></div>
					<div class="modal-title">{{ title }}</div>
				</div>
				<div id="list" @click="loseFocus">
					<li v-for="(message, index) in currentMessageList" :key="index">
						<!--系统消息-->
						<div class="notice" v-if="message.type === 'TIMGroupTipElem' || message.type === 'TIMGroupSystemNoticeElem'">
							<div class="content">
								<span v-for="(div, index1) in message.virtualDom" :key="message.ID + index1">
									<span v-if="div.name === 'groupTip' || 'system'">{{ div.text }}</span>
								</span>
							</div>
						</div>
						<!--撤回的消息-->
						<div v-else-if="message.isRevoked" :key="message.ID">
							<div class="notice">
								<div class="content">
									<template v-if="message.from === myInfo.userID">
										你撤回了一条消息
									</template>
									<template v-else>
										{{ message.from }}撤回了一条消息
									</template>
								</div>
								<template v-if="message.from === myInfo.userID">
									<div v-if="currentTime - message.time < 120 && message.type === 'TIMTextElem'" @click="reEdit(message)" class="re-edit">重新编辑</div>
								</template>
							</div>
						</div>
						<!--非系统消息-->
						<div v-else :class="message.flow === 'out' ? 'item-right' : 'item-left'">
							<div class="content">
								<div class="name">
									<template v-if="currentConversation.type === 'C2C'">
										<template v-if="message.flow === 'in'">
											{{ currentConversation.userProfile.nick || currentConversation.userProfile.userID }}
										</template>
										<template v-else>
											{{ myInfo.nick || myInfo.userID }}
										</template>
									</template>
									<template v-else>
										{{ message.nameCard || message.nick || message.from }}
									</template>
								</div>
								<div class="wrapper" @longpress="handleMessage(message)">
									<div class="load" @click="handleResend(message)" v-if="message.from === myInfo.userID"><div :class="message.status"></div></div>
									<div class="message" v-if="message.type === 'TIMTextElem'">
										<div class="text-message">
											<span v-for="(div, index2) in message.virtualDom" :key="message.ID + index2">
												<span v-if="div.name === 'span'">{{ div.text }}</span>
												<image v-if="div.name === 'img'" :src="div.src" style="width:20px;height:20px;" />
											</span>
										</div>
										<div  class="arrow"></div>
									</div>
									<image
										class="image-message"
										v-else-if="message.type === 'TIMImageElem'"
										:src="message.payload.imageInfoArray[1].url"
										mode="widthFix"
										@click="previewImage(message.payload.imageInfoArray[1].url)"
									/>
									<div class="message" v-else-if="message.type === 'TIMFileElem'">
										<div class="file" @click="handleDownload(message.payload)">
											<image src="../../../static/images/file.png"></image>
											<div>{{ message.payload.fileName }}</div>
										</div>
									</div>
									<div class="message" v-else-if="message.type === 'TIMCustomElem'">
										<div v-if="message.payload.data === 'survey'" class="survey">
											<div class="title">对IM DEMO的评分和建议</div>
											<div class="description">
											</div>
											<div class="suggestion">
												<div>{{ message.payload.extension }}</div>
											</div>
										</div>
										<div v-else-if="message.payload.data === 'group_create'">
											<div>{{ message.payload.extension }}</div>
										</div>
										<div v-else-if="message.virtualDom[0].name === 'videoCall'" class="custom-elem">
											<div>{{ message.virtualDom[0].text }}</div>
										</div>
										<div v-else class="custom-elem">自定义消息</div>
									</div>
									<div class="message" v-else-if="message.type === 'TIMSoundElem'" :url="message.payload.url">
										<div class="box" @click="openAudio(message.payload)">
											<image src="/static/images/audio-play.png" style="height:22px;width:22px" />
											<div style="padding-left: 4px;">{{ message.payload.second }}s</div>
										</div>
										<div  class="arrow"></div>
									</div>
									<div class="message" v-else-if="message.type === 'TIMFaceElem'">
										不支持的消息类型
										<div  class="arrow"></div>
									</div>
									<div class="message" v-else-if="message.type === 'TIMVideoFileElem'">
										<video :src="message.payload.videoUrl" class="video" :poster="message.payload.thumbUrl" object-fit="contain" @error="videoError"></video>
										<div  class="arrow"></div>
									</div>
								</div>
							</div>
							<div>
								<!-- 自己发的消息头像 -->
								<image class="avatar" v-if="message.flow === 'out'" :src="myInfo.avatar?myInfo.avatar:'../../static/images/avatar.png'" />
								<!-- 收到的消息头像 -->
								<image class="avatar" shape="square" v-else-if="currentConversation.type === 'C2C'" @click="toDetail" :src="currentConversation.userProfile.avatar?currentConversation.userProfile.avatar:'../../static/images/avatar.png'"></image>
								<image class="avatar" shape="square" v-else @click="toDetail({ userID: message.from })" :src="message.avatar?message.avatar:'../../static/images/avatar.png'"></image>
							</div>
						</div>
					</li>
				</div>
				<!--    输入框及选择框部分-->
				<div class="bottom" :style="{ paddingBottom: isIphoneX ? safeBottom + 'px' : '' }">
					<div class="bottom-div" :style="{ marginBottom: isFocus ? '10px' : 0 }">
						<div class="btn-left" @click="chooseRecord"><image :src="!isRecord ? '../../static/images/audio.png' : '../../static/images/record.png'" style="width: 28px;height: 28px;" /></div>
						<div v-if="!isRecord" style="width: 100%">
							<input
								type="text"
								class="input"
								v-model.lazy:value="messageContent"
								confirm-type="send"
								adjust-position="false"
								:focus="isFocus"
								@focus="inputFocus"
								@blur="isFocus = false"
								@confirm="sendMessage"
							/>
						</div>
						<div class="record" id="record" v-if="isRecord">
							<template v-if="!isRecording">
								按住 说话
							</template>
							<template v-if="isRecording">
								抬起 停止
							</template>
						</div>
					
						<div class="btn" @click="handleEmoji()"><img src="../../static/images/smile.png" style="width: 28px;height: 28px;"></div>
						<view class="send bg-blue" @click="sendMessage" v-if="messageContent.length !== 0">发送</view>
						<div class="btn" @click="handleMore()" v-else><img src="../../static/images/more.png" style="width: 28px;height: 28px;"></div>
					</div>
					<!--    emoji部分-->
					<div class="bottom-emoji" v-if="isEmojiOpen">
						<div class="emoji-tab">
							<div class="tabs">
								<div class="single" @click="handleEmojiShow" :class="emojiShow ? 'choosed' : ''">
									<image src="/static/images/smile.png" style="width:100%;height:100%"></image>
								</div>
							</div>
						</div>
						<div class="emojis" v-if="emojiShow">
							<div v-for="(emojiItem, index3) in emojiName" class="emoji" :key="emojiItem" @click="chooseEmoji(emojiItem)">
								<image :src="emojiUrl + emojiMap[emojiItem]" style="width:100%;height:100%" />
							</div>
						</div>
						<div class="emojis" v-if="bigEmojiShow">
							<div v-for="(bigItem, index4) in bigEmoji" class="bigemoji" :key="bigItem" @click="chooseBigEmoji(bigItem)">
								<image :src="faceUrl + bigItem + '@2x.png'" style="width:100%;height:100%" />
							</div>
						</div>
					</div>
					<!--    更多部分-->
					<div class="bottom-image" v-if="isMoreOpen">
						<div class="images">
							<div class="block" @click="sendPhoto('camera')">
								<div class="image"><image src="/static/images/take-pic.png" class="icon" /></div>
								<div class="name">拍摄</div>
							</div>
							<div class="block" @click="sendPhoto('album')">
								<div class="image"><image src="/static/images/picture.png" class="icon" /></div>
								<div class="name">图片</div>
							</div>
							<div class="block" @click="video">
								<div class="image"><image src="/static/images/video-file.png" class="icon" /></div>
								<div class="name">视频</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</scroll-view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import { mapState, mapGetters } from 'vuex';
	import { emojiName, emojiMap, emojiUrl } from '../../utils/emojiMap';
	import { throttle } from '../../utils/index';
	const audioContext = wx.createInnerAudioContext();
	const recorderManager = wx.getRecorderManager();
	const recordOptions = {
		duration: 60000,
		sampleRate: 44100,
		numberOfChannels: 1,
		encodeBitRate: 192000,
		format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
	};
	export default {
		data() {
			return {
				Color: '#333',
				backColor: '#ffffff',
				messageContent: '',
				conversation: {},
				messageKey: '',
				lastMsgTime: '',
				count: 15,
				isEmojiOpen: false,
				isMoreOpen: false,
				isFocus: false,
				isGroup: false,
				messageList: [],
				emojiName: emojiName,
				emojiMap: emojiMap,
				emojiUrl: emojiUrl,
				height: 0,
				modalVisible: false,
				downloadInfo: {},
				percent: 0,
				// sysInfo: {},
				customModalVisible: false,
				customData: '',
				customDescription: '',
				customExtension: '',
				focusedInput: '',
				safeBottom: 34,
				isRecord: false,
				isRecording: false,
				canSend: true,
				startPoint: 0,
				title: '正在录音',
				rateModal: false,
				rate: 5,
				isShow: false,
				faceUrl: 'https://webim-1252463788.file.myqcloud.com/assets/face-elem/',
				emojiShow: true,
				bigEmojiShow: false,
				bigEmoji: ['tt01', 'tt02', 'tt03', 'tt04', 'tt05', 'tt06', 'tt07', 'tt08', 'tt09', 'tt10', 'tt11', 'tt12', 'tt13', 'tt14', 'tt15', 'tt16'],
				revokeModal: false,
				revokeMessage: {},
				currentTime: 0,
				currentTimeID: '',
				topHeight: 0,
				inputHeight: 0
			};
		},
		onShow() {
			this.isShow = true;
			const that = this;
			this.currentTimeID = setInterval(function() {
				that.currentTime = new Date().getTime() / 1000;
			}, 3000);
		},
		onLoad(options) {
			console.log(Vue.prototype.CustomBar)
			this.topHeight = uni.getSystemInfoSync().windowHeight - Vue.prototype.CustomBar
			this.set = options.toAccount;
			// 设置header——聊天对象昵称或群名
			wx.setNavigationBarTitle({
				title: this.set
			});
			this.height = this.sysInfo.windowHeight;
			let query = wx.createSelectorQuery();
			let that = this;
			wx.$app.on(this.TIM.EVENT.MESSAGE_RECEIVED, () => {
				query
					.select('#chat')
					.boundingClientRect(function(res) {
						if (res.bottom - that.height < 150) {
							that.scrollToBottom();
						}
					})
					.exec();
			});
			let interval = setInterval(() => {
				if (this.currentMessageList.length !== 0) {
					this.scrollToBottom();
					clearInterval(interval);
				}
			}, 600);
			this.$bus.$off('atUser');
			this.$bus.$on('atUser', user => {
				this.messageContent += user.userID;
				this.messageContent += ' ';
			});
			recorderManager.onStart(() => {
				console.log('recorder start');
			});
			recorderManager.onPause(() => {
				console.log('recorder pause');
			});
			recorderManager.onStop(res => {
				console.log('recorder stop');
				wx.hideLoading();
				if (this.canSend) {
					if (res.duration < 1000) {
						this.$store.commit('showToast', {
							title: '录音时间太短'
						});
					} else {
						const message = wx.$app.createAudioMessage({
							to: this.$store.getters.toAccount,
							conversationType: this.$store.getters.currentConversationType,
							payload: {
								file: res
							}
						});
						this.$store.commit('sendMessage', message);
						wx.$app.sendMessage(message);
					}
				}
			});
		},
		onReady() {
			let that = this
			setTimeout(()=>{
				that.getMessageList()
			})
		},
		// 退出聊天页面的时候所有状态清空
		onUnload() {
			clearInterval(this.currentTimeID);
			wx.$app.setMessageRead({ conversationID: this.$store.state.conversation.currentConversationID });
			this.isEmojiOpen = false;
			this.rateModal = false;
			this.isMoreOpen = false;
			this.messageContent = '';
			this.isShow = false;
			// eslint-disable-next-line
			const pages = getCurrentPages();
			// 若是由群组会话跳转到C2C会话，则在C2C会话 unload （返回上一层页面） 时，跳转到index页
			// 原因：若直接从C2C会话返回群组会话，由于此时currentConversation和currentMessageList已变更，会导致数据不一致的问题，简单起见，直接跳回index
			// const hasGroupChat = pages.find(item => item.options.type === this.TIM.TYPES.CONV_GROUP);
			// if (hasGroupChat) {
			// 	wx.switchTab({
			// 		url: '../index/main'
			// 	});
			// }
		},
		onPullDownRefresh(){
			console.log('onPullDownRefresh')
			throttle(this.getMessageList, 1000)()
		},
		// onPullDownRefresh() {
		// 	 console.log('onPullDownRefresh')
		// 	throttle(this.getMessageList, 1000)();
		// },
		computed: {
			...mapState({
				currentMessageList: state => {
					return state.conversation.currentMessageList;
				},
				currentConversation: state => state.conversation.currentConversation,
				myInfo: state => state.user.myInfo,
				sysInfo: state => state.global.systemInfo
			}),
			...mapGetters(['isIphoneX'])
		},
		methods: {
			inputFocus(e) {
				this.isFocus = true
				this.inputHeight = this.topHeight
			},
			onChange(e) {
				this.rate = e.mp.detail.index;
			},
			// 长按录音，监听在页面最外层div，如果是放在button的话，手指上划离开button后获取距离变化有bug
			handleLongPress(e) {
				this.startPoint = e.touches[0];
				if (e.target.id === 'record') {
					this.title = '正在录音';
					this.isRecording = true;
					this.startRecording();
					this.canSend = true;
				}
			},
			chooseRecord() {
				this.isRecord = !this.isRecord;
			},
			// 录音时的手势上划移动距离对应文案变化
			handleTouchMove(e) {
				if (this.isRecording) {
					if (this.startPoint.clientY - e.touches[e.touches.length - 1].clientY > 100) {
						this.title = '松开手指，取消发送';
						this.canSend = false;
					} else if (this.startPoint.clientY - e.touches[e.touches.length - 1].clientY > 20) {
						this.title = '上划可取消';
						this.canSend = true;
					} else {
						this.title = '正在录音';
						this.canSend = true;
					}
				}
			},
			// 手指离开页面滑动
			handleTouchEnd() {
				this.isRecording = false;
				wx.hideLoading();
				recorderManager.stop();
			},
			// 开始录音之前要判断一下是否开启权限
			startRecording() {
				wx.getSetting({
					success: res => {
						let auth = res.authSetting['scope.record'];
						if (auth === false) {
							// 已申请过授权，但是用户拒绝
							wx.openSetting({
								success: function(res) {
									let auth = res.authSetting['scope.record'];
									if (auth === true) {
										wx.showToast({
											title: '授权成功',
											icon: 'success',
											duration: 1500
										});
									} else {
										wx.showToast({
											title: '授权失败',
											icon: 'none',
											duration: 1500
										});
									}
								}
							});
						} else if (auth === true) {
							// 用户已经同意授权
							this.isRecording = true;
							recorderManager.start(recordOptions);
						} else {
							// 第一次进来，未发起授权
							wx.authorize({
								scope: 'scope.record',
								success: () => {
									wx.showToast({
										title: '授权成功',
										icon: 'success',
										duration: 1500
									});
								}
							});
						}
					},
					fail: function() {
						wx.showToast({
							title: '授权失败',
							icon: 'none',
							duration: 1500
						});
					}
				});
			},
			// 滚动到列表bottom
			scrollToBottom() {
				if (this.isShow) {
					wx.pageScrollTo({
						scrollTop: 99999
					});
				}
			},
			customModal() {
				this.customModalVisible = !this.customModalVisible;
				this.handleClose();
			},
			sendCustomMessage() {
				if (this.customData.length === 0 && this.customDescription.length === 0 && this.customExtension.length === 0) {
					this.$store.commit('showToast', {
						title: '不能为空'
					});
					return;
				}
				const message = wx.$app.createCustomMessage({
					to: this.$store.getters.toAccount,
					conversationType: this.$store.getters.currentConversationType,
					payload: {
						data: this.customData,
						description: this.customDescription,
						extension: this.customExtension
					}
				});
				this.$store.commit('sendMessage', message);
				wx.$app.sendMessage(message);
				this.customModal();
				this.customData = '';
				this.customDescription = '';
				this.customExtension = '';
			},
			// 失去焦点
			loseFocus() {
				this.handleClose();
			},
			// 下载文件模态框
			handleModalShow() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '确定要撤回本消息吗？',
					success: function (res) {
						if (res.confirm) {
							that.download()
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				// this.modalVisible = !this.modalVisible;
			},
			// 下载文件前判断小程序是否支持预览，只支持 office 相关文件预览
			handleDownload(message) {
				const fileType = message.fileUrl.slice(message.fileUrl.lastIndexOf('.')).toLowerCase();
				const allow = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'];
				if (allow.indexOf(fileType) > -1) {
					this.percent = 0;
					this.downloadInfo = message;
					this.handleModalShow();
				} else {
					this.$store.commit('showToast', {
						title: '小程序不支持该文件预览哦',
						icon: 'none',
						duration: 2000
					});
				}
			},
			download() {
				let that = this;
				let downloadTask = wx.downloadFile({
					url: that.downloadInfo.fileUrl,
					success: function(res) {
						console.log('start downloading: ');
					},
					fail: function({ errMsg }) {
						that.$store.commit('showToast', {
							title: '文件下载出错',
							icon: 'none',
							duration: 1500
						});
						that.handleModalShow();
					},
					complete: function(res) {
						downloadTask = null;
						wx.openDocument({
							filePath: res.tempFilePath,
							success: function(res) {
								console.log('open file fail', res);
								that.$store.commit('showToast', {
									title: '打开文档成功',
									icon: 'none',
									duration: 1000
								});
								that.percent = 0;
								that.handleModalShow();
							},
							fail: function(err) {
								console.log('open file fail', err);
								that.$store.commit('showToast', {
									title: '小程序不支持该文件预览哦',
									icon: 'none',
									duration: 2000
								});
								that.handleModalShow();
							}
						});
					}
				});
				downloadTask.onProgressUpdate(res => {
					that.percent = res.progress;
				});
			},
			// 群简介或者人简介
			toDetail({ userID }) {
				if (userID) {
					wx.navigateTo({ url: `../user-profile/main?userID=${userID}` });
					return;
				}
				const conversationID = this.currentConversation.conversationID;
				this.isGroup = this.currentConversation.type === this.TIM.TYPES.CONV_GROUP;
				if (this.isGroup) {
					wx.navigateTo({ url: '../group-profile/main' });
				} else {
					let userID = conversationID.substring(3);
					wx.navigateTo({ url: `../user-profile/main?userID=${userID}` });
				}
			},
			// 获取消息
			getMessageList() {
				// 获取历史
				console.log('获取历史')
				this.$store.dispatch('getMessageList');
				wx.stopPullDownRefresh();
			},
			// 处理emoji选项卡
			handleEmoji() {
				if (this.isFocus) {
					this.isFocus = false;
					this.isMoreOpen = false;
					this.isEmojiOpen = true;
				} else {
					this.isEmojiOpen = !this.isEmojiOpen;
					this.isMoreOpen = false;
				}
			},
			// 处理更多选项卡
			handleMore() {
				if (this.isFocus) {
					this.isFocus = false;
					this.isEmojiOpen = false;
					this.isMoreOpen = true;
				} else {
					this.isMoreOpen = !this.isMoreOpen;
					this.isEmojiOpen = false;
				}
			},
			// 选项卡关闭
			handleClose() {
				this.rateModal = false;
				this.isFocus = false;
				this.isMoreOpen = false;
				this.isEmojiOpen = false;
			},
			isnull(content) {
				if (content === '') {
					return true;
				}
				const reg = '^[ ]+$';
				const re = new RegExp(reg);
				return re.test(content);
			},
			// 发送text message 包含 emoji
			sendMessage() {
				if (!this.isnull(this.messageContent)) {
					const message = wx.$app.createTextMessage({
						to: this.$store.getters.toAccount,
						conversationType: this.$store.getters.currentConversationType,
						payload: { text: this.messageContent }
					});
					let index = this.$store.state.conversation.currentMessageList.length;
					this.$store.commit('sendMessage', message);
					wx.$app.sendMessage(message).catch(() => {
						this.$store.commit('changeMessageStatus', index);
					});
					this.messageContent = '';
				} else {
					this.$store.commit('showToast', { title: '消息不能为空' });
				}
				this.isFocus = false;
				this.isEmojiOpen = false;
				this.isMoreOpen = false;
			},
			sendPhoto(name) {
				let self = this;
				if (name === 'album') {
					this.chooseImage(name);
				} else if (name === 'camera') {
					wx.getSetting({
						success: function(res) {
							if (!res.authSetting['scope.camera']) {
								// 无权限，跳转设置权限页面
								wx.authorize({
									scope: 'scope.camera',
									success: function() {
										self.chooseImage(name);
									}
								});
							} else {
								self.chooseImage(name);
							}
						}
					});
				}
			},
			videoError(e) {
				console.log(e);
				this.$store.commit('showToast', {
					title: `视频出现错误，错误信息${e.mp.detail.errMsg}`,
					duration: 1500
				});
			},
			chooseImage(name) {
				let self = this;
				let message = {};
				wx.chooseImage({
					sourceType: [name],
					count: 1,
					success: function(res) {
						message = wx.$app.createImageMessage({
							to: self.$store.getters.toAccount,
							conversationType: self.$store.getters.currentConversationType,
							payload: {
								file: res
							},
							onProgress: percent => {
								self.percent = percent;
							}
						});
						self.$store.commit('sendMessage', message);
						wx.$app
							.sendMessage(message)
							.then(() => {
								self.percent = 0;
							})
							.catch(err => {
								console.log(err);
							});
					}
				});
				this.handleClose();
			},
			previewImage(src) {
				wx.previewImage({
					current: src, // 当前显示图片的http链接
					urls: [src]
				});
			},
			// 发消息选中emoji
			chooseEmoji(item) {
				this.messageContent += item;
			},
			// 重发消息
			handleResend(message) {
				if (message.status === 'fail') {
					wx.$app.resendMessage(message);
				}
			},
			sendSurvey() {
				if (this.customExtension) {
					const message = wx.$app.createCustomMessage({
						to: this.$store.getters.toAccount,
						conversationType: this.$store.getters.currentConversationType,
						payload: {
							data: 'survey',
							description: String(this.rate),
							extension: this.customExtension
						}
					});
					this.rate = 0;
					this.customExtension = '';
					this.$store.commit('sendMessage', message);
					wx.$app.sendMessage(message);
					this.handleClose();
				} else {
					this.$store.commit('showToast', {
						title: '建议不要为空哦！'
					});
				}
			},
			// 播放音频
			openAudio(audio) {
				let that = this;
				audioContext.src = audio.url;
				audioContext.play();
				audioContext.onPlay(() => {});
				audioContext.onEnded(() => {
					wx.hideToast();
				});
				audioContext.onError(() => {
					that.$store.commit('showToast', {
						title: '小程序暂不支持播放该音频格式',
						icon: 'none',
						duration: 2000
					});
				});
			},
			// 发送视频消息
			video() {
				let that = this;
				wx.chooseVideo({
					sourceType: ['album', 'camera'],
					maxDuration: 60,
					camera: 'back',
					success(res) {
						let message = wx.$app.createVideoMessage({
							to: that.$store.getters.toAccount,
							conversationType: that.$store.getters.currentConversationType,
							payload: {
								file: res
							}
						});
						that.$store.commit('sendMessage', message);
						wx.$app.sendMessage(message);
						that.handleClose();
					}
				});
			},
			getRandomInt(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			},
			videoCall() {
				const options = {
					call_id: '',
					version: 3,
					room_id: this.getRandomInt(0, 42949),
					action: 0,
					duration: 0,
					invited_list: []
				};
				let args = JSON.stringify(options);
				const message = wx.$app.createCustomMessage({
					to: this.$store.getters.toAccount,
					conversationType: this.$store.getters.currentConversationType,
					payload: {
						data: args,
						description: '',
						extension: ''
					}
				});
				this.$store.commit('sendMessage', message);
				wx.$app.sendMessage(message);
				let url = `../call/main?args=${args}&&from=${message.from}&&to=${message.to}`;
				wx.navigateTo({ url });
				this.handleClose();
			},
			handleEmojiShow() {
				this.emojiShow = true;
				this.bigEmojiShow = false;
			},
			handleBigEmojiShow() {
				this.emojiShow = false;
				this.bigEmojiShow = true;
			},
			chooseBigEmoji(item) {
				let message = wx.$app.createFaceMessage({
					to: this.$store.getters.toAccount,
					conversationType: this.$store.getters.currentConversationType,
					payload: {
						index: 1,
						data: item
					}
				});
				this.$store.commit('sendMessage', message);
				wx.$app.sendMessage(message);
				this.handleClose();
			},
			// 长按消息触发是否撤回
			handleMessage(message) {
				if (message.from === this.myInfo.userID) {
					const revokeTimeout = 2 * 60 * 1000;
					const now = new Date().getTime();
					if (now - message.time * 1000 < revokeTimeout) {
						// this.revokeModal = true;
						let that = this
						uni.showModal({
							title: '提示',
							content: '确定要撤回本消息吗？',
							success: function (res) {
								if (res.confirm) {
									that.handleRevokeMessage()
									console.log('用户点击确定');
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
						this.revokeMessage = message;
					}
				}
			},
			// 撤回消息
			handleRevokeMessage() {
				wx.$app.revokeMessage(this.revokeMessage).then(res => {
					console.log(res);
					this.revokeModal = false;
					this.$store.commit('showToast', {
						title: '撤回成功',
						duration: 500
					});
				});
			},
			// 撤回后时间限制内，重新编辑
			reEdit(message) {
				this.messageContent = message.payload.text;
			}
		},
		destory() {}
	};
</script>

<style lang="stylus">
	page 
		background-color : #f5f5f5
.custom-wrapper
	width 100%
	display flex
	flex-direction column
	justify-content center
	padding 0 12px
	box-sizing border-box
	.custom-input
		color $base
		background-color white
		border-radius 8px
		height 30px
		margin 5px 0
		box-sizing border-box
		border-bottom 1px solid $light-background
.loadMore
	font-size 14px
	color #8a8a8a
	box-sizing border-box
	width 100%
	padding 15px
	display flex
	justify-content center
.unload
	font-size 0
	color #fff
	box-sizing border-box
	width 100%
	text-align center
.emoji-open
	height calc(100vh - 262px)
.emoji-close
	height calc(100vh - 82px)
.chat
	background-color #f5f5f5
	box-sizing border-box
	overflow  auto
.file
	display flex
	text-align left
	width fit-content
	word-break break-all
	font-size 14px
	background-color white
	padding 10px 8px
.bottom
	background-color #f0f0f0
	position fixed
	bottom 0
	left 0
	width 100%
.bottom-div
	width 100%
	display flex
	align-items center
	border-top 1px solid $border
	padding 10px
	flex-direction row
	box-sizing border-box
	transition all 0.3s
	.send
		font-size 14px
		background-color $primary
		color white
		border-radius 4px
		width 56px
		height fit-content
		padding 4px
		margin-left 10rpx
		text-align center
.bottom-emoji
	position relative
	.emojis
		height 150px
		display flex
		flex-direction row
		flex-wrap wrap
		overflow-y scroll
		box-sizing border-box
		.emoji
			height 12.5vw
			width 12.5vw
			padding 8px
			box-sizing border-box
		.bigemoji
			height 20vw
			width 20vw
			padding 10px
			box-sizing border-box
.emoji-tab
	box-sizing border-box
	border-bottom 1px solid $border-base
	.tabs
		display flex
		height 29px
		flex-direction row
		padding-left 10px
		box-sizing border-box
		.single
			display flex
			margin-top 2px
			width 26px
			height 26px
			padding 2px
			border-radius 6px
			box-sizing border-box
			margin-right 8px
		.choosed
			background-color rgba(255, 255, 255, 0.7)
.bottom-image
	box-sizing border-box
	.images
		box-sizing border-box
		display flex
		padding 0 12px
		margin-top 16px
		&:last-child
			margin-bottom 16px
		.block
			box-sizing border-box
			display flex
			flex-direction column
			justify-content center
			align-items center
			margin 0 12px
			.name
				margin-top 6px
				font-size 12px
				color $secondary
				text-align center
			.image
				width 64px
				height 64px
				display flex
				justify-content center
				align-items center
				box-sizing border-box
				border-radius 8px
				background-color white
				padding 3vw
				.icon
					width 26px
					height 26px
.input
	background-color white
	border-radius 6px
	height 34px
	box-sizing border-box
	padding 0 8px
.btn-left
	display flex
	padding 0
	margin 0
	margin-right 10px
.btn
	display flex
	padding 0
	margin 0
	margin-left 10px
.button
	color white
	background-color $primary
	border-radius 8px
	height 26px
	padding 0 6px
	line-height 26px
	font-size 16px
// 添加用户当弹窗
.input-wrapper
	width 100%
	display flex
	justify-content center
li
	margin-top 18px
	padding 0 12px
.fail::before
	padding 2px 8px
	background-color $danger
	color white
	content '!'
	font-size 12px
	border-radius 50%
	cursor pointer
@keyframes load
	from
		transform rotate(0deg)
	to
		transform rotate(360deg)
.notice
	display flex
	justify-content center
	margin-bottom 10px
	.content
		background-color $background
		border-radius 8px
		font-size 14px
		color $regular
		padding 6px 8px
.message
	font-size 16px
	line-height 22px
	text-align left
	width fit-content
	word-break break-all
	background-color #95ec69
	// background-color $dark-background
	padding 8px
.text-message
	display flex
	flex-direction row
	flex-wrap wrap
	white-space pre-wrap
.image-message
	max-width 180px
	border-radius 2px
.fail
	background-color transparent
.unSend
	width 12px
	height 12px
	border 4px solid $light-primary
	border-bottom $border-base 4px solid
	border-radius 50%
	-webkit-animation load 1.1s infinite linear
.item-right
	display flex
	flex-direction row
	justify-content flex-end
	height 100%
	.load
		height 100%
		width 30px
		display flex
		flex-direction column
		justify-content center
	.content
		margin-right 12px
		display flex
		flex-direction column
		align-items flex-end
		position relative
		.arrow
			position absolute
			right -12px
			top 30px
			border 6px solid transparent
			border-left 6px solid #95ec69
		.name
			width 100%
			font-size 12px
			line-height 1
			margin-bottom 6px
			color $secondary
			text-align right
		.wrapper
			display flex
			flex-direction row
			height 100%
			.message
				background-color $primary-10
				border 1px solid $primary-30
				border-radius 4px
.survey
	padding 20px
	background-color white
	.title
		font-size 16px
		font-weight 600
	.rate
		display flex
		flex-direction flex-start
		align-content center
		.star
			width 30px
			height 30px
		.rating
			font-weight 600
			color $regular
			line-height 30px
			padding-left 10px
	.suggestion
		padding-top 10px
		font-size 14px
		color $black
		font-weight 500
	.description
		font-size 18px
		color $black
.video
	max-height 200px
	max-width 50vw
.item-left
	display flex
	flex-direction row-reverse
	justify-content flex-end
	.content
		margin-left 10px
		position relative
		.name
			width 100%
			font-size 12px
			line-height 1
			color $secondary
			margin-bottom 6px
		.message
			background-color #ffffff
			border 1px solid $light-background
			border-radius 4px
		.arrow
			// background-color #f8f8f8
			position absolute
			left -12px
			top 30px
			border 6px solid transparent
			border-right 6px solid #ffffff
			
// 音频解析
.box
	display flex
	height 20px
	line-height 20px
.record
	width 100%
	background-color white
	color $regular
	border-radius 6px
	box-sizing border-box
	height 34px
	line-height 34px
	display flex
	justify-content center
.record-modal
	height 150px
	width 60vw
	background-color black
	opacity 0.8
	position fixed
	top 200px
	z-index 9999
	left 20vw
	border-radius 12px
	display flex
	flex-direction column
	.wrapper
		display flex
		height 100px
		box-sizing border-box
		padding 10vw
		.modal-loading
			opacity 1
			width 20px
			height 8px
			border-radius 2px
			background-color $primary
			animation loading 2s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite
	.modal-title
		text-align center
		color white
@keyframes loading
	0%
		transform translate(0, 0)
	50%
		transform translate(30vw, 0)
		background-color #f5634a
		width 40px
	100%
		transform translate(0, 0)
.modal-display
	display none
.avatar
	height 40px !important
	width 40px !important
	border-radius 4px !important
.float-button-list
	position fixed
	top 12px
	right 12px
	image
		width 20px
		height 20px
		padding 7px
		box-shadow 0 0 4px gray
		background-color $background
		border-radius 50%
	.video-icon
		margin-right 6px
.re-edit
	color $primary
	line-height 30px
	font-size 14px
	margin-left 10px
</style>
