import React from 'react';
import { render } from '@testing-library/react';
import DateGenerator from './dateGenerator';

const testData = [
  {
    dependent: 'None',
    title: 'Design',
    todos: [
      {
        title: 'Design Framework',
        time: '3',
        sequential: 0,
        seqData: '',
      },
      {
        title: 'Design UI',
        time: '3',
        sequential: 0,
        seqData: '',
      },
      {
        title: 'Design Software',
        time: '3',
        sequential: 1,
        seqData: 'Design Framework',
      },
    ],
  },
  {
    dependent: 'Design',
    title: 'Develop',
    todos: [
      {
        title: 'Develop Framework',
        time: '3',
        sequential: 0,
        seqData: '',
      },
      {
        title: 'Develop UI',
        time: '3',
        sequential: 0,
        seqData: '',
      },
      {
        title: 'Develop Software',
        time: '3',
        sequential: 1,
        seqData: 'Develop Framework',
      },
    ],
  },
];

const testDevs = 2;

test('Should output the correct variables given the test data', () => {
  const { getByTestId } = render(
    <DateGenerator
      taskLists={testData}
      nOfDevs={'2'}
      startDate={'2020-10-22T14:56:45.609Z'}
    />
  );
  const currentDay = getByTestId('currentDay');
  const finishTime = getByTestId('finishTime');
  expect(currentDay).toHaveTextContent('10');
  expect(finishTime).toMatchInlineSnapshot(`
    <span
      data-testid="finishTime"
    >
      November 5, 2020
    </span>
  `);
});
