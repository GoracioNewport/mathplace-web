import firebase from 'firebase/app'
import 'firebase/firestore'
import { accountDb, chatDb } from './global'

/* eslint-disable */

export default {
    actions: {
        async fetchAchivements (ctx) {
            const db = firebase.firestore()
            var userData = db.collection('account').doc(this.getters.getUser.id)
            var achieves = []
            var achivementsFull = []

            await userData.get()
             .then(doc =>{
                achieves = doc.data().achiv
                for (let i = 0; i < achieves.length; i++) {
                    var name = ""
                    var condition = ""
                    var progress = achieves[i]
                    var done = 0
                    var difficulty = ""
                    if(progress == 100){
                        done = 1
                    }
                    else{
                        done = 0
                    }
                    if(i == 0){
                        name = "ПЕРВАЯ КРОВЬ"
                        condition = "решите 1 задачу"
                        difficulty = "easy"
                    }
                    else if (i == 1){
                        name = "НОВИЧОК"
                        condition = "решите 5 задач"
                        difficulty = "normal"
                    }
                    else if (i == 2){
                        name = "ЛЮБИТЕЛЬ"
                        condition = "решите 25 задач"
                        difficulty = "normal"
                    }
                    else if (i == 3){
                        name = "ПРОФИ"
                        condition = "решите 100 задач"
                        difficulty = "normal"
                    }
                    else if (i == 4){
                        name = "ПЕРВАЯ ТЕМА"
                        condition = "решите целиком всю тему"
                        difficulty = "complicated"
                        if(progress == 1){
                            done = 1
                            progress = 100
                        }
                    }
                    else if (i == 5){
                        name = "ТРИ ТЕМЫ"
                        condition = "решите целиком 3 темы"
                        difficulty = "complicated"
                        if(progress == 3){
                            done = 1
                            progress = 100
                        }
                    }
                    else if (i == 6){
                        name = "АЛГЕБРА"
                        condition = "решите целиком всю алгебру"
                        difficulty = "complicated"
                    }
                    else if (i == 7){
                        name = "ГЕОМЕТРИЯ"
                        condition = "решите целиком всю геометрию"
                        difficulty = "complicated"
                    }
                    achivementsFull.push({
                        name: name,
                        condition: condition,
                        progress: progress,
                        done: done,
                        difficulty: difficulty
                    })
                }
            })
            ctx.commit('updateAchievesLoaded', true)
            ctx.commit('updateTopics', achivementsFull)
        },
        async fetchMyChats (ctx) {
            const db = firebase.firestore()
            var moment = require('moment')
            var nameList = []
            var globalNameList = {}
            var userId = this.getters.getUser.id
            // Получаем список чатов
            db.collection('account').doc(this.getters.getUser.id).onSnapshot(async function(doc) { 
                doc.data().myChats !== undefined ? nameList = doc.data().myChats : nameList = [] 
                // console.log('Got chatlist update! ', nameList)
                for (let name of nameList) {
                    var chatList = {}
                    console.log('Reading data from ', name)
                    db.collection('chat').doc(name).onSnapshot(async function(chatDoc) {
                        // chatList - это мепчик, если что-то меняется в одном чате, то мы просто это перезаписываем, если добавляется новый или убирается старый, то все читается заново
                        var data = chatDoc.data()
                        var ind = userId
                        var info = {}
                        var memb = []
                        info['msgCnt'] = data.all_message
                        info['type'] = data.chat_type
                        info['name'] = data.name
                        info['members'] = {}
                        var rawMemb = data.members
                        for (let i = 0; i < rawMemb.length; i++) memb.push(rawMemb[i].userId)
                        info['id'] = name
                        if (data.chat_type === 'group') info['image'] = data.image
                        else {
                            memb[0] === userId ? ind = memb[1] : ind = memb[0]
                            info['name'] = ind
                        } info['msgs'] = {}
                        for (let j = 0; j < data.all_message; j++) {
                        info['msgs'][j] = data['message' + j.toString()]
                        info['msgs'][j].time !== null ? info['msgs'][j].time = moment.unix(info['msgs'][j].time.seconds).format('MMMM Do YYYY, h:mm:ss a') : info['msgs'][j].time = ''
                        }
                        for await (let mem of memb) {
                            // console.log(globalNameList)
                            if (globalNameList[mem] === undefined) await db.collection('account').doc(mem).get().then(doc => { doc.exists ? globalNameList[mem] = doc.data().name : globalNameList[mem] = 'Deleted User' })
                            info.members[mem] = globalNameList[mem]
                        }
                        if (info['type'] === 'personal') await db.collection('account').doc(ind).get().then(doc => {info['image'] = doc.data().image })
                        chatList[info.id] = info
                        // Преобразовываю chatList в массив и комичу
                        // console.log('Got chats update! ', Object.values(chatList))
                        ctx.commit('updateMyChats', Object.values(chatList))
                    })
                    
                    // for await (let mem of memb) {
                    //     await db.collection('account').doc(mem).get().then(doc => { 
                    //         info['members'][mem] = doc.data().name 
                    //     })
                    // }
                    // if (info['type'] === 'personal') await db.collection('account').doc(ind).get().then(doc => {info['image'] = doc.data().image })
                    // chatList.push(info)
                    // // console.log(name, '--->', info)
                }
                // ctx.commit('updateMyChats', chatList)
            })
        }, 
        async changeProfileSettings (ctx, payload) {
            const db = firebase.firestore()
            if (payload.name !== null) {
                await db.collection(accountDb).doc(this.getters.getUser.id).update({
                    name: payload.name
                }) 
                ctx.commit('updateUser', ['name', payload.name])
            } if (payload.avatar !== null) {
                // Чтение файла
                let file = payload.avatar
                let fileName = file.name
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                // Получение данных для имени файла
                const ext = fileName.slice(fileName.lastIndexOf('.'))
                let currentTime = new Date().getTime()
                let imageUrl
                let imageTimeName = 'uploads/' + currentTime + ext
                // Загрузка в бд
                await firebase.storage().ref(imageTimeName).put(file)
                await firebase.storage().ref(imageTimeName).getDownloadURL().then(function (url) { imageUrl = url })
                imageUrl = imageUrl.toString()
                // Запись ссылки в бд
                await db.collection(accountDb).doc(this.getters.getUser.id).update({
                    image: imageUrl
                })
                ctx.commit('updateUser', ['image', imageUrl])
            }
            ctx.commit('saveUser')
        },
        async changeChatSettings (ctx, payload) {
            const db = firebase.firestore()
            if (payload.name !== null) {
                await db.collection(chatDb).doc(payload.chatId).update({
                    name: payload.name
                }) 
            } if (payload.avatar !== null) {
                // Чтение файла
                let file = payload.avatar
                let fileName = file.name
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                // Получение данных для имени файла
                const ext = fileName.slice(fileName.lastIndexOf('.'))
                let currentTime = new Date().getTime()
                let imageUrl
                let imageTimeName = 'uploads/' + currentTime + ext
                // Загрузка в бд
                await firebase.storage().ref(imageTimeName).put(file)
                await firebase.storage().ref(imageTimeName).getDownloadURL().then(function (url) { imageUrl = url })
                imageUrl = imageUrl.toString()
                // Запись ссылки в бд
                await db.collection(chatDb).doc(payload.chatId).update({
                    image: imageUrl
                })
            }
        },
        async addMemberToChat (ctx, payload) {
            const db = firebase.firestore()
            ctx.commit('updateAddedMemberStatus', 'Pending')
            // Ищем юзера
            var userId = null
            var userChatList = []
            var userName = ''
            await db.collection(accountDb).where('email', '==', payload.userEmail).get().then(function (querySnapshot) { querySnapshot.forEach(function (doc) { if (doc.exists) { 
                userId = doc.id
                var data = doc.data()
                userName = data.name
                data.myChats === undefined ? userChatList = [] : userChatList = data.myChats 
            } }) })
            
            if (userId === null) ctx.commit('updateAddedMemberStatus', 'NoUser') 
            else {
                var memb = []
                var rawMemb = []
                var msgCnt = 0
                // Получаем инфу о чате
                await db.collection(chatDb).doc(payload.chatId).get().then(doc => {
                    var data = doc.data()
                    msgCnt = data.all_message
                    rawMemb = data.members
                    for (let i = 0; i < rawMemb.length; i++) memb.push(rawMemb[i].userId)
                }) 
                if (memb.indexOf(userId) !== -1) {
                    ctx.commit('updateAddedMemberStatus', 'AlreadyAMember') 
                    console.log('Already a member!')
                } else {
                    // console.log('Adding ', userId)
                    // console.log('Initial: ', rawMemb)
                    // Первым делом записываем новые значения в чат и пишем сообщение
                    rawMemb.push({'last_message': msgCnt, 'userId': userId})
                    // console.log('Final: ', rawMemb)
                    var messageName = 'message'.concat(msgCnt)
                    var messageData = {
                        text: userName.concat(' присоединился к чату'),
                        sender: 'System',
                        time: firebase.firestore.Timestamp.now()
                    }
                    await db.collection(chatDb).doc(payload.chatId).update({ 
                        members: rawMemb,
                        [messageName]: messageData,
                        all_message: ++msgCnt
                    })
                    // Потом обновляем у пользователя
                    // console.log('Initial: ', userChatList)
                    userChatList.push(payload.chatId)
                    // console.log('Final: ', userChatList)
                    await db.collection(accountDb).doc(userId).update({ myChats: userChatList })
                    ctx.commit('updateAddedMemberStatus', 'OK')
                }
            }
        },
        async removeMemberFromChat (ctx, payload) {
            const db = firebase.firestore()
            var memb = []
            var rawMemb = []
            
            // Получаем инфу об удаляемом челе
            
            var chatList = []
            await db.collection(accountDb).doc(payload.userId).get().then(doc => {
                var data = doc.data()
                data.myChats === undefined ? chatList = [] : chatList = data.myChats
            })

            // Сначала удаляем значение в чате и пишем сообщение

            var msgCnt = 0
            await db.collection(chatDb).doc(payload.chatId).get().then(doc => {payload
                var data = doc.data()
                rawMemb = data.members
                msgCnt = data.all_message
                // console.log('Initial: ', rawMemb)
                for (let i = 0; i < rawMemb.length; i++) if (rawMemb[i].userId !== payload.userId) memb.push(rawMemb[i])
            })
            //  console.log('Final: ', memb)
            var messageName = 'message'.concat(msgCnt)
            var messageData = {
                text: payload.userName.concat(' был выгнан из беседы администратором'),
                sender: 'System',
                time: firebase.firestore.Timestamp.now()
            }
            await db.collection(chatDb).doc(payload.chatId).update({ 
                members: memb,
                [messageName]: messageData,
                all_message: ++msgCnt
            })
            // Теперь обновляем у пользователя
            //  console.log('Initial: ', chatList)
            chatList.splice(chatList.indexOf(payload.chatId), 1)
            // console.log('Final: ', chatList)
            await db.collection(accountDb).doc(payload.userId).update({
                myChats: chatList
            })
        }
    },
    state: {
        achievements: [],
        tasksLoading: false,
        logo: 'MathPlace',
        chatList: [],
        currentChat: [],
        addedMemberStatus: 'None',
        preChatInfo: {}
    },
    getters: {
        getAchievements (state) { return state.achievements },
        getMyChats (state) { return state.chatList },
        getCurrentChat (state) { return state.currentChat },
        getPreChatInfo (state) { return state.preChatInfo }
    },
    mutations: {
        updateAchievesLoaded (state, isLoaded) { state.tasksLoading = isLoaded },
        updateTopics (state, list) { state.achievements = list },
        updateMyChats (state, payload) { state.chatList = payload },
        updateCurrentChat (state, payload) { state.currentChat = payload },
        updateAddedMemberStatus (state, payload) { state.addedMemberStatus = payload },
        updatePreChatInfo (state, payload) { state.preChatInfo = payload }
    }
}
