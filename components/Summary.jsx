import { summarizeHistory } from "@/lib/summary";

function Summary({ history, onStartNewSession }) {
    const summary = summarizeHistory(history);

    return (
        <div className="w-full overflow-y-auto p-4">
            <h2 className="text-2xl font-bold">Interview Summary</h2>

            {history.length === 0 ? (
                <p>No answers were recorded in this session.</p>
            ) : (
                <>
                    <h3 className="mt-4 font-semibold">Overall Scores</h3>
                    <ul>
                        {Object.entries(summary.overall).map(([name, value]) => (
                            <li key={name}>{name}: {value.toFixed(1)}/10</li>
                        ))}
                    </ul>

                    <h3 className="mt-4 font-semibold">Scores by Category</h3>

                    {Object.entries(summary.byCategory).map(([category, scores]) => (
                        <div key={category} className="mt-2">
                            <strong>{category}</strong>
                            <ul>
                                {Object.entries(scores).map(([name, value]) => (
                                    <li key={name}>{name}: {value.toFixed(1)}/10</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            )}

            <button onClick={onStartNewSession} className="mt-6 rounded-lg bg-[#5F9EA0] px-4 py-2 text-black hover:bg-[#4F8A8B] transition-colors">
                Start New Session
            </button>
        </div>
    );
}

export { Summary };