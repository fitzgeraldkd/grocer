// export const sendRequest = async (path: string, method: string, body: {}, sideEffect: Function) => {

type RequestInputs = {
  path?: string,
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  body?: {},
  sideEffect?: Function
}

export const sendRequest = async ({path = '/', method = 'GET', body = {}, sideEffect}: RequestInputs) => {
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  const response = await fetch(path, options);
  const payload = await response.json();
  if (sideEffect) sideEffect(payload);
  return {success: response.ok, data: payload};
  return payload;
};