type Data = {
  month: string;
  amount: number;
};

export const formatDataForChart = (data: Data[]) => {
  const result = data.reduce((acc: Data[], item) => {
    const { month, amount } = item;

    const existingItem = acc.find(entry => entry.month === month);
    if (existingItem) {
      existingItem.amount += amount;
    } else {
      acc.push({ month, amount });
    }

    return acc;
  }, []);

  result.sort((a, b) => {
    const monthA = a.month.toLowerCase();
    const monthB = b.month.toLowerCase();
    if (monthA < monthB) {
      return -1;
    }
    if (monthA > monthB) {
      return 1;
    }
    return 0;
  });

  return result;
};
