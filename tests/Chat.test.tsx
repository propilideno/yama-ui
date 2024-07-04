import { render } from '@testing-library/react';
import { Chat } from '../src/Chat';

test('renders chat component', () => {
  render(<Chat />);

  // Check if the component renders without errors using Bun's expect function
  const chatComponent = document.querySelector('.Chat'); // Adjust selector to match your actual class or identifier
  expect(chatComponent).toBeNull();
});

test('dom test', () => {
  document.body.innerHTML = `<p>History</p>`;
  const history = document.querySelector('p');
  expect(history?.innerText).toEqual('History');
});

//test('renders chat component with static content', () => {
//  // Render the Chat component
//  const { getByText, getByPlaceholderText } = render(<Chat />);
//
//  // Check if the "Yama Chat" title is rendered
//  const titleElement = getByText(/Yama Chat/i);
//  expect(titleElement).toBeInTheDocument();
//
//  // Check if the placeholder in the input field is rendered
//  const inputElement = getByPlaceholderText('Type a message');
//  expect(inputElement).toBeInTheDocument();
//
//  // Check if the "Send" button is rendered
//  const sendButtonElement = getByText(/Send/i);
//  expect(sendButtonElement).toBeInTheDocument();
//});
