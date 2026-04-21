export function send(ws, id, type, payload) {
  const message = {
    type,
    id,
    payload,
  }

  ws.send(JSON.stringify(message));
}

export function checkNumber(number) {
  if(number.startsWith('0')) {
    return false;
  }

  const set = new Set(number);

  if(set.size !== number.length) {
    return false;
  }

  const num = Number(number);

  if(!Number.isInteger(num)) {
    return false;
  }


  return true;

}