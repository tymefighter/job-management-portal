import "../styles/FixedButton.scss";

interface FixedButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
    children: string;
};

function FixedButton({onClick, className, children}: FixedButtonProps) {
    const buttonClassName = "fixed-button" + (className ? " " + className : "");
    return (
        <button className={buttonClassName} onClick={onClick}>
            {children}
        </button>
    )
}

export default FixedButton;