export function filterByField(data, field, value) {
  return data.filter(item => item[field] === value);
}

export function sortByField(data, field, order = 'asc') {
  return [...data].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];
    
    const numA = Number(valA);
    const numB = Number(valB);
    
    let comparison = 0;
    
    if (!isNaN(numA) && !isNaN(numB)) {
      comparison = numA - numB;
    } else {
      comparison = String(valA).localeCompare(String(valB));
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
}

export function getStatistics(data) {
  const totalRecords = data.length;
  
  let totalAge = 0;
  const cityCounts = {};
  const jobCounts = {};
  
  for (const item of data) {
    totalAge += Number(item.age) || 0;
    cityCounts[item.city] = (cityCounts[item.city] || 0) + 1;
    jobCounts[item.job] = (jobCounts[item.job] || 0) + 1;
  }
  
  const averageAge = totalRecords > 0 ? (totalAge / totalRecords).toFixed(1) : 0;
  
  return {
    totalRecords,
    averageAge: Number(averageAge),
    cityCounts,
    jobCounts
  };
}