import { TasksEnum } from "../../../shared/js/tasksEnum";

export const empowermentSessionArray = [
    // free session
    {
        tasks: [
            {
                isComplete: false,
                isLock: false,
                taskValue: TasksEnum.preEmoji,
                timerEnd: true,
                title: "How are you feeling today?",
                description: 'Select expressions for telling about mood',
            },
            {

                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre-introductory session Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_1",
                isComplete: false,
                isLock: true,

            },
            {
                title: 'After 2 Hours',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Introductory session audio will be available in',
                time: '01:54:23',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {

                title: "Introductory Session Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_2",
                heading: "Instructions",
                timerEnd: false,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Introduction Section?",
                description: 'Select expressions for telling about mood',
            },
            {
                taskValue: TasksEnum.report,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
            {
                title: 'Successfully Completed Introductory Session',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 1 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],

    },
    // session 1
    {
        tasks: [
            {
                isComplete: false,
                isLock: false,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "E-Booklet",
                description: 'Please fill this Questionnaire Form',
            },
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 1 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_3",
                isComplete: false,
                isLock: true,
            },
            {
                title: 'Empowerment session 1 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 1'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 1 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_4",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_5",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_6",
                isComplete: false,
                isLock: true,
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.preEmoji,
                timerEnd: true,
                title: "How are you feeling today?",
                description: 'Select expressions for telling about mood',
            },
            {

                title: "Session 1 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_7",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 1?",
                description: 'Select expressions for telling about mood',
            },
            {
                taskValue: TasksEnum.report,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
            {
                title: 'Successfully Completed Empowerment Session 1',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 2 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },
    // session 2
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre-session 2 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_8",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 2 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 2'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 2 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_9",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_10",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_11",
                isComplete: false,
                isLock: true,
            },
            // {

            //     isComplete: false,
            //     isLock: true,
            //     taskValue: TasksEnum.preEmoji,
            //     timerEnd: true,
            //     title: "How are you feeling today?",
            //     description: 'Select expressions for telling about mood',
            // },
            {
                title: "Session 2 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_12",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 2?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Empowerment Session 2',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 3 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },
    // session 3
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 3 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_13",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 3 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 3'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 3 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_14",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_15",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_16",
                isComplete: false,
                isLock: true,
            },
            {

                title: "Session 3 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_17",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Section 3?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Empowerment Session 3',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 4 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

    // sesison 4
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 4 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_18",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 4 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 4'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 4 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Progress Report",
                description: 'Please fill this Questionnaire Form',
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_19",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_20",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_21",
                isComplete: false,
                isLock: true,
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.preEmoji,
                timerEnd: true,
                title: "How are you feeling today?",
                description: 'Select expressions for telling about mood',
            },
            {

                title: "Session 4 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_22",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {
                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Post-Assessment Form",
                description: 'Please fill this Questionnaire Form',
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 4?",
                description: 'Select expressions for telling about mood',
            },
            {
                taskValue: TasksEnum.report,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
            {
                title: 'Successfully Completed Empowerment Session 4',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 5 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

    // sesison 5
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 5 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_23",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 5 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 5'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 5 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_24",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_25",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_26",
                isComplete: false,
                isLock: true,
            },
            {

                title: "Session 5 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_27",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 5?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Empowerment Session 5',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 6 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

    // sesison 6
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 6 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_28",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 6 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 6'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 6 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_29",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_30",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_31",
                isComplete: false,
                isLock: true,
            },
            {

                title: "Session 6 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_32",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 6?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Empowerment Session 6',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 7 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

    // sesison 7
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 7 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_33",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 7 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 7'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 7 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Progress Report",
                description: 'Please fill this Questionnaire Form',
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_76",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_34",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_35",
                isComplete: false,
                isLock: true,
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.preEmoji,
                timerEnd: true,
                title: "How are you feeling today?",
                description: 'Select expressions for telling about mood',
            },
            {

                title: "Session 7 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_36",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 7?",
                description: 'Select expressions for telling about mood',
            },
            {
                taskValue: TasksEnum.report,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
            {
                title: 'Successfully Completed Empowerment Session 7',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 8 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

    // sesison 8
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 8 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_37",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 8 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 8'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 8 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_38",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_39",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_40",
                isComplete: false,
                isLock: true,
            },
            {

                title: "Session 8 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_41",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment  Session 8?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Empowerment Session 8',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 9 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

    // sesison 9
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 9 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_42",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 9 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 9'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 9 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_43",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_44",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_45",
                isComplete: false,
                isLock: true,
            },
            {

                title: "Session 9 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_46",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 9?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Empowerment Session 9',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 10 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

    // sesison 10
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 10 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_47",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 10 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 10'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 10 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Progress Report",
                description: 'Please fill this Questionnaire Form',
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_48",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_49",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_50",
                isComplete: false,
                isLock: true,
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.preEmoji,
                timerEnd: true,
                title: "How are you feeling today?",
                description: 'Select expressions for telling about mood',
            },
            {

                title: "Session 10 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_51",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {
                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Post Assesment Form",
                description: 'Please fill this Questionnaire Form',
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 10?",
                description: 'Select expressions for telling about mood',
            },
            {
                taskValue: TasksEnum.report,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
            {
                title: 'Successfully Completed Empowerment Session 10',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 11 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },


    // session 11
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session Audio  11",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_52",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 11 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 11'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 11 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_53",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_54",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_55",
                isComplete: false,
                isLock: true,
            },
            {

                title: "Session 11 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_56",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 11?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Empowerment Session 11',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 11 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

    // session 12
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session Audio  12",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_57",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 12 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 12'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 12 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_58",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_77",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_59",
                isComplete: false,
                isLock: true,
            },
            {

                title: "Session 12 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_60",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 12?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Empowerment Session 12',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 13 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

    // session 13
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session Audio  13",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_61",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 13 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 13'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 13 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_62",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_63",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_64",
                isComplete: false,
                isLock: true,
            },
            {

                title: "Session 13 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_65",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 13?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Empowerment Session 13',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 14 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },
    // session 14
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session Audio 14",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_66",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment session 14 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Session 14'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Session 14 audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Progress Report",
                description: 'Please fill this Questionnaire Form',
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_67",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_68",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_69",
                isComplete: false,
                isLock: true,
            },
            {
                isComplete: false,
                isLock: false,
                taskValue: TasksEnum.preEmoji,
                timerEnd: true,
                title: "How are you feeling today?",
                description: 'Select expressions for telling about mood',
            },
            {

                title: "Session 14 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_70",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Session 14?",
                description: 'Select expressions for telling about mood',
            },
            {
                taskValue: TasksEnum.report,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
            {
                title: 'Successfully Completed Empowerment Session 11',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session Maintenance Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },
    // Maintenance session
    {
        tasks: [
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Maintenance Session Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_71",
                isComplete: false,
                isLock: false,
            },
            {
                title: 'Empowerment Maintenance session  audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: true,
                buttonTitle: 'Buy Maintenance Session'

            },
            {
                title: 'After 3 Days',
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
                    "Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                taskValue: TasksEnum.notificationPopup,
                isLock: true,
                showButton: false,
                isComplete: false,
            },
            {
                title: 'Maintenance Session audio will be available in',
                 time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer
            },
            {
                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Progress Report",
                description: 'Please fill this Questionnaire Form',
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_72",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_73",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_74",
                isComplete: false,
                isLock: true,
            },
            {
                isComplete: false,
                isLock: false,
                taskValue: TasksEnum.preEmoji,
                timerEnd: true,
                title: "How are you feeling today?",
                description: 'Select expressions for telling about mood',
            },
            {

                title: "Maintenance Session Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferEmpower_75",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                isComplete: false,
                hidePreviousTask: true,
                isLock: true,
                taskValue: TasksEnum.introductorySession
            },
            {
                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Post Assesment Form",
                description: 'Please fill this Questionnaire Form',
            },
            {

                isComplete: false,
                isLock: true,
                taskValue: TasksEnum.postEmoji,
                timerEnd: true,
                title: "How are you feeling after your Empowerment Maintenance Session?",
                description: 'Select expressions for telling about mood',
            },
            {
                taskValue: TasksEnum.report,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
            {
                title: 'Successfully Completed Empowerment Maintenance Session',
                showButton: false,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {

                    title: "Pre-Session 10 Audio",
                    navigate: '/case-studies',
                    navigationState: {
                        page: 'Testimonials'
                    }
                },
                taskValue: TasksEnum.completeSessionPopup,
                isComplete: false,
                isLock: true,
                timerEnd: true,
            },
        ],
    },

]