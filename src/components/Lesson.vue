<template lang="pug">
  .content-wrapper
    //- md-drawer(:md-active.sync='showSidepanel')
      md-toolbar.md-transparent(md-elevation='0')
        div(style="margin-top: 30px;margin-bottom: 20px;")
          strong(style="display:block; font-size: 25px;font-weight:500") Рейтинг
          span(style="display:block;margin-top:10px; font-size: 16px;font-weight:500") всего участников {{ MembersSort.length }}
      .loading-indicator(v-if='isLoadingStat')
        .vld-parent
          loading(
            :active.sync = "isLoadingStat",
            color = '#763dca')
      md-list(v-else)
        md-list-item(
          v-for = "i in MembersSort"
          :key = "i"
        )
          div
            strong.md-list-item-text {{ userStatistics[i].name }}
            span.md-list-item-text Решено задач {{ userStatistics[i].solveSum }}
          md-button.md-icon-button.md-list-action(@click="deleteMember(userStatistics[i].id, i)")
            md-icon.md-primary remove_circle
          md-button.md-icon-button.md-list-action(@click="openChatWithUser(userStatistics[i].id)")
            md-icon.md-primary chat_bubble
    md-drawer(:md-active.sync='showComment')
      md-toolbar.md-transparent(md-elevation='0')
        div(style="margin-top: 30px;margin-bottom: 20px;")
          strong(style="display:block; font-size: 25px;font-weight:500") Комментарии
          //- span(style="display:block;margin-top:10px; font-size: 16px;font-weight:500") всего участников {{ Object.keys(userStatistics).length }}
      .loading-indicator(v-if='isLoadingComment')
        .vld-parent
          loading(
            :active.sync = "isLoadingComment",
            color = '#763dca')
      md-list(v-else)
        md-list-item(
          v-for = "i in this.arrayComments"
          :key = "i"
        )
          div
            strong.md-list-item-text {{ i.userName }}
            span.md-list-item-text {{ i.text }}
          md-button.md-icon-button.md-list-action(@click="openChatWithUser(tasksInfo.token)")
            md-icon.md-primary chat_bubble
      .sendComment
        md-field
          label Комментарии
          md-input(v-model="textNewComment", plceholder="Введите комментарий")
          md-button(@click="sendComment(tasksInfo.token)") Отправить
    md-drawer(:md-active.sync='showNavigation' md-swipeable='')
      md-toolbar.md-transparent(md-elevation='0',style="height:auto;")
        span.md-display-2.lessonNavbar(style="position:relative;height:auto;width:auto;margin-bottom:5px;margin-top:20px;") {{ tasksInfo.name }}<br>
        span.md-title(v-if="tasksInfo.token !== null", style="position:relative;height:100%;display:block;margin-left:10px") Ключ: {{ tasksInfo.token }}
        span.nd-title(v-if = "tasksInfo.timeEnd !== null") Осталось {{ Days }} дней {{ Hours }} часов {{ Minutes }} минут {{ Seconds }} секунд
      md-list(style="margin-left:10px")
        md-list-item.md-button(@click="goBack")
          md-icon arrow_back
          span.md-list-item-text В главное меню
        //- md-list-item.md-button
        //-   md-icon create
        //-   span.md-list-item-text Черновик
        //- md-list-item.md-button(@click="showComments(tasksInfo.token)")
          md-icon forum
          span.md-list-item-text Комментарии
        //- md-list-item.md-button(v-if="tasksInfo.token !== null", @click="getDataMembers")
          md-icon sort
          span.md-list-item-text Рейтинг
        md-list-item.md-button(v-if="tasksInfo.token !== null", @click ='showNavigation = false, showSnackbar=true, $clipboard("https://mathplace.page.link?apn=com.math4.user.mathplace&ibi=com.example.ios&link=https%3A%2F%2Fmathplace.ru%2Flesson%2Folympiad%3D" + tasksInfo.token)')
          md-icon content_copy
          p.md-list-item-text(style="height:auto") Скопировать ссылку на урок
        md-list-item
          .likeButton.but(style="cursor:pointer;", @click = 'likeButton')
            input#checkbox.checkbox(type='checkbox' v-model = 'topicLiked')
            label(for='checkbox')
              svg#heart-svg(viewBox='467 392 58 57', xmlns='http://www.w3.org/2000/svg')
                g#Group(fill='none', fill-rule='evenodd', transform='translate(467 392)')
                  path#heart(d='M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z', fill='#AAB8C2')
                  circle#main-circ(fill='#763DCA', opacity='0', cx='29.5', cy='29.5', r='1.5')
                  g#grp7(opacity='0', transform='translate(7 6)')
                    circle#oval1(fill='#9CD8C3', cx='2', cy='6', r='2')
                    circle#oval2(fill='#8CE8C3', cx='5', cy='2', r='2')
                  g#grp6(opacity='0', transform='translate(0 28)')
                    circle#oval1(fill='#CC8EF5', cx='2', cy='7', r='2')
                    circle#oval2(fill='#91D2FA', cx='3', cy='2', r='2')
                  g#grp3(opacity='0', transform='translate(52 28)')
                    circle#oval2(fill='#9CD8C3', cx='2', cy='7', r='2')
                    circle#oval1(fill='#8CE8C3', cx='4', cy='2', r='2')
                  g#grp2(opacity='0', transform='translate(44 6)')
                    circle#oval2(fill='#CC8EF5', cx='5', cy='6', r='2')
                    circle#oval1(fill='#CC8EF5', cx='2', cy='2', r='2')
                  g#grp5(opacity='0', transform='translate(14 50)')
                    circle#oval1(fill='#91D2FA', cx='6', cy='5', r='2')
                    circle#oval2(fill='#91D2FA', cx='2', cy='2', r='2')
                  g#grp4(opacity='0', transform='translate(35 50)')
                    circle#oval1(fill='#F48EA7', cx='6', cy='5', r='2')
                    circle#oval2(fill='#F48EA7', cx='2', cy='2', r='2')
                  g#grp1(opacity='0', transform='translate(24)')
                    circle#oval1(fill='#9FC7FA', cx='2.5', cy='3', r='2')
                    circle#oval2(fill='#9FC7FA', cx='7.5', cy='2', r='2')
              p.md-subheading(style="text-align:center;") Поставить лайк
              md-tooltip(md-direction='bottom') Поставить лайк уроку
    md-snackbar(md-position='center' :md-duration="Number(4000)" :md-active.sync='showSnackbar' md-persistent='')
      span Ссылка скопирована. Отправьте её ученикам!
      md-button.md-primary(@click='showSnackbar = false') Скрыть
    div(v-if = 'showStats')
      md-dialog(:md-active.sync='showStats')
        md-dialog-title Статистика по уроку
        //- .loadingBox(v-if = 'myTopics.size() == 0')
        //-   md-empty-state(md-rounded='' md-icon='access_time' md-label='В уроке пока нет учеников' md-description="В данный урок пока не присоединились ученики.")
        //- //- .errorBox(v-else-if = 'topic.')
        //- .loadedBox(v-else)
        md-table.statsTable(v-model='myTopics', md-sort='name', md-sort-order='asc', md-fixed-header='')
          md-table-toolbar
            .md-toolbar-section-start
              h1.md-title Ученики
            md-button.md-primary(@click ='toggleStats(tasksInfo.token)') Обновить статистику
            //- md-field.md-toolbar-section-end(md-clearable='')
            //-   md-input(placeholder='Поиск по имени...', v-model='search', @input='searchOnTable')
          md-table-row(slot='md-table-row', slot-scope='{ item }')
            md-table-cell.nameSlot(md-label='Имя', md-sort-by='name') {{ item.name }}
            md-table-cell.taskSlot(v-for = '(task, taskIndex) in item.solveStats' :key = 'taskIndex'
            :md-label = '(taskIndex + 1).toString()')
              Dots.answerNo.answerLabel(v-if = 'Number(task) === 1')
              img.answerWrong.answerLabel(src = '@/assets/images/wrong.png' v-else-if = 'Number(task) == 0')
              img.answerRight.answerLabel(src = '@/assets/images/right.png' v-else-if = 'Number(task) == 3 || Number(task) == 2')
              img.answerUnknown.answerLabel(src = '@/assets/images/unknown.png' v-else @click ='showSolution(topicIndex, taskIndex, item.id)')
            md-table-cell.nameSlot(md-label='Всего', md-sort-by='solveSum') {{ item.solveSum }}
        md-dialog-actions
          md-button.md-primary(@click='showStats = false') Закрыть

    .taskbar(v-if = "error === 'none' || error === 'too_late'")
      .lessonNavbar
        md-button.md-icon-button.burger(@click='showNavigation = true')
            md-icon.fa.fa-bars(style="height: 70px;width: 70px;color: #FFFFFF;").md-size-2x menu

        span.md-display-2 {{ tasksInfo.name }}

        md-button.hideStat.md-raised(v-if="tasksInfo.author === getUser.id", @click ='toggleStats(tasksInfo.token)') Статистика
        //- md-button.hideStat.md-raised(v-else-if="tasksInfo.token !== null", @click="getDataMembers") Рейтинг
      .container
        .taskbar-content
          .taskbar-list
            .taskbar-item(
              v-if ="taskList.length"
              v-for ="task in taskList"
              @click ='changeActiveTask(task.id, task)'
              :key ="task.id")
              .taskbar-link
                img.img_taskbar(
                  v-if = "task.type == 'theory'"
                  :class ='{ unknownTask : (tasksInfo.isHiddenResults && Number(task.tries) !== 1 && Number(task.tries) !== 3), solvedTask : Number(task.tries) === 3, failedTask : Number(task.tries) === 0, thisButton : task.activeTask === activeTask  || (activeTask === 0 && task.id === 0), anotherButton : task.activeTask != activeTask && !(activeTask === 0 && task.id === 0)}'
                  :src = "theoryImage")
                img.img_taskbar(
                    v-else-if = 'task.type == "proof"'
                    :class ='{ unknownTask : (tasksInfo.isHiddenResults && Number(task.tries) !== 1 && Number(task.tries) !== 3), solvedTask : Number(task.tries) === 3, failedTask : Number(task.tries) === 0, thisButton : task.activeTask === activeTask || (activeTask === 0 && task.id === 0), anotherButton : task.activeTask != activeTask  && !(activeTask === 0 && task.id === 0)}'
                    :src = 'proofImage')
                img.img_taskbar(
                    v-else
                    :class ='{ unknownTask : (tasksInfo.isHiddenResults && Number(task.tries) !== 1 && Number(task.tries) !== 3), solvedTask : Number(task.tries) === 2, failedTask : Number(task.tries) === 0, pendingTask : Number(task.tries) !== 0 && Number(task.tries) !== 1 && Number(task.tries) !== 2 && Number(task.tries) !== 3, thisButton : task.activeTask === activeTask || (activeTask === 0 && task.id === 0), anotherButton : task.activeTask != activeTask  && !(activeTask === 0 && task.id === 0)}'
                    :src = 'taskImage')

    .loading-indicator(v-if='isLoading')
        loading(
          :active.sync = "this.isLoading",
          :is-full-page = 'true',
          color = '#763dca')
    .contentMain(v-else-if="error === 'none' || error === 'too_late'")
      .content
        div(v-if="this.rightAns && !this.tasksInfo.isHiddenResults")
          img.rightAns(v-if="this.status === 'Correct'", src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im01MTIgNTguNjY3OTY5YzAtMzIuMzYzMjgxLTI2LjMwNDY4OC01OC42Njc5NjktNTguNjY3OTY5LTU4LjY2Nzk2OWgtMzk0LjY2NDA2MmMtMzIuMzYzMjgxIDAtNTguNjY3OTY5IDI2LjMwNDY4OC01OC42Njc5NjkgNTguNjY3OTY5djM5NC42NjQwNjJjMCAzMi4zNjMyODEgMjYuMzA0Njg4IDU4LjY2Nzk2OSA1OC42Njc5NjkgNTguNjY3OTY5aDM5NC42NjQwNjJjMzIuMzYzMjgxIDAgNTguNjY3OTY5LTI2LjMwNDY4OCA1OC42Njc5NjktNTguNjY3OTY5em0wIDAiIGZpbGw9IiM0Y2FmNTAiLz48cGF0aCBkPSJtMzg1Ljc1IDE3MS41ODU5MzhjOC4zMzk4NDQgOC4zMzk4NDMgOC4zMzk4NDQgMjEuODIwMzEyIDAgMzAuMTY0MDYybC0xMzguNjY3OTY5IDEzOC42NjQwNjJjLTQuMTYwMTU2IDQuMTYwMTU3LTkuNjIxMDkzIDYuMjUzOTA3LTE1LjA4MjAzMSA2LjI1MzkwN3MtMTAuOTIxODc1LTIuMDkzNzUtMTUuMDgyMDMxLTYuMjUzOTA3bC02OS4zMzIwMzEtNjkuMzMyMDMxYy04LjM0Mzc1LTguMzM5ODQzLTguMzQzNzUtMjEuODI0MjE5IDAtMzAuMTY0MDYyIDguMzM5ODQzLTguMzQzNzUgMjEuODIwMzEyLTguMzQzNzUgMzAuMTY0MDYyIDBsNTQuMjUgNTQuMjUgMTIzLjU4NTkzOC0xMjMuNTgyMDMxYzguMzM5ODQzLTguMzQzNzUgMjEuODIwMzEyLTguMzQzNzUgMzAuMTY0MDYyIDB6bTAgMCIgZmlsbD0iI2ZhZmFmYSIvPjwvc3ZnPg==")
          img.rightAns(v-else-if =  "this.status === 'Wrong'", src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yNTYgMGMtMTQxLjE2NDA2MiAwLTI1NiAxMTQuODM1OTM4LTI1NiAyNTZzMTE0LjgzNTkzOCAyNTYgMjU2IDI1NiAyNTYtMTE0LjgzNTkzOCAyNTYtMjU2LTExNC44MzU5MzgtMjU2LTI1Ni0yNTZ6bTAgMCIgZmlsbD0iI2Y0NDMzNiIvPjxwYXRoIGQ9Im0zNTAuMjczNDM4IDMyMC4xMDU0NjljOC4zMzk4NDMgOC4zNDM3NSA4LjMzOTg0MyAyMS44MjQyMTkgMCAzMC4xNjc5NjktNC4xNjAxNTcgNC4xNjAxNTYtOS42MjEwOTQgNi4yNS0xNS4wODU5MzggNi4yNS01LjQ2MDkzOCAwLTEwLjkyMTg3NS0yLjA4OTg0NC0xNS4wODIwMzEtNi4yNWwtNjQuMTA1NDY5LTY0LjEwOTM3Ni02NC4xMDU0NjkgNjQuMTA5Mzc2Yy00LjE2MDE1NiA0LjE2MDE1Ni05LjYyMTA5MyA2LjI1LTE1LjA4MjAzMSA2LjI1LTUuNDY0ODQ0IDAtMTAuOTI1NzgxLTIuMDg5ODQ0LTE1LjA4NTkzOC02LjI1LTguMzM5ODQzLTguMzQzNzUtOC4zMzk4NDMtMjEuODI0MjE5IDAtMzAuMTY3OTY5bDY0LjEwOTM3Ni02NC4xMDU0NjktNjQuMTA5Mzc2LTY0LjEwNTQ2OWMtOC4zMzk4NDMtOC4zNDM3NS04LjMzOTg0My0yMS44MjQyMTkgMC0zMC4xNjc5NjkgOC4zNDM3NS04LjMzOTg0MyAyMS44MjQyMTktOC4zMzk4NDMgMzAuMTY3OTY5IDBsNjQuMTA1NDY5IDY0LjEwOTM3NiA2NC4xMDU0NjktNjQuMTA5Mzc2YzguMzQzNzUtOC4zMzk4NDMgMjEuODI0MjE5LTguMzM5ODQzIDMwLjE2Nzk2OSAwIDguMzM5ODQzIDguMzQzNzUgOC4zMzk4NDMgMjEuODI0MjE5IDAgMzAuMTY3OTY5bC02NC4xMDkzNzYgNjQuMTA1NDY5em0wIDAiIGZpbGw9IiNmYWZhZmEiLz48L3N2Zz4=")
        div(v-if = 'this.taskList[this.activeTask].type !== "theory"', style="height:60px;")
        .name(v-if = 'this.taskList[this.activeTask].type !== "theory"')
          //- span.name-span(v-if = 'this.taskList[this.activeTask].type == "theory"') Теория
          span.name-span Задача {{ this.taskList[this.activeTask].taskId }}

          img.star(
            class = "star1",
            :src = 'proofImage',
            alt = 'Звезда',
            v-for = 'i in getDifficulty')
        div(v-else, style="position:relative;height:100px;")

        .condition(v-if = 'this.taskList[this.activeTask].type !== "theory"')
          .text-part(v-for = "part in this.taskList[this.activeTask].statement")
            span(v-if = 'part.type == "text"'
                v-html = "part.inner") {{ part.inner }}

            img.condition-image(
              v-else-if = 'part.type == "img"'
              :src = 'part.inner')

            pdf(
              v-else-if = 'part.type == "file"'
              :src = 'part.inner')
        .conditionTheory(v-else)
          p.md-display-3(style="position:relative; margin-bottom:15px;") Теория
          .text-part(v-for = "part in this.taskList[this.activeTask].statement")
            span(v-if = 'part.type == "text"'
                v-html = "part.inner") {{ part.inner }}

            img.condition-image(
              v-else-if = 'part.type == "img"'
              :src = 'part.inner')

            pdf(
              v-else-if = 'part.type == "file"'
              :src = 'part.inner')

        .answ(v-if='this.taskList[this.activeTask].type !== "theory" && this.taskList[this.activeTask].type !== "proof"')
          input.submit-field(
            v-if ='this.taskList[this.activeTask].type === "task"'
            size = "40",
            placeholder = "Введите ответ",
            class = "ans",
            v-bind:disabled = "Number(this.taskList[this.activeTask].tries) === 2",
            v-model = 'answer',
            @keyup.enter = 'sendAnswer',
            v-bind:class = "{ 'unknownTask' : this.tasksInfo.isHiddenResults && Number(this.taskList[this.activeTask].tries) !== 1, 'solvedTask' : Number(this.taskList[this.activeTask].tries) == 2 || Number(this.taskList[this.activeTask].tries) == 3 , 'failedTask' : Number(this.taskList[this.activeTask].tries) == 0 }")
          label(for='img' v-else-if ='this.taskList[this.activeTask].type === "upload"')
            .pendingBox(v-if ='Number(this.taskList[this.activeTask].tries) !== 0 && Number(this.taskList[this.activeTask].tries) !== 1 && Number(this.taskList[this.activeTask].tries) !== 2 && Number(this.taskList[this.activeTask].tries) !== 3')
              span Преподователь еще не проверил ваш ответ
            .rightBox(v-else-if ='Number(this.taskList[this.activeTask].tries) === 2')
              span Ваш ответ оказался правильным
            .else(v-else)
              span(v-if ='Number(this.taskList[this.activeTask].tries) === 0') Ваш ответ оказался неправильным. Вы можете отправить решение заново
              //- input#img(type='file', name='img', accept='image/*', @click="onFileButtonClicked(this.tasks.indexOf(task), task.text.indexOf(component))")
              label Добавить развернутый ответ
              md-button.md-primary(@click='showUploadMenu = true') Добавить
              md-dialog(:md-active.sync='showUploadMenu')
                md-dialog-title Загрузка материала
                .md-dialog-body
                  .md-dialog-body-sections
                    //- span {{ taskList[activeTask].uploadAnswer }}
                    .md-dialog-body-section(v-for ='(component, componentId) in taskList[activeTask].uploadAnswer')
                      .button.img.delete_button(@click='taskList[activeTask].uploadAnswer.splice(taskList[activeTask].uploadAnswer.indexOf(component), 1)')
                      vue-editor.theoryText(v-if ='component.type === "text"' placeholder = 'Введите текст здесь', v-model = "component.inner" :editorToolbar ='[["bold", "italic", "underline", "strike"], [{ "color": [] }, { "background": [] }], ["link", "video"], ["clean"]]')
                      md-field(name='img' v-else)
                        md-file(v-model = 'component.inner' @md-change ='onFilePicked' @click ='imageUploadIndex = [activeTask, componentId]' accept="image/*")
                  .md-dialog-body-buttons
                  md-button.md-primary.md-raised(@click='taskList[activeTask].uploadAnswer.push({type : "text", inner: ""})') Добавить текст
                  md-button.md-primary.md-raised(@click='taskList[activeTask].uploadAnswer.push({type : "img", inner: ""})') Добавить картинку
                md-dialog-actions
                  md-button.md-primary(@click='showUploadMenu = false') Отмена
                  md-button.md-primary(@click='uploadAnswer(activeTask)') Отправить

              //- md-field(name='img')
                //- md-file(v-model = 'answer' @md-change ='onFilePicked' accept="image/*")
          .multipleChoiceBox(v-else-if ='this.taskList[this.activeTask].type === "multipleChoice"')
            .choiceBox(v-for = "choice in this.taskList[this.activeTask].options")
              //- md-checkbox(v-if ='taskList[activeTask].tries')
              md-checkbox(v-model = 'answer', :value = "choice") {{ choice }}
          .multipleAnswerBox(v-else-if ='this.taskList[this.activeTask].type === "multipleAnswer"')
            .answerBox(v-for = "(answers, i) in answer")
              md-field
                label Введите ответ
                //- md-input(v-model = "answer[i]" disabled = '')
                md-input.answerField(v-model = "answer[i]")
                .button.button-round.button-warning.deleteButton(@click='answer.splice(answer.indexOf(answers), 1)') X
            .button.button--round.button-success.buttonAdd(@click='answer.push("")') Добавить вариант ответа
        .enter
          .send(v-if = 'this.taskList[this.activeTask].type ==="task" && this.taskList[this.activeTask].solution !=="hide" ')
            a.solutionButton.but(@click='solutionShown = true')
              md-tooltip(md-direction='right') Посмотреть решение
              img(src='@/assets/images/lock.png' alt='Решения')
                      //- .but
            //-   img(src='@/assets/images/comment_1.png', alt='Комментарии')
            button.submit-button.sub(
              type = 'submit',
              @click = 'sendAnswer')
                span(v-if ='Number(this.taskList[this.activeTask].tries) !== 2 && this.taskList[this.activeTask].type !== "theory" && this.taskList[this.activeTask].type !== "proof"') Ответить
                span(v-else-if = 'this.activeTask !== (this.taskList.length - 1)') Дальше
                span(v-else) Завершить
          .sendNotSolve(v-else)
            a.solutionButton.but(@click='solutionShown = true')
              md-tooltip(md-direction='right') Посмотреть решение
              img(src='@/assets/images/lock.png' alt='Решения')
                      //- .but
            //-   img(src='@/assets/images/comment_1.png', alt='Комментарии')
            button.submit-button.sub(
              type = 'submit',
              :disabled = 'error === "too_late"'
              @click = 'sendAnswer')
                span(v-if ='Number(this.taskList[this.activeTask].tries) !== 2 && this.taskList[this.activeTask].type !== "theory" && this.taskList[this.activeTask].type !== "proof"') Ответить
                span(v-else-if = 'this.activeTask !== (this.taskList.length - 1)') Дальше
                span(v-else) Завершить
    .placeholderScreen(v-else-if ='error === "no_material_author" || error === "no_material_member"')
      .ownerScreen(v-if = 'userId === tasksInfo.author')
        div
          md-empty-state(md-icon='add' md-label='Добавьте материал в урок' md-description="Вы пока не добавили материал в урок, чтобы это исправить нажмите кнопку снизу.")
            md-button.md-primary.md-raised(@click = '$router.push("/customTitle/" + taskId)') Добавить материал

        //- strong.md-headline Вы еще не добавили материал в этот урок.
        //- br
        //- .button.button--round.button-success(@click = '$router.push("/customTitle/" + taskId)') Добавить!
      .guestScreen(v-else)
        md-empty-state(md-rounded='' md-icon='watch_later' md-label='Учитель ещё не добавил материал в урок' md-description="Вскоре учитель добавит материал. Возвращайтесь позже.")
        //- strong.md-headline Учитель еще не добавил материал в этот урок.
        //- br
        //- strong.md-headline Возвращайтесь позже!
    .placeholderScreen(v-else-if ='error === "too_early" || error === "too_late"')
      .tooEarlyScreen(v-if ='error === "too_early"')
        div.tooEarly
          li
            span(style="font-size:38px;font-weight: normal;") До начала урока "{{ tasksInfo.name }}" осталось
          ul
            li
              span {{ Days }}
              span Дней
            li
              span {{ Hours }}
              span Часов
            li
              span {{ Minutes }}
              span Минут
            li
              span {{ Seconds }}
              span Секунд
        div
          //- md-empty-state(md-icon='devices_other' md-label='Create your first project' md-description="Creating project, you'll be able to upload your design and collaborate with people.")
          //- md-empty-state(md-rounded='' md-icon='watch_later' :md-label=" 'Урок по теме \"' + this.tasksInfo.name + '\" пока не начался'" :md-description=" 'Урок начнется ' + this.tasksInfo.timeStart.toLocaleString() + '. Возвращайтесь позже!' ")
          md-button.md-primary.md-raised(@click = '$router.push("/main")') На главную страницу

      //- .tooLateScreen(v-else-if ='error === "too_late"')
        //- strong.md-headline Ой-ой...
        //- br
        //- strong.md-headline Кажется, этот урок уже закончился в
        //- span.md-headline {{ this.tasksInfo.timeEnd.toLocaleString() }}
        //- br
        //- strong.md-headline Нам очень жаль!
        div
          md-empty-state(md-rounded='' md-icon='history' :md-label=" 'Урок по теме \"' + this.tasksInfo.name + '\" уже закончился'" :md-description=" 'Урок закончился ' + this.tasksInfo.timeEnd.toLocaleString() + '. Спасибо за работу!' ")
          md-button.md-primary.md-raised(@click = '$router.push("/main")') На главную страницу
    .placeholderScreen(v-else-if ='error === "banned"')
      div
        md-empty-state(md-rounded='' md-icon='block' :md-label=" 'Урок \"' + this.tasksInfo.name + '\" недосутпен'" md-description="Обратитесь к своему учителю")
        md-button.md-primary.md-raised(@click = '$router.push("/main")') На главную страницу
    .solution(v-if = 'this.solutionShown', @click='solutionShown = !solutionShown')
      md-dialog(:md-active.sync='solutionShown')
        md-dialog-title Ответ на задачу
          .solutionText
            strong.md-headline(v-if ='this.taskList[this.activeTask].solution !== "null"') {{ this.taskList[this.activeTask].solution }}
            strong.md-hedline(v-else) Ответ: {{ this.taskList[this.activeTask].answer }}
        md-dialog-actions
          md-button.md-primary(@click='solutionShown = false') ОК!
</template>

<script>
import Loading from 'vue-loading-overlay'
import { VueEditor } from 'vue2-editor'
import theoryImage from '@/assets/images/theory.png'
import taskImage from '@/assets/images/question.png'
import proofImage from '@/assets/images/star_evidence.png'
import Right from 'vue-material-design-icons/CheckboxMarkedCircleOutline.vue'
import Dots from 'vue-material-design-icons/DotsHorizontal.vue'
import Wrong from 'vue-material-design-icons/Close.vue'
import 'vue-loading-overlay/dist/vue-loading.css'
import { mapActions, mapGetters } from 'vuex'
import pdf from 'vue-pdf'
import firebase from 'firebase/app'
import 'firebase/storage'

// import func from '../../vue-temp/vue-editor-bridge'
// import { beforeRouteLeave } from 'vue-router'

export default {
  watch: {
    '$route' (to, from) {
      this.taskId = to.params.taskId
      this.collection = to.params.collectionId
      this.$store.dispatch('changeCurrentTopic', this.taskId)
      this.$store.dispatch('changeCollection', this.collection)
      this.updateUser(['lastTheme', this.getCollection + '_' + this.getCurrentTopic])
    }
  },
  components: {
    Loading,
    VueEditor,
    pdf,
    Right,
    Dots,
    Wrong
  },
  async mounted () {
    // Начало загрузки, фетчим все данные
    this.isLoading = true
    this.$store.dispatch('changeCurrentTopic', this.taskId)
    this.$store.dispatch('changeCollection', this.collection)
    this.updateUser(['lastTheme', this.getCollection + '_' + this.getCurrentTopic])
    this.addUserToTopicList()
    this.userId = this.getUser.id
    await this.fetchLikes(this.collection)
    await this.fetchTasks(this.collection)
    // Зафетчили, получаем и обрабатываем
    this.tasksInfo.name = this.getTasksInfo.name
    this.tasksInfo.author = this.getTasksInfo.author
    this.tasksInfo.token = this.getTasksInfo.token
    this.tasksInfo.timeStart = this.getTasksInfo.time_start
    this.tasksInfo.timeEnd = this.getTasksInfo.time_end
    this.tasksInfo.blacklist = this.getTasksInfo.blacklist
    this.tasksInfo.isHiddenResults = this.getTasksInfo.isHiddenResults
    this.taskList = this.getTasks
    // Проверка на ошибки
    if (this.tasksInfo.blacklist.includes(this.getUser.id)) this.error = 'banned'
    else if (this.taskList.length === 0 && this.tasksInfo.author === this.getUser.id) this.error = 'no_material_author'
    else if (this.taskList.length === 0 && this.tasksInfo.author !== this.getUser.id) this.error = 'no_material_member'
    else if (this.tasksInfo.timeStart !== null && this.tasksInfo.timeStart.getTime() > new Date().getTime()) {
      this.error = 'too_early'
      this.secondsLesson = this.tasksInfo.timeEnd - new Date().getTime()
      setInterval(() => {
        this.secondsLesson -= 1000
        if (this.secondsLesson <= 0) {
          this.error = 'none'
          // self.$router.$forceUpdate
          clearInterval()
        }
        this.Days = Math.floor(this.secondsLesson / 86400000) % 360

        this.Hours = Math.floor(this.secondsLesson / 3600000) % 24
        this.Minutes = Math.floor(this.secondsLesson / 60000) % 60
        this.Seconds = Math.floor(this.secondsLesson / 1000) % 60
      }, 1000)
    } else if (this.tasksInfo.timeEnd !== null && this.tasksInfo.timeEnd.getTime() < new Date().getTime()) {
      this.error = 'too_late'
      // Показываем результаты работы уже после завершения
      this.tasksInfo.isHiddenResults = false
    } else {
      this.error = 'none'
      // Переключаемся на нулевой элемент навбара, что бы обновился ответ в форме
      this.changeActiveTask(0, this.taskList[0])
    } console.log(this.error)
    // Ставим таймеры для выкидывания ученика по концу урока и для напоминалок
    if (this.tasksInfo.timeEnd !== null && this.error === 'none') {
      let endTimeLeft = (this.tasksInfo.timeEnd - new Date())
      let notificationTimeLeft = (this.tasksInfo.timeEnd - new Date() - 600000)
      let self = this

      this.secondsLesson = endTimeLeft
      setInterval(() => {
        this.secondsLesson -= 1000
        this.Days = Math.floor(this.secondsLesson / 86400000)

        this.Hours = Math.floor(this.secondsLesson / 3600000) % 24
        this.Minutes = Math.floor(this.secondsLesson / 60000) % 60
        this.Seconds = Math.floor(this.secondsLesson / 1000) % 60
      }, 1000)
      // В случае переполнения все ломается... Думаю, никто не обидется, если я не буду учитывать варианты, когда до конца урока остается 26 дней
      if (notificationTimeLeft > 0 && notificationTimeLeft <= 2147483647) setTimeout(() => alert('Осталось 10 минут до конца урока!'), notificationTimeLeft)
      if (endTimeLeft > 0 && endTimeLeft <= 2147483647) {
        setTimeout(() => {
          self.$router.go()
          alert('Урок окончен! Возможность сдачи задач огранчена')
        }, endTimeLeft)
      }
    }
    // Переключаем стили лайка в случае, если лайк уже поставлен
    if (this.getUser.like.find(t => t === this.getCurrentTopic)) this.topicLiked = true
    // Отключаем загрузочный оверлей и обновляем все на всякий случай
    this.isLoading = false
    this.$forceUpdate()
  },
  data () {
    return {
      collection: this.$route.params.collectionId,
      taskId: this.$route.params.taskId,
      token: this.$route.params.token,
      theoryImage,
      taskImage,
      proofImage,
      activeTask: 0,
      taskList: [],
      MembersSort: [],
      tasksInfo: {},
      userStatistics: {},
      isLoading: true,
      rightAns: false,
      secondsLesson: 0,
      showSnackbar: false,
      showComment: false,
      arrayComments: [],
      isLoadingComment: false,
      Days: 0,
      Hours: 0,
      Minutes: 0,
      Seconds: 0,
      textNewComment: '',
      myTopicsLoading: false,
      myTopics: [],
      isLoadingStat: false,
      showSidepanel: false,
      showNavigation: false,
      showStats: false,
      answer: '',
      status: 'Idle',
      topicLiked: false,
      solutionShown: false,
      userId: null,
      solutionFile: null,
      error: 'pending',
      showUploadMenu: false,
      imageUploadIndex: null
    }
  },
  methods: {
    ...mapActions(['fetchMyTopicsDetailedInfo', 'sendComments', 'fetchComments', 'fetchLessonStatistics', 'fetchTasks', 'updateUser', 'like', 'fetchLikes', 'changeCurrentLogo', 'addUserToTopicList', 'updateUserTopicStatus', 'sendImageSolution', 'fetchMembersStatistics', 'fetchTopicStatistics', 'banLessonMember']),
    // ...mapActions(['fetchMyTopicsDetailedInfo', 'fetchLessonStatistics', 'fetchTasks', 'updateUser', 'like', 'fetchLikes', 'changeCurrentLogo', 'addUserToTopicList', 'updateUserTopicStatus', 'sendImageSolution', 'fetchMembersStatistics', 'fetchTopicStatistics', 'banLessonMember']),
    async toggleStats (id) {
      await this.fetchLessonStatistics(id)
      // this.myTopics = this.fetchLessonStatistics
      this.myTopics = this.convertToArray(this.getMyLessonstatistics)
      this.showStats = true
    },
    changeActiveTask (i, thisTask) {
      this.status = 'Idle'
      this.activeTask = i
      thisTask.activeTask = i
      if (this.taskList[this.activeTask].userAnswer === 'null') {
        if (this.taskList[this.activeTask].type === 'multipleChoice' || this.taskList[this.activeTask].type === 'multipleAnswer') this.answer = []
        else this.answer = ''
      } else {
        if (this.taskList[this.activeTask].type === 'multipleChoice' || this.taskList[this.activeTask].type === 'multipleAnswer') this.answer = this.taskList[this.activeTask].userAnswer.split(',')
        else this.answer = this.taskList[this.activeTask].userAnswer
      }
    },
    async sendAnswer () { // Боже, как тут много говна... хуй вообще разберешь какой пиздец тут творится
      if (this.answer === '' && this.taskList[this.activeTask].type !== 'theory' && this.taskList[this.activeTask].type !== 'proof') alert('Поле для ввода пустое!')
      else {
        if (this.activeTask === (this.taskList.length - 1) && (Number(this.taskList[this.activeTask].tries) === 2 || Number(this.taskList[this.activeTask].tries) === 3)) this.$router.push('/main')
        else if (Number(this.taskList[this.activeTask].tries) !== 2 && Number(this.taskList[this.activeTask].tries) !== 3) { // Task complition
          let verdict = 1

          // Если урок завершился, то шлем нафиг
          if (this.error === 'too_late') {
            alert('Урок окончен! Отправка решений ограничена')
            return
          }

          if (this.solutionFile !== null) {
            this.isLoading = true
            await this.sendImageSolution({ colletion: this.collection, id: this.taskId, i: this.activeTask, image: this.solutionFile })
            this.answer = this.getLoadedImageURL
            this.isLoading = false
            verdict = '4'
          } if (Array.isArray(this.answer)) {
            for (let i = 0; i < this.answer.length; i++) this.answer[i].replace(',', '.')
            this.answer.sort()
          } else this.answer = this.answer.replace(',', '.')
          var equals = (Array.isArray(this.answer) && this.answer.length === this.taskList[this.activeTask].answer.length && this.answer.every((value, index) => value === this.taskList[this.activeTask].answer[index]))
          if (this.answer === this.taskList[this.activeTask].answer || this.taskList[this.activeTask].type === 'theory' || this.taskList[this.activeTask].type === 'proof' || equals) {
            if (this.taskList[this.activeTask].type !== 'theory' && this.taskList[this.activeTask].type !== 'proof') {
              this.updateUser(['money', this.getUser.money + 3])
              this.updateUser(['right', this.getUser.right + 1])
            } this.status = 'Correct'
            this.rightAns = true
            this.showVerdictTask()
            if (this.taskList[this.activeTask].type === 'theory' || this.taskList[this.activeTask].type === 'proof') verdict = '3'
            else verdict = '2'
          } else if (this.solutionFile === null) {
            this.status = 'Wrong'
            verdict = '0'
            this.rightAns = true
            this.showVerdictTask()
          }

          this.solutionFile = null

          if (this.taskList[this.activeTask].type !== 'theory' && this.taskList[this.activeTask].type !== 'proof') this.updateUser(['submit', this.getUser.submit + 1])
          // Обновляем значения оценок
          let newStatus = []
          for (let i = 0; i < this.taskList.length; i++) newStatus[i] = this.taskList[i].tries
          newStatus[this.activeTask] = String(verdict)
          this.updateUserTopicStatus({key: this.getCurrentTopic, value: newStatus, field: 'grades'})
          this.taskList[this.activeTask].tries = Number(verdict)
          // Обновляем значения последних ответов
          for (let i = 0; i < this.taskList.length; i++) newStatus[i] = String(this.taskList[i].userAnswer)
          newStatus[this.activeTask] = String(this.answer)
          this.updateUserTopicStatus({key: this.getCurrentTopic, value: newStatus, field: 'lastAnswers'})
          this.taskList[this.activeTask].userAnswer = String(this.answer)
          // Проверка для теории и задачи на доказательство, что бы можно было листать задачи по нажатии на кнопку
          if (this.taskList[this.activeTask].type === 'theory' || this.taskList[this.activeTask].type === 'proof') {
            if (this.activeTask === this.taskList.length - 1) this.$router.push('/main')
            else this.changeActiveTask(this.activeTask + 1, this.taskList[this.activeTask + 1])
          }
        } else {
          this.changeActiveTask(this.activeTask + 1, this.taskList[this.activeTask + 1])
        }
      }
    },
    async showComments (id) {
      this.showNavigation = false
      this.showComment = true
      this.isLoadingComment = true

      await this.fetchComments(id)
      this.arrayComments = this.getCommentsFromLesson

      this.isLoadingComment = false
    },
    async sendComment (id) {
      await this.sendComments({token: id, userId: this.userId, text: this.textNewComment})
      this.showComments(id)
      this.textNewComment = ''
    },
    likeButton () {
      let liked = this.getUser.like
      if (this.getUser.like.find(t => t === this.getCurrentTopic)) {
        liked.splice(liked.indexOf(this.getCurrentTopic), 1)
        this.updateUser(['like', liked])
        this.like(false)
      } else {
        liked.push(this.getCurrentTopic)
        this.updateUser(['like', liked])
        this.like(true)
      }
    },
    convertToArray (map) {
      return Object.values(map)
    },
    showVerdictTask () {
      setTimeout(() => {
        this.rightAns = false
      }, 1500)
    },
    openChatWithUser (userId) {
      this.$router.push('/pm/' + userId)
    },
    deleteMember (id, i) {
      this.MembersSort.splice(i, 1)
      this.banLessonMember({token: this.getCurrentTopic, id: id, ban: true})
    },
    async getDataMembers () {
      this.showNavigation = false
      this.isLoadingStat = true
      this.showSidepanel = true
      await this.fetchMembersStatistics(this.getCurrentTopic)
      this.MembersSort = this.getMembersSort
      this.userStatistics = this.getMembersStatistics
      this.isLoadingStat = false
    },
    goBack () {
      if (this.$router.history.length > 0) this.$router.go(-1)
      else this.$router.push('/main')
    },
    onFilePicked (event) {
      this.taskList[this.imageUploadIndex[0]].uploadAnswer[this.imageUploadIndex[1]] = event[0]
    },
    async uploadAnswer (i) {
      this.Loading = true

      for (let j = 0; j < this.taskList[i].userAnswer.length; j++) {
        if (this.taskList[i].userAnswer[j].type === 'img') {
          let file = this.taskList[i].userAnswer[j].inner
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
          this.taskList[i].userAnswer[j].inner = imageUrl.toString()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getMyTopicsDetailedInfo', 'getCommentsFromLesson', 'getMyLessonstatistics', 'getCurrentTopic', 'getUser', 'getTopicLikes', 'getCollection', 'getTasks', 'getTasksInfo', 'getMembersStatistics', 'getMembersSort', 'getLoadedImageURL']),
    // ...mapGetters(['getMyTopicsDetailedInfo', 'getMyLessonstatistics', 'getCurrentTopic', 'getUser', 'getTopicLikes', 'getCollection', 'getTasks', 'getTasksInfo', 'getMembersStatistics', 'getMembersSort', 'getLoadedImageURL']),
    getDifficulty () {
      var dif
      this.taskList[this.activeTask].difficulty === undefined ? dif = 0 : dif = this.taskList[this.activeTask].difficulty
      if (dif !== 'null') return parseInt(dif, 10)
      else return 0
    }
  },
  beforeRouteLeave (to, from, next) {
    this.changeCurrentLogo('MathPlace')
    next()
  }
}
</script>

<style lang="stylus" scoped>
  .multipleChoiceBox
    margin-left 2%
    @media screen and (max-width: 800px)
      margin-left 10%
  .multipleAnswerBox
    margin-left 2%
    @media screen and (max-width: 800px)
      margin-left 10%
  .delete_button
    position relative
    display inline-block
    width 32px
    height 32px
    float right
    background-image url(images/clear.png)
    background-size 100%
  .md-dialog-body
    padding 0 24px 0
    max-height 70vh
    overflow auto
  .sendComment
    float bottom
    width 90%
    margin-top 50px
    margin-left 5%
    md-field
      position relative
      width 50px
      display inline-block
    md-button
      position relative
      width 20px
      display inline-block
  .taskSlot
    width 50px
    margin auto
  .burger
    height: 70px;
    width: 70px;
    margin-left:30px;
    color: #FFFFFF;
    @media screen and (max-width: 800px)
      margin-left 5px;
      margin-right 0px
  .hideStat
    float:right;
    margin-right:20px;
    margin-top:15px;
    @media screen and (max-width: 800px)
      display none
  .tooEarly
    li
      display: inline-block;
      font-size: 1.5em;
      list-style-type: none;
      padding: 1.5em;
      text-transform: uppercase;

    li span
      display: block;
      font-size: 4.0rem;

  .md-drawer_rating
    width: 230px;
    max-width: calc(100vw - 125px);
  .md-content
    padding: 16px;
  .rightAns
    position absolute
    width 300px
    height 300px
    left 40%
    top 30%
    border-radius 20px
    // box-shadow 0px 5px 4px 4px
  .lessonNavbar
    position relative
    display flex
    height 60px
    color #FFFFFF
    width auto
    text-overflow ellipsis
    overflow hidden
    white-space nowrap
    span
      position relative
      width auto
      height auto
      // margin auto
      // white-space: nowrap;
      line-height: 70px;
      color #FFFFFF
      display inline-block
      font-family "Euclid Circular A",-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,"Apple Color Emoji",sans-serif
      font-size 25pt
      font-weight 500
      // margin-top 20px
      // margin-left 20px
      // margin-bottom 20px
      vertical-align middle
      overflow: hidden;
      text-overflow: ellipsis;
      // display: -webkit-box;
      -webkit-line-clamp: 1; /* number of lines to show */
      -webkit-box-orient: vertical;
  ::-webkit-scrollbar-button
    background-image:url('');
    background-repeat:no-repeat;
    width:5px;
    height:0px

  ::-webkit-scrollbar-track
    background-color:#763DCA

  ::-webkit-scrollbar-thumb
    -webkit-border-radius: 0px;
    border-radius: 20px;
    background-color #FFFFFF

  ::-webkit-scrollbar-thumb:hover
    background-color:#763DCA;

  ::-webkit-resizer
    background-image:url('');
    background-repeat:no-repeat;
    width:4px;
    height:0px

  ::-webkit-scrollbar
    width: 4px;
    height 4px;

  .container
    position relative
    height auto
    width auto
    margin 0px auto 5px
    padding 0px
    overflow auto
    overflow-y hidden
    white-space nowrap
  .solutionButton
    grid-column 2
    grid-row 1
    margin auto
  .likeButton
    grid-column 1
    grid-row 1
  .submit-button
    position relative
    height auto
    width auto
    grid-column 1
    text-align center
    vertical-align middle
    @media screen and (max-width: 800px)
      height 50% !important
    &:hover
      cursor pointer
  span
    line-height normal
  .placeholderScreen
    margin-top 10%
    text-align center
    .md-headline
      font-size 24pt
    .button
      margin 3%
      color #FFFFFF
      font-size 2.5em
      &:hover
        color #FFFFFF
        text-decoration none
  .content-wrapper
    height auto
    font-family Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    background #FFFFFF
  input
    margin-bottom auto
  .solution
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .solutionBox
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    border 2px #000000 solid
    border-radius 10px
    @media screen and (max-width: 600px)
      margin 1%
      margin-top 20%
  .solutionText
    padding 5%
    height 90%
    overflow: auto
    max-height: 50vh
    font-size 24pt
  .solutionButtonClose
    margin 3%
  #imgSmile
    position relative
    height 90%
    width 90%
  .taskbar-content
    position relative
    width auto
    margin:0px auto 0px;
  #imgBack
    position absolute
    float left
    padding 6px
    height 36px
    width 36px
    margin-left 2%
    margin-top 0.5%
    // display block
    // margin 0px auto
    // text-align center
    // margin-top 5%
    // vertical-align middle
  .solvedTask
    background rgba(0, 255, 0, .5) !important
  .failedTask
    background rgba(255, 0, 0, .5) !important
  .pendingTask
    background rgba(255, 255, 0, .5) !important
  .unknownTask
    background rgba(255, 255, 0, .5) !important
  .answerCorrect
    background-color rgba(0, 255, 0, .4)
  .answerWrong
    background-color rgba(255, 0, 0, .4)
  .thisButton
    height 42px
    width 42px
    padding 10px
    border 2px #ffffff solid
    border-radius 17%
    background-size 100%
    background rgba(102, 102, 102, 0.5)
  .anotherButton
    height 42px
    width 42px
    padding 10px
    border 0px #ffffff solid
    border-radius 17%
    background-size 100%
    background rgba(102, 102, 102, 0.5)
  .condition-image
    max-height 300px
    display block
    float none
    margin-top 20px
  .star
    positine relative
    height 30px
    width auto
    float right
    margin-top 12px
    margin-right 10px
  .taskbar-list
    position relative
    width auto
    display table
    margin:0px auto 0px;
    right 0px
  .taskbar-item
    position relative
    width auto
    display inline-block
    padding 13px 9px 9px 20px
  .contentMain
    position relative
    height 100%
    min-height 100%
    background #763DCA
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
  .content
    position relative
    height 100%
    min-height 100%
    border-radius 20px 20px 0px 0px
    background #FFFFFF
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
  .name
    height 60px
    vertical-align center
    background #763DCA
    font-family 'Roboto', sans-serif
    font-size 30px
    font-weight bold
    box-shadow 0 0 0px rgba(0,0,0,0.5)
    border-radius 15px 15px 0 0
    margin-top 50px
    margin-left 23%
    margin-right 23%
    @media screen and (max-width: 800px) {
      width 88%
      margin-right 6%
      margin-left 6%
    }
  .name-span
    height auto
    width auto
    color #FFFFFF
    float left
    margin 10px
    font-family "Euclid Circular A",-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,"Apple Color Emoji",sans-serif
    font-size 23pt
    font-weight 500
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* number of lines to show */
    -webkit-box-orient: vertical;
  .name.strong
    position relative
    height auto
    width auto
    color #FFFFFF
    margin-left 3%
    text-align center
    vertical-align middle
    margin-bottom 0px
  img
    orientation right
    float right
    margin-right 5px
  .condition
    min-height 45vh
    max-height 60vh
    overflow auto
    background #ffffff
    color #000000
    color:#525252
    line-height 1.6
    font-family: 'Roboto'
    font-size: 19px
    font-weight: 400
    border-radius 0 0 15px 15px
    box-shadow 0 0 2px rgba(0,0,0,0.5)
    padding 10px
    margin-left 23%
    margin-right 23%
    @media screen and (max-width: 800px) {
        width 88%
        margin-right 6%
        margin-left 6%
    }
  .conditionTheory
    position relative
    height auto
    min-height 45vh
    color:#525252
    line-height 1.6
    font-family: 'Roboto'
    font-size: 19px
    font-weight: 400
    padding 10px
    margin-left 23%
    margin-right 23%
    @media screen and (max-width: 800px) {
        width 88%
        margin-right 6%
        margin-left 6%
    }
  .answ
    heigth auto
    // width 67.5%
    margin-top 20px
    margin-left 23%
    margin-right 23%
    margin-bottom 20px
    @media screen and (max-width: 800px) {
        width 88%
        margin-right 0%
        margin-left 0%
    }

  .enter
    position relative
    width 54%
    height auto
    margin-left 23%
    margin-right 23%
    @media screen and (max-width: 800px) {
        width 88%
        margin-right 6%
        margin-left 6%
    }
  .submit-field
    position relative
    width 100%
    height auto
    margin-top 0px
    margin-left 0%
    margin-right 0%
    display inline-block
    @media screen and (max-width: 800px) {
        width 88%
        margin-right 6%
        margin-left 6%
    }

  .send
    display grid
    grid-template-columns 90% 10%
    grid-template-rows auto
    positine relative
    height auto
    width 100%
    margin-left 0%
    margin-right 0%
    margin-top 30px
    // @media screen and (max-width: 800px) {
    //   grid-template-columns 18% 64% 18%
    // }
  .sendNotSolve
    display grid
    grid-template-columns 100%
    grid-template-rows auto
    positine relative
    height auto
    width 100%
    margin-left 0%
    margin-right 0%
    margin-top 8px
    // @media screen and (max-width: 800px) {
    //   grid-template-columns 18% 64% 18%
    // }
  .sub
    position relative
    width 100%
    height 70px
    min-height 50px
    display inline-block
    color #ffffff
    padding 0px
    font-family "Euclid Circular A",-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,"Apple Color Emoji",sans-serif
    font-size: 30px
    font-weight: 400
    background-color #763DCA
    box-shadow 0 0 2px 0px
    border-radius 15px
    outline none
    transition: 0.8s;
    border none
    margin-bottom 20px
    text-align center
    vertical-align middle
    &:hover
      transition: 0.8s;
      background-color #ffffff
      color #763DCA
      border: 2px solid #763DCA;

  .but
    position relative
    img
      position relative
      width auto
      height 50px
      margin 0px auto
  .ans
    postion relative
    height 55px
    width 100%
    border-radius 15px
    margin-bottom 0px
    color #525252
    font-family: 'Roboto'
    font-size: 22px
    font-weight: 450
    box-shadow 0 0 2px 0px rgba(0,0,0,0.5)
    padding 11px
    outline none
    border none
  #zatemnenie
    background rgba(102, 102, 102, 0.5)
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    display none
    &:target
        display block
  #okno
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    width 60%
    height 80%
    text-align center
    padding 15px
    border-radius 10px
    color #000000
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    margin auto
    background #ffffff
  .solve
    height 100%
  .consolve
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    height 38%
    border-radius 10px
  .solsolve
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    height 40%
    margin-top 2%
    border-radius 10px
  .anssolve
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    height 17%
    margin-top 2%
    border-radius 10px
  .close
    display inline-block
    box-shadow 0 0 10px rgba(0,0,0,0.5)
    border-radius 7px
    color #ffffff
    padding 0 12px
    orientation bottom
    margin-top 5%
    text-decoration none
    background #763DCA
    font-size 14pt
    cursor pointer
    &:hover
        background #5E2DA6
  .taskbar
    background-color #763DCA
    width 100%
    height auto
    orientation top
    align-items center
    diaply flex
    box-shadow 0 0 2px 0px
  .wrapper
    width 100%
    max-width: 100%

  .taskbar-link
    &:hover
      cursor pointer

// Like animation

  svg {
    cursor: pointer;
    overflow: visible;
    width: 100%
  }

  svg #heart {
    transform-origin: center;
    animation: animateHeartOut .3s linear forwards;
  }

  svg #main-circ {
    transform-origin: 29.5px 29.5px;
  }

  .checkbox {
    display: none;
  }

  .checkbox:checked+label svg #heart {
    transform: scale(0.2);
    fill: #763DCA;
    animation: animateHeart .3s linear forwards .25s;
  }

  .checkbox:checked+label svg #main-circ {
    transition: all 2s;
    animation: animateCircle .3s linear forwards;
    opacity: 1;
  }

  .checkbox:checked+label svg #grp1 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp1 #oval1 {
    transform: scale(0) translate(0, -30px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp1 #oval2 {
    transform: scale(0) translate(10px, -50px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp2 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp2 #oval1 {
    transform: scale(0) translate(30px, -15px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp2 #oval2 {
    transform: scale(0) translate(60px, -15px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp3 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp3 #oval1 {
    transform: scale(0) translate(30px, 0px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp3 #oval2 {
    transform: scale(0) translate(60px, 10px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp4 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp4 #oval1 {
    transform: scale(0) translate(30px, 15px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp4 #oval2 {
    transform: scale(0) translate(40px, 50px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp5 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp5 #oval1 {
    transform: scale(0) translate(-10px, 20px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp5 #oval2 {
    transform: scale(0) translate(-60px, 30px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp6 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp6 #oval1 {
    transform: scale(0) translate(-30px, 0px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp6 #oval2 {
    transform: scale(0) translate(-60px, -5px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp7 {
    opacity: 1;
    transition: .1s all .3s;
  }

  .checkbox:checked+label svg #grp7 #oval1 {
    transform: scale(0) translate(-30px, -15px);
    transform-origin: 0 0 0;
    transition: .5s transform .3s;
  }

  .checkbox:checked+label svg #grp7 #oval2 {
    transform: scale(0) translate(-55px, -30px);
    transform-origin: 0 0 0;
    transition: 1.5s transform .3s;
  }

  .checkbox:checked+label svg #grp2 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp3 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp4 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp5 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp6 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  .checkbox:checked+label svg #grp7 {
    opacity: 1;
    transition: .1s opacity .3s;
  }

  @keyframes animateCircle {
    40% {
      transform: scale(10);
      opacity: 1;
      fill: #DD4688;
    }
    55% {
      transform: scale(11);
      opacity: 1;
      fill: #D46ABF;
    }
    65% {
      transform: scale(12);
      opacity: 1;
      fill: #CC8EF5;
    }
    75% {
      transform: scale(13);
      opacity: 1;
      fill: transparent;
      stroke: #CC8EF5;
      stroke-width: .5;
    }
    85% {
      transform: scale(17);
      opacity: 1;
      fill: transparent;
      stroke: #CC8EF5;
      stroke-width: .2;
    }
    95% {
      transform: scale(18);
      opacity: 1;
      fill: transparent;
      stroke: #CC8EF5;
      stroke-width: .1;
    }
    100% {
      transform: scale(19);
      opacity: 1;
      fill: transparent;
      stroke: #CC8EF5;
      stroke-width: 0;
    }
  }

  @keyframes animateHeart {
    0% {
      transform: scale(0.2);
    }
    40% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes animateHeartOut {
    0% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
