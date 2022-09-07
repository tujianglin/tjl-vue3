export function checkStatus(status: number, msg: string) {
  switch (status) {
    case 400:
      alert(msg);
      break;
    default:
      break;
  }
}
