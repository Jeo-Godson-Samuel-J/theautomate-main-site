export default function PaymentFailed() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-red-600">
                    Payment Failed
                </h1>
                <p>Payment was not successful. Please try again.</p>
            </div>
        </div>
    );
}