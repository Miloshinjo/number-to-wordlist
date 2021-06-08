import { fireEvent, render, screen } from '@testing-library/react';

import { Keyboard, Props } from '../keyboard';

const props: Props = {
  backspaceValue: jest.fn(),
  setInputValue: jest.fn(),
};
test('should invoke backspaceValue function', () => {
  const backspaceValue = jest.fn();
  render(<Keyboard {...props} backspaceValue={backspaceValue} />);

  const button = screen.getByRole('button', { name: '←' });
  fireEvent.click(button);

  expect(backspaceValue).toHaveBeenCalledTimes(1);
});

test('should invoke backspaceValue function with correct values', () => {
  const setInputValue = jest.fn();
  render(<Keyboard {...props} setInputValue={setInputValue} />);

  const button = screen.getByRole('button', { name: '2 abc' });
  fireEvent.click(button);

  expect(setInputValue).toHaveBeenCalledTimes(1);
  expect(setInputValue).toHaveBeenCalledWith('2');
});
