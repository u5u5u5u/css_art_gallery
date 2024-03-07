import { ReactNode } from "react";
import { useRef, useEffect } from "react";


type Props = {
    html: string;
    css: string;
    id: string;
    title: string
}

const goods: Props[] = [
    {
        id: "1",
        title: "Good 1",
        html: "<h2>Good 1</h2>",
        css: " color: red; "
    }, {
        id: "2",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "3",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "4",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "5",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "6",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "7",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "8",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "9",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "10",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "11",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: red; "
    }, {
        id: "12",
        title: "Good 1",
        html: "<h1>Good 1</h1>",
        css: " color: blue; "
    },
]
export const GoodList = () => {
    const containerRef = useRef(null);
    useEffect(() => {
        if (!containerRef.current) return;
        goods.forEach((good) => {
            const elm = document.createElement("div");
            elm.innerHTML = good.html;
            elm.style.cssText = good.css;
            containerRef.current.appendChild(elm);
        })
    }, [])
    return <ul ref={containerRef}>
    </ul>
};
