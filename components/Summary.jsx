import { summarizeHistory } from "@/lib/summary";

function Summary({ history }) {
    const summary = summarizeHistory(history);

    return (
        <div>
            <h2>Summary</h2>
            <h3>Overall Scores</h3>
            <ul>
                {Object.entries(summary.overall).map(([name, value]) => (
                    <li key={name}>{name}: {value.toFixed(2)}/10</li>
                ))}
            </ul>

            <h3>Scores by Category</h3>
            <ul>
                {Object.entries(summary.byCategory).map(([category, scores]) => (
                    <li key={category}>
                        <strong>{category}</strong>
                        <ul>
                            {Object.entries(scores).map(([name, value]) => (
                                <li key={name}>{name}: {value.toFixed(2)}/10</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export {Summary};