export const getContacts = async () => {
  const response = await fetch("/data/contact.json");
  if (!response.ok) {
    throw new Error("Contacts fetching failed");
  }
  const data = await response.json();
  return data;
};

export const getRequests = async () => {
  const response = await fetch("/data/request.json");
  if (!response.ok) {
    throw new Error("Requests fetching failed");
  }
  const data = await response.json();
  return data;
};
