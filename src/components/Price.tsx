"use client";
import React, { useState, useEffect, useRef } from "react";

const pageViewOptions = [
    { views: "10K", price: 8 },
    { views: "50K", price: 12 },
    { views: "100K", price: 16 },
    { views: "500K", price: 24 },
    { views: "1M", price: 36 },
];

export default function Price() {
    const [isYearlyBilling, setIsYearlyBilling] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [newPercentage, setNewPercentage] = useState<number>(0);

    const sliderRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("theme", !darkMode ? "dark" : "light");
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setDarkMode(true);
        }
    }, []);

    const getPrice = () => {
        const index = Math.floor(newPercentage * (pageViewOptions.length - 1));
        const price = pageViewOptions[index].price;
        return isYearlyBilling ? (price * 12 * 0.75).toFixed(2) : price.toFixed(2);
    };

    const toggleBilling = () => {
        setIsYearlyBilling(!isYearlyBilling);
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        event.preventDefault();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging && sliderRef.current && thumbRef.current) {
            const boundingBox = sliderRef.current.getBoundingClientRect();
            const offsetX = event.clientX - boundingBox.left;
            const constrainedX = Math.min(Math.max(0, offsetX), boundingBox.width);
            const newPercentage = constrainedX / boundingBox.width;
            setNewPercentage(newPercentage);
            sliderRef.current.style.background = `linear-gradient(to right, hsl(174, 77%, 80%) ${(newPercentage) * 100}%, #ddd ${(newPercentage) * 100}%)`;
            thumbRef.current.style.left = `${newPercentage * 100}%`;
        }
    };

    const getCurrentViews = () => {
        const index = Math.floor(newPercentage * (pageViewOptions.length - 1));
        return pageViewOptions[index].views;
    };

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="fixed top-4 right-4">
                <button
                    onClick={toggleDarkMode}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded"
                >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen w-full">
                <div className="flex flex-col items-center justify-center w-full max-w-xl  bg-white dark:bg-gray-800 shadow-md rounded-lg text-black dark:text-white ">
                    <div className="flex items-center justify-around w-full text-center mx-6 my-10">
                        <div className="text-base font-bold font-manrope text-gray-400 items-center justify-center tracking-widest ">
                            {getCurrentViews()} PAGEVIEWS
                        </div>
                        <div className="flex items-center space-x-2 justify-center font-manrope">
                            <span className="text-4xl font-extrabold">${getPrice()}</span>
                            <span className="text-base text-gray-500 dark:text-gray-400 font-semibold">
                                / {isYearlyBilling ? "year" : "month"}
                            </span>
                        </div>
                    </div>
                    <div
                        ref={sliderRef}
                        className="relative w-[80%] h-3 bg-gray-300 dark:bg-gray-600 rounded-full mx-6 mb-10"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        style={{ background: '#ddd' }}
                    >
                        <div
                            ref={thumbRef}
                            onMouseDown={handleMouseDown}
                            style={{
                                position: "absolute",
                                left: `${newPercentage * 100}%`,
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "38px",
                                height: "38px",
                                cursor: "pointer",
                            }}
                            className="bg-strongCyan rounded-full flex items-center justify-center"
                        >
                            <img
                                src="/icon-slider.svg"
                                alt="Slider Thumb"
                                className="w-1/2 h-1/2"
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full mx-6 mb-10">
                        <span className="text-gray-400 dark:text-gray-400 text-sm font-medium">Monthly Billing</span>
                        <div className="relative flex items-center mx-4">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isYearlyBilling}
                                    onChange={toggleBilling}
                                    className="sr-only"
                                />
                                <div className="relative">
                                    <div
                                        className={`block w-10 h-5 rounded-full transition-colors ${isYearlyBilling ? 'bg-softCyan' : 'bg-toggleBackground'} dark:${isYearlyBilling ? 'bg-blue-600' : 'bg-gray-600'}`}
                                    ></div>
                                    <div
                                        className={`dot absolute top-[2.5px] left-[3px] bg-white w-[15px] h-[15px] rounded-full transition-transform ${isYearlyBilling ? 'translate-x-5' : ''}`}
                                    ></div>
                                </div>
                            </label>
                        </div>
                        <div className="flex justify-center relative">
                            <span className="text-gray-400 dark:text-gray-400 text-sm">Yearly Billing</span>
                            <div className="text-lightRed text-[9px] bg-lightGrayishRed rounded-lg flex items-center justify-center p-1 font-semibold ml-2 text-nowrap absolute left-20">
                                25% discount
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 mb-10"></div>
                    <div className="w-full px-6 flex mb-10 justify-between">
                        <div>
                            <div className="flex">
                                <img src="/icon-check.svg" alt="" />
                                <div>Unlimited websites</div>
                            </div>
                            <div className="flex">
                                <img src="/icon-check.svg" alt="" />
                                <div>100% data ownership</div>
                            </div>
                            <div className="flex">
                                <img src="/icon-check.svg" alt="" />
                                <div>Email reports</div>
                            </div>
                        </div>
                        <div>
                            <div>Start my trial</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
