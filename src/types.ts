export type PageType = 'name_entry' | 'envelope' | 'reply' | 'end' | 'admin';

export interface ReplyMessage {
  username: string;
  message: string;
  timestamp: number;
}
