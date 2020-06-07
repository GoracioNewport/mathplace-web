import firebase from 'firebase/app'
import 'firebase/firestore'

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
            console.log(achivementsFull.length + ' ' + achivementsFull[0].name)
            ctx.commit('updateAchievesLoaded', true)
            ctx.commit('updateTopics', achivementsFull)
        }
    },
    state: {
        achievements: [],
        tasksLoading: false,
        logo: 'MathPlace'
    },
    getters: {
        getAchievements (state) {
          return state.achievements
        },
    },
    mutations: {
        updateAchievesLoaded (state, isLoaded) {
            state.tasksLoading = isLoaded
        },
        updateTopics (state, list) {
            // state.topics = topics
            state.achievements = list
        }
    }
}
