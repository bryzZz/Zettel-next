import axios from "axios";

export const fetcher = (...args: Parameters<typeof axios.get>) =>
  axios.get(...args).then((res) => res.data);

// export const fetcher = (
//   input: RequestInfo | URL,
//   init?: Pick<RequestInit, "method"> & { body: object }
// ) => {
//   const fetchInit = { method: init?.method } as RequestInit;

//   if (init && init.body) {
//     fetchInit.headers = { "Content-Type": "application/json" };
//     fetchInit.body = JSON.stringify(init.body);
//   }

//   return fetch(input, fetchInit).then((res) => res.json());
// };
