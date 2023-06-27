
const names = [
    'Name',
    'Name1',
    'Name2',
    'Name3',
    'Name4',
    'Name5',
  ];
  
  const thoughtBodies = [
   'Test',
   'Test1',
   'Test2',
   'Test3'
  ];
  
  const possibleReactions = [
    'Reaction',
    'Reaction1',
    'Reaction2',
    'Reaction3'
  ];
  
  const users = [];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random full name
  const getRandomName = () =>
    `${getRandomArrItem(names)}`;
  
    const getRandomEmail = () =>
    `${getRandomArrItem(names)}@email.com`;

  const getRandomThoughts = (int) => {
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        username: getRandomName(),
        thoughtText: getRandomArrItem(thoughtBodies),
        reactions: [...getThoughtReactions(2)],
      });
    }
    return results;
  };
  

  const getThoughtReactions = (int) => {
    if (int === 1) {
      return getRandomArrItem(possibleReactions);
    }
    let results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        responseBody: getRandomArrItem(possibleReactions),
        username: getRandomName(),
      });
    }
    return results;
  };
  
  module.exports = { getRandomName, getRandomEmail, getRandomThoughts, getThoughtReactions };
