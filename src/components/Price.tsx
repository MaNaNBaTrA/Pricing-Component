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
            sliderRef.current.style.background = `linear-gradient(to right, #4CAF50 ${(newPercentage) * 100}%, #ddd ${(newPercentage) * 100}%)`;
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
                <div className="flex flex-col items-center justify-center w-full max-w-lg p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-black dark:text-white">
                    <div className="flex items-center justify-center text-center">
                        <div className="text-sm font-semibold font-manrope text-gray-400 mb-6 items-center justify-center">
                            {getCurrentViews()} PAGEVIEWS
                        </div>
                        <div className="flex items-center space-x-2 mb-6 justify-center">
                            <span className="text-3xl font-bold">${getPrice()}</span>
                            <span className="text-xl text-gray-500 dark:text-gray-400">
                                / {isYearlyBilling ? "year" : "month"}
                            </span>
                        </div>
                    </div>
                    <div
                        ref={sliderRef}
                        className="relative w-[80%] h-4 mb-6 bg-gray-300 dark:bg-gray-600 rounded-full"  
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
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                            }}
                        >
                            <img
                                src="/icon-slider.svg"
                                alt="Slider Thumb"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Monthly Billing</span>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isYearlyBilling}
                                onChange={toggleBilling}
                                className="sr-only"
                            />
                            <div className="relative">
                                <div className="block bg-gray-300 dark:bg-gray-600 w-14 h-8 rounded-full"></div>
                                <div
                                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isYearlyBilling ? "transform translate-x-6" : ""
                                        }`}
                                ></div>
                            </div>
                        </label>
                        <span className="text-gray-600 dark:text-gray-400">Yearly Billing (-25%)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
