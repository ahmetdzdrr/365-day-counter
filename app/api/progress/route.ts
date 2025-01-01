import { format } from 'date-fns';

let startDate = new Date();
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + 365); 

export default function handler(req, res) {
  const currentDate = new Date();
  
  const daysPassed = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
  
  const percentage = (daysPassed / 365) * 100;

  const isComplete = daysPassed >= 365;

  res.status(200).json({
    daysPassed,
    percentage: isComplete ? 100 : percentage,
    isComplete,
    endDate: format(endDate, 'yyyy-MM-dd'),
    currentDate: format(currentDate, 'yyyy-MM-dd'),
  });
}
