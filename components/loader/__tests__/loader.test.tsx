import { Loader } from '../loader';

import { render, screen } from '@testing-library/react';

test('should render the component', () => {
  render(<Loader />);
  expect(screen.getByTestId('loader')).toBeInTheDocument();
});
