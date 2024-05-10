import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
const MyComponent = () => {
    useEffect(() => {
        // Display a test toast when the component mounts
        toast.error("Test toast");
    }, []);

    return (
        <>
            <ToastContainer />
            {/* Other JSX elements in your component */}
        </>
    );
};

export default MyComponent;
