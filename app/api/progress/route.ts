import { NextResponse } from "next/server";
import { format } from "date-fns";

const getStartDate = () => {
  const currentYear = new Date().getFullYear();
  return new Date(`${currentYear}-01-01T00:00:00`);
};

export async function GET() {
  const startDate = getStartDate(); 
  const currentDate = new Date();
  
  let daysPassed = 1;

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 365);

  const percentage = (daysPassed / 365) * 100;
  const isComplete = daysPassed >= 365;

  if (isComplete) {
    startDate.setFullYear(startDate.getFullYear() + 1);
    daysPassed = 1;
  }

  return NextResponse.json({
    daysPassed,
    percentage: isComplete ? 100 : percentage,
    isComplete,
    endDate: format(endDate, "dd-MM-yyyy"),
    currentDate: format(currentDate, "dd-MM-yyyy"),
  });
}
