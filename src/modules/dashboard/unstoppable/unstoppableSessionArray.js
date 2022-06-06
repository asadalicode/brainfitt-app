import { TasksEnum } from "../../../shared/js/tasksEnum";

export const unstoppableSessionArray = [
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
                container: "wavesurferUnstop_1",
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
                container: "wavesurferUnstop_2",
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
                title: 'Successfully Completed Introductory Session',
                showButton: true,
                paragraph: ["Lorem Ipsum is simply dummy text of the printing and typesetting ndustry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"],
                button: {
                    aboveText: 'Pre-Session 1 Audio',
                    title: "Buy Unstoppable You",
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
                title: "Pre-introductory session Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_3",
                isComplete: false,
                isLock: true,
            },
            {
                title: 'Empowerment session 1 audio will be available in 3 days, once session is bought.',
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
                isBuyButton: false,
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
                container: "wavesurferUnstop_4",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_5",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_6",
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

                title: "Introductory Session Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_7",
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
                title: "How are you feeling after your Unstoppable You Session 1?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 1',
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
                container: "wavesurferUnstop_8",
                isComplete: false,
                isLock: false,
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
                container: "wavesurferUnstop_9",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_10",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_11",
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

                title: "Session 2 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_12",
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
                title: "How are you feeling after your Unstoppable You Session 2?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 2',
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
                container: "wavesurferUnstop_13",
                isComplete: false,
                isLock: false,
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
                container: "wavesurferUnstop_14",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_15",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_16",
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

                title: "Session 3 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_17",
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
                title: "How are you feeling after your Unstoppable You Session 3?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 3',
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
                container: "wavesurferUnstop_18",
                isComplete: false,
                isLock: false,
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
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_19",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_20",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_21",
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
                container: "wavesurferUnstop_22",
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
                title: "How are you feeling after your Unstoppable You Session 4?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 4',
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
                container: "wavesurferUnstop_23",
                isComplete: false,
                isLock: false,
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
                container: "wavesurferUnstop_24",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_25",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_26",
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

                title: "Session 5 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_27",
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
                title: "How are you feeling after your Unstoppable You Session 5?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 5',
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
                container: "wavesurferUnstop_28",
                isComplete: false,
                isLock: false,
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
                container: "wavesurferUnstop_29",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_30",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_31",
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

                title: "Session 6 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_32",
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
                title: "How are you feeling after your Unstoppable You Session 6?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 6',
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
                container: "wavesurferUnstop_33",
                isComplete: false,
                isLock: false,
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
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_34",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_35",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_36",
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
                container: "wavesurferUnstop_37",
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
                title: "How are you feeling after your Unstoppable You Session 7?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 7',
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
                container: "wavesurferUnstop_38",
                isComplete: false,
                isLock: false,
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
                container: "wavesurferUnstop_39",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_40",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_41",
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

                title: "Session 8 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_42",
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
                title: "How are you feeling after your Unstoppable You Session 8?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 8',
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
                container: "wavesurferUnstop_43",
                isComplete: false,
                isLock: false,
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
                container: "wavesurferUnstop_44",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_45",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_46",
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

                title: "Session 9 Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_47",
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
                title: "How are you feeling after your Unstoppable You Session 9?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 9',
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
                isComplete: false,
                isLock: false,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "E-Booklet",
                description: 'Please fill this Questionnaire Form',
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
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Session 10 Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_48",
                isComplete: false,
                isLock: false,
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
                taskValue: TasksEnum.timer,
                threeDayTimer: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_49",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_50",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_51",
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
                container: "wavesurferUnstop_52",
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
                title: "How are you feeling after your Unstoppable You Session 10?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Session 10',
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


    // booster session
    {
        tasks: [
            {
                isComplete: false,
                isLock: false,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Progress Report",
                description: 'Please fill this Questionnaire Form',
            },
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Booster Session Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_53",
                isComplete: false,
                isLock: true,
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
                title: 'Booster Session audio will be available in',
                time: '71:59:23',
                threeDayTimer: true,
                isLock: true,
                isComplete: false,
                taskValue: TasksEnum.timer,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_54",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_55",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_56",
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

                title: "Booster Session Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_57",
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
                title: "How are you feeling after your Unstoppable You Booster Session?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Booster Session',
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
    // maintenance session
    {
        tasks: [
            {
                isComplete: false,
                isLock: false,
                taskValue: TasksEnum.eBooklet,
                timerEnd: true,
                title: "Progress Report",
                description: 'Please fill this Questionnaire Form',
            },
            {
                taskValue: TasksEnum.preIntroductorySession,
                title: "Pre Maintenance Session Audio",
                heading: "Instructions",
                timerEnd: true,
                description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_53",
                isComplete: false,
                isLock: true,
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
                taskValue: TasksEnum.timer,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 1",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_54",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 2",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_55",
                isComplete: false,
                isLock: true,
            },
            {
                taskValue: TasksEnum.lesson,
                title: "Lesson 3",
                timerEnd: true,
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_56",
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

                title: "Maintenance Session Audio",
                audioUrl: "https://www.kozco.com/tech/LRMonoPhase4.mp3",
                container: "wavesurferUnstop_57",
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
                title: "How are you feeling after your Unstoppable You Maintenance Session?",
                description: 'Select expressions for telling about mood',
            },
            {
                title: 'Successfully Completed Unstoppable You Maintenance Session',
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