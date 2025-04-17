const sessionIdToUserMap = new Map();

function setUser(sessionId, user) {
  sessionIdToUserMap.set(sessionId, user);
}

async function getUser(sessionId) {
  console.log("Session ID:", sessionId); // Debugging line
  return sessionIdToUserMap.get(sessionId);
}

module.exports = {
  setUser,
  getUser,
  sessionIdToUserMap,
};
