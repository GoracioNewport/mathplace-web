/* eslint-disable */
$(document).ready(function () {
    /* ������ � �������� �� �������� ��� */
    AllTopics = ["#ff0000", "#ff00ff", "#00ff00", "#00ffff", "#ffffff", "#ffaaff"];
    /* ������� �������� �� AllTopics ��� ������� �� 4 ������ */
    Topics = [0, 1, 2, 3];
    /* ������� ������ �� ������ */
    TopicsPosition = [0, 1, 2, 3];
    /* ����������� �� �������� */
    DidAnimationEnd = true;
    /* ���������� ����� ��� ��� */
    CorrectAnswerWasGiven = false;
    /* ������ ������������ ������  */
    IsTaskNow = true;
    NextTopic = 4;
    PreviousTopic = 5;

    /* ��� ����� �� ������ */
    $("a").on("click", function (event) {
        event.preventDefault();
        /* �������� ���� ������ */
        var id = $(this).attr('href');
        /* ���� ������ ����� */
        if (id[0] == "#") {
            /* �������� ������ ��� ��������� ���� ����� */
            var top = $(id).offset().top;
            /* ��������� ������� �� ������ ��� ��������� ���� ����� */
            $("body,html").animate({ scrollTop: top }, 1000);
        }
    });

    /* ��� ����� �� ������ */
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

    /* ��� ����� �� ���� ��� ����� ������ */
    $("#TaskIn").on("click", function (event) {
        /* �������� ���� ������ �� ������ */
        $("#TaskIn").css("color", "#000000");
    });
    /* ��� ����� �� ������ �������� ������ */
    $("#TaskButton").on("click", function (event) {
        /* ������� ���� �������� ��� �� ����������� */
        if (DidAnimationEnd == false) {
            return;
        }
        /* �������� �������� �� ���� ����� */
        var value = $("#TaskIn").val();
        /* ���� � ���� ���-�� ������� */
        if (value != "") {
            /* ���� ����� ���������� */
            if (value == "10") {
                /* ����� ���� ���������� ����� ��� ��� ��� */
                if (CorrectAnswerWasGiven) {
                    return;
                }
                /* ������������� ����� � ������� */
                $("#TaskIn").css("color", "#008000");
                /* ���������� ����� ��� ��� */
                CorrectAnswerWasGiven = true;
                /* ��������� ����������� �������� ����� */
                document.getElementById("TaskIn").disabled = "disabled";
                /* �������� �� ����������� */
                DidAnimationEnd = false;
                /* ������������� ��������� "�������" ��� ����� ������������ */
                $("#TaskResultSucsessful").css("top", window.innerHeight + window.pageYOffset);
                /* ���������� "�������" */
                $("#TaskResultSucsessful").css("display", "block");
                /* ��������� �������� "�������" */
                $("#TaskResultSucsessful").animate({ top: (window.pageYOffset + parseInt(window.innerHeight * 0.15)) }, 500);
                /* ������������� ������ �� ����� ����� �������� �������� (���������� ����� 2 �������) */
                setTimeout(function () {
                    /* ��������� ����������� "�������" ��� ����� ������������ */
                    $("#TaskResultSucsessful").animate({ top: window.innerHeight + window.pageYOffset }, 500);
                    /* ������������� ������ �� ����� ����� �������� ����������� (���������� ����� 0,5 �������) */
                    setTimeout(function () {
                        /* ��������� ��������� "�������" */
                        $("#TaskResultSucsessful").css("display", "none");
                        /* �������� ����������� */
                        DidAnimationEnd = true;
                    }, 500);
                }, 2000);
            } else {
                /* ������������� ����� � ������� */
                $("#TaskIn").css("color", "#A00000");
                /* �������� �� ����������� */
                DidAnimationEnd = false;
                /* ������������� ��������� "��������" ��� ����� ������������ */
                $("#TaskResultnotSucsessful").css("top", window.innerHeight + window.pageYOffset);
                /* ���������� "��������" */
                $("#TaskResultnotSucsessful").css("display", "block");
                /* ��������� �������� "��������" */
                $("#TaskResultnotSucsessful").animate({ top: (window.pageYOffset + parseInt(window.innerHeight * 0.15)) }, 500);
                /* ������������� ������ �� ����� ����� �������� �������� (���������� ����� 2 �������) */
                setTimeout(function () {
                    /* ��������� ����������� "��������" ��� ����� ������������ */
                    $("#TaskResultnotSucsessful").animate({ top: window.innerHeight + window.pageYOffset }, 500);
                    /* ������������� ������ �� ����� ����� �������� ����������� (���������� ����� 0,5 �������) */
                    setTimeout(function () {
                        /* ��������� ��������� "��������" */
                        $("#TaskResultnotSucsessful").css("display", "none");
                        /* �������� ����������� */
                        DidAnimationEnd = true;
                    }, 500);
                }, 2000);
            }
        }
    });

    /* ��� ����� �� ������ ��������� ���� */
    $("#NextTopics").on("click", function (event) {
        /* ������� ���� �������� ����������� */
        if (DidAnimationEnd == false) {
            return;
        }
        for (i = 0; i <= 3; i++) {
            /* ���� ���������� ������� ����� ������ -1 */
            if (TopicsPosition[i] - 1 >= -1) {
                /* ��������� ������� �� 1 */
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
                /* ������������� ������� 2 */
                TopicsPosition[i] = 2;
            }
        }
        /* �������� ���������� */
        DidAnimationEnd = false;
        /* ��������� ����������� ������� ����� �� ���������� ����� */
        $("#FirstTopic").animate({ top: (25 - (TopicsPosition[0] * 5)) + "%", left: (10 + TopicsPosition[0] * 30) + "%" }, 750);
        /* ��������� ����������� ������� ����� �� ���������� ����� */
        $("#SecondTopic").animate({ top: (25 - (TopicsPosition[1] * 5)) + "%", left: (10 + TopicsPosition[1] * 30) + "%" }, 750);
        /* ��������� ����������� �������� ����� �� ���������� ����� */
        $("#ThirdTopic").animate({ top: (25 - (TopicsPosition[2] * 5)) + "%", left: (10 + TopicsPosition[2] * 30) + "%" }, 750);
        /* ��������� ����������� ���������� ����� �� ���������� ����� */
        $("#FourthTopic").animate({ top: (25 - (TopicsPosition[3] * 5)) + "%", left: (10 + TopicsPosition[3] * 30) + "%" }, 750);
        /* ������������� ������ �� ����� ����� �������� (���������� ����� 0,8 ������) */
        setTimeout(function () {
            /* �������� ����������� */
            DidAnimationEnd = true;
        }, 800);
    });

    /* ��� ����� �� ������ ��������� ���� */
    $("#PreviousTopics").on("click", function (event) {
        /* ������� ���� �������� ����������� */
        if (DidAnimationEnd == false) {
            return;
        }
        /* ��������� �� ���� ������ */
        for (i = 0; i <= 3; i++) {
            /* ���� ��������� ������� ����� ������ 3 */
            if (TopicsPosition[i] + 1 <= 3) {
                /* ����������� ������� �� 1 */
                TopicsPosition[i] += 1;
            } else {
                NextTopic = Topics[i]
                Topics[i] = PreviousTopic;

                if (PreviousTopic - 1 >= 0) {
                    PreviousTopic -= 1;
                } else {
                    PreviousTopic = 5
                }
                /* ��������� ���� �� -1 ������� */
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
                /* ������������� ������� ����� �� 0 */
                TopicsPosition[i] = 0;
            }
        }
        /* �������� ���������� */
        DidAnimationEnd = false;
        /* ��������� ����������� ������� ����� �� ��������� ����� */
        $("#FirstTopic").animate({ top: (25 - (TopicsPosition[0] * 5)) + "%", left: (10 + TopicsPosition[0] * 30) + "%" }, 750);
        /* ��������� ����������� ������� ����� �� ��������� ����� */
        $("#SecondTopic").animate({ top: (25 - (TopicsPosition[1] * 5)) + "%", left: (10 + TopicsPosition[1] * 30) + "%" }, 750);
        /* ��������� ����������� �������� ����� �� ��������� ����� */
        $("#ThirdTopic").animate({ top: (25 - (TopicsPosition[2] * 5)) + "%", left: (10 + TopicsPosition[2] * 30) + "%" }, 750);
        /* ��������� ����������� ���������� ����� �� ��������� ����� */
        $("#FourthTopic").animate({ top: (25 - (TopicsPosition[3] * 5)) + "%", left: (10 + TopicsPosition[3] * 30) + "%" }, 750);
        /* ������������� ������ �� ����� ����� �������� (���������� ����� 0,8 ������) */
        setTimeout(function () {
            /* �������� ����������� */
            DidAnimationEnd = true;
        }, 800);
    });

    /* ������������� ������ ��� �������� (y) ���������� ���� ������������*/
    var t = setInterval(function () {
        /* ���� (y) ���������� ���� ������������ ������ (y) ���������� ����� ���� */
        if (window.pageYOffset > parseInt($("#Feature").css("top"))) {
            /* ��������� ��������� ������ ������ */
            $("#BackToMenuButton").animate({ top: "85%", left: "92.5%", width: "5%", height: "10%" }, 250);
        } else {
            /* ��������� ������������ ������ ������ */
            $("#BackToMenuButton").animate({ top: "100%", left: "95%", width: "0%", height: "0%" }, 250);
        }
    }, 500);
});