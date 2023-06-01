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

  return result;
};
