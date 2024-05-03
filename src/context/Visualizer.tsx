'use client'
import { MAX_SORTING_SPEED } from "@/lib/constant";
import { sortingAlgorithm } from "@/lib/types";
import { createContext, useContext, useState } from "react";

interface SortingVisualizerContext {
    arrayToSort: number[],
    setArrayToSort: React.Dispatch<React.SetStateAction<number[]>>,
    selectedAlgorithm: sortingAlgorithm,
    setSelectedAlgorithm: React.Dispatch<React.SetStateAction<sortingAlgorithm>>,
    isSorting: boolean,
    setIsSorting: React.Dispatch<React.SetStateAction<boolean>>,
    isSortingComplete: boolean,
    setIsSortingComplete: React.Dispatch<React.SetStateAction<boolean>>,
    sortingSpeed: number,
    setSortingSpeed: React.Dispatch<React.SetStateAction<number>>,
    resetSorting: () => void,
    runSorting: () => void
}

const VisualizerContext = createContext<SortingVisualizerContext | undefined>(undefined);

export const VisualizerProvider = ( { children }: { children: React.ReactNode } ) => {
    const [arrayToSort, setArrayToSort] = useState<number[]>([80, 50, 500]);
    const [selectedAlgorithm, setSelectedAlgorithm] = useState<sortingAlgorithm>("bubble");
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [isSortingComplete, setIsSortingComplete] = useState<boolean>(false);
    const [sortingSpeed, setSortingSpeed] = useState<number>(MAX_SORTING_SPEED);

    const resetSorting = () => {
        
    }
    const runSorting = () => {
        
    }

    const value = {
        arrayToSort,
        setArrayToSort,
        selectedAlgorithm,
        setSelectedAlgorithm,
        isSorting,
        setIsSorting,
        isSortingComplete,
        setIsSortingComplete,
        sortingSpeed,
        setSortingSpeed,
        resetSorting,
        runSorting
    }

    return (
        <VisualizerContext.Provider value={value}>
            {children}
        </VisualizerContext.Provider>
    )
}

export const useVisualizerContext = () => {
    const context = useContext(VisualizerContext);
    if (!context) {
        throw new Error("useVisualizerContext must be called within VisualizerProvider");
    }
    return context;
}