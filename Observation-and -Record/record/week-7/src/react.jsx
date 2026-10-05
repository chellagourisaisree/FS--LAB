import React, { Component } from 'react';

// Functional Component
function Welcome() {
    return (
        <div>
            <h2>Functional Component</h2>
            <p>Welcome to React!</p>
        </div>
    );
}

// Class Component
class Student extends Component {
    render() {
        return (
            <div>
                <h2>Class Component</h2>
                <p>Name: Gouri</p>
                <p>Branch: CSE - AI & ML</p>
            </div>
        );
    }
}

// Main App Component
function App() {
    return (
        <div>
            <h1>React Components</h1>

            <Welcome />

            <Student />
        </div>
    );
}

export default App;
