export const cutText = (text: string, maxLength: number) => {
  if (!text || !maxLength) {
    throw new Error('Give a text or maxLength in cutText function.');
  }

  if     (text.length > maxLength) {


    
    return `${text.slice(0, maxLength)}...`;
  }
};
