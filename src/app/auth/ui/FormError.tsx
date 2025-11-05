const FormError = ({ message }: { message?: string }) => {
    return (
        <>
            {message
            && (<span className="text-[#FF6B81] animate-shake -mt-3 ml-2">{message}</span>)
            }
        </>
    )
}
export default FormError;
