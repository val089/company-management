import { filterRecentlyHiredEmployees } from '@app/utils/filterRecentlyHiredEmployees';

const employees = [
  {
    id: '1a',
    firstName: 'Jan',
    lastName: 'Kowalski',
    jobPosition: 'Frontend Developer',
    salary: '11000',
    email: 'jan@wp.pl',
    createdAt: '2023-01-30T13:43:20.619Z',
    employmentDate: '2023-01-20T13:43:20.619Z',
  },
  {
    id: '2b',
    firstName: 'Marian',
    lastName: 'Paździoch',
    jobPosition: 'Backend Developer',
    salary: '14000',
    email: 'marian@wp.pl',
    createdAt: '2023-01-30T13:43:20.619Z',
    employmentDate: '2023-01-30T13:43:20.619Z',
  },
];

test('test', () => {
  const filteredEmployees = filterRecentlyHiredEmployees(employees, 7);
  expect(filteredEmployees).toEqual([
    {
      id: '2b',
      firstName: 'Marian',
      lastName: 'Paździoch',
      jobPosition: 'Backend Developer',
      salary: '14000',
      email: 'marian@wp.pl',
      createdAt: '2023-01-30T13:43:20.619Z',
      employmentDate: '2023-01-30T13:43:20.619Z',
    },
  ]);
});
