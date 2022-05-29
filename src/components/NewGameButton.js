import React from 'react';

function NewGameButton({label}) {
    return <button autoFocus={true} type="submit" className="action">{label}</button>
}

export default NewGameButton;