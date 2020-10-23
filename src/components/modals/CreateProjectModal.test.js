import React from 'react';
import CreateProjectModal from './CreateProjectModal';
import { render } from '@testing-library/react';

test('CreateProjectModal should show a Modal when showModal is true', () => {
  const { getByTestId } = render(<CreateProjectModal showModal />);
  const para = getByTestId('modal');
  expect(para).toBeVisible();
});

test('CreateProjectModal should NOT show a Modal when showModal is false', () => {
  const { queryByTestId } = render(<CreateProjectModal showModal={false} />);
  const modalTest = queryByTestId('modal');
  expect(modalTest).not.toBeInTheDocument();
});

test('The Title paragraph should match inline text', () => {
  const { getByTestId } = render(<CreateProjectModal showModal />);
  const para = getByTestId('title');
  expect(para).toMatchInlineSnapshot(`
    <p
      data-testid="title"
    >
      Please type your desired project name.
    </p>
  `);
});
