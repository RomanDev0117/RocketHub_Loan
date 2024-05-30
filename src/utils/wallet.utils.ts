export const groupSteamItems = <T extends { name: string, amount: number }>(items?: T[]) => {
  if (!items) return [];

  const itemsMap = items.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = { ...item, amount: item.amount || 1 };
    } else {
      acc[item.name].amount += item.amount || 1;
    }

    return acc;
  }, {} as Record<string, T>);

  return Object.values(itemsMap);
};

