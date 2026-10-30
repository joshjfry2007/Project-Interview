function addScore(bucket, name, value) {
    if (!bucket[name]) bucket[name] = { total: 0, count: 0 };
    bucket[name].total += value;
    bucket[name].count += 1;
}

function averages(bucket) {
    const result = {};
    for (const [key, value] of Object.entries(bucket)) {
        result[key] = value.total / value.count;
    }
    return result;
}

function summarizeHistory(history) {
    const overall = {};
    const byCategory = {};

    for (const entry of history) {
        if (!byCategory[entry.category]) {
            byCategory[entry.category] = {};
        }

        for (const [key, value] of Object.entries(entry.x.scores || {})) {
            addScore(overall, key, value);
            addScore(byCategory[entry.category], key, value);
        }
    }

    const categoryAverages = {};
    for (const [key, value] of Object.entries(byCategory)) {
        categoryAverages[key] = averages(value);
    }

    return { overall: averages(overall), byCategory: categoryAverages };
}

export { summarizeHistory };