import { getDateMinusDays } from './getDateMinusDayes';
import { Employee } from '@app/types';

export const filterRecentlyHiredEmployees = (employees: Employee[], days: number) => {
  const filteredData = employees.filter(employee => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, days);
    const employmentDate = new Date(employee.employmentDate.slice(0, 10));

    return employmentDate > date7DaysAgo && employmentDate <= today;
  });

  return filteredData;
};
