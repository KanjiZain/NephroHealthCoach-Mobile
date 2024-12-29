export * from './regex';

export const getInitials = (name: string) => {
  const nameParts = name.trim().split(' ');
  if (nameParts.length === 1) {
    return nameParts[0].charAt(0).toUpperCase();
  }
  return nameParts[0].charAt(0).toUpperCase();
};

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};
