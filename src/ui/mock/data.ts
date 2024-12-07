export const mockUsers: User[] = [
  { userID: '1', username: 'Alice' },
  { userID: '2', username: 'Bob' },
  { userID: '3', username: 'Charlie' },
  { userID: '4', username: 'Diana' },
  { userID: '5', username: 'Eve' },
  { userID: '6', username: 'Frank' },
  { userID: '7', username: 'Grace' },
  { userID: '8', username: 'Hank' },
  { userID: '9', username: 'Ivy' },
  { userID: '10', username: 'Jack' },
];

export const mockMessages: Message[] = [
  {
    senderID: '1',
    recipientID: '2',
    content: 'Hi Bob, how are you?',
    type: 'chat',
  },
  {
    senderID: '2',
    recipientID: '1',
    content: 'Hey Alice! I’m good, how about you?',
    type: 'chat',
  },
  {
    senderID: '3',
    recipientID: '4',
    content: 'Diana, are we still on for the meeting later?',
    type: 'chat',
  },
  {
    senderID: '4',
    recipientID: '3',
    content: 'Yes, Charlie! I’ll call you around 2 PM.',
    type: 'chat',
  },
  {
    senderID: '5',
    recipientID: '6',
    content: 'Frank, can you check the document I sent earlier?',
    type: 'chat',
  },
  {
    senderID: '6',
    recipientID: '5',
    content: 'Sure, give me 10 minutes!',
    type: 'chat',
  },
  {
    senderID: '7',
    recipientID: '1',
    content: 'Alice, are you joining the group call?',
    type: 'chat',
  },
  {
    senderID: '1',
    recipientID: '7',
    content: 'Yes, just give me a moment to finish something.',
    type: 'chat',
  },
  {
    senderID: '8',
    recipientID: '9',
    content: 'Ivy, new feature in the app?',
    type: 'chat',
  },
  {
    senderID: '10',
    recipientID: '3',
    content: 'Charlie, can you help me with the report?',
    type: 'chat',
  },
  {
    senderID: '3',
    recipientID: '10',
    content: 'Of course, Jack! Send me the details.',
    type: 'chat',
  },
];

export const mockConnectionStatus: ConnectionStatus = {
  isConnected: true,
  lastChecked: '2024-11-24T12:05:00Z',
};
