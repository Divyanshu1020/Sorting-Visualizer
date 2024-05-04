export type sortingAlgorithm =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick";

export type SelectOptionsType = {
  label: string;
  value: string;
};

export type AlgorithmInfo = {
    title: string;
    description: string;
    worstCase: string;
    averageCase: string;
    bestCase: string;
  };
  
  export type SortingAlgorithmsData = {
    [key in sortingAlgorithm]: AlgorithmInfo;
  };

export type AnimationArrayType = [number[], boolean][];
