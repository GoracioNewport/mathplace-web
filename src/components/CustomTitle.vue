<template lang="pug">
  .content-wrapper

    md-snackbar(md-position='center' :md-active.sync='showSnackbarCopy' md-persistent='')
      span Ссылка на урок скопирована
      md-button.md-primary(@click='showSnackbarCopy = false') Скрыть
    md-dialog(:md-active.sync='showDrawerGrades')
      md-dialog-title Добавить оценку
      .settingsMenuBox
        //- .settingsMenuText
        //-   p Введите имя
        .settingsMenuField(style="margin:10px")
          md-field(md-inline='')
            label Введите оценку
            md-input(v-model='newNameGrade')

        //- .settingsMenuText
        //-   p Добавьте иконку профиля
        .settingsMenuField(style="margin:10px")
          md-field(md-inline='')
            label Введите количество баллов
            md-input(v-model='newPoint')
      md-dialog-actions
        md-button.md-primary(@click='showDrawerGrades=false') Закрыть
        md-button.md-primary(@click='addGrade') Сохранить
    //- md-dialog(:md-active.sync='showCreateTask')
    //-   md-dialog-title Изменить профиль
    //-   .componentBox
    //-     .componentName
    //-       strong(v-if = 'task.type === "theory"') Теория
    //-       strong(v-else) Задача
    //-     //- .taskType
    //-     //-   label(for='theory') Теория
    //-     //-     input#theory(type = 'radio', value = 'theory', v-model = "task.type")
    //-     //-   label(for='task') Задача
    //-     //-     input#task(type = 'radio', value = 'task', v-model = "task.type")
    md-dialog(:md-active.sync='showCreateTask' v-if='currentEditTask !== undefined')
      md-dialog-title(v-if = 'currentEditTask.type === "theory"') Теория
      md-dialog-title(v-else) Задача
      .componentBox
        //- .taskType
        //-   label(for='theory') Теория
        //-     input#theory(type = 'radio', value = 'theory', v-model = "task.type")
        //-   label(for='task') Задача
        //-     input#task(type = 'radio', value = 'task', v-model = "task.type")

        md-tabs(md-dynamic-height)
          md-tab(md-label='Условие')
            .overflowBox
              .theoryEditBox
                .theoryComponent(
                  v-for = 'component in currentEditTask.statement'
                )
                  .button.img.delete_button(@click='currentEditTask.statement.splice(currentEditTask.statement.indexOf(component), 1)')
                  .theoryTextField(v-if ='component.type === "text"')
                    vue-editor.theoryText(placeholder = 'Введите текст здесь', v-model = "component.inner" :editorToolbar ='[["bold", "italic", "underline", "strike"], [{ "color": [] }, { "background": [] }], ["link", "video"], ["clean"]]')
                  .theoryText(v-if ='component.type === "img"')
                    label(for='img') Выберите картинку
                    input#img(type='file', name='img', accept='image/*', @change="onFileSelected", @click="onFileButtonClicked(tasks.indexOf(currentEditTask), currentEditTask.statement.indexOf(component))")
                  .theoryTextFile(v-else-if ='component.type === "file"')
                    label(for='file') Выберите PDF-Файл
                    input#img(type='file', name='file', accept='application/pdf', @change="onFileSelected", @click="onFileButtonClicked(tasks.indexOf(currentEditTask), currentEditTask.statement.indexOf(component))")

                md-button.md-raised.md-primary(@click='addContent(tasks.indexOf(currentEditTask), "text")') Добавить абзац
                md-button.md-raised.md-primary(@click='addContent(tasks.indexOf(currentEditTask), "img")') Добавить картинку
                md-button.md-primary(@click='addContent(tasks.indexOf(currentEditTask), "file")') Загрузить PDF-файл
          md-tab(md-label='Ответ и решение' v-if ="currentEditTask.type === 'task'")
            .overflowBox
              .taskEditBox(v-if ="currentEditTask.type === 'task'")
                .taskAnswerBox
                  md-field.taskTypeSelect
                    label(for='taskType') Тип ответа
                    md-select#taskType(v-model='currentEditTask.taskType' name='taskTypeText' @md-selected='changeAnswerType(currentEditTask.taskType, currentEditTask)')
                      md-option(value='task') Единственный ответ
                      md-option(value='multipleAnswer') Несколько ответов
                      md-option(value='multipleChoice') Множественный выбор
                      md-option(value='upload') Загрузка развернутого решения
                      md-option(value='proof') Без ответа
                  md-field(v-if='currentEditTask.taskType == "task"')
                    md-input.taskAnswer(placeholder = 'Введите ответ на задачу', v-model = "currentEditTask.answer")
                  span.md-body-2(v-else-if='currentEditTask.taskType == "upload"') Вы сможете проверить ответ ученика в личном кабинете в разделе 'Мои темы'.
                  span.md-body-2(v-else-if='currentEditTask.taskType == "proof"') Дополнительная задача не подразумевает проверку ответа. Пожалуйста, напишите развернутый ответ в секции 'Решение', что бы ученики могли проверить себя самостоятельно.
                  md-chips(v-else-if='currentEditTask.taskType == "multipleAnswer"' v-model='currentEditTask.answer' md-placeholder='Введите ответ и нажмите Enter...')
                  .checkboxesBox(v-else-if='currentEditTask.taskType == "multipleChoice"')
                    md-field
                      label Введите вариант ответа
                      md-input(v-model='newCheckboxAnswer' placeholder='Добавить вариант ответа')
                      md-button.addMemeberButton(@click ='addCheckBoxAnswer(newCheckboxAnswer, currentEditTask)') Добавить
                    span.md-body-2(v-if='currentEditTask.options.length > 0') Отметьте правильные ответы
                    br
                    .checkboxesBoxCheckboxes(v-for ='(op, opI) in currentEditTask.options' :key="opI" )
                      md-checkbox(v-model='currentEditTask.answer' :value='op') {{ op }}
                      md-button.removeButton.md-accent.md-raised(@click ='currentEditTask.options.splice(opI, 1); if (currentEditTask.answer.findIndex(f => f === op) !== -1) currentEditTask.answer.splice(currentEditTask.answer.findIndex(f => f === op), 1);') X
                    //- span {{ task.answer }}

                .md-layout-item.olympTheme2
                  md-field
                    label Выберите сложность
                    md-select.olympTheme2(v-model = "currentEditTask.difficulty" placeholder="Выберите сложность")
                      md-option(v-for = '(diff, i) in difficultyList' :key="i" :value="diff") {{ diff }}
                    md-tooltip(md-direction='left') Укажите, чтобы ученикам было проще ориентироваться

                //- label(for='difOne') Легкая
                //-   input#difOne(type = 'radio', value = '1', v-model = "task.difficulty")
                //- label(for='difTwo') Средняя
                //-   input#difTwo(type = 'radio', value = '2', v-model = "task.difficulty")
                //- label(for='difThree') Трудная
                //-   input#difThree(type = 'radio', value = '3', v-model = "task.difficulty")

                md-field
                  label(for='solutionType') Тип решения
                  md-select#solutionType(v-model='currentEditTask.solutionType' name='solutionTypeText')
                    md-option(value='hide') Без решения
                    md-option(value='solution') Показывать решение
                    md-option(v-if ='currentEditTask.taskType != "proof" && currentEditTask.taskType != "upload"' value='answer') Показывать ответ
                  md-tooltip(md-direction='left') Решение показывается всем ученикам
                md-field(v-if ='currentEditTask.solutionType !== "hide" && currentEditTask.solutionType !== "answer"')
                  label Решение
                  md-textarea.taskSolution(placeholder = 'Введите подробное решение вашей задачи (необязательно)', v-model = "currentEditTask.solution")
      md-dialog-actions
        md-button.md-primary(@click='showCreateTask = false') Закрыть
        md-button.md-primary(@click='showCreateTask = false') Сохранить
    .loading-indicator(v-if = 'myTopicLoading')
      loading(
        :active.sync = "myTopicLoading"
        :is-full-page = 'true'
        color = "#763dca"
        :opacity = 0.5)
    .editBox(v-else)
      md-steppers(md-horizontal md-alternative :md-active-step.sync='active')
        md-step#first(md-label='Шаг №1' md-description='Основная информация' :md-done.sync='first')
          .marginBox
            span.olympTitle {{ this.edit ? 'Обновить' : 'Создать' }} урок
          .titleInfo
            md-field.olympName
              label Введите название темы
              md-input(v-model='name' maxlength = "30")
            .md-layout-item.olympTheme2
              md-field
                label(for="theme") Выберите тему урока
                md-select.olympTheme2#theme(v-model = "theme" placeholder='Выберите тему урока')
                  md-option(v-for = '(theme, i) in themeList' :key="i" :value="theme") {{ theme }}

            md-field.classCnt
              label Введите класс
              md-input(v-model='classCnt' type='number')
              span.md-helper-text Число от 1 до 11
          md-button.md-primary.buttonNext(@click="setDone('first', 'second')") Следующий шаг
        md-step#second(md-label='Шаг №2' md-description='Настройка доступа' :md-done.sync='second')
          .titleInfo
            .checkboxBox
              md-checkbox.olympPrivate(v-model='private') Приватная тема
              md-tooltip(md-direction='left') Приватная тема показывается только вашим ученикам
            .checkboxBox
              md-checkbox.olympPrivate(v-model='isHiddenResults') Не показывать результаты ученикам
              md-tooltip(md-direction='left') Вердикт покажется только после окончания урока
            .checkboxBox
              md-checkbox.olympPrivate(v-model='timeStartOn') Ограничить время начала
              md-tooltip(md-direction='left') Урок начнется в установленное время
            .checkboxBox
              md-checkbox.olympPrivate(v-model='timeFinishOn') Ограничить время конца
              md-tooltip(md-direction='left') Урок закончится в установленое время
            el-date-picker(v-if = 'timeStartOn' v-model='timeStart' type='datetime' placeholder='Дата начала' style='margin: 1%')
            el-date-picker(v-if = 'timeFinishOn' v-model='timeFinish' type='datetime' placeholder='Дата конца' style='margin: 1%')
          md-button.md-primary.buttonNext(@click="setDone('second', 'third')") Следующий шаг

        md-step#third(md-label='Шаг №3' md-description='Материал' :md-done.sync='third')
          .tasksInfo
            .tasksContent
              .task(v-for = '(task, taskId) in tasks' @click='editTask(task)')
                .imageButtonBox
                  img.imageButton(src = './images/clear.png' @click='tasks.splice(tasks.indexOf(task), 1)')
                  md-tooltip(md-direction='right') Удалить
                //- .imageButton.delete_button(@click='tasks.splice(tasks.indexOf(task), 1)')
                //- .imageButtonBox(v-if = 'task.type === "theory" || task.type === "task"')
                //-   img.imageButton(src ='@/assets/images/code3.png' @click ='editTask(task)')
                //-   md-tooltip(md-direction='right') Редактировать
                .preMadeBox(v-if ='task.type === "preMade"')
                  .componentName
                    strong(v-if = 'task.originData.type === "theory"') Теория из темы "{{ task.topicName }}"
                    strong(v-else) Задача №{{ task.taskInd }} из темы "{{ task.topicName }}"
                .taskBlockBox(v-else-if ='task.type === "block"')
                  .componentName
                    strong Блок задач
                  .componentBox
                    md-field(v-if ='task.tasks.length > 0')
                      label Введите количество задач, которые должны отображаться
                      md-input(v-model='task.choiceTask' type='number')
                      span.md-helper-text Число от 1 до {{ task.tasks.length }}
                    .task(v-for ='(blockTask, blockTaskId) in task.tasks')
                      .imageButtonBox
                        .button.img.delete_button(@click='task.tasks.splice(task.tasks.indexOf(blockTask), 1)')
                        md-tooltip(md-direction='right') Удалить
                      .imageButtonBox
                        img.imageButton(src ='@/assets/images/code3.png' @click ='editTask(blockTask)')
                        md-tooltip(md-direction='right') Редактировать
                      .preMadeBox(v-if ='blockTask.type === "preMade"')
                        .componentName
                          strong(v-if = 'blockTask.originData.type === "theory"') Теория из темы "{{ blockTask.topicName }}"
                          strong(v-else) Задача №{{ blockTask.taskId }} из темы "{{ blockTask.topicName }}"
                      .componentBox(v-else)
                        .componentName
                          strong Случайная Задача №{{blockTaskId + 1}}
                        //- .theoryEditBox
                          .theoryComponent(
                            v-for = 'component in blockTask.statement'
                          )
                            .button.img.delete_button(@click='blockTask.statement.splice(blockTask.statement.indexOf(component), 1)')
                            .theoryTextField(v-if ='component.type === "text"')
                              vue-editor.theoryText(placeholder = 'Введите текст здесь', v-model = "component.inner" :editorToolbar ='[["bold", "italic", "underline", "strike"], [{ "color": [] }, { "background": [] }], ["link", "video"], ["clean"]]')
                            .theoryText(v-if ='component.type === "img"')
                              label(for='img') Выберите картинку
                              input#img(type='file', name='img', accept='image/*', @change="onFileSelected", @click="onFileButtonClicked([tasks.indexOf(task), task.tasks.indexOf(blockTask)], blockTask.statement.indexOf(component))")
                            .theoryTextFile(v-else-if ='component.type === "file"')
                              label(for='file') Выберите PDF-Файл
                              input#img(type='file', name='file', accept='application/pdf', @change="onFileSelected", @click="onFileButtonClicked([tasks.indexOf(task), task.tasks.indexOf(blockTask)], blockTask.statement.indexOf(component))")

                          md-button.md-raised.md-primary(@click='addContent([tasks.indexOf(task), task.tasks.indexOf(blockTask)], "text")') Добавить абзац

                          md-button.md-raised.md-primary(
                            @click='addContent([tasks.indexOf(task), task.tasks.indexOf(blockTask)], "img")'
                            ) Добавить картинку
                          md-button.md-primary(
                            @click='addContent([tasks.indexOf(task), task.tasks.indexOf(blockTask)], "file")'
                            ) Загрузить PDF-файл
                        //- .taskEditBox
                          .taskAnswerBox
                            //- span {{ typeof blockTask.answer }}
                            md-field.taskTypeSelect
                              label(for='taskType') Тип ответа
                              md-select#taskType(v-model='blockTask.taskType' name='taskTypeText' @md-selected='changeAnswerType(blockTask.taskType, [taskId, blockTaskId])')
                                md-option(value='task') Единственный ответ
                                md-option(value='multipleAnswer') Несколько ответов
                                md-option(value='multipleChoice') Множественный выбор
                                md-option(value='upload') Загрузка развернутого ответа
                                md-option(value='proof') Без ответа
                            md-field(v-if='blockTask.taskType == "task"')
                              md-input.taskAnswer(placeholder = 'Введите ответ на задачу', v-model = "blockTask.answer")
                            span.md-body-2(v-else-if='blockTask.taskType == "upload"') Вы сможете проверить ответ ученика в личном кабинете в разделе 'Мои темы'.
                            span.md-body-2(v-else-if='blockTask.taskType == "proof"') Дополнительная задача не подразумевает проверку ответа. Пожалуйста, напишите развернутый ответ в секции 'Решение', что бы ученики могли проверить себя самостоятельно.
                            md-chips(v-else-if='blockTask.taskType == "multipleAnswer"' v-model='blockTask.answer' md-placeholder='Введите ответ и нажмите Enter...')
                            .checkboxesBox(v-else-if='blockTask.taskType == "multipleChoice"')
                              md-field
                                label Введите вариант ответа
                                md-input(v-model='newCheckboxAnswer' placeholder='Добавить вариант ответа')
                                md-button.addMemeberButton(@click ='addCheckBoxAnswer(newCheckboxAnswer, [taskId, blockTaskId])') Добавить
                              span.md-body-2(v-if='blockTask.options.length > 0') Отметьте правильные ответы
                              br
                              .checkboxesBoxCheckboxes(v-for ='(op, opI) in blockTask.options' :key="opI" )
                                md-checkbox(v-model='blockTask.answer' :value='op') {{ op }}
                                md-button.removeButton.md-accent.md-raised(@click ='blockTask.options.splice(opI, 1); if (blockTask.answer.findIndex(f => f === op) !== -1) blockTask.answer.splice(blockTask.answer.findIndex(f => f === op), 1);') X
                              //- span {{ task.answer }}

                          .md-layout-item.olympTheme2
                            md-field
                              label Выберите сложность
                              md-select.olympTheme2(v-model = "blockTask.difficulty" placeholder="Выберите сложность")
                                md-option(v-for = '(diff, i) in difficultyList' :key="i" :value="diff") {{ diff }}
                              md-tooltip(md-direction='left') Укажите, чтобы ученикам было проще ориентироваться

                          //- label(for='difOne') Легкая
                          //-   input#difOne(type = 'radio', value = '1', v-model = "task.difficulty")
                          //- label(for='difTwo') Средняя
                          //-   input#difTwo(type = 'radio', value = '2', v-model = "task.difficulty")
                          //- label(for='difThree') Трудная
                          //-   input#difThree(type = 'radio', value = '3', v-model = "task.difficulty")

                          md-field
                            label(for='solutionType') Тип решения
                            md-select#solutionType(v-model='blockTask.solutionType' name='solutionTypeText')
                              md-option(value='hide') Без решения
                              md-option(value='solution') Показывать решение
                              md-option(v-if ='blockTask.taskType != "proof" && blockTask.taskType != "upload"' value='answer') Показывать ответ
                            md-tooltip(md-direction='left') Решение показывается всем ученикам
                          md-field(v-if ='blockTask.solutionType !== "hide" && blockTask.solutionType !== "answer"')
                            label Решение
                            md-textarea.taskSolution(placeholder = 'Введите подробное решение вашей задачи (необязательно)', v-model = "blockTask.solution")
                    div(style="margin-top:20px")
                      md-button.md-raised.md-primary(@click='addTask("task", taskId)') Добавить задачу
                      md-button.md-raised.md-primary(@click='addTask("material", taskId)') Добавить готовый материал

                .componentBox(v-else)
                  .componentName
                    strong(v-if = 'task.type === "theory"') Теория
                    strong(v-else) Задача
                  //- .taskType
                  //-   label(for='theory') Теория
                  //-     input#theory(type = 'radio', value = 'theory', v-model = "task.type")
                  //-   label(for='task') Задача
                  //-     input#task(type = 'radio', value = 'task', v-model = "task.type")

                  //- .theoryEditBox
                    .theoryComponent(
                      v-for = 'component in task.statement'
                    )
                      .button.img.delete_button(@click='task.statement.splice(task.statement.indexOf(component), 1)')
                      .theoryTextField(v-if ='component.type === "text"')
                        vue-editor.theoryText(placeholder = 'Введите текст здесь', v-model = "component.inner" :editorToolbar ='[["bold", "italic", "underline", "strike"], [{ "color": [] }, { "background": [] }], ["link", "video"], ["clean"]]')
                      .theoryText(v-if ='component.type === "img"')
                        label(for='img') Выберите картинку
                        input#img(type='file', name='img', accept='image/*', @change="onFileSelected", @click="onFileButtonClicked(tasks.indexOf(task), task.statement.indexOf(component))")
                      .theoryTextFile(v-else-if ='component.type === "file"')
                        label(for='file') Выберите PDF-Файл
                        input#img(type='file', name='file', accept='application/pdf', @change="onFileSelected", @click="onFileButtonClicked(tasks.indexOf(task), task.statement.indexOf(component))")

                    md-button.md-raised.md-primary(@click='addContent(tasks.indexOf(task), "text")') Добавить абзац

                    md-button.md-raised.md-primary(
                      @click='addContent(tasks.indexOf(task), "img")'
                      ) Добавить картинку
                    md-button.md-primary(
                      @click='addContent(tasks.indexOf(task), "file")'
                      ) Загрузить PDF-файл
                  //- .taskEditBox(v-if ="task.type === 'task'")
                    .taskAnswerBox
                      md-field.taskTypeSelect
                        label(for='taskType') Тип ответа
                        md-select#taskType(v-model='task.taskType' name='taskTypeText' @md-selected='changeAnswerType(task.taskType, taskId)')
                          md-option(value='task') Единственный ответ
                          md-option(value='multipleAnswer') Несколько ответов
                          md-option(value='multipleChoice') Множественный выбор
                          md-option(value='upload') Загрузка развернутого решения
                          md-option(value='proof') Без ответа
                      md-field(v-if='task.taskType == "task"')
                        md-input.taskAnswer(placeholder = 'Введите ответ на задачу', v-model = "task.answer")
                      span.md-body-2(v-else-if='task.taskType == "upload"') Вы сможете проверить ответ ученика в личном кабинете в разделе 'Мои темы'.
                      span.md-body-2(v-else-if='task.taskType == "proof"') Дополнительная задача не подразумевает проверку ответа. Пожалуйста, напишите развернутый ответ в секции 'Решение', что бы ученики могли проверить себя самостоятельно.
                      md-chips(v-else-if='task.taskType == "multipleAnswer"' v-model='task.answer' md-placeholder='Введите ответ и нажмите Enter...')
                      .checkboxesBox(v-else-if='task.taskType == "multipleChoice"')
                        md-field
                          label Введите вариант ответа
                          md-input(v-model='newCheckboxAnswer' placeholder='Добавить вариант ответа')
                          md-button.addMemeberButton(@click ='addCheckBoxAnswer(newCheckboxAnswer, taskId)') Добавить
                        span.md-body-2(v-if='task.options.length > 0') Отметьте правильные ответы
                        br
                        .checkboxesBoxCheckboxes(v-for ='(op, opI) in task.options' :key="opI" )
                          md-checkbox(v-model='task.answer' :value='op') {{ op }}
                          md-button.removeButton.md-accent.md-raised(@click ='task.options.splice(opI, 1); if (task.answer.findIndex(f => f === op) !== -1) task.answer.splice(task.answer.findIndex(f => f === op), 1);') X
                        //- span {{ task.answer }}

                    .md-layout-item.olympTheme2
                      md-field
                        label Выберите сложность
                        md-select.olympTheme2(v-model = "task.difficulty" placeholder="Выберите сложность")
                          md-option(v-for = '(diff, i) in difficultyList' :key="i" :value="diff") {{ diff }}
                        md-tooltip(md-direction='left') Укажите, чтобы ученикам было проще ориентироваться

                    //- label(for='difOne') Легкая
                    //-   input#difOne(type = 'radio', value = '1', v-model = "task.difficulty")
                    //- label(for='difTwo') Средняя
                    //-   input#difTwo(type = 'radio', value = '2', v-model = "task.difficulty")
                    //- label(for='difThree') Трудная
                    //-   input#difThree(type = 'radio', value = '3', v-model = "task.difficulty")

                    md-field
                      label(for='solutionType') Тип решения
                      md-select#solutionType(v-model='task.solutionType' name='solutionTypeText')
                        md-option(value='hide') Без решения
                        md-option(value='solution') Показывать решение
                        md-option(v-if ='task.taskType != "proof" && task.taskType != "upload"' value='answer') Показывать ответ
                      md-tooltip(md-direction='left') Решение показывается всем ученикам
                    md-field(v-if ='task.solutionType !== "hide" && task.solutionType !== "answer"')
                      label Решение
                      md-textarea.taskSolution(placeholder = 'Введите подробное решение вашей задачи (необязательно)', v-model = "task.solution")
            div(style="margin-top:20px")
              md-button.md-raised.md-primary(@click='addTask("theory")') Добавить теорию
              md-button.md-raised.md-primary(@click='addTask("task")') Добавить задачу
              md-button.md-primary(@click='addTask("material")') Добавить готовый материал
              md-button.md-primary(@click='addTask("block")') Добавить блок случайных задач
          md-button.md-primary(style="margin-top:20px" @click="setDone('third', 'fourth')") Следующий шаг
        md-step#fourth(md-label='Шаг №4' md-description='Оценка' :md-done.sync='fourth')
          p(style="margin-bottom: 20px") Здесь будут показываться оценки
          div(
              v-for = '(grade, i) in this.grades' :key='i'
            )
              p(style="display: inline-block; position: relative ") Оценка {{i}} за {{grade}} баллов
              img.imageButtonGrade(src = './images/clear.png' @click='gradesDelete(grade)')
          md-button.md-raised.md-primary(@click='showDrawerGrades=true') Добавить оценку
          .button.button--round.button-success.buttonPost(@click='sendTitle()')
            span {{ this.edit ? 'Обновить' : 'Опубликовать' }} тему
    .successMenu(v-if = 'this.success')
      .successMenuBox
        .successText(v-if = 'this.loading')
          strong.md-display-3.titleTokenText Пожалуйста, подождите
          br
          span.md-title Мы {{ this.edit ? 'обновляем' : 'публикуем' }} вашу тему. Это может занять некоторое время.
          .vld-parent
            loading(
              :active.sync = "this.loading"
              :is-full-page = "this.falseVar"
              color = "#763dca"
              loader = 'dots'
              :opacity = 0
              :width = 150)
        .div(v-else)
          md-dialog(:md-active.sync='showDialog')
            md-dialog-title Урок опубликован!
            div(style='position:relative; margin: 0px 20px 20px 20px')
              span.md-title Ключ темы:
              strong.md-title  {{ this.token }}
              br
              p.md-text(style="position:relative;font-size:18px;margin-top:30px;") Поделитесь ключом со своими учениками, что бы они могли подключиться к вашему уроку!
            md-dialog-actions
              md-button.md-primary(@click='showDialog = false') Понятно
              md-button.md-primary(@click='showSnackbarCopy = true, $clipboard("https://mathplace.page.link?apn=com.math4.user.mathplace&ibi=com.example.ios&link=https%3A%2F%2Fmathplace.ru%2Flesson%2Folympiad%3D" + this.token)') Скопировать ссылку на урок
              md-button.md-primary(:to="'/lesson/olympiads=' + this.token",@click='showDialog = false') Перейти в урок
    .materialMenu(v-if = 'materialMenuShow')
      md-dialog(:md-active.sync='materialMenuShow')
        md-dialog-title Выберите тему
        .materialMenuField
          .md-layout.md-gutter
            .md-layout-item
              md-field
                label(for='theme') Тема
                md-select#theme(v-model='selectedMaterialTheme', name='theme' @md-selected = 'selectTopic(selectedMaterialTheme)')
                  md-optgroup(label='Ваши темы')
                    md-option(v-for = '(topic, i) in topicList' v-if = 'topic.collection === "user"' :key = 'topic.name' :value='topic.name') {{ topic.name }}
                  md-optgroup(label='Темы MathPlace')
                    md-option(v-for = '(topic, i) in topicList' v-if = 'topic.collection === "mathplace"' :key = 'topic.name' :value='topic.name') {{ topic.name }}
        .materialMenuTaskBox(v-if = 'materialMenuTaskSectionShow')
          .emptyTopicMessage(v-if = 'topicList[selectedMaterialThemeIndex].tasks.length === 0')
            span Тут пока нет задач!
          .materialMenuCards(v-else)
              md-card.materialContent(v-for ='(task, taskIndex) in topicList[selectedMaterialThemeIndex].tasks' :key ='taskIndex' v-if ='!(materialBlockIndex !== -1 && task.type === "theory")' md-with-hover='')
                md-ripple
                  md-card-header
                    .md-title(v-if = 'task.type === "theory"') Теория
                    .md-title(v-else) Задача №{{ task.taskInd }}
                  md-card-content.materialContentText
                    span {{ task.textPreview }}
                  md-card-actions
                    md-button(@click ='addTask("preMadeMaterial", taskIndex)') Добавить
        md-dialog-actions
          md-button.md-primary.buttonNext(@click='materialMenuShow = false') Отмена
      //- .materialMenuBox
      //-   .materialMenuText
      //-     span.md-headline Выберите тему
      //-   .materialMenuField
      //-     .md-layout.md-gutter
      //-       .md-layout-item
      //-         md-field
      //-           label(for='theme') Тема
      //-           md-select#theme(v-model='selectedMaterialTheme', name='theme' @md-selected = 'selectTopic(selectedMaterialTheme)')
      //-             md-optgroup(label='Ваши темы')
      //-               md-option(v-for = '(topic, i) in topicList' v-if = 'topic.collection === "user"' :key = 'topic.name' :value='topic.name') {{ topic.name }}
      //-             md-optgroup(label='Темы MathPlace')
      //-               md-option(v-for = '(topic, i) in topicList' v-if = 'topic.collection === "mathplace"' :key = 'topic.name' :value='topic.name') {{ topic.name }}
      //-   .materialMenuTaskBox(v-if = 'materialMenuTaskSectionShow')
      //-     .emptyTopicMessage(v-if = 'topicList[selectedMaterialThemeIndex].tasks.length === 0')
      //-       span Тут пока нет задач!
      //-     .materialMenuCards(v-else)
      //-         md-card.materialContent(v-for ='(task, taskIndex) in topicList[selectedMaterialThemeIndex].tasks' :key ='taskIndex' v-if ='!(materialBlockIndex !== -1 && task.type === "theory")' md-with-hover='')
      //-           md-ripple
      //-             md-card-header
      //-               .md-title(v-if = 'task.type === "theory"') Теория
      //-               .md-title(v-else) Задача №{{ task.taskInd }}
      //-             md-card-content.materialContentText
      //-               span {{ task.textPreview }}
      //-             md-card-actions
      //-               md-button(@click ='addTask("preMadeMaterial", taskIndex)') Добавить
      //-   .materialMenuCancel
      //-     .button.button--round.button-warning(@click ='materialMenuShow = false')  Отмена

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required, minLength, maxLength, between, requiredUnless } from 'vuelidate/lib/validators'
import firebase from 'firebase/app'
import Loading from 'vue-loading-overlay'
import { Datetime } from 'vue-datetime'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'firebase/storage'
import { VueEditor } from 'vue2-editor'
import { Settings } from 'luxon'

