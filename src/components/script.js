/* Когда страница полностью прогрузится */
$(document).ready(function () {
    /* Массив с ссылками на картинки тем */
    AllTopics = ["#ff0000", "#ff00ff", "#00ff00", "#00ffff", "#ffffff", "#ffaaff"];
    /* Позиция картинки из AllTopics для каждого из 4 блоков */
    Topics = [0, 1, 2, 3];
    /* Позиции блоков на местах */
    TopicsPosition = [0, 1, 2, 3];
    /* Закончилась ли анимация */
    DidAnimationEnd = true;
    /* Правильный ответ был дан */
    CorrectAnswerWasGiven = false;
    /* Сейчас показывается задача  */
    IsTaskNow = true;
    NextTopic = 4;
    PreviousTopic = 5;

    /* При клике на ссылку */
    $("a").on("click", function (event) {
        event.preventDefault();
        /* Получаем саму ссылку */
        var id = $(this).attr('href');
        /* Если ссылка якорь */
        if (id[0] == "#") {
            /* Получаем высоту где находится блок якоря */
            var top = $(id).offset().top;
            /* Анимируем переход на высоту где находится блок якоря */
            $("body,html").animate({ scrollTop: top }, 1000);
        }
    });

    /* При клике на задачу */
    $("#TaskText").on("click", function (event) {
        if (DidAnimationEnd == false) {
            return;
        }
        DidAnimationEnd = false;
        $("#TaskText").animate({ left: "35%", width: "0%" }, 500);
        setTimeout(function () {
            if (IsTaskNow == true) {
                $("#TaskText").css("background-color", "#ff0000")
                IsTaskNow = false;
            } else {
                $("#TaskText").css("background-color", "#00ff00")
                IsTaskNow = true;
            }
            $("#TaskText").animate({ left: "10%", width: "50%" }, 500);
            DidAnimationEnd = true;
        }, 500)
    });

    /* При клике на блок для ввода ответа */
    $("#TaskIn").on("click", function (event) {
        /* Изменяем цвет шрифта на черный */
        $("#TaskIn").css("color", "#000000");
    });
    /* При клике на кнопку отправки ответа */
    $("#TaskButton").on("click", function (event) {
        /* Выходим если анимация еще не закончилась */
        if (DidAnimationEnd == false) {
            return;
        }
        /* Получаем значение из поля ввода */
        var value = $("#TaskIn").val();
        /* Если в поле что-то введено */
        if (value != "") {
            /* Если ответ правильный */
            if (value == "10") {
                /* Выход если правильный ответ уже был дан */
                if (CorrectAnswerWasGiven) {
                    return;
                }
                /* Перекрашиваем ответ в зеленый */
                $("#TaskIn").css("color", "#008000");
                /* Правильный ответ был дан */
                CorrectAnswerWasGiven = true;
                /* Выключаем возможность изменить ответ */
                document.getElementById("TaskIn").disabled = "disabled";
                /* Анимация не закончилась */
                DidAnimationEnd = false;
                /* Устанавливаем положение "галочки" под окном пользователя */
                $("#TaskResultSucsessful").css("top", window.innerHeight + window.pageYOffset);
                /* Показываем "галочку" */
                $("#TaskResultSucsessful").css("display", "block");
                /* Анимируем поднятие "галочки" */
                $("#TaskResultSucsessful").animate({ top: (window.pageYOffset + parseInt(window.innerHeight * 0.15)) }, 500);
                /* Устанавливаем таймер на время после анимации поднятия (выполнится через 2 секунды) */
                setTimeout(function () {
                    /* Анимируем возвращение "галочки" под экран пользователя */
                    $("#TaskResultSucsessful").animate({ top: window.innerHeight + window.pageYOffset }, 500);
                    /* Устанавливаем таймер на время после анимация возвращения (выполнится через 0,5 секудны) */
                    setTimeout(function () {
                        /* Выключаем видимость "галочки" */
                        $("#TaskResultSucsessful").css("display", "none");
                        /* Анимация закончилась */
                        DidAnimationEnd = true;
                    }, 500);
                }, 2000);
            } else {
                /* Перекрашиваем ответ в красный */
                $("#TaskIn").css("color", "#A00000");
                /* Анимация не закончилась */
                DidAnimationEnd = false;
                /* Устанавливаем положение "крестика" под окном пользователя */
                $("#TaskResultnotSucsessful").css("top", window.innerHeight + window.pageYOffset);
                /* Показываем "крестика" */
                $("#TaskResultnotSucsessful").css("display", "block");
                /* Анимируем поднятие "крестика" */
                $("#TaskResultnotSucsessful").animate({ top: (window.pageYOffset + parseInt(window.innerHeight * 0.15)) }, 500);
                /* Устанавливаем таймер на время после анимации поднятия (выполнится через 2 секунды) */
                setTimeout(function () {
                    /* Анимируем возвращение "крестика" под экран пользователя */
                    $("#TaskResultnotSucsessful").animate({ top: window.innerHeight + window.pageYOffset }, 500);
                    /* Устанавливаем таймер на время после анимация возвращения (выполнится через 0,5 секудны) */
                    setTimeout(function () {
                        /* Выключаем видимость "крестика" */
                        $("#TaskResultnotSucsessful").css("display", "none");
                        /* Анимация закончилась */
                        DidAnimationEnd = true;
                    }, 500);
                }, 2000);
            }
        }
    });

    /* При клике на кнопку следующей темы */
    $("#NextTopics").on("click", function (event) {
        /* Выходим если анимация закончилась */
        if (DidAnimationEnd == false) {
            return;
        }
        for (i = 0; i <= 3; i++) {
            /* Если предыдущая позиция блока больше -1 */
            if (TopicsPosition[i] - 1 >= -1) {
                /* Уменьшаем позицию на 1 */
                TopicsPosition[i] -= 1;
            } else {
                PreviousTopic = Topics[i]
                Topics[i] = NextTopic;

                if (NextTopic + 1 <= 5) {
                    NextTopic += 1;
                } else {
                    NextTopic = 0
                }

                switch (i) {
                    case 0:
                        $("#FirstTopic").css("top", "10%");
                        $("#FirstTopic").css("left", "100%");
                        $("#FirstTopic").css("background-color", AllTopics[Topics[i]]);
                        break;
                    case 1:
                        $("#SecondTopic").css("top", "10%");
                        $("#SecondTopic").css("left", "100%");
                        $("#SecondTopic").css("background-color", AllTopics[Topics[i]]);
                        break;
                    case 2:
                        $("#ThirdTopic").css("top", "10%");
                        $("#ThirdTopic").css("left", "100%");
                        $("#ThirdTopic").css("background-color", AllTopics[Topics[i]]);
                        break;
                    case 3:
                        $("#FourthTopic").css("top", "10%");
                        $("#FourthTopic").css("left", "100%");
                        $("#FourthTopic").css("background-color", AllTopics[Topics[i]]);
                        break;
                }
                /* Устанавливаем позицию 2 */
                TopicsPosition[i] = 2;
            }
        }
        /* Анимация начинается */
        DidAnimationEnd = false;
        /* Анимируем перемещение первого блока на предыдущее место */
        $("#FirstTopic").animate({ top: (25 - (TopicsPosition[0] * 5)) + "%", left: (10 + TopicsPosition[0] * 30) + "%" }, 750);
        /* Анимируем перемещение второго блока на предыдущее место */
        $("#SecondTopic").animate({ top: (25 - (TopicsPosition[1] * 5)) + "%", left: (10 + TopicsPosition[1] * 30) + "%" }, 750);
        /* Анимируем перемещение третьего блока на предыдущее место */
        $("#ThirdTopic").animate({ top: (25 - (TopicsPosition[2] * 5)) + "%", left: (10 + TopicsPosition[2] * 30) + "%" }, 750);
        /* Анимируем перемещение четвертого блока на предыдущее место */
        $("#FourthTopic").animate({ top: (25 - (TopicsPosition[3] * 5)) + "%", left: (10 + TopicsPosition[3] * 30) + "%" }, 750);
        /* Устанавливаем таймер на время после анимации (выполнится через 0,8 секунд) */
        setTimeout(function () {
            /* Анимация закончилась */
            DidAnimationEnd = true;
        }, 800);
    });

    /* При клике на кнопку следующей темы */
    $("#PreviousTopics").on("click", function (event) {
        /* Выходим если анимация закончилась */
        if (DidAnimationEnd == false) {
            return;
        }
        /* Пробегаем по всем блокам */
        for (i = 0; i <= 3; i++) {
            /* Если следующая позиция блока меньше 3 */
            if (TopicsPosition[i] + 1 <= 3) {
                /* Увеличиваем позицию на 1 */
                TopicsPosition[i] += 1;
            } else {
                NextTopic = Topics[i]
                Topics[i] = PreviousTopic;

                if (PreviousTopic - 1 >= 0) {
                    PreviousTopic -= 1;
                } else {
                    PreviousTopic = 5
                }
                /* Переносим блок на -1 позицию */
                switch (i) {
                    case 0:
                        $("#FirstTopic").css("top", "30%");
                        $("#FirstTopic").css("left", "-20%");
                        $("#FirstTopic").css("background-color", AllTopics[Topics[i]]);
                        break;
                    case 1:
                        $("#SecondTopic").css("top", "30%");
                        $("#SecondTopic").css("left", "-20%");
                        $("#SecondTopic").css("background-color", AllTopics[Topics[i]]);
                        break;
                    case 2:
                        $("#ThirdTopic").css("top", "30%");
                        $("#ThirdTopic").css("left", "-20%");
                        $("#ThirdTopic").css("background-color", AllTopics[Topics[i]]);
                        break;
                    case 3:
                        $("#FourthTopic").css("top", "30%");
                        $("#FourthTopic").css("left", "-20%");
                        $("#FourthTopic").css("background-color", AllTopics[Topics[i]]);
                        break;
                }
                /* Устанавливаем позицию блока на 0 */
                TopicsPosition[i] = 0;
            }
        }
        /* Анимация начинается */
        DidAnimationEnd = false;
        /* Анимируем перемещение первого блока на следующее место */
        $("#FirstTopic").animate({ top: (25 - (TopicsPosition[0] * 5)) + "%", left: (10 + TopicsPosition[0] * 30) + "%" }, 750);
        /* Анимируем перемещение второго блока на следующее место */
        $("#SecondTopic").animate({ top: (25 - (TopicsPosition[1] * 5)) + "%", left: (10 + TopicsPosition[1] * 30) + "%" }, 750);
        /* Анимируем перемещение третьего блока на следующее место */
        $("#ThirdTopic").animate({ top: (25 - (TopicsPosition[2] * 5)) + "%", left: (10 + TopicsPosition[2] * 30) + "%" }, 750);
        /* Анимируем перемещение четверного блока на следующее место */
        $("#FourthTopic").animate({ top: (25 - (TopicsPosition[3] * 5)) + "%", left: (10 + TopicsPosition[3] * 30) + "%" }, 750);
        /* Устанавливаем таймер на время после анимации (выполнится через 0,8 секунд) */
        setTimeout(function () {
            /* Анимация закончилась */
            DidAnimationEnd = true;
        }, 800);
    });

    /* Устанавливаем таймер для проверки (y) координаты окна пользователя*/
    var t = setInterval(function () {
        /* Если (y) координата окна пользователя больше (y) координаты блока Фитч */
        if (window.pageYOffset > parseInt($("#Feature").css("top"))) {
            /* Унимируем появление кнопки наверх */
            $("#BackToMenuButton").animate({ top: "85%", left: "92.5%", width: "5%", height: "10%" }, 250);
        } else {
            /* Унимируем исчезновение кнопки наверх */
            $("#BackToMenuButton").animate({ top: "100%", left: "95%", width: "0%", height: "0%" }, 250);
        }
    }, 500);
});