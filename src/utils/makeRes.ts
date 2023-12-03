export function makeRes(data: any, message: string, isErr: boolean = false) {
  return {
    data,
    message,
    isErr,
  };
}