export default {
  components: {
    Loading,
    VueEditor,
    Datetime
  },
  data () {
    return {
      name: '',
      class: '',
      cnt_task: 0,
      items: 0,
      like: 0,
      private: true,
      tasks: [],
      grades: {},
      theme: 'Школа',
      themeList: [
        'Школа',
        'Экзамены',
        'Геометрия',
        'Алгебра',
        'Комбинаторика',
        'Логика',
        'Графы'
      ],
      difficultyList: [
        'Легкая',
        'Средняя',
        'Сложная'
      ],
      currTaskId: 0,
      currComponentId: 0,
      success: false,
      token: 'null',
      newNameGrade: '',
      newPoint: '',
      active: 'first',
      first: false,
      second: false,
      third: false,
      fourth: false,
      loading: false,
      falseVar: false,
      classCnt: '',
      showCreateTask: false,
      currentEditTask: -1,
      showDialog: false,
      submitStatus: null,
      myTopicLoading: false,
      edit: false,
      topicList: [],
      showDrawerGrades: false,
      showSnackbarCopy: false,
      topicListLoading: false,
      materialMenuShow: false,
      materialMenuTaskSectionShow: false,
      selectedMaterialTheme: '',
      selectedMaterialThemeIndex: 0,
      materialBlockIndex: -1,
      newCheckboxAnswer: '',
      timeStartOn: false,
      timeFinishOn: false,
      timeStart: '',
      timeFinish: '',
      isHiddenResults: false
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(30)
    },
    classCnt: {
      required,
      between: between(1, 11)
    },
    tasks: {
      $each: {
        statement: { required: requiredUnless(n => n.type === 'block') },
        answer: { required: requiredUnless(n => (n.type === 'block' || n.type === 'theory' || n.taskType === 'upload' || n.taskType === 'proof')) },
        tasks: {
          $each: {
            statement: { required: requiredUnless(n => n.type === 'block') },
            answer: { required: requiredUnless(n => (n.type === 'block' || n.type === 'theory' || n.taskType === 'upload' || n.taskType === 'proof')) }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['sendTopic', 'addMyTopicsToList', 'fetchMyTopic', 'fetchTopicList', 'fetchCustomTopic']),
    setDone (id, index) {
      this[id] = true

      console.log('setDone')
      // this.secondStepError = null

      if (index) {
        this.active = index
      }
    },
    gradesDelete (grade) {
      console.log('DeleteGrade')
      this.grades[grade] = 0
      // this.grades.delete(grade
      delete this.grades[grade]
      console.log(this.grades)
    },
    addGrade () {
      if(this.grades[this.newNameGrade] !== ''){
        this.grades[this.newNameGrade] = this.newPoint
        this.showDrawerGrades = false
      }else{
        alert("Такая оценка уже есть")
      }
      this.newPoint = ''
      this.newNameGrade = ''
    },
    addCheckBoxAnswer (ans, i) {
      this.newCheckboxAnswer = ''
      if (i.options.findIndex(f => f === ans) === -1) i.options.push(ans)
    },
    changeAnswerType (type, i) {
      if (type === 'multipleChoice' || type === 'multipleAnswer') i.answer = []
      else if (type === 'task') i.answer = ''
    },
    goToProfile () {
      this.$router.push('/profile')
    },
    selectTopic (task) {
      if (task === '') {
        alert('Пожалуйста, выберите тему!')
        return
      }
      var i = this.topicList.map(e => e.name).indexOf(task)
      this.selectedMaterialThemeIndex = i
      this.materialMenuTaskSectionShow = true
    },
    async joinCourse (id) {
      await this.fetchCustomTopic(id)
      var res = this.getCustomTopic
      if (res !== null) {
        this.$router.push('/lesson/tasks=' + id)
      } else {
        this.customTopicId = ''
        this.placeholder = 'Тема не найдена! Пожалуйста, убедитесь в правильности написании ключа'
        alert('Тема не найдена! Пожалуйста, убедитесь в правильности написании ключа')
      }
    },
    async addTask (type, ind) {
      var task
      if (type === 'material') {
        this.selectedMaterialThemeIndex = 0
        this.materialMenuShow = true
        this.topicListLoading = true
        await this.fetchTopicList()
        this.topicList = this.getTopicList
        this.topicListLoading = false
        if (ind === undefined) this.materialBlockIndex = -1
        else this.materialBlockIndex = ind
      } else if (type === 'preMadeMaterial') {
        this.materialMenuShow = false
        task = this.topicList[this.selectedMaterialThemeIndex].tasks[ind]
        task.type = 'preMade'
        task.topicName = this.topicList[this.selectedMaterialThemeIndex].name
        if (this.materialBlockIndex === -1) this.tasks.push(task)
        else this.tasks[this.materialBlockIndex].tasks.push(task)
      } else if (type === 'block') {
        task = {
          type: 'block',
          allTask: 0,
          choiceTask: 1,
          tasks: []
        }
        this.tasks.push(task)
      } else {
        task = {
          statement: [{
            type: 'text',
            inner: ''
          }],
          type: type,
          answer: '',
          solutionType: 'hide',
          solution: '',
          difficulty: 'Легкая',
          taskType: 'task',
          options: []
        }
        // Если индекс не передается, то пушим в конец, а если передается, то пушим в блок
        if (ind !== undefined) {
          this.tasks[ind].tasks.push(task)
          this.currentEditTask = this.tasks[ind].tasks[this.tasks[ind].tasks.length - 1]
        } else {
          this.tasks.push(task)
          this.currentEditTask = this.tasks[this.tasks.length - 1]
        } this.showCreateTask = true
      }
    },
    addContent (id, type) {
      var data = {
        type: type,
        inner: ''
      }
      if (typeof id === 'number') this.tasks[id].statement.push(data)
      else this.tasks[id[0]].tasks[id[1]].statement.push(data)
    },
    editTask (task) {
      this.currentEditTask = task
      this.showCreateTask = true
    },
    nullifyContent (id) {
      this.tasks[id].statement = []
    },
    onFileButtonClicked (taskId, componentId) {
      this.currTaskId = taskId
      this.currComponentId = componentId
    },
    onFileSelected (event) {
      this.currentEditTask.statement[this.currComponentId].inner = event.target.files[0]
    },
    async generateToken (length) {
      var a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('')
      var b = []

      var succes = false
      while (!succes) {
        for (var i = 0; i < length; i++) {
          var j = (Math.random() * (a.length - 1)).toFixed(0)
          b[i] = a[j]
        }
        try {
          succes = await this.isTokenValid(b.join(''))
        } catch (error) {
          b = ['a', 'a', 'a', 'a', 'a']
          succes = true
          throw error
        }
      }
      return b.join('')
    },
    async sendTitle () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log(this.$v)
        this.submitStatus = 'error'
        alert('Проверьте правильность заполнения полей!')
        return
      }

      this.success = true
      this.loading = true
      this.theme = this.theme.toLowerCase()
      this.items = 0
      this.cnt_task = 0
      for (let i = 0; i < this.tasks.length; i++) { // Считаем количество задач, учитывая блоки
        if (this.tasks[i].type === 'task') this.cnt_task++
        if (this.tasks[i].type === 'block') {
          this.items += Number(this.tasks[i].choiceTask) - 1
          this.cnt_task += Number(this.tasks[i].choiceTask)
        } this.items++
      }
      var data = {
        author: this.getUser.id,
        like: 0,
        name: this.name,
        public: !this.private,
        isHiddenResults: this.isHiddenResults,
        theme: this.theme,
        cnt_task: this.cnt_task,
        items: this.items,
        members: [],
        class: this.classCnt,
        tasks: [],
        created: firebase.firestore.Timestamp.now()
      } 
      // Время начала и конца
      if (this.timeStartOn && this.timeStart !== null) data.time_start = firebase.firestore.Timestamp.fromDate(this.timeStart)
      if (this.timeFinishOn && this.timeFinish !== null) data.time_end = firebase.firestore.Timestamp.fromDate(this.timeFinish)
      // console.log(data.time_start, data.time_end)
      // Парсинг задач
      for (let i = 0; i < this.tasks.length; i++) {
        var task = await this.parseTask(this.tasks[i])
        data.tasks.push(task)
      }

      console.log(this.grades)

      if(Object.keys(this.grades).length>0){
        var sendGrades = {
          grades: this.grades,
        }
        console.log(sendGrades)
        data.grades = this.grades
      }

      var token
      if (!this.edit) token = await this.generateToken(5)
      else token = this.token
      var sendInformation = {
        token: token,
        title: data
      }
      this.token = token
      console.log(sendInformation)
      try {
        await this.sendTopic(sendInformation)
      } catch (error) {
        console.log(error)
      }
      this.addMyTopicsToList(token)
      this.loading = false
      this.showDialog = true
    },
    async isTokenValid (token) {
      const db = firebase.firestore()
      var result
      await db.collection('olympiads').doc(token)
        .get().then(
          doc => {
            if (doc.data() !== undefined) {
              result = false
            } else result = true
          })
      return result
    },
    async parseTask (rawTask) {
      var task = {}
      if (rawTask.type !== 'block') {
        for (let j = 0; j < rawTask.statement.length; j++) {
          // Обработка картинок и файлов
          if ((rawTask.statement[j].type === 'img' || rawTask.statement[j].type === 'file') && typeof rawTask.statement[j].inner !== 'string') {
            // Чтение файла
            let file = rawTask.statement[j].inner
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
            rawTask.statement[j].inner = imageUrl.toString()
          }
        }
      }
      // Обработка решения задачи
      if (rawTask.solutionType === 'hide') rawTask.solution = 'hide' // Тупой костыль, но без него никак
      else if (rawTask.solutionType === 'answer') rawTask.solution = 'null'
      // hide в этом поле означает, что надо показывать ответ вместо решения
      // Обработка сложности
      if (rawTask.difficulty === 'Легкая') rawTask.difficulty = 1
      else if (rawTask.difficulty === 'Средняя') rawTask.difficulty = 2
      else rawTask.difficulty = 3
      // Обработка типов задач
      if (rawTask.type === 'task') rawTask.type = rawTask.taskType
      // Обработка блоков задач
      if (rawTask.type === 'block') {
        let self = this
        rawTask.allTask = rawTask.tasks.length
        for (let i = 0; i < rawTask.tasks.length; i++) {
          rawTask.tasks[i] = await self.parseTask(rawTask.tasks[i])
        }
      }
      // Обработка заготовленных заданий
      if (rawTask.type === 'preMade') task = rawTask.originData
      else task = rawTask

      return task
    }
  },
  async mounted () {
    Settings.defaultLocale = 'ru'
    if (this.$route.params.topicId !== undefined) {
      this.myTopicLoading = true
      await this.fetchMyTopic(this.$route.params.topicId)
      var myTopic = this.getMyTopic
      if (myTopic.author !== this.getUser.id) this.$router.push('/customTitle')
      else {
        this.edit = true
        this.name = myTopic.name
        this.classCnt = myTopic.class
        this.cnt_task = myTopic.cnt_task
        this.items = myTopic.cnt_items
        this.private = myTopic.private
        this.theme = myTopic.theme
        this.isHiddenResults = myTopic.isHiddenResults
        if (myTopic.time_start !== undefined) {
          this.timeStartOn = true
          this.timeStart = myTopic.time_start.toDate()
        } if (myTopic.time_end !== undefined) {
          this.timeFinishOn = true
          this.timeFinish = myTopic.time_end.toDate()
        }
        // Парсинг задач
        for (let i = 0; i < myTopic.tasks.length; i++) {
          this.tasks.push(myTopic.tasks[i])
          if (myTopic.tasks[i].type !== 'theory' && myTopic.tasks[i].type !== 'block') {
            this.tasks[i].taskType = myTopic.tasks[i].type
            this.tasks[i].type = 'task'
          } if (myTopic.tasks[i].type === 'block') {
            for (let j = 0; j < myTopic.tasks[i].tasks.length; j++) {
              var rawBlockTask = myTopic.tasks[i].tasks[j]
              rawBlockTask.taskType = rawBlockTask.type
              rawBlockTask.type = 'task'
            }
          }
        }
        this.token = this.$route.params.topicId
      }
      this.myTopicLoading = false
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getMyTopic', 'getTopicList', 'getCustomTopic'])
  }
}
</script>

<style lang="stylus" scoped>
  .task 
    cursor pointer
  .buttonNext
    margin-top:20px; 
    margin-left: 0px;
  .overflowBox
    max-height 60vh
    overflow auto
  .img-tooltip
    position relative
    height auto
    width auto
  .imageButton
    width 25px
    float right
  .imageButtonGrade
    position relative
    width 25px
    display inline-block
    // float right
 .checkboxBox
    position relative
    width 300px
    height auto
    display block
  .vdatetime
    width 20vw
    float right
    input
      border-color #000000
  .removeButton
    margin-left 3%
    min-width 0
    width 30px
    height 30px
  .taskAnswerBox
    margin-bottom 3%
  .taskTypeSelect
    margin-top 5%
  #taskType
    max-width 330px
  .materialContentText
    max-height 15vh
    min-height 15vh
    overflow hidden
  .materialContent
    max-height 30vh
    margin-left 5%
    margin-top 40px
    width 40%
    float left
  .materialMenuTaskBox
    max-height 40vh
    overflow auto
  .materialMenuBox
    background-color #FFFFFF
    margin-top 5%
    margin-left 15%
    margin-right 15%
    min-width 350px
    border 2px #000000 solid
    border-radius 10px
    padding 5%
    padding-left 10%
    padding-right 10%
    text-align center
    .button
      font-size 20pt
      margin 2%
    @media screen and (max-width: 600px)
      margin 1%
      margin-top 20%
  .materialMenuText
    font-size 1.3em
    padding-bottom 1%

  .materialMenuField
    padding 20px
    md-field
      border-color #000000
      border-width 1%
  .materialMenu
    z-index 5
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .content-wrapper
    min-height 0
  textarea
    margin-bottom auto
  body
    line-height auto !important
  .md-input
    margin-bottom 1%
  .componentName
    font-size 2em
    padding 1%
    padding-left 0
    padding-top 0
  .taskAnswer
    border-radius 10px
    padding 1%
    margin-left 0%
  .classCnt
    position relative
    width 300px
  .buttonAddContent
    margin 1%
  #isPrivate
    border-width 3px
  .vld-parent
    position relavite
    padding 5%
    padding-top 10%
  .titleTokenText
    color #000000
    font-size 1.4em
  .successText
    padding 10%
  .successGoButton
    padding 5%
    padding-bottom 0
  .successMenu
    z-index 5
    font-family Roboto, Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif
    font-size 2vw
    background-color rgba(0, 0, 0, .5)
    width 100%
    height 100%
    position fixed
    top 0
    left 0
  .successButton
    width auto
    height 20%
  .md-avatar
    margin: 36px;

  .successMenuBox
    text-align center
    background-color #FFFFFF
    margin-top 10%
    margin-left 20%
    margin-right 20%
    min-width 350px
    @media screen and (max-width: 600px)
      margin 1%
      margin-top 20%
      font-size 12pt

  .editBox
    position relative
    margin-top 50px
    margin-left 25%
    margin-right 25%
    margin-bottom 10%
    background-color #FFFFFF
    box-shadow 0 0 5px rgba(0,0,0,0.5)
    border-radius 20px 20px 20px 20px
    @media screen and (max-width: 1000px)
      margin 1%
      margin-top 3%

  .theoryComponent
    position relative
    width 90%
    margin-bottom 20px

  .theoryTextField
    position relative
    height auto
    width 95%
    margin-bottom 0px
    display inline-block
    margin-top 0p

  .marginBox
    position relative
    margin 3%
    margin-left 0

  .olympName
    position relative
    width 300px
    height auto
    margin-bottom 30px
    margin-top 20px
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 0.8em
  .olympPrivate
    width auto

  .olympTitle
    position relative
    width auto
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 2.5em
    font-weight 700

  .buttonPost
    position relative
    height 50px
    border: 2px solid #763DCA;
    border-radius 50px
    font-weight 550
    color #763DCA
    background-color #FFFFFF
    opacity 1.0
    margin-right 0px
    margin-top 25px
    margin-bottom 20px
    transition: 0.6s;
    text-align center
    float right
    padding 13px
    vertical-align middle
  .buttonPost:hover
    transition: 0.6s;
    color #FFFFFF
    background-color #763DCA

  .olympTheme
    position relative
    height auto
    width 100px
    max-width: 300px;
    display block
    font-family -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
    font-size 1.1em
    text-align center
    vertical-align middle
    option
      font-size 0.8em
      margin 1%
    font-size 1em
    padding 0

  .olympTheme2
    position relative
    max-width: 300px

  .delete_button
      position relative
      display inline-block
      width 32px
      height 32px
      float right
      background-image url(images/clear.png)
      background-size 100%

  .taskSolution
    position relative
    width 600px

  .buttonAdd
    position relative
    margin 10px
  .taskType
    position relative
    display inline-block

  label
    justify-items left
  .task
    position relative
    border 1px solid #999
    border-radius 10px
    margin-top 20px
    padding 3%
  .taskName
    margin 1%
</style>
