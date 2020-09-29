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
            await db.collection('account').doc(this.getters.getUser.id).get().then(doc => { doc.data().myChats !== undefined ? nameList = doc.data().myChats : nameList  = [] })
            var chatList = []
            var ind = this.getters.getUser.id
            for await (let name of nameList) {
                var info = {}
                var memb = []
                await db.collection('chat').doc(name).get().then(doc => {
                    var data = doc.data()
                    info['msgCnt'] = data.all_message
                    info['type'] = data.chat_type
                    info['name'] = data.name
                    info['members'] = {}
                    memb = data.members
                    info['id'] = name
                    if (data.chat_type === 'group') info['image'] = data.image
                    else {
                        memb[0] === this.getters.getUser.id ? ind = memb[1] : ind = memb[0]
                        info['name'] = ind
                    } info['msgs'] = {}
                    for (let j = 0; j < data.all_message; j++) {
                       info['msgs'][j] = data['message' + j.toString()]
                       info['msgs'][j].time = moment.unix(info['msgs'][j].time.seconds).format('MMMM Do YYYY, h:mm:ss a')
                    }
                })
                
                for await (let mem of memb) {
                    await db.collection('account').doc(mem).get().then(doc => { 
                        info['members'][mem] = doc.data().name 
                    })
                }
                if (info['type'] === 'personal') await db.collection('account').doc(ind).get().then(doc => {info['image'] = doc.data().image })
                chatList.push(info)
                console.log(name, '--->', info)
            }
            ctx.commit('updateMyChats', chatList)
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
        }
    },
    state: {
        achievements: [],
        tasksLoading: false,
        logo: 'MathPlace',
        chatList: [],
        currentChat: []
    },
    getters: {
        getAchievements (state) {
            return state.achievements
        },
        getMyChats (state) {
            return state.chatList
        },
        getCurrentChat (state) {
            return state.currentChat
        }
    },
    mutations: {
        updateAchievesLoaded (state, isLoaded) {
            state.tasksLoading = isLoaded
        },
        updateTopics (state, list) {
            // state.topics = topics
            state.achievements = list
        },
        updateMyChats (state, payload) {
            state.chatList = payload
        },
        updateCurrentChat (state, payload) {
            state.currentChat = payload
        }
    }
}
