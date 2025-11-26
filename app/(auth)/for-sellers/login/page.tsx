

// You can reuse the same sign-in form because login credentials 
// are agnostic. The redirection logic inside the component 

import CustomSignInForm from "../../_components/custom-signin-form";

// handles where they go.
export default function TeacherLoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <CustomSignInForm />
        </div>
    );
}