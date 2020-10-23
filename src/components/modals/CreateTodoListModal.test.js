import React from 'react';
import CreateTodoListModal from './CreateTodoListModal';
import { render } from '@testing-library/react';

test('CreateProjectModal should show a Modal when showModal is true', () => {
  const { getByTestId } = render(
    <CreateTodoListModal showModal todoListTitles={['test1', 'test2']} />
  );
  const para = getByTestId('modal');
  expect(para).toBeVisible();
});

test('CreateProjectModal should NOT show a Modal when showModal is false', () => {
  const { queryByTestId } = render(
    <CreateTodoListModal
      showModal={false}
      todoListTitles={['test1', 'test2']}
    />
  );
  const modalTest = queryByTestId('modal');
  expect(modalTest).not.toBeInTheDocument();
});

test('The Title paragraph should match inline text', () => {
  const { getByTestId } = render(
    <CreateTodoListModal showModal todoListTitles={['test1', 'test2']} />
  );
  const dropdown = getByTestId('dropdown');
  expect(dropdown).toMatchInlineSnapshot(`
    <div
      aria-expanded="false"
      class="ui inline dropdown"
      data-testid="dropdown"
      name="dependent"
      role="listbox"
      tabindex="0"
    >
      <div
        aria-atomic="true"
        aria-live="polite"
        class="divider text"
        role="alert"
      >
        None
      </div>
      <i
        aria-hidden="true"
        class="dropdown icon"
      />
      <div
        class="menu transition"
      >
        <div
          aria-checked="true"
          aria-selected="true"
          class="active selected item"
          name="dependent"
          role="option"
          style="pointer-events: all;"
        >
          <span
            class="text"
          >
            None
          </span>
        </div>
        <div
          aria-checked="false"
          aria-selected="false"
          class="item"
          name="dependent"
          role="option"
          style="pointer-events: all;"
        >
          <span
            class="text"
          >
            test1
          </span>
        </div>
        <div
          aria-checked="false"
          aria-selected="false"
          class="item"
          name="dependent"
          role="option"
          style="pointer-events: all;"
        >
          <span
            class="text"
          >
            test2
          </span>
        </div>
      </div>
    </div>
  `);
});
