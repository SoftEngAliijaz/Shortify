const sessionIdToUserMap = new Map();

function setUser(sessionId, user) {
  sessionIdToUserMap.set(sessionId, user);
}

function getUser(sessionId) {
  return sessionIdToUserMap.get(sessionId);
}
function deleteUser(sessionId) {
  sessionIdToUserMap.delete(sessionId);
}
function isAuthenticated(sessionId) {
  return sessionIdToUserMap.has(sessionId);
}

module.exports = {
  setUser,
  getUser,
  deleteUser,
  isAuthenticated,
};
