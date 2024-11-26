export const mockUsers: User[] = [
  { id: '1', name: 'Alice', isOnline: true },
  { id: '2', name: 'Bob', isOnline: false },
  { id: '3', name: 'Charlie', isOnline: true },
  { id: '4', name: 'Diana', isOnline: true },
  { id: '5', name: 'Eve', isOnline: false },
  { id: '6', name: 'Frank', isOnline: true },
  { id: '7', name: 'Grace', isOnline: true },
  { id: '8', name: 'Hank', isOnline: false },
  { id: '9', name: 'Ivy', isOnline: true },
  { id: '10', name: 'Jack', isOnline: false },
];

export const mockMessages: Message[] = [
  {
    id: '101',
    senderId: '1',
    receiverId: '2',
    content: 'Hi Bob, how are you?',
    timestamp: '2024-11-24T09:15:00Z',
  },
  {
    id: '102',
    senderId: '2',
    receiverId: '1',
    content: 'Hey Alice! I’m good, how about you?',
    timestamp: '2024-11-24T09:16:00Z',
  },
  {
    id: '103',
    senderId: '3',
    receiverId: '4',
    content: 'Diana, are we still on for the meeting later?',
    timestamp: '2024-11-24T09:20:00Z',
  },
  {
    id: '104',
    senderId: '4',
    receiverId: '3',
    content: 'Yes, Charlie! I’ll call you around 2 PM.',
    timestamp: '2024-11-24T09:21:00Z',
  },
  {
    id: '105',
    senderId: '5',
    receiverId: '6',
    content: 'Frank, can you check the document I sent earlier?',
    timestamp: '2024-11-24T09:30:00Z',
  },
  {
    id: '106',
    senderId: '6',
    receiverId: '5',
    content: 'Sure, give me 10 minutes!',
    timestamp: '2024-11-24T09:32:00Z',
  },
  {
    id: '107',
    senderId: '7',
    receiverId: '1',
    content: 'Alice, are you joining the group call?',
    timestamp: '2024-11-24T09:45:00Z',
  },
  {
    id: '108',
    senderId: '1',
    receiverId: '7',
    content: 'Yes, just give me a moment to finish something.',
    timestamp: '2024-11-24T09:46:00Z',
  },
  {
    id: '109',
    senderId: '8',
    receiverId: '9',
    content: 'Ivy, did you see the new feature in the app?',
    timestamp: '2024-11-24T10:00:00Z',
  },
  {
    id: '110',
    senderId: '9',
    receiverId: '8',
    content: 'Yes, Hank! It looks great.',
    timestamp: '2024-11-24T10:02:00Z',
  },
  {
    id: '111',
    senderId: '10',
    receiverId: '3',
    content: 'Charlie, can you help me with the report?',
    timestamp: '2024-11-24T10:10:00Z',
  },
  {
    id: '112',
    senderId: '3',
    receiverId: '10',
    content: 'Of course, Jack! Send me the details.',
    timestamp: '2024-11-24T10:11:00Z',
  },
];

export const mockChatSessions: ChatSession[] = [
  {
    id: 'session1',
    participants: [
      { id: '1', name: 'Alice', isOnline: true },
      { id: '2', name: 'Bob', isOnline: false },
    ],
    messages: [mockMessages[0], mockMessages[1]],
    lastUpdated: '2024-11-24T09:16:00Z',
  },
  {
    id: 'session2',
    participants: [
      { id: '3', name: 'Charlie', isOnline: true },
      { id: '4', name: 'Diana', isOnline: true },
    ],
    messages: [mockMessages[2], mockMessages[3]],
    lastUpdated: '2024-11-24T09:21:00Z',
  },
];

export const mockConnectionStatus: ConnectionStatus = {
  isConnected: true,
  lastChecked: '2024-11-24T12:05:00Z',
};
