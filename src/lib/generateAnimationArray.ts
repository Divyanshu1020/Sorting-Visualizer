import { generateBubbleSortAnimationArray } from "@/algorithms/bubbleSort";
import { sortingAlgorithm } from "./types";
import { generateQuickSortAnimationArray } from "@/algorithms/quickSort";
import { generateMergeSortAnimationArray } from "@/algorithms/mergeSort";
import { generateInsertionSortAnimationArray } from "@/algorithms/insertionSort";
import { generateSelectionSortAnimationArray } from "@/algorithms/selectionSort";

export function generateAnimationArray(
    selectedAlgorithm: sortingAlgorithm,
    isSorting: boolean,
    array: number[],
    runAnimation: (animations: [number[], boolean][]) => void
  ) {
    switch (selectedAlgorithm) {
      case "bubble":
        generateBubbleSortAnimationArray(isSorting, array, runAnimation);
        break;
      case "quick":
        generateQuickSortAnimationArray(isSorting, array, runAnimation);
        break;
      case "merge":
        generateMergeSortAnimationArray(isSorting, array, runAnimation);
        break;
      case "insertion":
        generateInsertionSortAnimationArray(isSorting, array, runAnimation);
        break;
      case "selection":
        generateSelectionSortAnimationArray(isSorting, array, runAnimation);
        break;
      default:
        break;
    }
}