import { Output, Props } from '../output';

import { render, screen } from '@testing-library/react';

const props: Props = {
  isFetching: false,
  error: '',
  wordlist: null,
};

test('should render a component with default text', () => {
  render(<Output {...props} />);

  expect(screen.getByText('Generate your wordlist')).toBeInTheDocument();
});

test('should render a loader when fetching', () => {
  render(<Output {...props} isFetching={true} />);

  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

test('should render no results message', () => {
  render(<Output {...props} wordlist={[]} />);

  expect(
    screen.getByText('No words were found for your number')
  ).toBeInTheDocument();
});

test('should render a list of words', () => {
  render(<Output {...props} wordlist={['one', 'two']} />);

  expect(screen.getByText('one')).toBeInTheDocument();
  expect(screen.getByText('two')).toBeInTheDocument();
});

test('should render error text', () => {
  const errorText = 'text';
  render(<Output {...props} error={errorText} />);

  expect(screen.getByText(errorText)).toBeInTheDocument();
});
