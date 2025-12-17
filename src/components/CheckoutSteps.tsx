interface CheckoutStepsProps {
  currentStep: 'address' | 'carrier' | 'summary' | 'confirmation';
}

const steps = [
  { id: 'address', label: 'Adresse' },
  { id: 'carrier', label: 'Livraison' },
  { id: 'summary', label: 'Récapitulatif' },
];

function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* Step circle */}
            <div
              className={`
                flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm
                ${index <= currentIndex
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {index < currentIndex ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>

            {/* Step label */}
            <span
              className={`
                ml-2 text-sm font-medium hidden sm:inline
                ${index <= currentIndex ? 'text-blue-600' : 'text-gray-500'}
              `}
            >
              {step.label}
            </span>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  w-8 sm:w-16 h-1 mx-2 sm:mx-4
                  ${index < currentIndex ? 'bg-blue-600' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CheckoutSteps;