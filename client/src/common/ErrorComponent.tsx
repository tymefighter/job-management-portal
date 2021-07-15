import "../styles/ErrorComponent.scss";

function ErrorComponent({message}: {message: string}) {
    return (
        <div className="error-component">
            <h1 className="error-component__heading">Error</h1>
            <p className="error-component__message">{message}</p>
        </div>
    );
}

export default ErrorComponent;