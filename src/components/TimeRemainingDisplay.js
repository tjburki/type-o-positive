function TimeRemainingDisplay({remaining}) {
    return (
        <div style={{position: 'fixed', bottom: 7, right: 10, padding: 15, backgroundColor: 'black'}}>
            Time remaining: {remaining}
        </div>
    );
}

export default TimeRemainingDisplay;