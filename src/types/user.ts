export interface IBmiState {
  age: number;
  weight: number;
  height: number;
  bmi: string;
  timestamp: string;
  gender?: string | null;
}


export interface ITestState {
  patientName: string;
  patientAge: number;
  testDateTime: string;
  appearance: string;
  colour: string;
  pH: string;
  specificGravity: string;
  protein: string;
  glucose: string;
  ketoneBodies: string;
  bilirubin: string;
  urobilinogen: string;
  leucocyteEsterase: string;
  bloodHemoglobin: string;
  nitrite: string;
  redBloodCells: string;
  whiteBloodCells: string;
  epithelialCells: string;
  cast: string;
  crystals: string;
  bacteria: string;
  yeast: string;
  mucusThreads: string;
}


export interface IDietState {
  gfrResult: number;
  ckdStageMessage: string;
  mealPlan: {
    breakfast?: string | null;
    midMeal?: string | null;
    lunch?: string | null;
    eveningNourishment?: string | null;
    dinner?: string | null;
    bedtime?: string | null;
  };
}
