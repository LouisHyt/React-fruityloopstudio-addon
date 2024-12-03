import Chorder from "./Chorder/Chorder.jsx"
import Challenger from "./Challenger/Challenger.jsx"
import TestAgain from "./Testagain/TestAgain.jsx"

export const Plugins = [
    {
        data: {
            id: 1,
            name: "Chorder"
        },
        element: Chorder
    },
    {
        data: {
            id: 2,
            name: "Challenger"
        },
        element: Challenger
    },
    {
        data: {
            id: 3,
            name: "TestAgain"
        },
        element: TestAgain
    },
]