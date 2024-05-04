"use client";
import { MAX_SORTING_SPEED } from "@/lib/constant";
import { genreateRandomNumber } from "@/lib/genrateRandomNumber";
import { AnimationArrayType, sortingAlgorithm } from "@/lib/types";
import { createContext, useContext, useEffect, useState } from "react";

interface SortingVisualizerContext {
  arrayToSort: number[];
  setArrayToSort: React.Dispatch<React.SetStateAction<number[]>>;
  selectedAlgorithm: sortingAlgorithm;
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<sortingAlgorithm>>;
  isSorting: boolean;
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
  isSortingComplete: boolean;
  setIsSortingComplete: React.Dispatch<React.SetStateAction<boolean>>;
  sortingSpeed: number;
  setSortingSpeed: React.Dispatch<React.SetStateAction<number>>;
  resetSorting: () => void;
  runAnimation: (animations: AnimationArrayType) => void;
  requiresReset: boolean;
}

const VisualizerContext = createContext<SortingVisualizerContext | undefined>(
  undefined
);

export const VisualizerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<sortingAlgorithm>("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isSortingComplete, setIsSortingComplete] = useState<boolean>(false);
  const [sortingSpeed, setSortingSpeed] = useState<number>(MAX_SORTING_SPEED);
  const requiresReset = isSortingComplete || isSorting;

  useEffect(() => {
    resetSorting();
    window.addEventListener("resize", resetSorting);

    return () => {
      window.removeEventListener("resize", resetSorting);
    };
  }, []);

  const resetSorting = () => {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) {
      return;
    }

    const contentConatinerWidth = contentContainer.clientWidth;
    const contentConatinerHeight = window.innerHeight;
    const numberOfLine = contentConatinerWidth / 8;
    const maxLineHeight = Math.max(contentConatinerHeight - 400, 100);

    const tampArray: number[] = [];

    for (let i = 0; i < numberOfLine; i++) {
      tampArray.push(genreateRandomNumber(35, maxLineHeight - 100));
    }

    setArrayToSort(tampArray);
    setIsSorting(false);
    setIsSortingComplete(false);

    const highestId = window.setTimeout(() => {
      for (let i = highestId; i >= 0; i--) {
        window.clearInterval(i);
      }
    }, 0);

    setTimeout(() => {
      const arrLines = document.getElementsByClassName("array-line");
      for (let i = 0; i < arrLines.length; i++) {
        arrLines[i].classList.remove("change-line-color");
        arrLines[i].classList.add("default-line-color");
      }
    }, 0);
  };

  const runAnimation = (animations: AnimationArrayType) => {
    setIsSorting(true);

    const inverseSpeed = (1 / sortingSpeed) * 200;
    const arrLines = document.getElementsByClassName(
      "array-line"
    ) as HTMLCollectionOf<HTMLElement>;

    const updateClassList = (
      indexes: number[],
      addClassName: string,
      removeClassName: string
    ) => {
      indexes.forEach((index) => {
        arrLines[index].classList.add(addClassName);
        arrLines[index].classList.remove(removeClassName);
      });
    };

    const updateHeightValue = (
      lineIndex: number,
      newHeight: number | undefined
    ) => {
      arrLines[lineIndex].style.height = `${newHeight}px`;
    };

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [lineIndexes, isSwap] = animation;
        if (!isSwap) {
          updateClassList(
            lineIndexes,
            "change-line-color",
            "default-line-color"
          );
          setTimeout(
            () =>
              updateClassList(
                lineIndexes,
                "default-line-color",
                "change-line-color"
              ),
            inverseSpeed
          );
        } else {
          const [lineIndex, newHeight] = lineIndexes;
          updateHeightValue(lineIndex, newHeight);
        }
      }, index * inverseSpeed);
    });

    const finalTimeout = animations.length * inverseSpeed;
    setTimeout(() => {
      Array.from(arrLines).forEach((line) => {
        line.classList.add("pulse-animation", "change-line-color");
        line.classList.remove("default-line-color");
      });

      setTimeout(() => {
        Array.from(arrLines).forEach((line) => {
          line.classList.remove("pulse-animation", "change-line-color");
          line.classList.add("default-line-color");
        });
        setIsSorting(false);
        setIsSortingComplete(true);
      }, 1000);
    }, finalTimeout);
  };

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
    runAnimation,
    requiresReset,
  };

  return (
    <VisualizerContext.Provider value={value}>
      {children}
    </VisualizerContext.Provider>
  );
};

export const useVisualizerContext = () => {
  const context = useContext(VisualizerContext);
  if (!context) {
    throw new Error(
      "useVisualizerContext must be called within VisualizerProvider"
    );
  }
  return context;
};
