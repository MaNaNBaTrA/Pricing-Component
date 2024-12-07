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
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
        document.documentElement.classList.toggle("dark", newDarkMode);
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.add("light");
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
        <div>
            <div className=" absolute md:right-7 sm:right-3 right-2 ">
                <div onClick={toggleDarkMode} className="cursor-pointer">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35px"
                        height="35px"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-[#ffd43b] dark:text-white"
                    >
                        <g id="idea">

                            <path d="M16.52,3.66A7,7,0,0,0,5,9.17a9.49,9.49,0,0,0,3,6.24c.51.58,1,1.18,1,1.49v2.38A2.72,2.72,0,0,0,11.72,22h.56A2.72,2.72,0,0,0,15,19.28V16.9c0-.31.53-.91,1-1.49A9.43,9.43,0,0,0,19,9,7,7,0,0,0,16.52,3.66ZM12.28,21h-.56A1.72,1.72,0,0,1,10,19.28V18h4v1.28A1.72,1.72,0,0,1,12.28,21Zm3-6.25c-.73.81-1.3,1.46-1.3,2.15V17H10v-.1c0-.69-.57-1.34-1.3-2.15A8.63,8.63,0,0,1,6,9.15a6,6,0,0,1,5-6.06A6,6,0,0,1,18,9C18,11.7,16.44,13.46,15.3,14.75Z" />
                            <path d="M21.5,8h-1a.5.5,0,0,0,0,1h1a.5.5,0,0,0,0-1Z" />
                            <path d="M4,8.5A.5.5,0,0,0,3.5,8h-1a.5.5,0,0,0,0,1h1A.5.5,0,0,0,4,8.5Z" />
                            <path d="M3.85,2.15a.49.49,0,0,0-.7.7l1,1a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7Z" />
                            <path d="M19.5,4a.47.47,0,0,0,.35-.15l1-1a.49.49,0,0,0-.7-.7l-1,1a.48.48,0,0,0,0,.7A.47.47,0,0,0,19.5,4Z" />
                            <path d="M19.85,13.15a.49.49,0,0,0-.7.7l1,1a.48.48,0,0,0,.7,0,.48.48,0,0,0,0-.7Z" />
                            <path d="M4.15,13.15l-1,1a.48.48,0,0,0,0,.7.48.48,0,0,0,.7,0l1-1a.49.49,0,0,0-.7-.7Z" />
                            <path d="M13.15,7.15l-3,3a.47.47,0,0,0-.11.54.5.5,0,0,0,.46.31h1.79l-1.14,1.15a.48.48,0,0,0,0,.7.48.48,0,0,0,.7,0l2-2a.47.47,0,0,0,.11-.54A.5.5,0,0,0,13.5,10H11.71l2.14-2.15a.49.49,0,0,0-.7-.7Z" />
                        </g>
                    </svg>
                </div>
            </div>


            <div className="flex flex-col items-center justify-center min-h-screen w-full cursor-default">
                <div className="w-[80%] min-w-[100px] flex flex-col items-center justify-center sm:w-full sm:max-w-xl xl:max-w-2xl 2xl:max-w-3xl bg-white dark:bg-[#31443d] shadow-md rounded-lg text-black dark:text-white sm:m-0 m-6 ">
                    <div className="flex items-center justify-around w-full text-center mx-6 my-10">
                        <div className="text-base font-bold font-manrope text-grayishBlue items-center justify-center tracking-widest ">
                            {getCurrentViews()} PAGEVIEWS
                        </div>
                        <div className=" items-center space-x-2 justify-center font-manrope hidden sm:flex">
                            <span className="text-4xl font-extrabold">${getPrice()}</span>
                            <span className="text-base text-grayishBlue dark:text-gray-400 font-semibold">
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
                                boxShadow: "0 14px 32px 2px rgba(0, 255, 255, 0.7)",
                            }}
                            className="bg-strongCyan rounded-full flex items-center justify-center"
                        >
                            <img
                                src="/icon-slider.svg"
                                alt="Slider"
                                className="w-[40%] h-[40%]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 justify-center font-manrope mx-6 mb-10 sm:hidden">
                        <span className="text-4xl font-extrabold">${getPrice()}</span>
                        <span className="text-base text-grayishBlue dark:text-gray-400 font-semibold">
                            / {isYearlyBilling ? "year" : "month"}
                        </span>
                    </div>
                    <div className="flex items-center justify-center w-full mx-6 mb-10">
                        <span className="text-grayishBlue xs:text-sm font-medium text-xs">Monthly Billing</span>
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
                                        className={`block w-10 h-5 rounded-full transition-colors ${isYearlyBilling ? 'bg-softCyan' : 'bg-toggleBackground'}`}
                                    ></div>
                                    <div
                                        className={`dot absolute top-[2.5px] left-[3px] bg-white w-[15px] h-[15px] rounded-full transition-transform ${isYearlyBilling ? 'translate-x-5' : ''}`}
                                    ></div>
                                </div>
                            </label>
                        </div>
                        <div className="flex justify-center relative">
                            <span className="text-grayishBlue xs:text-sm font-medium text-xs">Yearly Billing</span>
                            <div className="flex items-center absolute xs:left-20 exs:left-[4.5rem] left-16">
                                <span className="text-lightRed xs:text-[9px] bg-lightGrayishRed rounded-lg flex items-center justify-center p-1 font-semibold ml-2 text-nowrap sm:hidden text-[7px]">
                                    -25%
                                </span>
                                <div className="text-lightRed text-[9px] bg-lightGrayishRed rounded-lg sm:flex items-center justify-center p-1 font-semibold ml-2 text-nowrap hidden">
                                    25% discount
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[1px] bg-gray-200 mb-10"></div>
                    <div className="w-full items-center px-6 flex flex-col sm:flex-row mb-10 justify-between text-grayishBlue text-xs font-manrope">
                        <div className="flex flex-col gap-2 font-semibold">
                            <div className="flex gap-4">
                                <img src="/icon-check.svg" alt="Check" className="w-3 h-3" />
                                <div>Unlimited websites</div>
                            </div>
                            <div className="flex gap-4">
                                <img src="/icon-check.svg" alt="Check" className="w-3 h-3" />
                                <div>100% data ownership</div>
                            </div>
                            <div className="flex gap-4">
                                <img src="/icon-check.svg" alt="Check" className="w-3 h-3" />
                                <div>Email reports</div>
                            </div>

                        </div>
                        <div className="text-sm font-semibold text-paleBlue bg-darkDesaturatedBlue rounded-3xl px-8 flex items-center justify-center h-10 sm:mt-0 mt-5 cursor-pointer">
                            <div>Start my trial</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
