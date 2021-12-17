export {}

export type ValidResponse = {
  payload: {},
  messages: string[]
}

export type ValidRecordType = {
  id: number
};

export type UserRecordType = {
  id?: number,
  username: string,
  // firebase_id: string,
  email: string
};