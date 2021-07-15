import "../styles/FixedButton.scss";

interface FixedButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    "aria-label": string;
    className?: string;
    children: string;
};

function FixedButton({onClick, className, children, ...props}: FixedButtonProps) {
    const buttonClassName = "fixed-button" + (className ? " " + className : "");
    return (
        <button aria-label={props["aria-label"]}
            className={buttonClassName} onClick={onClick}>
            {children}
        </button>
    )
}

export default FixedButton;