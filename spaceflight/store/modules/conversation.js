import { formatTime } from '../../utils/index'
import { decodeElement } from '../../utils/decodeElement'
import TIM from 'tim-wx-sdk'

const conversationModules = {
  state: {
    allConversation: [], // 所有的conversation
    currentConversationID: '', // 当前聊天对话ID
    currentConversation: {}, // 当前聊天对话信息
    currentMessageList: [], // 当前聊天消息列表
    nextReqMessageID: '', // 下一条消息标志
    isCompleted: false, // 当前会话消息是否已经请求完毕
    isLoading: false // 是否正在请求
  },
  getters: {
    allConversation: state => state.allConversation,
    // 当前聊天对象的ID
    toAccount: state => {
      if (state.currentConversationID.indexOf('C2C') === 0) {
        return state.currentConversationID.substring(3)
      } else if (state.currentConversationID.indexOf('GROUP') === 0) {
        return state.currentConversationID.substring(5)
      }
    },
    // 当前聊天对象的昵称
    toName: state => {
      if (state.currentConversation.type === 'C2C') {
        return state.currentConversation.userProfile.userID
      } else if (state.currentConversation.type === 'GROUP') {
        return state.currentConversation.groupProfile.name
      }
    },
    // 当前聊天对话的Type
    currentConversationType: state => {
      if (state.currentConversationID.indexOf('C2C') === 0) {
        return 'C2C'
      }
      if (state.currentConversationID.indexOf('GROUP') === 0) {
        return 'GROUP'
      }
      return ''
    },
    currentConversation: state => state.currentConversation,
    currentMessageList: state => state.currentMessageList,
	// 未读消息数量
    totalUnreadCount: state => {
      const result = state.allConversation.reduce((count, { unreadCount }) => count + unreadCount, 0)
	  console.log(result)
      return result
    }
  },
  mutations: {
    // 历史头插消息列表
    // 小程序问题，在渲染的时候模板引擎不能处理函数，所以只能在渲染前处理好message的展示问题
    unshiftMessageList (state, messageList) {
      let list = [...messageList]
      for (let i = 0; i < list.length; i++) {
        let message = list[i]
        list[i].virtualDom = decodeElement(message)
        let date = new Date(message.time * 1000)
        list[i].newtime = formatTime(date)
      }
      state.currentMessageList = [...list, ...state.currentMessageList]
    },
    // 收到
    receiveMessage (state, messageList) {
      let list = [...messageList]
      for (let i = 0; i < list.length; i++) {
        let message = list[i]
        list[i].virtualDom = decodeElement(message)
        let date = new Date(message.time * 1000)
        list[i].newtime = formatTime(date)
      }
      state.currentMessageList = [...state.currentMessageList, ...list]
    },
    sendMessage (state, message) {
		console.log('sendsend')
      message.virtualDom = decodeElement(message)
      let date = new Date(message.time * 1000)
      message.newtime = formatTime(date)
      state.currentMessageList.push(message)
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 99999
        })
      }, 800)
    },
    // 更新当前的会话
    updateCurrentConversation (state, conversation) {
      state.currentConversation = conversation
      state.currentConversationID = conversation.conversationID
    },
    // 更新当前所有会话列表
    updateAllConversation (state, list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].lastMessage && (typeof list[i].lastMessage.lastTime === 'number')) {
          let date = new Date(list[i].lastMessage.lastTime * 1000)
          list[i].lastMessage._lastTime = formatTime(date)
        }
      }
      state.allConversation = list
    },
    // 重置当前会话
    resetCurrentConversation (state) {
      state.currentConversationID = '' // 当前聊天对话ID
      state.currentConversation = {} // 当前聊天对话信息
      state.currentMessageList = [] // 当前聊天消息列表
      state.nextReqMessageID = '' // 下一条消息标志
      state.isCompleted = false // 当前会话消息是否已经请求完毕
      state.isLoading = false // 是否正在请求
    },
    resetAllConversation (state) {
      state.allConversation = []
    },
    removeMessage (state, message) {
      state.currentMessageList.splice(state.currentMessageList.findIndex(item => item.ID === message.ID), 1)
    },
    changeMessageStatus (state, index) {
      state.currentMessageList[index].status = 'fail'
    }
  },
  actions: {
    // 消息事件
    onMessageEvent (context, event) {
      if (event.name === 'onMessageReceived') {
        let id = context.state.currentConversationID
        if (!id) {
          return
        }
        let list = []
        event.data.forEach(item => {
          if (item.conversationID === id) {
            list.push(item)
          }
        })
        context.commit('receiveMessage', list)
      }
    },
    // 获取消息列表
    getMessageList (context) {
		console.log('1')
      const {currentConversationID, nextReqMessageID} = context.state
      // 判断是否拉完了，isCompleted 的话要报一下没有更多了
      if (!context.state.isCompleted) {
		  console.log('2')
        // 如果请求还没回来，又拉，此时做一下防御
        if (!context.state.isLoading) {
			console.log('3')
          context.state.isLoading = true
          wx.$app.getMessageList({ conversationID: currentConversationID, nextReqMessageID: nextReqMessageID, count: 15 }).then(res => {
			console.log('success')
			console.log(res.data.messageList)
            context.state.nextReqMessageID = res.data.nextReqMessageID
            // context.state.currentMessageList = res.data.messageList
            context.commit('unshiftMessageList', res.data.messageList)
            // context.commit('', res.data.messageList)
            if (res.data.isCompleted) {
              context.state.isCompleted = true
            }
            context.state.isLoading = false
          }).catch(err => {
			  console.log('err')
            console.log(err)
          })
        } else {
			console.log('4')
          wx.showToast({
            title: '你拉的太快了',
            icon: 'none',
            duration: 500
          })
        }
      } else {
        // wx.showToast({
        //   title: '没有更多啦',
        //   icon: 'none',
        //   duration: 1500
        // })
      }
    },
    checkoutConversation (context, conversationID) {
	  console.log(context)
	  console.log('conversationID:'+conversationID)
      context.commit('resetCurrentConversation')
      wx.$app.setMessageRead({ conversationID })
      return wx.$app.getConversationProfile(conversationID)
        .then(({ data: { conversation } }) => {
          context.commit('updateCurrentConversation', conversation)
          context.dispatch('getMessageList')
          let name = ''
          switch (conversation.type) {
            case TIM.TYPES.CONV_C2C:
              name = conversation.userProfile.nick || conversation.userProfile.userID
              break
            case TIM.TYPES.CONV_GROUP:
              name = conversation.groupProfile.name || conversation.groupProfile.groupID
              break
            default:
              name = '系统通知'
          }
          wx.navigateTo({ url: `/pages/chat/chat?toAccount=${name}&type=${conversation.type}` })
          return Promise.resolve()
        })
    }
  }
}

export default conversationModules
