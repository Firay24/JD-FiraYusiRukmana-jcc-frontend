const getFirstName = (fullName: string): string => {
  return fullName.split(" ")[0] || "";
};

export default getFirstName;
