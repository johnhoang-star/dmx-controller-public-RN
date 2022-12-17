export default function initGroupCreation(numOfGroups) {
  let x = 0;
  let groups = [];

  while (x < numOfGroups) {
    groups[x] = {
      operation: 0,
      id: x.toString(),
      circuits: [],
      intensity: 0,
      nickname: '',
    };
    x = x + 1;
  }

  return [...groups];
}
