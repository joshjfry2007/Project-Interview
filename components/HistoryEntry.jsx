export default function HistoryEntry({ entry, defaultOpen }) {
    return (
        <details open={defaultOpen}>
            <summary>{entry.question}</summary>
            <p><strong>Your answer:</strong> {entry.answer}</p>
            <p>{entry.category}</p>

            <h4>Scores</h4>
            <p>
                {Object.entries(entry.feedback?.scores || {}).map(([name, value]) => (
                    <span key={name}>{name}: {value}/10 </span> 
                ))}
            </p>

            <h4>Evidence</h4>
            {Array.isArray(entry.feedback?.evidence) ? (
                entry.feedback.evidence.map((item, i) => (
                    <p key={`${entry.id}-evidence-${i}`}>{item.quote} — {item.comment}</p>
                ))
            ) : (
                <p>{entry.feedback?.evidence}</p>
            )}
        </details>
    );
}