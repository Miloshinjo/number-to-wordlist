import { Form, Props } from '../form';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const props: Props = {
  fetchWordlist: jest.fn(),
};

test('should render a form component', () => {
  render(<Form {...props} />);

  const form = screen.getByRole('form');

  expect(form).toBeInTheDocument();
});

test('should change value of a number input', () => {
  render(<Form {...props} />);

  const input = screen.getByRole('spinbutton');

  fireEvent.change(input, { target: { value: 32 } });

  expect(input).toHaveValue(32);
});

test('should change value of a checkbox input', () => {
  render(<Form {...props} />);

  const checkbox = screen.getByRole('checkbox');

  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
});

test('should invoke fetch functon on submit', async () => {
  const fetchWordlist = jest.fn();
  render(<Form fetchWordlist={fetchWordlist} />);

  const input = screen.getByRole('spinbutton');
  const button = screen.getByRole('button', { name: 'Submit' });

  fireEvent.change(input, { target: { value: 32 } });
  fireEvent.submit(button);

  await waitFor(() => {
    expect(fetchWordlist).toHaveBeenCalledTimes(1);
  });
});

test('should not invoke fetch functon on submit whithout input', async () => {
  const fetchWordlist = jest.fn();
  render(<Form fetchWordlist={fetchWordlist} />);

  const form = screen.getByRole('form');

  fireEvent.submit(form);

  await waitFor(() => {
    expect(fetchWordlist).toHaveBeenCalledTimes(0);
  });
});
