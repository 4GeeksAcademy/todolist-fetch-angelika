import React, { useEffect, useState } from "react";

const Alert = ({ type, message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        visible && (
            <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                {message}
                <button type="button" className="btn-close" onClick={() => setVisible(false)}></button>
            </div>
        )
    );
};

export default Alert;