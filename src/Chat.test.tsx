import { test, expect} from "bun:test";
import { render, screen } from '@testing-library/react';
import { Chat } from '../src/Chat';

test('renders "History" paragraph element', () => {
  render(<Chat />);

  // Ensure the "History" paragraph element is rendered within the Chat component
  const historyElement = screen.getByText(/History/i);
  expect(historyElement).toBeInTheDocument();
});
